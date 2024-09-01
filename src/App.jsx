import { useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import About from "./components/About/About";
import Regester from "./components/Regester/Regester";
import Login from "./components/Login/Login";
import LayOut from "./components/LayOut/LayOut";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";
import { UserContextProvider } from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CartContextProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./components/Checkout/Checkout";
import Orders from "./components/Orders/Orders";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import { WishlistProvider } from "./Context/WishListContext";
import WishList from "./components/WishList/WishList";
import ForgetPass from "./components/ForgetPass/ForgetPass";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import ResetPass from "./components/ResetPass/ResetPass";
// import BrandDetails from "./components/BrandDetails/BrandDetails";
const queryClient = new QueryClient();

let router = createHashRouter([
  {
    path: "",
    element: <LayOut />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:category/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgetpass",
        element: <ForgetPass />,
      },
      {
        path: "verifycode",
        element: <VerifyCode />,
      },
      {
        path: "resetpass",
        element: <ResetPass />,
      },
      { path: "regester", element: <Regester /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <CartContextProvider>
          <WishlistProvider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
            <ReactQueryDevtools />
          </WishlistProvider>
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
