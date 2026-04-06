import React, { useEffect, useState } from "react";

function Component() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/categories/category-item?is_delete=0&status=1&limit=6&is_home=1"
    )
      .then((res) => res.json())
      .then((response) => {
        console.log("CATEGORY RESPONSE ➤", response);
        console.log("FIRST ITEM ➤", response[0]);

        // ✅ API returns direct array
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
              <img src="/side-img.jpg" alt="banner" />
              <button className="view-btn">View All</button>
            </div>
          </div>

          {/* Right Cards */}
          <div className="col-lg-8 col-md-12">
            <div className="row">
              
              {data.length > 0 ? (
                data.map((card, index) => (
                  <div className="col-md-6 mb-4" key={index}>
                    <div className="component-card">

                      <div className="card-content">
                        <div>
                          {/* ✅ Title */}
                          <h5>{card.name || "No Title"}</h5>

                          {/* ✅ Sub Categories */}
                          <ul>
                            {card.subcategories &&
                            card.subcategories.length > 0 ? (
                              card.subcategories.map((item, i) => (
                                <li key={i}>
                                  {item.name || "No Name"}
                                </li>
                              ))
                            ) : (
                              <li>No items</li>
                            )}
                          </ul>
                        </div>

                        {/* ✅ Image */}
                        <div className="card-img">
                          <img
                            src={card.image || "/product.png"}
                            alt={card.name || "category"}
                          />
                        </div>
                      </div>

                      <span className="arrow">→</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading categories...</p>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Component;