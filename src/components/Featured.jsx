import React, { useEffect, useState } from "react";

function Featured() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/products/companies?is_delete=0&limit=11&page=1"
    )
      .then((res) => res.json())
      .then((response) => {
        console.log("COMPANIES RESPONSE ➤", response);
        if (response && Array.isArray(response.companies)) {
          setCompanies(response.companies);
        } else {
          setCompanies([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setCompanies([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="featured-section py-5">
      <div className="container">
        <h2 className="text-center section-title mb-5">
          FEATURED COMPANIES
        </h2>

        <div className="row g-4">
          {loading ? (
            <p className="text-center py-5">Loading...</p>
          ) : companies.length === 0 ? (
            <p className="text-center py-5">No featured companies available</p>
          ) : (
            companies.map((company, index) => (
              <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <div className="company-card text-center">

                  {/* IMAGE */}
                  <div className="logo-wrapper">
                    <img
                      src={`https://react-live.sourceindia-electronics.com/v1/${company.company_logo_file}`}
                      alt={company.organization_name}
                      className="img-fluid"
                    />
                  </div>

                  {/* ORGANIZATION NAME */}
                  <p className="company-name mt-3">
                    {company.organization_name || "No Name"}
                  </p>

                  
                </div>

                
              </div>
              
            ))
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