import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Auto = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/categories/item-category?slug=automotive-components&page=1&limit=8"
    )
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch((err) => console.log(err));
  }, []);

  const baseURL = "https://react-live.sourceindia-electronics.com/v1/";

  if (!data) return <div>Loading...</div>;

  return (
    <div className="container my-4 automotive-wrapper">
      
      {/* Breadcrumb */}
      <div className="breadcrumb-custom">
        Home / Categories / {data.subcategory.category.name} /{" "}
        <span className="active-link">{data.subcategory.name}</span>
      </div>

      {/* Page Title */}
      <h3 className="page-title">{data.subcategory.name}</h3>

      {/* Sections */}
      {data.subcategory.item_categories.filter(cat => cat.product_count > 0).map((cat, index) => {
        // Agar first section hai to 4 items with images hi dikhao
        let itemsToShow = cat.items;
        if (index === 0) {
          itemsToShow = cat.items.filter((item) => item.file_name).slice(0, 4);
        }

        return (
          <div className="card section-card mb-4" key={cat.id}>
            <Link to="/categories/automotive/products" style={{ textDecoration: "none" }}>
            {/* Section Header */}
            <div className="card-header d-flex justify-content-between align-items-center bg-white border-0">
              <h5 className="section-title">
                {cat.name} ({cat.product_count})
              </h5>
              <span className="arrow">→</span>
            </div>

            {/* Section Body */}
            
            <div className="card-body">
                <div className="row g-4">
                  {itemsToShow.map((item) => (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-3"
                      key={item.id}
                    >
                      <div className="component-card text-center">
                        <img
                          src={
                            item.file_name
                              ? baseURL + item.file_name
                              : "https://via.placeholder.com/120"
                          }
                          alt={item.name}
                          style={{ maxWidth: "120px" }}
                        />
                        <h6>{item.name}</h6>
                        <p>({item.product_count})</p>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
             </Link> 
          </div>
         
        );
      })}
    </div>
  );
};

export default Auto;