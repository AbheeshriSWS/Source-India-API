import React, { useEffect, useState } from "react";

const OpenEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/open_enquiries/front-enquiry?is_home=1&is_delete=0"
    )
      .then((res) => res.json())
      .then((data) => setEnquiries(data || []))
      .catch((err) => console.error(err));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getName = (item) => {
    if (item.fname || item.lname) {
      return `${item.fname || ""} ${item.lname || ""}`.trim();
    }
    return item.name || "-";
  };

  const getCompany = (item) => {
    return item.organization_name || item.company || "-";
  };

  return (
    <>
      <div className="container open-enquiry-wrapper">
        <div className="open-enquiry-header text-center">
          <h1>Open Enquiry</h1>
        </div>

        <div className="open-enquiry-controls d-flex justify-content-between align-items-center">
          <button className="btn btn-all">All Enquiry</button>
          <button className="btn btn-add">Add Enquiry</button>
        </div>
      </div>

      <div className="container enquiry-cards">
        <div className="row">
          {enquiries.map((item) => (
            <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
              <div className="card enquiry-card h-100">

                {/* Title */}
                <div className="card-header enquiry-title">
                  {item.title || "-"}
                </div>

                <div className="card-body">

                  {/* LOGO + NAME */}
                  <div className="d-flex align-items-center mb-2 enquiry-user">

                    {/* SHOW IMAGE ONLY IF EXISTS */}
                    {item.company_logo && (
                      <img
                        src={`https://react-live.sourceindia-electronics.com/v1/${item.company_logo}`}
                        alt="logo"
                        className="company-logo"
                      />
                    )}

                    <div className={item.company_logo ? "ms-2" : ""}>
                      <div className="user-name">{getName(item)}</div>
                      <div className="company-name">
                        {getCompany(item)}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="desc">Discription  {item.description}</p>

                  {/* Date */}
                  <p className="date">
                    {formatDate(item.created_at)}
                  </p>

                </div>

                {/* Footer */}
                {item.is_home === 1 && (
                  <div className="card-footer text-center">
                    <button className="btn reply-btn">Reply</button>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OpenEnquiry;