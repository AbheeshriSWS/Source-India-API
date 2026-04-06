import React, { useEffect, useState } from "react";

function Featured() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/products?is_delete=0&status=1&is_approve=1&limit=11&page=1"
    )
      .then((res) => res.json())
      .then((response) => {
        console.log("PRODUCT RESPONSE ➤", response);

        // ✅ FIXED: correct key
        setCompanies(response.products || []);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="featured-section py-5">
      <div className="container">
        <h2 className="text-center section-title mb-5">
          FEATURED COMPANIES
        </h2>

        <div className="row g-4">
          {companies.length > 0 ? (
            companies.map((item, index) => (
              <div
                key={index}
                className="col-6 col-sm-4 col-md-3 col-lg-2"
              >
                <div className="company-card text-center">

                  {/* ✅ IMAGE */}
                  <div className="logo-wrapper">
                    <img
                      src={item.image || "/featured.jpg"}
                      alt={item.title || "product"}
                      className="img-fluid"
                    />
                  </div>

                  {/* ✅ TITLE */}
                  <p className="company-name mt-3">
                    {item.title || "No Title"}
                  </p>

                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Loading...</p>
          )}

          {/* More Card */}
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <div className="company-card text-center more-card">
              <div className="more-icon">•••</div>
              <p className="company-name mt-3">More</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;