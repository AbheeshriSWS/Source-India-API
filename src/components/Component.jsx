import React, { useEffect, useState } from "react";

function Component() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/categories/category-item?is_delete=0&status=1&limit=6&is_home=1"
    )
      .then((res) => res.json())
      .then((response) => {
        setData(response || []);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="components-section container-fluid">
      <div className="container">
        <h3 className="section-heading">Component</h3>

        <div className="row main-box">

          {/* Left Banner */}
          <div className="col-lg-4 col-md-12 mb-4">
            <div className="left-banner">
              <img
  src={`https://react-live.sourceindia-electronics.com/v1/${data[0]?.file_name}`}
  alt={data[0]?.name || "category"}
  onError={(e) => (e.target.src = "/product.png")}
/>
              <button className="view-btn">View All</button>
            </div>
          </div>

          {/* Right Cards */}
          <div className="col-lg-8 col-md-12">
            <div className="row">

              {data.length > 0 ? (
                data[0].subcategories.map((sub, index) => (
                  <div className="col-md-6 mb-4" key={index}>
                    <div className="component-card">

                      <div className="card-content">
                        <div>

                          {/* ✅ h5 = Subcategory Name */}
                          <h5 className="title">{sub.name}</h5>

                          {/* ✅ li = item_categories */}
                          <ul>
                            {sub.item_categories &&
                            sub.item_categories.length > 0 ? (
                              sub.item_categories.slice(0, 4).map((item, i) => (
                                <li key={i}>{item.name}</li>
                              ))
                            ) : (
                              <li>No items</li>
                            )}
                          </ul>

                        </div>

                        {/* ✅ Image */}
                        <div className="card-img">
                         <img
                          src={
                            sub.file_name
                              ? `https://react-live.sourceindia-electronics.com/v1/${sub.file_name}`
                              : "/product.png"  // fallback
                          }
                          alt={sub.name}
                          
                        />
                        </div>
                      </div>

                      <span className="arrow">→</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Component;