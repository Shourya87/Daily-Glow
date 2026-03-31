import React from "react"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">

      {/* 📝 Text */}
      <h1 className="text-3xl font-semibold mt-4">
        Oops! Page not found 😔
      </h1>

      <p className="text-gray-500 mt-2">
        The page you’re looking for doesn’t exist.
      </p>

      {/* 🎯 Button */}
      <Link 
        to="/"
        className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 text-white shadow-md hover:scale-105 transition"
      >
        Go Back Home
      </Link>

    </div>
  )
}