import React, { useEffect, useState } from 'react'
import style from './NotFound.module.css'
export default function NotFound() {

    const [counter, setCounter] = useState(0)
    
  return <>
      

      <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl md:text-4xl font-medium text-gray-600 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mt-2 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Go to Homepage
        </a>
      </div>
    </div>
    </>
  
}
