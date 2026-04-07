import React, { useEffect, useState } from "react";

function Hero() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // API se banners fetch kar rahe hain
    fetch("https://react-live.sourceindia-electronics.com/v1/api/home_banners")
      .then((res) => res.json())
      .then((data) => {
        // sirf active aur non-deleted banners
        const activeBanners = data.filter(
          (b) => b.status === 1 && b.is_delete === 0 && b.file_name
        );
        setBanners(activeBanners);
      })
      .catch((err) => console.error("Hero API Error:", err));
  }, []);

  // agar koi banner na ho, fallback image show karo
  if (banners.length === 0) {
    return (
      <img
        src="/hero.webp"
        alt="Electronics Chip"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }

  return (
    <div className="hero-section">
      {banners.map((banner, index) => (
        <img
          key={index}
          src={`https://react-live.sourceindia-electronics.com/v1/${banner.file_name}`}
          alt={banner.title || `Banner ${index + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ))}
    </div>
  );
}

export default Hero;