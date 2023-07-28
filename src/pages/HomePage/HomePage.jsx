import React from "react";
import "./HomePage.css";


export default function HomePage() {
    
    return (
    <div class="container">
       <div id="sunsetImage">
           <div class="text_content">
            <h1><span class="head_text">Hotel Del Luna</span> by Emerald</h1>
            <p class="para">Find Deals for any season</p>
            <p class="para">From cozy bed & breakfast to luxury hotels</p>
            <a class="main_button" href ="book.now">Book Now</a>
           </div> 
       </div>
        <section>
         <h2>Hotel Gallery</h2>
        </section>
        <section class="gallery-container">
          <div class="slider-gallery">
            <div class="sli">
                 <img src="images/gallery-1.jpg" alt="Hotel image"/>
                 <img src="images/gallery-2.jpg" alt="Hotel image"/>
                 <img src="images/gallery-3.jpg" alt="Hotel image"/>
                 <img src="images/gallery-4.jpg" alt="Hotel image"/>
                 <img src="images/gallery-5.jpg" alt="Hotel image"/>
                 <img src="images/gallery-6.jpg" alt="Hotel image"/>
                 <img src="images/gallery-7.jpg" alt="Hotel image"/>
                 <img src="images/gallery-8.jpg" alt="Hotel image"/>
                 <img src="images/gallery-9.jpg" alt="Hotel image"/>
                 <img src="images/gallery-10.jpg" alt="Hotel image"/>
                 <img src="images/gallery-11.jpg" alt="Hotel image"/>
                 <img src="images/gallery-12.jpg" alt="Hotel image"/>
                 <img src="images/gallery-13.jpg" alt="Hotel image"/>
                 <img src="images/gallery-14.jpg" alt="Hotel image"/>
                 <img src="images/gallery-15.jpg" alt="Hotel image"/>
            </div>
            <section>
              
            </section>
          </div>
        </section>
   </div>
    );
}