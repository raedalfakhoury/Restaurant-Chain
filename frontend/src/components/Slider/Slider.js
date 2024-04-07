/* eslint-disable no-unused-vars */
import React from "react";
import { useSpring, animated } from "react-spring";
import Slider from "react-slick";
 import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../Slider/Slider.css'

const Sliders = () => {
  const [slideIndex, setSlideIndex] = React.useState(0);

  const fade = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    onRest: () => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
    },
  });

  const images = [
    "https://images.pexels.com/photos/698308/pexels-photo-698308.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS5ByyJOY1qocxFcmP9HB-VNWqkwCCEIsLwvbdoQaORbTWY8qFi",
    
  
  ];

  const settings = {
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    beforeChange: (current, next) => setSlideIndex(next),
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <animated.div key={index} style={{ ...fade }}>
          <img src={image} alt={`slide-${index}`} />
        </animated.div>
      ))}
    </Slider>
  );
};

export default Sliders;
