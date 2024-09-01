import { data } from "autoprefixer";
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";


export default function Regester() {

  let { userLogIn , setUserLogIn } = useContext(UserContext)

  let navigate = useNavigate();
  const [ apiError, setApiError ] = useState('')
  async function handlRegister(formVlaues) {


    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      formVlaues
    )
    .then( (apiResponse)=> { 
      setApiError(null)
      localStorage.setItem('userToken', apiResponse.data.token)
      setUserLogIn(apiResponse.data.token)
      navigate("/");

    } )
    .catch( (apiResponse)=> { 
      setApiError(apiResponse.response.data.message)
    } )
  }

  // function inputsValidate(values) {
  //   let errors = {};

  //   if (!values.name) {
  //     errors.name = "Name is Required";
  //   } else if (!/^[A-Z][a-z]{3,10}$/.test(values.name))
  //     errors.name =
  //       "Name Must Start With Uppercase Letter and Maximum 10 Character Without Spaces";

  //   if (!values.email) {
  //     errors.email = "Email is Required";
  //   } else if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(values.email)) {
  //     errors.email = "Email is Invalid";
  //   }

  //   if (!values.password) {
  //     errors.password = "Password is Required";
  //   } else if (
  //     !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
  //       values.password
  //     )
  //   ) {
  //     errors.password =
  //       "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character";
  //   }
  //   if (!values.rePassword) {
  //     errors.rePassword = "Password Confirmation is Required";
  //   } else if (values.password !== values.rePassword) {
  //     errors.rePassword = "Password Confirmation does not match Password";
  //   }

  //   if (!values.phone) {
  //     errors.phone = "Phone Number is Required";
  //   } else if (!/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/.test(values.phone)) {
  //     errors.phone = "Phone Number is Invalid it Must Be An Egyption Number";
  //   }

  //   return errors;
  // }

  let validationSchema = Yup.object().shape({
    name: Yup.string().min(3,'Name Must Be at Least 3 Character').max(12,'Name Must Be Maximum 12 Character').required('Name is Required'),
    email: Yup.string().email('Email is Not Valid').required('Email is Required'),
    password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character').required('Password is Required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')] , 'Password Confirmation does not match Password' ).required('Password Confirmation is Required'),
    phone:Yup.string().matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/,'Phone Number is Invalid it Must Be An Egyption Number').required('Phone is Required')
  })


  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handlRegister,
  });

  useEffect(() => {});

  return (
    <div className="h-lvh">
      <h2 className="mx-auto text-3xl text-center my-10 font-bold border-b-2 pb-2 border-blue-500 w-fit">
        Register
      </h2>

      <form className="max-w-md mx-auto my-10" onSubmit={formik.handleSubmit}>
      {apiError?<div
              className="flex items-center p-4 mb-8 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div>{apiError}</div>
            </div>:null}

        {/* Name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            name="name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        <div>
          {formik.errors.name && formik.touched.name ? (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div>{formik.errors.name}</div>
            </div>
          ) : null}
        </div>

        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div>{formik.errors.email}</div>
            </div>
          ) : null}
        </div>

        {/* Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div>{formik.errors.password}</div>
            </div>
          ) : null}
        </div>

        {/* RePassword */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            type="password"
            name="rePassword"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
        </div>
        <div>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div>{formik.errors.rePassword}</div>
            </div>
          ) : null}
        </div>

        {/* Phone */}
        <div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              type="tel"
              // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number
            </label>
          </div>
        </div>
        <div>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div>{formik.errors.phone}</div>
            </div>
          ) : null}
        </div>
        

        <button
          type="submit"
          disabled={
            !(formik.isValid && Object.keys(formik.touched).length > 0) ||
            formik.isSubmitting
          }
          className={`text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center block mx-auto
  ${
    !(formik.isValid && Object.keys(formik.touched).length > 0) ||
    formik.isSubmitting
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  }`}
        >
          Submit
        </button>
        <p className="py-5 text-center ">Already Have Account ? <span className="font-semibold"><Link to={'/login'}>LogIn</Link> </span></p>
      </form>
    </div>
  );
}
