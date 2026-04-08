import React, { useEffect, useState } from "react";

const ProductPage = () => {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [itemCategories, setItemCategories] = useState([]);
  const [itemSubCategories, setItemSubCategories] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (file) => {
    if (!file) return "https://via.placeholder.com/250";
    if (file.startsWith("http")) return file;
    if (file.includes("upload/products")) {
      return `https://react-live.sourceindia-electronics.com/${file}`;
    }
    return `https://react-live.sourceindia-electronics.com/v1/upload/products/${file}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Categories
        const categoryRes = await fetch(
          "https://react-live.sourceindia-electronics.com/v1/api/categories?is_delete=0"
        );
        const categoryData = await categoryRes.json();
        setCategories(Array.isArray(categoryData) ? categoryData : []);

        // Companies
        const companyRes = await fetch(
          "https://react-live.sourceindia-electronics.com/v1/api/products/companies?is_delete=0"
        );
        const companyData = await companyRes.json();
        setCompanies(
          Array.isArray(companyData?.companies)
            ? companyData.companies
            : []
        );

        

        // Item Categories
        const itemCategoryRes = await fetch(
          "https://react-live.sourceindia-electronics.com/v1/api/products/item-hierarchy/item_category/17"
        );
        const itemCategoryData = await itemCategoryRes.json();
        setItemCategories(itemCategoryData?.data || []);

        // Item Sub Categories
        const itemSubRes = await fetch(
          "https://react-live.sourceindia-electronics.com/v1/api/item_sub_category/by-selected-category-subcategory-itemcategory",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              category_ids: [],
              subcategory_ids: [],
              item_category_ids: [17],
            }),
          }
        );
        const itemSubData = await itemSubRes.json();
        setItemSubCategories(itemSubData?.data || []);

        // ✅ States via local proxy
        const stateRes = await fetch("https://react-live.sourceindia-electronics.com/v1/api/location/states/101?category_ids=&subcategory_ids=&item_category_ids=&item_subcategory_ids=");
        const stateData = await stateRes.json();
        setStatesList(stateData?.data || []);

        setLoading(false);
          } catch (err) {
            console.error("Error fetching data", err);
            setLoading(false);
          }
        };

    fetchData();
  }, []);

  if (loading)
    return <div className="container main-container">Loading...</div>;

  return (
    <div className="container main-container">
      <div className="row">

        {/* ================= SIDEBAR ================= */}
        <div className="col-md-3 col-lg-3 p-0">
          <div className="sidebar">

            {/* CATEGORY */}
            <div className="filter-box">
              <h5>Category</h5>
              <input type="text" placeholder="Search categories..." className="form-control mb-2" />
              <div className="checkbox-list" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {categories.map((cat) => (
                  <label key={cat.id} style={{ display: "block" }}>
                    <input type="checkbox" /> {cat.name}
                  </label>
                ))}
              </div>
            </div>

            {/* SUB CATEGORY */}
            <div className="filter-box">
              <h5>Sub Category</h5>
              <div className="checkbox-list" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {subCategories.length > 0 ? (
                  subCategories.map((sub) => (
                    <label key={sub.id}>
                      <input type="checkbox" /> {sub.name}
                    </label>
                  ))
                ) : (<p>No sub categories</p>)}
              </div>
            </div>

            {/* ITEM CATEGORY */}
            <div className="filter-box">
              <h5>Item Category</h5>
              <div className="checkbox-list" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {itemCategories.map((item) => (
                  <label key={item.id}>
                    <input type="checkbox" /> {item.name}
                  </label>
                ))}
              </div>
            </div>

            {/* ITEM SUB CATEGORY */}
            <div className="filter-box">
              <h5>Item Sub Category</h5>
              <div className="checkbox-list" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {itemSubCategories.length > 0 ? (
                  itemSubCategories.map((sub) => (
                    <label key={sub.id}>
                      <input type="checkbox" /> {sub.name}
                    </label>
                  ))
                ) : (<p>No item sub categories</p>)}
              </div>
            </div>

            {/* STATE */}
            <div className="filter-box">
              <h5>State</h5>
              <div className="checkbox-list" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {statesList.length > 0 ? (
                  statesList.map((state) => (
                    <label key={state.id} style={{ display: "block" }}>
                      <input type="checkbox" /> {state.name} ({state.count || 0})
                    </label>
                  ))
                ) : (<p>No states found</p>)}
              </div>
            </div>

            {/* COMPANIES */}
            <div className="filter-box">
              <h5>Companies</h5>
              <input type="text" placeholder="Search companies..." className="form-control mb-2" />
              <div className="checkbox-list" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {companies.map((comp) => (
                  <label key={comp.id}>
                    <input type="checkbox" /> {comp.organization_name} ({comp.product_count})
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ================= MAIN ================= */}
        <div className="col-md-9 col-lg-9 content-area">
          <div className="product-top-bar d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <span>Sort By :</span>
              <span> A to Z | Z to A | Newest First</span>
            </div>
            <div>
              <span>{companies.length} Companies</span>
              <button className="btn grid-btn active">Grid View</button>
              <button className="btn list-btn">List View</button>
            </div>
          </div>

          {/* CARDS */}
          <div className="row mt-3">
            {companies.length === 0 && <p>No data found</p>}
            {companies.map((company) => (
              <div className="col-md-4 mb-4" key={company.id}>
                <div className="product-card">
                  <img src={getImageUrl(company.company_logo_file)} alt={company.organization_name} className="product-img" />
                  <div className="card-body">
                    <h6>{company.products.title}</h6>
                    <p>{company.organization_name}</p>
                    <p>{company.company_location}</p>
                    
                    <button className="view-btnn">View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;