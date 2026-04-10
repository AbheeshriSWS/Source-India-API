import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [itemCategories, setItemCategories] = useState([]);
  const [itemSubCategories, setItemSubCategories] = useState([]);
  const [statesList, setStatesList] = useState([]);

  const [page, setPage] = useState(1);          // ✅ NEW
  const [hasMore, setHasMore] = useState(true); // ✅ NEW
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // ✅ NEW

  const getImageUrl = (file) => {
    if (!file) return "https://via.placeholder.com/250";

    if (file.startsWith("http")) return file;

    if (file.startsWith("upload/")) {
      return `https://react-live.sourceindia-electronics.com/v1/${file}`;
    }

    return `https://react-live.sourceindia-electronics.com/v1/upload/products/${file}`;
  };

  // ✅ FETCH PRODUCTS (with pagination)
  const fetchProducts = async (pageNumber = 1) => {
    try {
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await fetch(
        `https://react-live.sourceindia-electronics.com/v1/api/products?is_delete=0&status=1&is_approve=1&limit=15&page=${pageNumber}`
      );
      const data = await res.json();

      const newProducts = data?.products || [];

      if (pageNumber === 1) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => [...prev, ...newProducts]); // ✅ APPEND
      }

      // ✅ Stop if no more data
      if (newProducts.length < 15) {
        setHasMore(false);
      }

      setLoading(false);
      setLoadingMore(false);
    } catch (err) {
      console.error("Error fetching products", err);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // ✅ INITIAL LOAD + OTHER DATA (unchanged)
  useEffect(() => {
    fetchProducts(1);

    const fetchOtherData = async () => {
      try {
        const categoryRes = await fetch(
          "https://react-live.sourceindia-electronics.com/v1/api/categories?is_delete=0"
        );
        const categoryData = await categoryRes.json();
        setCategories(Array.isArray(categoryData) ? categoryData : []);

        const companyRes = await fetch(
          "https://react-live.sourceindia-electronics.com/v1/api/products/companies?is_delete=0"
        );
        const companyData = await companyRes.json();
        setCompanies(companyData?.companies || []);

        const itemCategoryRes = await fetch(
          "https://react-live.sourceindia-electronics.com/v1/api/products/item-hierarchy/item_category/17"
        );
        const itemCategoryData = await itemCategoryRes.json();
        setItemCategories(itemCategoryData?.data || []);

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

        const stateRes = await fetch(
          "https://react-live.sourceindia-electronics.com/v1/api/location/states/101?category_ids=&subcategory_ids=&item_category_ids=&item_subcategory_ids="
        );
        const stateData = await stateRes.json();
        setStatesList(stateData || []); // ✅ FIXED
      } catch (err) {
        console.error(err);
      }
    };

    fetchOtherData();
  }, []);

  // ✅ INFINITE SCROLL LOGIC
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

  if (loading)
    return <div className="container main-container">Loading...</div>;

  return (
    <div className="container main-container">
      <div className="row">

        {/* ================= SIDEBAR ================= */}
        <div className="col-md-3 col-lg-3 p-0">
          <div className="sidebar">
            <div className="filter-box">
              <h5>Product Title</h5>
              <input type="text" placeholder="Search categories..." className="form-control mb-2" />
            </div>

            <div className="filter-box">
              <h5>Category</h5>
              <input type="text" placeholder="Search categories..." className="form-control mb-2" />
              <div className="checkbox-list" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {categories.map((cat) => (
                  <label key={cat.id}>
                    <input type="checkbox" /> {cat.name}
                  </label>
                ))}
              </div>
            </div>

            {/* <div className="filter-box">
              <h5>Sub Category</h5>
              <div className="checkbox-list">
                {subCategories.length > 0 ? (
                  subCategories.map((sub) => (
                    <label key={sub.id}>
                      <input type="checkbox" /> {sub.name}
                    </label>
                  ))
                ) : (<p>No sub categories</p>)}
              </div>
            </div>

            <div className="filter-box">
              <h5>Item Category</h5>
              <div className="checkbox-list">
                {itemCategories.map((item) => (
                  <label key={item.id}>
                    <input type="checkbox" /> {item.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-box">
              <h5>Item Sub Category</h5>
              <div className="checkbox-list">
                {itemSubCategories.length > 0 ? (
                  itemSubCategories.map((sub) => (
                    <label key={sub.id}>
                      <input type="checkbox" /> {sub.name}
                    </label>
                  ))
                ) : (<p>No item sub categories</p>)}
              </div>
            </div> */}

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

            <div className="filter-box">
              <h5>Companies</h5>
              <input type="text" placeholder="Search companies..." className="form-control mb-2" />
              <div className="checkbox-list">
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
              <span>{products.length} Products</span>
              <button className="btn grid-btn active">Grid View</button>
              <button className="btn list-btn">List View</button>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="row mt-3">
            {products.map((product) => (
              <div className="col-md-4 mb-5" key={product.id}>
                <div className="product-card">
                  <img
                    src={getImageUrl(product.file_name)}
                    alt={product.title}
                    className="product-img"
                    style={{ width: "100%", height: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h6>{product.title}</h6>
                    <p>{product.company_name}</p>
                    <p>{product.state_name}</p>
                  </div>
                  
                </div>
                <Link to={`/products/${product.slug}`}>
                  <button className="view-btnn">
                    View →
                  </button>
                </Link>
                </div>
            ))}
          </div>

          {/* ✅ LOADING MORE */}
          {loadingMore && (
            <div className="text-center mb-3">
              <p>Loading more products...</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductPage;