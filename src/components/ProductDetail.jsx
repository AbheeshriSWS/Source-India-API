import { useParams } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


/* ---------------- IMAGE SLIDER ---------------- */
const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return null;

  const BASE_URL = "https://react-live.sourceindia-electronics.com/v1/";

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };
  

  return (
    <div className="text-center">
      <div className="position-relative">
        <button className="arrow left" onClick={prevSlide}>❮</button>

        <img
          src={BASE_URL + images[current].file}
          alt="product"
          className="main-img"
        />

        <button className="arrow right" onClick={nextSlide}>❯</button>
      </div>
     

      {/* ✅ ADDED DOTS (THIS IS THE FIX) */}
      <div className="d-flex justify-content-center mt-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${current === index ? "active-dot" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-3 gap-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={BASE_URL + img.file}
            className={`thumb ${current === index ? "active" : ""}`}
            onClick={() => setCurrent(index)}
            alt="thumb"
          />
        ))}
      </div>
    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
const ProductDetail = () => {
    const { productId } = useParams();

  const [activeTab, setActiveTab] = useState("product");
  const [data, setData] = useState(null);

  const BASE_URL = "https://react-live.sourceindia-electronics.com/v1/";

  useEffect(() => {
    fetch(`https://react-live.sourceindia-electronics.com/v1/api/products/details/${productId}`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [productId]);

  if (!data) return <div className="text-center my-5">Loading...</div>;

  return (
    <div className="container my-4">
      {/* Breadcrumb */}
      <div className="breadcrumb-text mb-3">
        Home / Products / <span>{data.title}</span>
      </div>

      <div className="row">
        {/* LEFT */}
        <div className="col-lg-9">
          <div className="product-card p-4">
            <div className="row">

              <div className="col-md-5">
                <ImageSlider images={data.images} />
              </div>

              <div className="col-md-7">
                <h3 className="title">{data.title}</h3>

                <div className="row mt-3">
                  <div className="col-6 info-item">
                    <div className="label">Category</div>
                    <div className="value">{data.category_name}</div>
                  </div>

                  <div className="col-6 info-item">
                    <div className="label">Sub Category</div>
                    <div className="value">{data.sub_category_name}</div>
                  </div>

                  <div className="col-6 info-item">
                    <div className="label">Item Category</div>
                    <div className="value">{data.item_category_name}</div>
                  </div>

                  <div className="col-6 info-item">
                    <div className="label">Item Type</div>
                    <div className="value">{data.item_subcategory_name}</div>
                  </div>
                </div>

                <p className="series-text mt-3">
                  {data.short_description}
                </p>

                <button className="btn enquiry-btn mt-2">
                  <FaPhoneAlt className="me-2" />
                  Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-3 mt-4 mt-lg-0">
          <div className="company-card p-3">
            <div className="d-flex align-items-center gap-2">
              <div className="logo-box">
                <img
                  src={BASE_URL + data.company_logo}
                  alt="logo"
                  style={{ width: "40px" }}
                />
              </div>
              <div>
                <div className="company-name">{data.company_name}</div>
                <div className="address">{data.company_location}</div>
              </div>
            </div>

            <div className="rating mt-2">
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>

            <hr />

            <div className="info-block">
              <div className="label">Member Since</div>
              <div className="value">3 Years</div>
            </div>

            <div className="info-block mt-2">
              <div className="label">Nature of Business</div>
              <div className="value">{data.core_activity_name}</div>
            </div>

            <div className="view-details mt-3">
              View Company Details →
            </div>
          </div>

          <div className="register-card mt-3 text-center p-3">
            <div>To List your Product</div>
            <div className="small-text">Boost Your Business Visibility</div>
            <button className="btn register-btn mt-2">
              Register Now
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- TABS ---------------- */}
      <div className="tabs-card p-4 mt-4">
        <div className="tabs-header d-flex gap-4">
          <div
            className={`tab-item ${activeTab === "product" ? "active" : ""}`}
            onClick={() => setActiveTab("product")}
          >
            Product Details
          </div>

          <div
            className={`tab-item ${activeTab === "company" ? "active" : ""}`}
            onClick={() => setActiveTab("company")}
          >
            Company Details
          </div>

          <div
            className={`tab-item ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </div>
        </div>

        <hr />

        {/* PRODUCT TAB */}
        {activeTab === "product" && (
          <div
            className="tab-content-custom"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        )}

        {/* COMPANY TAB ✅ ADDED */}
        {activeTab === "company" && (
  <div className="tab-content-custom">

    <div className="row">

      {/* LEFT SIDE → LOGO */}
      <div className="col-md-3 mb-3 text-center">
        <img
          src={BASE_URL + data.company_logo}
          alt="company"
          style={{ maxWidth: "120px" }}
        />
      </div>

      {/* RIGHT SIDE → DETAILS */}
      <div className="col-md-9">

        {/* TOP GRID */}
        <div className="row mb-3">

          <div className="col-md-4 col-6 mb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="icon-circle">🌐</div>
              <div>
                <div className="label">Website</div>
                <div className="value">N/A</div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-6 mb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="icon-circle">💼</div>
              <div>
                <div className="label">Core Activity</div>
                <div className="value">{data.core_activity_name}</div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-6 mb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="icon-circle">⚙️</div>
              <div>
                <div className="label">Activity</div>
                <div className="value">{data.activity_name}</div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-6 mb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="icon-circle">📦</div>
              <div>
                <div className="label">Category</div>
                <div className="value">{data.category_name}</div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-6 mb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="icon-circle">📂</div>
              <div>
                <div className="label">Sub Category</div>
                <div className="value">{data.sub_category_name}</div>
              </div>
            </div>
          </div>

        </div>

        {/* DESCRIPTION */}
        <p className="mb-3">
          {data.brief_company}
        </p>

        {/* HTML CONTENT */}
        <div
          dangerouslySetInnerHTML={{
            __html: data.organizations_product_description,
          }}
        />

      </div>
    </div>

  </div>
)}
      </div>

      {/* ---------------- SIMILAR PRODUCTS ---------------- */}
      <div className="similar-products container py-5 position-relative">
        <h3 className="section-title mb-4">Similar Products</h3>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
        >
          {data.similar_products?.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="product-card text-center">
                <div className="image-wrapper">
                  <img
                    src={BASE_URL + product.file_name}
                    alt={product.title}
                  />
                </div>

                <h6 className="product-title mt-3">
                  {product.title}
                </h6>

                <button className="btn btn-primary view-btn mt-3">
                  View →
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="nav-btn custom-prev">‹</button>
        <button className="nav-btn custom-next">›</button>
      </div>

      {/* DUPLICATE BLOCK (UNCHANGED) */}
      {/* ---------------- RECOMMENDED COMPANIES ---------------- */}
<div className="similar-products container py-5 position-relative">
  <h3 className="section-title mb-4">Recommended Companies</h3>

  <Swiper
    modules={[Navigation]}
    spaceBetween={20}
    navigation={{
      nextEl: ".custom-next-company",
      prevEl: ".custom-prev-company",
    }}
    breakpoints={{
      0: { slidesPerView: 1 },
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    }}
  >
    {data.recommended_companies?.slice(0, 8).map((company) => (
      <SwiperSlide key={company.id}>
        <div className="company-card text-center">

          {/* ✅ LOGO FIXED */}
          <div className="image-wrapper">
            <img
              src={`https://react-live.sourceindia-electronics.com/v1/${company.company_logo_file}`}
              alt={company.organization_name}
              className="company-logo"
              onError={(e) => {
                e.target.src = "/default-company.png";
              }}
            />
          </div>

          {/* ✅ NAME FIXED */}
          <h6 className="company-title mt-3">
            {company.organization_name}
          </h6>

          {/* ✅ WEBSITE (OPTIONAL) */}
          <p className="company-location">
            {company.company_website}
          </p>

          {/* BUTTON */}
          <button className="btn btn-primary view-btn mt-2">
            View →
          </button>

        </div>
      </SwiperSlide>
    ))}
  </Swiper>

  <button className="nav-btn custom-prev-company">‹</button>
  <button className="nav-btn custom-next-company">›</button>
</div>
    </div>
  );
};

export default ProductDetail;