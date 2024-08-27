import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Brands() {

  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to handle when a product card is clicked
  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };



  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["brends"],
    queryFn: getBrands,
    select: (data) => data.data.data,
    // staleTime:2000,
    // refetchIntervalInBackground:false,
    // retry:6 , //Retry in error by defult 3 time
    // retryDelay: 5000,
    // refetchInterval:3000, // refetch every 3s
  });


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
          <p>{error.message}</p>
        </div>
      </>
    );
  }

  return (
    <>
 <div className="container">
      <div className="row mt-10">
        {data.map((product) => (
          <div className="inner w-1/6 px-2 mb-4 cursor-pointer" key={product._id}>
            <div className={`${style.productCard}`}>
              <div onClick={() => handleCardClick(product)}>
                <div className={style.logoCart}>
                  <i className="bx bx-shopping-bag" />
                </div>
                <div className={style.mainImages}>
                  <img src={product.image} alt="Product Image" />
                </div>
                <div className={`${style.shoeDetails} mt-3 px-3`}>
                  <span className={style.shoeName}>{product.name}</span>
                </div>
                <div className={style.price}></div>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className={style.modal} onClick={handleCloseModal}>
          <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedProduct.image} alt="Selected Product" className={style.modalImage} />
          </div>
        </div>
      )}
    </div>
    </>
  );
}
