import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for SPA navigation

function Header() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://react-live.sourceindia-electronics.com/v1/api/settings/front-site")
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch((error) => console.error("Header API Error:", error));

    // Update favicon dynamically
    fetch("https://react-live.sourceindia-electronics.com/v1/api/settings/front-site")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.favicon_file) { 
          const favicon = document.getElementById("dynamic-favicon");
          if (favicon) {
            favicon.href = `https://react-live.sourceindia-electronics.com/v1/${resData.favicon_file}`;
          } else {
            const link = document.createElement("link");
            link.id = "dynamic-favicon";
            link.rel = "icon";
            link.type = "image/png";
            link.href = `https://react-live.sourceindia-electronics.com/v1/${resData.favicon_file}`;
            document.head.appendChild(link);
          }
        }
      });
  }, []);

  return (
    <>
      <header className="custom-header container-fluid">

        <div className="top-bar d-flex justify-content-between align-items-center px-3 py-1 container">
          <div className="welcome-support d-flex align-items-center gap-3">
            <span className="welcome-text">Welcome User!</span>
            <span className="support-text">
              Support:{" "}
              <a href={`tel:${data?.mobile || "8448293955"}`} className="support-link">
                {data?.mobile || "8448293955"}
              </a>
            </span>
          </div>

          <form
            className="d-flex align-items-center"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <select
              className="form-select me-2"
              aria-label="Product categories"
              style={{ minWidth: "150px" }}
            >
              <option>Products</option>
            </select>
            <input
              type="search"
              className="form-control me-2"
              placeholder="Enter product / service to search"
              aria-label="Search"
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>

          <div className="auth-buttons d-flex gap-2">
            <a href="/support" className="support-link d-flex align-items-center">
              <span style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "1", marginRight: "4px" }}>?</span>
              Support
            </a>
            <button className="btn btn-outline-primary">Sign In</button>
            <button className="btn btn-primary">Join Free</button>
          </div>
        </div>
        
        <div className="container-fluid" style={{backgroundColor: "white"}}>
          <nav className="navbar navbar-expand-lg navbar-light px-3 container">
            <Link to="/" className="navbar-brand d-flex align-items-center custom-logo">
              {data?.logo_file ? (
                <img
                  src={`https://react-live.sourceindia-electronics.com/v1/${data.logo_file}`}
                  alt={data.title || "Logo"}
                  style={{ maxHeight: "50px" }}
                />
              ) : (
                <>
                  <span className="logo-sou">Sou</span>
                  <span className="logo-rce">rce</span>
                  <span className="logo-india">India</span>
                </>
              )}
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarMenu"
              aria-controls="navbarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarMenu">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
                {data?.front_menu &&
                  (() => {
                    const menuOrder = [
                      "Home",
                      "Product Categories",
                      "Companies",
                      "Event",
                      "Enquiry",
                    ];

                    const filtered = data.front_menu.filter(
                      (menu) => menu.is_show == 1
                    );

                    const orderedMenu = menuOrder
                      .map((name) => filtered.find((m) => m.name === name))
                      .filter(Boolean);

                    return orderedMenu.map((menu) =>
                      menu.sub_menu && menu.sub_menu.length > 0 ? (
                        <li className="nav-item dropdown" key={menu.id}>
                          <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id={`dropdown${menu.id}`}
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {menu.name}
                          </a>
                          <ul className="dropdown-menu">
                            {menu.sub_menu
                              .filter((sub) => sub.is_show == 1)
                              .map((sub) => (
                                <li key={sub.id}>
                                  <Link className="dropdown-item" to={sub.link}>
                                    {sub.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </li>
                      ) : (
                        <li className="nav-item" key={menu.id}>
                          <Link className="nav-link" to={menu.link}>
                            {menu.name}
                          </Link>
                        </li>
                      )
                    );
                  })()}
              </ul>
              <a href="https://elcina.com" className="btn btn-elcina ms-lg-3">
                ELCINA Website
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;