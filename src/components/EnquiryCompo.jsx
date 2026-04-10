import React, { useEffect, useState } from "react";

const OpenEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch API
  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/open_enquiries/front-enquiry?is_home=1&is_delete=0"
    )
      .then((res) => res.json())
      .then((data) => {
        setEnquiries(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching enquiries:", err);
        setLoading(false);
      });
  }, []);

  // Format Date
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

  // Get Name (fname + lname OR name)
  const getName = (item) => {
    if (item.fname || item.lname) {
      return `${item.fname || ""} ${item.lname || ""}`.trim();
    }
    return item.name || "-";
  };

  // Get Company
  const getCompany = (item) => {
    return item.organization_name || item.company || "-";
  };

  // Trim description
  const trimText = (text, limit = 180) => {
    if (!text) return "-";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <>
      <div className="container open-enquiry-wrapper">
        {/* Header */}
        <div className="open-enquiry-header text-center">
          <h1>Open Enquiry</h1>
        </div>

        {/* Controls */}
        <div className="open-enquiry-controls d-flex justify-content-between align-items-center">
          <button className="btn btn-all">All Enquiry</button>
          <button className="btn btn-add">Add Enquiry</button>
        </div>
      </div>

      <div className="container enquiry-cards">
        {loading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : (
          <div className="row">
            {enquiries.map((item) => (
              <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                <div className="card enquiry-card h-100">
                  
                  {/* Title */}
                  <div className="card-header enquiry-title">
                    {item.title || "-"}
                  </div>

                  {/* Body */}
                  <div className="card-body">
                    <p className="desc">
                      <strong>Description:</strong>{" "}
                      {trimText(item.description)}
                    </p>

                    <p>
                      <strong>Name:</strong> {getName(item)}
                    </p>

                    <p>
                      <strong>Company Name:</strong> {getCompany(item)}
                    </p>

                    <p>
                      <strong>Date:</strong>{" "}
                      {formatDate(item.created_at)}
                    </p>
                  </div>

                  {/* Footer (only for home enquiries) */}
                  {item.is_home === 1 && (
                    <div className="card-footer text-center">
                      <button className="btn reply-btn">Reply</button>
                    </div>
                  )}
                </div>  
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OpenEnquiry;