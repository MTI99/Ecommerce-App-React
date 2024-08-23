import React, { useEffect, useState } from "react";
import style from "./MainSlider.module.css";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows:false,
  };

  return <>
  <div className="flex flex-wrap align-middle mb-10">
  <div className="w-3/4">
  <Slider {...settings}>
  <img className='w-full h-[400px]' src={slider2} alt='sliderImage1' />
  <img className='w-full h-[400px]' src={slider1} alt='sliderImage1' />
  <img className='w-full h-[400px]' src={slider3} alt='sliderImage1' />

  </Slider>
  </div>
  <div className="w-1/4">
  <img className='w-full h-[200px]' src={slider2} alt='sliderImage2' />
  <img className='w-full h-[200px]' src={slider3} alt='sliderImage3' />
  </div>
  </div>

  
  
  
  
  
  
  
  </>;
}
