import React, { useState } from "react";
import Lottie from "react-lottie-player";
import animatedBook from "../assets/animated-book.json";
import { Link } from "react-router-dom";
const clearToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    localStorage.removeItem("token"); // Use 'token' as the key to remove the item from localStorage
  }
};

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div>
              <Link to="/home">
                <a className="block md:flex md:items-center md:gap-6 text-purple-600">
                  <Lottie
                    loop
                    animationData={animatedBook}
                    play
                    style={{ width: 120, height: 120 }}
                  />
                  <span className="text-purple-500 md:block hidden font-bold text-xl">
                    Book Exchange
                  </span>
                </a>
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <Link to={"/books"}>
                    <li>
                      <a
                        className="text-gray-600 transition hover:text-gray-500/75"
                      
                      >
                        All Books
                      </a>
                    </li>
                  </Link>
                  <Link to={"/me/books"}>
                  <li>
                    <a
                      className="text-gray-600 transition hover:text-gray-500/75"
                    
                      >
                      Your Books
                    </a>
                  </li>
                      </Link>
                      <Link to={'/me/preference'}>
                  <li>
                    <a
                      className="text-gray-600 transition hover:text-gray-500/75"
                     
                      >
                      Preferences
                    </a>
                  </li>
                      </Link>
                      <Link to={'/requests'}>
                  <li>
                    <a
                      className="text-gray-600 transition hover:text-gray-500/75"
                   
                      >
                      Exchange Requests
                    </a>
                  </li>
                      </Link>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link to={"/me/addBook"}>
                <a
                  className="rounded-md bg-purple-600 hover:bg-purple-700 hover:text-gray-200 px-5 py-2.5 text-sm font-medium text-white shadow"
                  
                  >
                  Add Book
                </a>

                  </Link>

                <div className="hidden sm:flex">
                  <Link to={"/login"}>
                  <a
                    className="rounded-md bg-gray-100 hover:bg-gray-200 hover:text-purple-700 px-5 py-2.5 text-sm font-medium text-purple-600"
                    onClick={clearToken}
                   
                    >
                    Logout
                  </a>
                    </Link>
                </div>
              </div>

              <div className="block md:hidden">
                <button
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                  onClick={toggleSidebar}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed inset-0  z-[99999] bg-gray-900 bg-opacity-75 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
        onClick={toggleSidebar}
      >
        <div className="w-64 h-full bg-white p-4">
          <button
            className="absolute top-3 right-2 bg-transparent text-gray-600"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-10 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <nav aria-label="Sidebar" className="font-bold">
            <ul className="flex flex-col  gap-4">
                <Link to={"/books"}>
              <li>
                <a
                  className="text-gray-600 transition hover:text-gray-500 text-lg font-bold"
               
                  >
                  All Books
                </a>
              </li>
                  </Link>
                  <Link to={"/me/books"}>
              <li>
                <a
                  className="text-gray-600 transition hover:text-gray-500 text-lg font-bold"
                 
                  >
                  Your Books
                </a>
              </li>
                  </Link>
                  <Link to={"/me/preference"}>
              <li>
                <a
                  className="text-gray-600 transition hover:text-gray-500 text-lg font-bold"
               
                  >
                  Preferences
                </a>
              </li>
                  </Link>
                  <Link to={"/requests"}>
              <li>
                <a
                  className="text-gray-600 transition hover:text-gray-500 text-lg font-bold"
            
                  >
                  Exchange Requests
                </a>
              </li>
                  </Link>
                  <Link to={"/login"}>
              <li>
                <a
                  className="text-purple-600 transition font-bold hover:text-purple-500 bg-gray-200 px-3 py-2 rounded-lg"
                  onClick={clearToken}
              
                  >
                  Logout
                </a>
              </li>
                  </Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
