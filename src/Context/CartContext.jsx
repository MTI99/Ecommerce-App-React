    import axios from "axios";
    import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

    export let CartContext = createContext();

    export function CartContextProvider(props) {
    const [cartCount, setCartCount] = useState(null);
    const [cartID, setcartID] = useState(null);
    let { userToken , setUserToken } = useContext(UserContext)

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
        .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
            productId,
        },
        {
            headers,
        }
        )
        .then((response) => response)
        .catch((error) => error);
    }

    function updateProductCount(productId, count) {
    return axios
        .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            count,
        },
        {
            headers,
        }
        )
        .then((response) => response)
        .catch((error) => error);
    }

    function deleteProductCart(productId) {
    return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
        })
        .then((response) => response)
        .catch((error) => error);
    }
    function clearCart() {
    return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
        })
        .then((response) => response)
        .catch((error) => error);
    }

    function checkOut(cartId, url, formVlaues) {
    return axios
        .post(
        ` https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url} `,
        {
            shippingAddress: formVlaues,
        },
        {
            headers,
        }
        )
        .then((response) => response)
        .catch((error) => error);
    }

    async function getCartData() {
    let res = await getLoggedUserCart();
    setCartCount(res?.data?.numOfCartItems);
    setcartID(res?.data?.cartId);
    }

    useEffect(() => {
        userToken && getCartData();
    }, [userToken]);

    return (
    <CartContext.Provider
        value={{
        getLoggedUserCart,
        addProductToCart,
        updateProductCount,
        deleteProductCart,
        clearCart,
        checkOut,
        cartCount,
        setCartCount,
        getCartData,
        cartID,
        }}
    >
        {props.children}
    </CartContext.Provider>
    );
    }
