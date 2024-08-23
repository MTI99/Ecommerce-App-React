import React, { useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
export default function RecentProducts() {
  const [recentProducts, setRecentProducts] = useState([]);

  function getRecentPro() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setRecentProducts(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getRecentPro();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          {recentProducts.map((product) => (
            <Link
              to={`/productdetails/${product.category.name}/${product.id}`}
              className="inner w-1/6 px-2 mb-4 "
              key={product._id}
            >
              <div className={`${style.productCard} `}>
                <div className={style.logoCart}>
                  <i className="bx bx-shopping-bag" />
                </div>
                <div className={style.mainImages}>
                  <img src={product.imageCover} alt="Product Image" />
                </div>
                <div className={`${style.shoeDetails} mt-3 px-3`}>
                  <span className={style.shoeName}>
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </span>
                  <p className="text-gray-200">{product.category.name}</p>
                  <div className="text-yellow-400 flex justify-end">
                    <span className="text-black me-1">
                      {product.ratingsAverage}
                    </span>
                    <i className="fa-solid fa-star flex self-center"></i>
                  </div>
                </div>
                <div className={style.price}>
                  <span className={style.priceNum}>{product.price}$</span>
                </div>
                <div className={style.button}>
                  <div className={style.buttonLayer} />
                  <button>Add To Cart</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
