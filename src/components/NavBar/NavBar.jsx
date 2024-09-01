import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function NavBar() {
  let { userLogIn, setUserLogIn } = useContext(UserContext);
  let { cartCount } = useContext(CartContext);
  let navigate = useNavigate();
  function logOut() {
    setUserLogIn(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  return (
    <>
      <nav className="border-gray-200 bg-gray-900 relative">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="FreshCart Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              FreshCart
            </span>
          </a>
          {/* Navbar content */}
          <div
            className={`flex justify-between ${userLogIn ? "flex-grow" : ""}`}
          >
            {/* Middle Links */}
            {userLogIn ? (
              <div className="m-auto flex ">
                <ul className="hidden md:flex space-x-8 justify-center flex-grow">
                  <NavLink
                    to="/home"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/brands"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Brands
                  </NavLink>
                  <NavLink
                    to="/categories"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Categories
                  </NavLink>
                  <NavLink
                    to="/cart"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Cart
                  </NavLink>
                  <NavLink
                    to="/wishlist"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Wishlist
                  </NavLink>
                </ul>
              </div>
            ) : null}

            {/* Right Links */}
            <div className="flex items-center space-x-4">
              {userLogIn ? (
                <ul className="hidden md:flex space-x-8">
                  <Link to={"/cart"} className="relative inline-block">
                    {/* Icon */}
                    <i className="fas fa-shopping-cart text-3xl text-white"></i>
                    <div className="absolute top-[-8px] right-[-8px] rounded-full bg-blue-500 text-white text-xs font-bold p-1">
                      
                      {cartCount}
                    </div>
                  </Link>
                  <div
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer"
                    onClick={() => logOut()}
                  >
                    LogOut
                  </div>
                </ul>
              ) : (
                <ul className="hidden md:flex space-x-8">
                  <NavLink
                    to="/regester"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Login
                  </NavLink>
                </ul>
              )}
            </div>
          </div>

          {/* Dropdown for small screens */}
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
            onClick={() =>
              document.getElementById("mobile-menu").classList.toggle("hidden")
            }
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            id="mobile-menu"
            className="hidden z-50 absolute top-full left-0 w-full bg-gray-900 md:hidden"
          >
            <ul className="flex flex-col space-y-2 p-4">
              <NavLink
                to="/home"
                className="block py-2 px-3 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="block py-2 px-3 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
              >
                About
              </NavLink>
              <NavLink
                to="/cart"
                className="block py-2 px-3 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
              >
                Cart
              </NavLink>
              <NavLink
                to="/regester"
                className="block py-2 px-3 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
              >
                Regester
              </NavLink>
              <NavLink
                to="/login"
                className="block py-2 px-3 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
              >
                Login
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
