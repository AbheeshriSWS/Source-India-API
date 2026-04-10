import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BuyerCompo = () => {
  const [companies, setCompanies] = useState([]);
  const [itemcategories, setItemCategories] = useState([]);

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

      const res = await fetch(`https://react-live.sourceindia-electronics.com/v1/api/products/companies?is_delete=0&status=1&limit=12&page=${pageNumber}&is_seller=0&activity=`        
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
     

        const itemcategoryRes = await fetch(
          "https://react-live.sourceindia-electronics.com/v1/api/item_category/getitem?status=1"
        );
        const itemcategoryData = await itemcategoryRes.json();
        setItemCategories(Array.isArray(itemcategoryData) ? itemcategoryData : []);

        
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
              <h5>Company Name</h5>
            <input placeholder="Search Companies"></input>
            </div>

            <div className="filter-box">
              <h5>Item Category</h5>
              <input placeholder="Search Item Categories"></input>
              <div className="checkbox-list" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {itemcategories.map((cat) => (
                  <label key={cat.id}>
                    <input type="checkbox" /> {cat.name}
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
                         src="/default.png" alt="default" 
                        style={{ width: "90px", height: "90px", objectFit: "contain" }}
                      />
                      <div className="ms-3">
                        <h6>{company.organization_name}</h6>
                        <p>{`Location: ${company?.user.address || "N/A"}`}</p>
                      </div>
                    </div>

                    
                    <p>
                        Products:{" "}
                        {Array.isArray(company?.user?.products)
                            ? company.user.products.map((p) => p?.title).join(", ")
                            : company?.user?.products || "No products"}
                    </p>

                    <Link to={`/categories/default/company/${slug}`}>
                      <button className="view-btnn btn btn-primary mt-2">Connect</button>
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

export default BuyerCompo;