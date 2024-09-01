import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import style from "./Cart.module.css";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateProductCount,
    deleteProductCart,
    clearCart,
    setCartCount,
    cartCount,
    getCartData
  } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getCartBridge() {
    let res = await getLoggedUserCart();
    setCartDetails(res?.data.data);
    setCartCount(res?.data.numOfCartItems)
    setIsLoading(false);
  }

  async function updateCountBridge(productId, count) {
    setIsLoading(true); // Show loader while updating
    let res = await updateProductCount(productId, count);
    setCartDetails(res?.data.data);
    setIsLoading(false);
  }

  async function deleteProductBridge(productId) {
    setIsLoading(true); // Show loader while deleting
    let res = await deleteProductCart(productId);
    setCartDetails(res?.data.data);
    setCartCount(res?.data.numOfCartItems);
    setIsLoading(false);
  }

  async function clearCartBridge() {
    setIsLoading(true); // Show loader while clearing cart
    let res = await clearCart();
    setCartDetails(res?.data.data);
    setCartCount(res?.data.numOfCartItems);
    setIsLoading(false);
  }

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
        getCartData();
        getCartBridge();

    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : null}

      <h2 className="mx-auto text-3xl text-center my-10 font-bold border-b-2 pb-2 border-blue-500 w-fit">
        Cart Items
      </h2>

      {!cartCount ? (
        <div className="flex flex-col items-center justify-center h-screen container">
          <div className="rounded-lg flex flex-col items-center w-full h-full">
            <div className="img-cover h-3/4 w-full"></div>
            <p className="text-3xl font-semibold text-gray-800 mb-2">
              Oops! Your cart is empty!
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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg container">
          <div className="flex justify-between">
            <span className="font-semibold text-2xl block my-3 ms-5">
              Total Cart Price : {cartDetails?.totalCartPrice} EGP
            </span>
            <button
              onClick={() => clearCartBridge()}
              className="font-medium text-red-600 hover:underline me-5"
            >
              Clear Cart
            </button>
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {cartDetails?.products.map((product) => (
                <tr
                  key={product._id}
                  className="bg-white border-b  hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        disabled={product.count == 1}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                        type="button"
                        onClick={() =>
                          updateCountBridge(
                            product.product._id,
                            product.count - 1
                          )
                        }
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span> {product.count} </span>
                      </div>
                      <button
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                        type="button"
                        onClick={() =>
                          updateCountBridge(
                            product.product._id,
                            product.count + 1
                          )
                        }
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteProductBridge(product.product._id)}
                      className="font-medium text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="my-10 w-96 m-auto">
            <Link to={"/checkout"}>
              <div className={`${style.button}`}>
                <div className={style.buttonLayer} />
                <button>Checkout Now</button>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
