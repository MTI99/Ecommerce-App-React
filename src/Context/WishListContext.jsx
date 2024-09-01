import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  let { userToken } = useContext(UserContext);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function getLoggedWishList() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers,
    });
  }

  function addToWishlist(product) {
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        productId: product.id,
      },
      {
        headers,
      }
    );
  }

  function removeFromWishlist(productId) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers,
      }
    );
  }

  useEffect(() => {
    userToken && getLoggedWishList();
  }, [userToken]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        setWishlist,
        getLoggedWishList,
        headers,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
