import React, { useContext, useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Pagenation from "../Pagenation/Pagenation";
import { WishlistContext } from "../../Context/WishListContext";

export default function RecentProducts() {
  const [currentPage, setCurrentPage] = useState(1);

  function getRecentProduct(pageNum) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`
    );
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["recentProducts", currentPage],
    queryFn: () => getRecentProduct(currentPage),
    select: (data) => data.data.data,
  });


  let { addProductToCart, setCartCount } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist , getWishData } =
    useContext(WishlistContext);




    
  const [isInWishlist, setIsInWishlist] = useState({}); 
  useEffect(() => {
    const updatedIsInWishlist = {};
    wishlist?.forEach((product) => {
      updatedIsInWishlist[product._id] = true;
    });
    setIsInWishlist(updatedIsInWishlist);
  }, [wishlist, data]);




  async function addProductBridge(productId) {
    let finalRes = await addProductToCart(productId);
    console.log(finalRes);
    if (finalRes?.data.status === "success") {
      setCartCount(finalRes?.data.numOfCartItems);
      toast.success(finalRes?.data.message, {
        duration: 1000,
        position: "top-right",
      });
    } else {
      toast.error(finalRes.data.message);
    }
  }

  function handlePageChange({ selected }) {
    setCurrentPage(selected + 1);
  }

  function handleWishlistToggle(product) {
    if (isInWishlist[product._id]) {
      removeFromWishlist(product._id);
      setIsInWishlist((prevState) => ({
        ...prevState,
        [product._id]: false,
      }));
    } else {
      addToWishlist(product);
      setIsInWishlist((prevState) => ({
        ...prevState,
        [product._id]: true,
      }));
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
                <button
                  onClick={() => handleWishlistToggle(product)}
                  className=" px-2 py-5 m-auto flex justify-between"
                >
                  <i
                    className="fa-solid fa-heart self-center pe-2"
                    style={{
                      color: isInWishlist[product._id] ? "red" : "black",
                    }}
                  ></i>
                  <span className="text-sm">
                    {isInWishlist[product._id] ? "Remove From Wishlist" : "Add to Wishlist"}
                  </span>
                </button>
                
                <div className={style.button}>
                  <div className={style.buttonLayer} />
                  <button onClick={() => addProductBridge(product._id)}>
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}

          <Pagenation handlePageChange={handlePageChange} pageCount={2} />
        </div>
      </div>
    </>
  );
}
