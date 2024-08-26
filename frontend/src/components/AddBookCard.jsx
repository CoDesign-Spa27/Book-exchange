import React, { useState,useEffect } from 'react';
import axios from 'axios';
import bookReadingLottie from '../assets/animated-book-reading.json';
import Lottie from 'react-lottie-player';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../store/loaderSlice';
import Loader from '../components/Loader';
const AddBookCard = () => {
    const navigate  = useNavigate();
    useEffect(()=>{
    
        const token = localStorage.getItem('token')
        if(!token){
            navigate('/login')
        }
    })
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showLoader())
    // Clear previous messages
    setError('');
    setSuccessMessage('');

    // Basic validation
    if (!formData.title || !formData.author || !formData.genre) {
      setError('All fields are required');
      return;
    }

    try {  
        const token = localStorage.getItem('token')

        if (!token) {
            console.error('No token found');
            return;
          }
      const response = await axios.post('https://book-exchange-1.onrender.com/api/me/addBook', formData,{
           headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
      });
      setSuccessMessage('Book added successfully!');
      console.log(response)
      setFormData({ title: '', author: '', genre: '' }); // Reset the form after successful submission
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('You have already listed this book.');
      } else {
        setError('An error occurred while adding the book. Please try again.');
      }
    }finally{
      dispatch(hideLoader())
    }
  };

  return (
    <div className="flex items-center justify-center text-black bg-white min-h-screen">
      <section className="relative flex flex-wrap lg:h-auto lg:items-center w-full max-w-7xl mx-auto">
        <div className="w-full lg:w-1/2 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center lg:text-left">
            <h1 className="text-3xl font-bold sm:text-4xl">Add your books now!</h1>
            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque ipsa culpa autem, at itaque nostrum!
            </p>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}

        { loading ? (
            <Loader />
        ) :( <form onSubmit={handleSubmit} className="mx-auto mt-8 space-y-4">
            <div>
              <label htmlFor="title" className="sr-only">Title</label>
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
              <label htmlFor="author" className="sr-only">Author</label>
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
              <label htmlFor="genre" className="sr-only">Genre</label>
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
                Add Book
              </button>
            </div>
          </form> )}
        </div>

        <div className="relative h-64 w-full sm:h-96 lg:h-auto lg:w-1/2 flex items-center justify-center bg-white">
          <Lottie
            loop
            animationData={bookReadingLottie}
            play
            style={{ width: '80%', height: '80%' }}
          />
        </div>
      </section>
    </div>
  );
};

export default AddBookCard;
