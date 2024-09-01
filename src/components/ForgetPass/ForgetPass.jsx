import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {
  const [apiError, setApiError] = useState("");
  let navigate = useNavigate();
  async function handlePasswordResetRequest(values, { setSubmitting }) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email:values.email,
      })
      .then((response) => {
        if (response.data.statusMsg === "success") {
          setApiError(null);
          toast.success("Verification code sent to your email!");
          navigate("/verifycode");
        } else {
          setApiError("Failed to send verification code");
        }
      })
      .catch((error) => {
        console.log(error);
        setApiError(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  const formik = useFormik({
    initialValues: {
      email:"",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
    }), 
    onSubmit: handlePasswordResetRequest,
  });

  return (
    <div className="h-lvh">
      <h2 className="mx-auto text-3xl text-center my-10 font-bold border-b-2 pb-2 border-blue-500 w-fit">
        Forget Password
      </h2>

      <form className="max-w-md mx-auto my-10" onSubmit={formik.handleSubmit}>
        {apiError ? (
          <div
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
            <div>{apiError?.response?.data.message}</div>
          </div>
        ) : null}

        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
          {formik.isSubmitting ? "Sending..." : "Send Verification Code"}
        </button>
      </form>
    </div>
  );
}
