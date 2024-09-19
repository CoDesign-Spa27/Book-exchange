import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../store/loaderSlice";
import Loader from "../components/Loader";
import UserBookCard from "../components/UserBookCard";
import useCurrentUser from "../useCurrenUser";
import { FaRegUserCircle } from "react-icons/fa";
const UserBooks = () => {
  const navigate = useNavigate();
  const { user, userLoading } = useCurrentUser();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  });
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);

  const fetchBooks = async () => {
    dispatch(showLoader());
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(
        "https://book-exchange-1.onrender.com/api/me/books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (bookId) => {
    try {
      dispatch(showLoader());
      console.log(bookId);
      const response = await axios.delete(
        `https://book-exchange-1.onrender.com/api/me/book/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Book removed successfully");
        setBooks(books.filter((book) => book._id !== bookId)); // Update the state
      }
    } catch (error) {
      console.error(
        "Error deleting book:",
        error.response?.data?.message || error.message
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  const handleDelete = async (bookId) => {
    await deleteBook(bookId);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div class="mx-auto flex items-center justify-center">
        <div className="w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500  to-purple-800 p-1 my-5 flex justify-center">
          <div className="flex text-white bg-neutral-900 min-w-56 rounded-full justify-center py-2 gap-4 items-center ">
            {userLoading ? (
              <div class="relative flex w-64 animate-pulse gap-2 p-2">
                <div class="h-8 w-8 rounded-full bg-neutral-700"></div>
                <div class="flex-1">
                  <div class="mb-1 h-4 w-3/5 rounded-lg bg-neutral-700 text-md"></div>
                  <div class="h-3 w-[90%] rounded-lg bg-neutral-700 text-sm"></div>
                </div>
              </div>
            ) : (
              <>
                <div>
              <FaRegUserCircle className="w-8 h-8 text-yellow-400" />
            </div>
            <div>


              <div className="font-bold text-md"> {user && user.username}</div>
              <div
                className="
                  text-sm"
              >
                {user && user.email}
              </div>
            </div></>
            )}
          
          </div>
        </div>
      </div>
      <h1 className="font-bold text-center text-3xl text-black py-10 underline">
        Your Books
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 px-10 py-5 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.length > 0 ? (
            books.map((book) => (
              <UserBookCard
                key={book._id}
                _id={book._id}
                title={book.title}
                author={book.author}
                genre={book.genre}
                uploadedAt={book.uploadedAt}
                owner={book.owner.username}
                onDelete={() => handleDelete(book._id)}
                onEdit={book._id}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No books available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserBooks;
