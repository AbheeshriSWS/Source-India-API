import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SellerDetail = () => {
    const { slug } = useParams();
  const [company, setCompany] = useState(null);
  const BASE_URL = "https://react-live.sourceindia-electronics.com/v1/";

  useEffect(() => {
    
    fetch(
  `https://react-live.sourceindia-electronics.com/v1/api/products/companies/${slug}`
)
      .then((res) => res.json())
      .then((data) => {
        setCompany(data);
      })
      .catch((err) => console.log(err));
  }, [slug]);

  if (!company) return <p className="text-center mt-5">Loading...</p>;

  return (
    
    <div className="container my-4">
      <div className="row g-4">
        
        {/* LEFT CARD */}
        <div className="col-lg-8">
          <div className="card main-card p-4">
            
            <div className="d-flex align-items-start gap-3">
              <div className="logo-boxx">
                <img
                  src={`${BASE_URL}${company.company_logo_file}`}
                  alt="logo"
                  style={{ width: "100px" }}
                />
              </div>

              <div>
                <h4 className="company-title">
                  {company.organization_name}
                </h4>
                <p className="location">
                  📍 {company.company_location}
                </p>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="row mt-4">
              <div className="col-md-4 info-item">
                <p className="label">Website</p>
                <p className="value link">
                  {company.company_website}
                </p>
              </div>

              <div className="col-md-4 info-item">
                <p className="label">Core Activity</p>
                <p className="value">
                  {company.coreactivity_name}
                </p>
              </div>

              <div className="col-md-4 info-item">
                <p className="label">Activity</p>
                <p className="value">
                  {company.activity_name}
                </p>
              </div>

              <div className="col-md-4 info-item">
                <p className="label">Category</p>
                <p className="value">
                  {company.category_name}
                </p>
              </div>

              <div className="col-md-8 info-item">
                <p className="label">Sub Category</p>
                <p className="value">
                  {company.sub_category_name}
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-3">
              <p className="desc-title">
                {company.brief_company}
              </p>
              <p className="desc-text">
                {company.organizations_product_description}
              </p>
            </div>

            <button className="btn enquiry-btn mt-2">📞 Enquiry</button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-4">
          
          <div className="card p-3 mb-3 side-card">
            <h6 className="mb-3">Rating & Review</h6>

            <div className="stars mb-2">⭐⭐⭐⭐⭐</div>

            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Write your review"
            ></textarea>

            <button className="btn submit-btn">Submit</button>
          </div>

          <div className="card p-3 side-card highlight-card">
            <h6>To List your Product</h6>
            <p className="small-text">
              Boost Your Business Visibility Worldwide
            </p>
            <button className="btn register-btn">Register Now</button>
          </div>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="container my-5">
        <h4 className="section-title mb-4">Products</h4>

        <div className="row">
          {company.products.map((item) => (
            <div
              key={item.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <div className="product-card text-center p-4 h-100">
                
                <img
                  src={`${BASE_URL}${item.image}`}
                  alt={item.title}
                  className="product-img mb-3"
                />

                <h6 className="product-title mb-3">
                  {item.title}
                </h6>

                <button className="btn view-button">
                  View →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerDetail;