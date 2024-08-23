import React, { useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";
export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 8,
    slidesToScroll: 2,
    autoplay: true,
  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    setIsLoading(true);

    getCategories();
  }, []);

  return (
    <>
      <h2 className=" text-3xl pb-2 font-bold border-b-2 border-blue-500 w-fit">
        Shop Popular Categoreis
      </h2>
      {isLoading ? (
        <div class="loader-container">
          <div class="loader"></div>
        </div>
      ) : null}
      <Slider {...settings}>
        {categories.map((category) => (
          <div className="my-5 ">
            <img
              className="w-full cat-img"
              src={category.image}
              alt={category.name}
            />
            <h5>{category.name}</h5>
          </div>
        ))}
      </Slider>
    </>
  );
}
