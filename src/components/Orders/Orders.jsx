import React, { useContext, useEffect, useState } from "react";
import style from "./Orders.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function Orders() {


//   Function to handle when a product card is clicked
//   const handleCardClick = (product) => {
//     setSelectedProduct(product);
//   };

//   Function to handle closing the modal
//   const handleCloseModal = () => {
//     setSelectedProduct(null);
//   };
//   let { cartID } = useContext(CartContext);


//   function getAllOrders() {
//     return axios.get(`https://ecommerce.routemisr.com/api/v1/orders`);
//   }

//   let { data, isError, error, isLoading } = useQuery({
//     queryKey: ["orders"],
//     queryFn: getAllOrders,
//     select: (data) => data.data.data,
//   });
// console.log(data);

//   if (isLoading) {
//     return (
//       <>
//         <div className="loader-container">
//           <div className="loader"></div>
//         </div>
//       </>
//     );
//   }
//   if (isError) {
//     return (
//       <>
//         <div className="w-full h-full bg-gray-400 text-center">
//           <p>{error.message}</p>
//         </div>
//       </>
//     );
//   }

  return (
    <>





    AllOrders
 {/* <div className="container">
      <div className="row mt-10">
        {data?.map((product) => (
          <div className="inner w-1/6 px-2 mb-4 cursor-pointer" key={product._id}>
            <div className={`${style.productCard}`}>
              <div onClick={() => handleCardClick(product)}>
                <div className={style.logoCart}>
                  <i className="bx bx-shopping-bag" />
                </div>
                <div className={style.mainImages}>
                  <img src={product?.cartItems?.product?.imageCover} alt="Product Image" />
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


    </div> */}
    </>
  );
}
