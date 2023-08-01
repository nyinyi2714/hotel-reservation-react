import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";


export default function HomePage() {

  return (
    <div className="homepage__container">

      <div id="sunsetImage">
        <div className="text_content">
          <h1><span className="head_text">Hotel Del Luna</span> by Emerald</h1>
          <p className="para">Find Deals for any season</p>
          <p className="para">From cozy bed & breakfast to luxury hotels</p>
          <Link className="main_button" to="/rooms">
            Search Rooms
          </Link>
        </div>
      </div>

      <section>
        <h2>Hotel Gallery</h2>
      </section>
      <section className="gallery-container">
        <div className="slider-gallery">
          <div className="sli">
            <img src="images/gallery-1.jpg" alt="Hotel image" />
            <img src="images/gallery-2.jpg" alt="Hotel image" />
            <img src="images/gallery-3.jpg" alt="Hotel image" />
            <img src="images/gallery-4.jpg" alt="Hotel image" />
            <img src="images/gallery-5.jpg" alt="Hotel image" />
            <img src="images/gallery-6.jpg" alt="Hotel image" />
            <img src="images/gallery-7.jpg" alt="Hotel image" />
            <img src="images/gallery-8.jpg" alt="Hotel image" />
            <img src="images/gallery-9.jpg" alt="Hotel image" />
            <img src="images/gallery-10.jpg" alt="Hotel image" />
            <img src="images/gallery-11.jpg" alt="Hotel image" />
            <img src="images/gallery-12.jpg" alt="Hotel image" />
            <img src="images/gallery-13.jpg" alt="Hotel image" />
            <img src="images/gallery-14.jpg" alt="Hotel image" />
            <img src="images/gallery-15.jpg" alt="Hotel image" />
          </div>
        </div>

      </section>
      <div id="container">
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.6817626158345!2d104.86458007491994!3d11.574656188626848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095143e840bff3%3A0xae074d814c758c11!2shotel%20del%20luna!5e0!3m2!1sen!2sus!4v1690593395480!5m2!1sen!2sus"></iframe>
        </div>
      </div>

      <h2>Nearby Attractions</h2>
      <div className="glass">
        <div className="attraction">
          <img src="images/attractions-1.jpg" alt="Attraction pictures" />
          <div className="space">Royal Palace</div>
        </div>
        <div className="attraction">
          <img src="images/attractions-2.webp" alt="Attraction pictures" />
          <div className="space">Chanrey Tree</div>
        </div>
        <div className="attraction">
          <img src="images/attractions-3.jpg" alt="Attraction pictures" />
          <div className="space">Koh Tonsay</div>
        </div>
      </div>

      <div className="main_word">
        <h2>About Us</h2>
      </div>
      <div className="con">
        <section className="aboutpage">
          <div className="ourimage">
            <img src="images/about-us.webp" />
          </div>
          <div className="paragraph">
            <h2>Our Information</h2>
            <p className="styl">Incorporating ancient Eastern aesthetics with modern grandeur,
              Hotel Del Luna's facade is a majestic architectural wonder. Creating
              a unique blend of traditional ethnic elements and contemporary design
              into a beautifully crafted building is a testament to its long history,
              which is reflected within its walls. A pleasant ethereal atmosphere
              welcomes guests as they enter the hotel, complete with ornate chandeliers,
              intricate artwork, and a nostalgic ambiance that is sure to evoke memories.</p>
            <a href="" className="read">Read More</a>
          </div>
        </section>
      </div>
    </div>
  );
}