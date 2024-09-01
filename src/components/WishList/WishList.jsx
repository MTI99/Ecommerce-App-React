import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../Context/WishListContext";
import { useQuery } from "@tanstack/react-query";
import style from "./WishList.module.css";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";

export default function Wishlist() {
  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    getLoggedWishList,
    setWishlist,
  } = useContext(WishlistContext);
  let { userToken } = useContext(UserContext);
  const { addProductToCart, setCartCount } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  async function getWishlist() {
    let res = await getLoggedWishList();
    setWishlist(res.data.data);
    setIsLoading(false);
  }

  async function addProductBridge(productId) {
    let finalRes = await addProductToCart(productId);
    if (finalRes.data.status === "success") {
      setCartCount(finalRes.data.numOfCartItems);
      toast.success(finalRes.data.message, {
        duration: 1000,
        position: "top-right",
      });
    } else {
      toast.error(finalRes.data.message);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    userToken && getWishlist();
    console.log(wishlist);
  }, [userToken]);

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : null}
      <div className="container">
        <h2 className="mx-auto text-3xl text-center my-10 font-bold border-b-2 pb-2 border-blue-500 w-fit">
          Your Wishlist
          <i className="fa-solid fa-heart self-center ps-3 text-red-500"></i>
        </h2>
        <div className="row mt-10">
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-screen container">
              <div className="rounded-lg flex flex-col items-center w-full h-full">
                <div className="img-cover-wish h-3/4 w-full"></div>
                <p className="text-3xl font-semibold text-gray-800 mb-2">
                  Oops! Your WishList is empty!
                </p>
                <p className="text-gray-600 mb-4">
                  Looks like you haven't added anything to your cart yet
                </p>
                <Link to={"/"}>
                  <div className={` ${style.button} w-full px-8 `}>
                    <div className={style.buttonLayer} />
                    <button>Shop Now</button>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            wishlist?.map((product) => (
              <div className="inner w-1/6 px-2 mb-4" key={product._id}>
                <div className={`${style.productCard}`}>
                  <Link
                    to={`/productdetails/${product?.category?.name}/${product.id}`}
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
                      <span className={style.priceNum}>
                        {product.price} EGP
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className=" px-2 py-3 m-auto flex justify-between"
                  >
                    <i className="fa-solid fa-heart self-center pe-2 text-red-500"></i>
                    <span className="text-sm">Remove From Wishlist</span>
                  </button>

                  <div className={style.button}>
                    <div className={style.buttonLayer} />
                    <button onClick={() => addProductBridge(product._id)}>
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
