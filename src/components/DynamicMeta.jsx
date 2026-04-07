import React, { useEffect, useState } from "react";

function DynamicMeta() {
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    fetch("https://react-live.sourceindia-electronics.com/v1/api/seo_pages/slug/home")
      .then((res) => res.json())
      .then((data) => {
        setSeoData(data);

        // ✅ Update the page title
        if (data.title) {
          document.title = data.title;
        }

        // ✅ Update meta tags dynamically
        if (data.meta_description) {
          let descriptionTag = document.querySelector(
            'meta[name="description"]'
          );
          if (!descriptionTag) {
            descriptionTag = document.createElement("meta");
            descriptionTag.name = "description";
            document.head.appendChild(descriptionTag);
          }
          descriptionTag.content = data.meta_description;
        }

        if (data.meta_keywords) {
          let keywordsTag = document.querySelector('meta[name="keywords"]');
          if (!keywordsTag) {
            keywordsTag = document.createElement("meta");
            keywordsTag.name = "keywords";
            document.head.appendChild(keywordsTag);
          }
          keywordsTag.content = data.meta_keywords;
        }

        // ✅ Update favicon if you want
        // ✅ Update favicon using the specific dynamic-favicon id
        // If SEO API provides an image, use it; else use default site favicon
const faviconUrl = seoData?.meta_image
  ? `https://react-live.sourceindia-electronics.com/v1/${seoData.meta_image}`
  : "https://react-live.sourceindia-electronics.com/v1/upload/siteSettings/1770806842183.jpg";

let favicon = document.getElementById("dynamic-favicon");
if (!favicon) {
  favicon = document.createElement("link");
  favicon.id = "dynamic-favicon";
  favicon.rel = "icon";
  favicon.type = "image/png";
  document.head.appendChild(favicon);
}
favicon.href = faviconUrl;
      })
      .catch((err) => console.error("SEO API Error:", err));
  }, []);

  return null; // No UI needed, purely for SEO/meta update
}

export default DynamicMeta;