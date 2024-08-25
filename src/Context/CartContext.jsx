import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
let headers = {
token: localStorage.getItem("userToken"),
};
    function getLoggedUserCart() {
        return axios
        .get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers,
        })
        .then((response) => response)
        .catch((error) => error);
    }

    function addProductToCart(productId) {
        return axios
        .post("https://ecommerce.routemisr.com/api/v1/cart", {
            productId,
        },
        {
            headers
        }
        )
        .then((response) => response)
        .catch((error) => error);
    }



    function updateProductCount(productId , count) {
        return axios
        .put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count,
        },
        {
            headers
        }
        )
        .then((response) => response)
        .catch((error) => error);
    }


    function deleteProductCart(productId) {
        return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers
        }
        )
        .then((response) => response)
        .catch((error) => error);
    }
    function clearCart() {
        return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers
        }
        )
        .then((response) => response)
        .catch((error) => error);
    }








    return (
        <CartContext.Provider value={{ getLoggedUserCart , addProductToCart , updateProductCount , deleteProductCart , clearCart }}>
        {props.children}
        </CartContext.Provider>
    );
}
