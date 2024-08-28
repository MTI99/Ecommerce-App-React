import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function getLoggedWishList() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function addToWishlist(product) {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  }

  function removeFromWishlist(productId) {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item._id !== productId)
    );
  }
  async function getWishData() {
    let res = await getLoggedWishList();
    setWishlist(res.data.data);
  }

  async function loadWishlistData() {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));

    let res = await getLoggedWishList();

    if (savedWishlist) {
      setWishlist(savedWishlist);
    }

    if (res.data && res.data.data) {
      setWishlist(res.data.data);
      localStorage.setItem("wishlist", JSON.stringify(res.data.data));
    }
  }

  useEffect(() => {
    loadWishlistData();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        setWishlist,
        getLoggedWishList,
        getWishData,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
