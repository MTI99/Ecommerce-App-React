import React, { useContext, useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
export default function RecentProducts() {
  // const [recentProducts, setRecentProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(null);
  // function getRecentPro() {
  //   axios
  //     .get("https://ecommerce.routemisr.com/api/v1/products")
  //     .then(({ data }) => {
  //       setRecentProducts(data.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsLoading(false);
  //     });
  // }

  // useEffect(() => {
  //   setIsLoading(true);
  //   getRecentPro();
  // }, []);



  function getRecentProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecentProduct,
    select: (data) => data.data.data,
    // staleTime:2000,
    // refetchIntervalInBackground:false,
    // retry:6 , //Retry in error by defult 3 time
    // retryDelay: 5000,
    // refetchInterval:3000, // refetch every 3s
  });

  let { addProductToCart , cartCount , setCartCount} = useContext(CartContext);



  async function addProductBridge(productId) {
    let finalRes = await addProductToCart(productId);
    

    if (finalRes.data.status === "success") {
      setCartCount(finalRes.data.numOfCartItems)
      toast.success(finalRes.data.message , { 
        duration:1000,
        position:"top-right"
      } );
    } else {
      toast.error(finalRes.data.message);
    }
  }

  if (isLoading) {
    return (
      <>
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <div className="w-full h-full bg-gray-400 text-center">
          <p>{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row mt-10">
          {data.map((product) => (
            <div className="inner w-1/6 px-2 mb-4" key={product._id}>
              <div className={`${style.productCard}`}>
                <Link
                  to={`/productdetails/${product.category.name}/${product.id}`}
                >
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
                    <div className="flex justify-between">
                    <p className="text-gray-200">{product.category.name}</p>
                    <div className="text-yellow-400 flex justify-end">
                      <span className="text-black me-1">
                        {product.ratingsAverage}
                      </span>
                      <i className="fa-solid fa-star flex self-center"></i>
                    </div>
                    </div>

                  </div>
                  <div className={style.price}>
                    <span className={style.priceNum}>{product.price} EGP</span>
                  </div>
                </Link>
          <div className={style.button}>
            <div className={style.buttonLayer} />
            <button onClick={() => addProductBridge(product._id)}>
              Add To Cart
            </button>
          </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
