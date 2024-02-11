import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks";

import "./HomePage.css";

function HomePage() {

  const { getUser } = useAuth();

  // tracks the position or index of the photo in the slide
  const [photoInt, setPhotoInt] = useState(0); 
  const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(false);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false);
  // maximum index for photos (7 photos in total)
  const maxPhotoInt = 6; 
  //reference to the DOM element containing the photos
  const photoHolder = useRef();
  const imageOffset = useRef(10); 

  const handleNextPhoto = () => {
    if (photoInt >= maxPhotoInt) return; 
    setIsNextBtnDisabled(true); 
    setPhotoInt(state => state + 1);  
    photoHolder.current.style.right = `calc(100% * ${photoInt + 1} + ${(photoInt+1)*imageOffset.current}px)`; 
    setTimeout(() => { setIsNextBtnDisabled(false) }, 500); 
  };
  
  const handlePrevPhoto = () => { 
    if (photoInt <= 0) return; 
    setIsPrevBtnDisabled(true);  
    setPhotoInt(state => state - 1); 
    photoHolder.current.style.right = `calc(100% * ${photoInt - 1} + ${(photoInt-1)*imageOffset.current}px)`; 
    setTimeout(() => { setIsPrevBtnDisabled(false) }, 500); 
  };

  useEffect(() => {
    const updateImageOffset = () => {
      if(window.innerWidth < 650) imageOffset.current = 0;
      else imageOffset.current = 10;
    };

    window.addEventListener("resize", updateImageOffset);
    getUser();
    return () => {
      window.removeEventListener("resize", updateImageOffset);
    };
  }, []);

  return (
    <div className="homepage">
      <h1>Hotel Del Luna</h1>
      <div className="homepage__gallery">
        <button
          className="next"
          onClick={handleNextPhoto}
          type="button"
          disabled={isNextBtnDisabled || photoInt >= maxPhotoInt}
        >
          <i className="bx bxs-chevron-right" />
        </button>
        <button
          className="prev"
          onClick={handlePrevPhoto}
          type="button"
          disabled={isPrevBtnDisabled || photoInt <= 0}
        >
          <i className="bx bxs-chevron-left" />
        </button>
        <div className="homepage__image-holder" ref={photoHolder}>
          <img src="images/HomePage/gallery-1.jpg" alt="Hotel image" />
          <img src="images/HomePage/gallery-2.jpg" alt="Hotel image" />
          <img src="images/HomePage/gallery-3.jpg" alt="Hotel image" />
          <img src="images/HomePage/gallery-4.jpg" alt="Hotel image" />
          <img src="images/HomePage/gallery-5.jpg" alt="Hotel image" />
          <img src="images/HomePage/gallery-6.jpg" alt="Hotel image" />
          <img src="images/HomePage/gallery-7.jpg" alt="Hotel image" />
          <img src="images/HomePage/gallery-8.jpg" alt="Hotel image" />
          <img src="images/HomePage/gallery-9.jpg" alt="Hotel image" />
          <img src="images/HomePage/gallery-10.jpg" alt="Hotel image" />
          <img src="images/HomePage/gallery-11.jpg" alt="Hotel image" />
          <img src="images/HomePage/gallery-12.jpg" alt="Hotel image" />
          <img src="images/HomePage/gallery-13.jpg" alt="Hotel image" />
          <img src="images/HomePage/gallery-14.jpg" alt="Hotel image" />
        </div>
      </div>

      <div className="homepage__heading">
        <p>
          Seeking a cozy retreat or a luxurious escape?
          Let us find your ideal haven, setting the stage 
          for unforgettable memories. Begin your journey now 
          – adventure awaits at your fingertips.
        </p>
        <Link className="homepage__btn" to="/rooms">
          Search Rooms
        </Link>
      </div>

      <section className="homepage__attractions">
        <h2>Nearby Attractions</h2>
        <div className="homepage__attraction-wrapper">
          <div className="attraction box-shadow">
            <img src="images/HomePage/attractions-1.jpg" alt="Attraction 1" />
            <div>Royal Palace</div>
          </div>
          <div className="attraction box-shadow">
            <img src="images/HomePage/attractions-2.jpg" alt="Attraction 2" />
            <div>Chanrey Tree</div>
          </div>
          <div className="attraction box-shadow">
            <img src="images/HomePage/attractions-3.jpg" alt="Attraction 3" />
            <div>Koh Tonsay</div>
          </div>
        </div>
      </section>

      <section className="homepage__about-us">
        <div className="homepage__grid">
          <div className="homepage__paragraph">
            <h3>Elegance of Past and Present</h3>
            <p>Incorporating ancient Eastern aesthetics with modern grandeur,
              Hotel Del Luna"s facade is a majestic architectural wonder. Creating
              a unique blend of traditional ethnic elements and contemporary design
              into a beautifully crafted building is a testament to its long history,
              which is reflected within its walls. A pleasant ethereal atmosphere
              welcomes guests as they enter the hotel, complete with ornate chandeliers,
              intricate artwork, and a nostalgic ambiance that is sure to evoke memories.
            </p>
          </div>
          <div className="homepage__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.6817626158345!2d104.86458007491994!3d11.574656188626848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095143e840bff3%3A0xae074d814c758c11!2shotel%20del%20luna!5e0!3m2!1sen!2sus!4v1690593395480!5m2!1sen!2sus"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;