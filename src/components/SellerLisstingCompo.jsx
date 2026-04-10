import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SellerPage = () => {
  const [companies, setCompanies] = useState([]);
  const [core, setCore] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statesList, setStatesList] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const getImageUrl = (file) => {
    if (!file) return "https://via.placeholder.com/250";
    if (file.startsWith("http")) return file;
    if (file.startsWith("upload/")) {
      return `https://react-live.sourceindia-electronics.com/v1/${file}`;
    }
    return `https://react-live.sourceindia-electronics.com/v1/upload/products/${file}`;
  };

  const fetchProducts = async (pageNumber = 1) => {
    try {
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await fetch(
        `https://react-live.sourceindia-electronics.com/v1/api/products/companies?is_delete=0&status=1&limit=12&page=${pageNumber}&is_seller=1`
      );
      const data = await res.json();
      const newCompanies = data?.companies || [];

      if (pageNumber === 1) setCompanies(newCompanies);
      else setCompanies((prev) => [...prev, ...newCompanies]);

      if (newCompanies.length < 12) setHasMore(false);

      setLoading(false);
      setLoadingMore(false);
    } catch (err) {
      console.error("Error fetching companies", err);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);

    const fetchOtherData = async () => {
      try {
        const coreRes = await fetch(
          "https://react-live.sourceindia-electronics.com/v1/api/core_activities?is_delete=0&status=1"
        );
        const coreData = await coreRes.json();
        setCore(Array.isArray(coreData) ? coreData : []);

        const categoryRes = await fetch(
          "https://react-live.sourceindia-electronics.com/v1/api/categories?is_delete=0"
        );
        const categoryData = await categoryRes.json();
        setCategories(Array.isArray(categoryData) ? categoryData : []);

        const stateRes = await fetch(
          "https://react-live.sourceindia-electronics.com/v1/api/location/states/101?category_ids=&subcategory_ids=&item_category_ids=&item_subcategory_ids="
        );
        const stateData = await stateRes.json();
        setStatesList(stateData || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOtherData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore &&
        !loadingMore
      ) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, hasMore, loadingMore]);

  if (loading) return <div className="container main-container">Loading...</div>;

  return (
    <div className="container main-container">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="sidebar">
            <div className="filter-box">
              <h5>Core Activity</h5>
              <div className="checkbox-list" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {core.map((c) => (
                  <label key={c.id}>
                    <input type="checkbox" /> {c.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-box">
              <h5>Category</h5>
              <div className="checkbox-list" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {categories.map((cat) => (
                  <label key={cat.id}>
                    <input type="checkbox" /> {cat.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-box">
              <h5>State</h5>
              <div className="checkbox-list">
                {statesList.map((state) => (
                  <label key={state.id}>
                    <input type="checkbox" /> {state.name} ({state.count || 0})
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="col-md-9">
          <div className="row mt-3">
            {companies.map((company) => {
              const slug = company.organization_name.toLowerCase().replace(/\s+/g, "-");

              return (
                <div className="col-md-6 mb-4" key={company.id}>
                  <div className="product-card p-3 border">
                    <div className="d-flex mb-3">
                      <img
                        src={getImageUrl(company.company_logo_file)}
                        alt={company.organization_name}
                        style={{ width: "90px", height: "90px", objectFit: "contain" }}
                      />
                      <div className="ms-3">
                        <h6>{company.organization_name}</h6>
                        <p>{company.company_location}</p>
                      </div>
                    </div>

                    <p>Website: {company.company_website}</p>
                    <p>Core Activity: {company.coreactivity_name || company.core_activity_name}</p>
                    <p>Activity: {company.activity_name}</p>
                    <p>Category: {company.category_name}</p>
                    <p>Sub Category: {company.sub_category_name}</p>
                    <p>
                      Products:{" "}
                      {company.products && company.products.length > 0
                        ? company.products.map((prod) => prod.title).join(", ")
                        : "No products"}
                    </p>

                    <Link to={`/company/${slug}`}>
                      <button className="view-btnn btn btn-primary mt-2">View →</button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {loadingMore && (
            <div className="text-center mb-3">
              <p>Loading more companies...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerPage;