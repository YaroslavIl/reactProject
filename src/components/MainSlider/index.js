
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./MainSlider.module.css";
import "./Slider.css";

const MainSlider = () => {
     const [currentSlide, setCurrentSlide] = useState(0);

     const settings = {
       dots: false,
       infinite: true,
       speed: 1000,
       slidesToShow: 1,
       slidesToScroll: 1,
       autoplay: false,
       autoplaySpeed: 4000,
       arrows: false,
       beforeChange: (current, next) => setCurrentSlide(next),
     };
    return (
      <div className="slider-wrapper">
        <Slider {...settings}>
          <div  className="slide slide1">
            {/* <h3>Slide 1</h3> */}
            {/* <img width="100%" height="100%" src="./img/1.jpg" alt="" /> */}
            <div className={styles.slider}>
              <img
                // style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src="./img/1.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="slide slide2">
            <h3>Slide 2</h3>
          </div>
          <div className="slide slide3">
            <h3>Slide 3</h3>
          </div>
        </Slider>
        {/* <div className="timer">{currentSlide + 1} / 3</div> */}
      </div>
    );
};

export default MainSlider;