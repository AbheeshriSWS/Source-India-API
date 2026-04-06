import React, { useState, useEffect } from "react";

function LatestProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/products?is_delete=0&status=1&is_approve=1&limit=6&page=1"
    )
      .then((res) => res.json())
      .then((response) => {
        console.log("FULL RESPONSE ➤", response);
        setProducts(response.products || []); // ✅ FIXED
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="latest-products container-fluid">
      <h2 className="section-title text-center">LATEST PRODUCT</h2>

      <div className="container">
        <div className="row">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={index}>
                <div className="product-card">
                  <p className="category">
                    {item.category || "Unknown"}    
                  </p>

                  <div className="d-flex align-items-center">
                    <div className="image-box">
                      <img
                        src={item.image || "/product.png"}
                        alt={item.title || "Product"}
                      />
                    </div>

                    <div className="product-info">
                      <h5>{item.title || "No Title"}</h5>
                      <a href="#" className="view-link">
                        View →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LatestProduct;