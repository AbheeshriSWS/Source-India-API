import React from 'react';

function Header() {
  return (
    <>
    <header className="custom-header">
      <div className="top-bar d-flex justify-content-between align-items-center px-3 py-1">
        <div className="welcome-support d-flex align-items-center gap-3">
          <span className="welcome-text">Welcome User!</span>
          <span className="support-text">
            Support: <a href="tel:8448293955" className="support-link">8448293955</a>
          </span>
        </div>
        <form className="d-flex align-items-center" role="search" onSubmit={e => e.preventDefault()}>
          <select className="form-select me-2" aria-label="Product categories" style={{minWidth: '150px'}}>
            <option>Products</option>
            {/* Add more <option> elements for other categories here */}
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
          {/* Add your sign in and join links here */}
          <button className="btn btn-outline-primary">Sign In</button>
          <button className="btn btn-primary">Join Free</button>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light px-3">
        <a href="/" className="navbar-brand d-flex align-items-center custom-logo">
          {/* Logo text with spans for styling */}
          <span className="logo-sou">Sou</span>
          <span className="logo-rce">rce</span>
          <span className="logo-india">India</span>
        </a>

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
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a> {/* Add home link */}
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/product-categories">Product Categories</a> {/* Add link */}
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="companiesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Companies
              </a>
              <ul className="dropdown-menu" aria-labelledby="companiesDropdown">
                {/* Add dropdown links here */}
                <li><a className="dropdown-item" href="/company1">Company 1</a></li>
                <li><a className="dropdown-item" href="/company2">Company 2</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/event">Event</a> {/* Add event link */}
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/enquiry">Enquiry</a> {/* Add enquiry link */}
            </li>
          </ul>
          <a href="https://elcina.com" className="btn btn-elcina ms-lg-3">ELCINA Website</a>
        </div>
      </nav>
    </header>
    </>
  );
}

export default Header;