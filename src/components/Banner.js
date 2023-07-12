import React from "react";
import "../styles/Home.css"; // Import the CSS file for the Banner component

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-text">
        <p className="banner-text-small">
          THE BEST DEALS ON THE WORLD'S BEST DESTINATIONS
        </p>
        <h1 className="banner-text-large">
          Best travel and <br />
          destinations
        </h1>
      </div>
      <div className="banner-image">
        <img src="/Traveller.png" alt="Banner" />
      </div>
    </div>
  );
};

export default Banner;
