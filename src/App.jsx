import { useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import About from "./components/About/About";
import Regester from "./components/Regester/Regester";
import Login from "./components/Login/Login";
import LayOut from "./components/LayOut/LayOut";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";
import { UserContextProvider } from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";



let router =  createHashRouter([
  {path:'' , element: <LayOut/> , children:[
    {index:true , element: <ProtectedRoute><Home/></ProtectedRoute>  },
    {path:'home', element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path:'about' , element:<ProtectedRoute><About/></ProtectedRoute> },
    {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute> },
    {path:'productdetails/:category/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute> },
    {path:'regester' , element: <Regester/>},
    {path:'login' , element: <Login/>},
    {path:'*' , element: <NotFound/>},
  ] }
  




])

function App() {
  
  return <UserContextProvider>
    <RouterProvider router={router} ></RouterProvider>
  </UserContextProvider>
}

export default App;
