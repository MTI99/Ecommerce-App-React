import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let CartContext = createContext();

export function CartContextProvider(props) {
    const [cartCount, setCartCount] = useState(null)
    const [cartID, setcartID] = useState(null)
    
const [ isLoading , setIsLoading ] = useState(null)


let headers = {
token: localStorage.getItem("userToken"),
};

    async function getLoggedUserCart() {
        return await axios
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

    function checkOut(cartId , url , formVlaues ) {
        return axios
        .post(` https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url} `, {
            shippingAddress:formVlaues ,
        },
        {
            headers
        }
        )
        .then((response) => response)
        .catch((error) => error);
    }

    async function getCartData() { 
        let res = await getLoggedUserCart()
        setCartCount(res?.data.numOfCartItems)
        setcartID(res?.data.cartId)
    }



    useEffect(() => {
    headers.token !==null &&  getCartData()
    }, [])


    return (
        <CartContext.Provider value={{ getLoggedUserCart , addProductToCart , updateProductCount , deleteProductCart , clearCart , checkOut , cartCount , setCartCount , getCartData ,headers , cartID }}>
        {props.children}
        </CartContext.Provider>
    );
} 
