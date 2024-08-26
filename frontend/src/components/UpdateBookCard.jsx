import React, { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "react-lottie-player";
import { useNavigate, useParams } from "react-router-dom";
import bookReadingLottie from "../assets/animated-book-reading.json";
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../store/loaderSlice';
import Loader from '../components/Loader';
import Header from "./Header"; 

const UpdateBookCard = () => {
  const navigate  = useNavigate();
  useEffect(()=>{
  
      const token = localStorage.getItem('token')
      if(!token){
          navigate('/login')
      }
  })
  const { bookId } = useParams();
   
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
  });
 
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);
  useEffect(() => {
    dispatch(showLoader())

    const fetchBookData = async () => {
      try {
        const response = await axios.get(`https://book-exchange-1.onrender.com/api/me/book/${bookId}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        setFormData(response.data);
        console.log("response of book" + response.data)
         
      } catch (error) {
        setError("Failed to fetch book data");
        
      }finally{

        dispatch(hideLoader())
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showLoader())
    try {
      await axios.put(`https://book-exchange-1.onrender.com/api/me/book/edit/${bookId}`, formData,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      }); // Use PUT for updating
      
      setSuccessMessage("Book updated successfully!");
      setError(""); // Clear previous errors
      navigate(`/me/books`); // Redirect to user books page or any other page
    } catch (error) {
      setError("Failed to update the book");
    }finally{
      dispatch(hideLoader())
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center text-black bg-white min-h-screen">
        <section className="relative flex flex-wrap lg:h-auto lg:items-center w-full max-w-7xl mx-auto">
          <div className="w-full lg:w-1/2 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-lg text-center lg:text-left">
              <h1 className="text-3xl font-bold sm:text-4xl">
                Update your book
              </h1>
              <p className="mt-4 text-gray-500">
                Modify the details of your book below.
              </p>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            {successMessage && (
              <p className="text-green-500 mt-4">{successMessage}</p>
            )}

            {loading ? (
              <Loader />
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto mt-8 space-y-4">
                <div>
                  <label htmlFor="title" className="sr-only">
                    Title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full rounded-lg text-white border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter title"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="author" className="sr-only">
                    Author
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      className="w-full rounded-lg text-white border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="genre" className="sr-only">
                    Genre
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="genre"
                      value={formData.genre}
                      onChange={handleChange}
                      className="w-full rounded-lg text-white border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter genre"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                  >
                    Update Book
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="relative h-64 w-full sm:h-96 lg:h-auto lg:w-1/2 flex items-center justify-center bg-white">
            <Lottie
              loop
              animationData={bookReadingLottie}
              play
              style={{ width: "80%", height: "80%" }}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UpdateBookCard;
