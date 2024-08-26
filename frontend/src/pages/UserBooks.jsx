import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../store/loaderSlice';
import Loader from '../components/Loader';
import UserBookCard from '../components/UserBookCard';
const UserBooks = () => {
  const navigate  = useNavigate();
  useEffect(()=>{
  
      const token = localStorage.getItem('token')
      if(!token){
          navigate('/login')
      }
  })
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);

  const fetchBooks = async () => {
    dispatch(showLoader())
    try {

        const token = localStorage.getItem('token')

        if (!token) {
            console.error('No token found');
            return;
          }
        
      const response = await axios.get('http://localhost:5000/api/me/books',{
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }finally{
      dispatch(hideLoader())
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (bookId) => {
    try {
      dispatch(showLoader());
  console.log(bookId)
      const response = await axios.delete(`http://localhost:5000/api/me/book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
  
      if (response.status === 200) {
        console.log('Book removed successfully');
        setBooks(books.filter((book) => book._id !== bookId)); // Update the state
      }
    } catch (error) {
      console.error('Error deleting book:', error.response?.data?.message || error.message);
    } finally {
      dispatch(hideLoader());
    }
  };

  const handleDelete = async (bookId) => {
    await deleteBook(bookId);
  };

 
  return (
    <div className='w-full min-h-screen bg-gray-100 flex flex-col'>
      <Header />

      <h1 className='font-bold text-center text-3xl text-black py-10 underline'>Your Books</h1>
      {loading ? (
          <Loader /> // Show Loader component while loading
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
