import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FilterSearch from '../components/FilterSearch';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../store/loaderSlice';
import Loader from '../components/Loader';

const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchBooks = async () => {
    dispatch(showLoader());
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.get('https://book-exchange-1.onrender.com/api/books', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
     
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    const filtered = books.filter(
      (book) =>
        book.genre.toLowerCase().includes(lowerCaseTerm) ||
        book.author.toLowerCase().includes(lowerCaseTerm)
      );
     
    setFilteredBooks(filtered);
  };
  return (
    <div className='w-full min-h-screen bg-gray-100 flex flex-col'>
      <Header />
      <div className="p-4">
        <FilterSearch onSearch={handleSearch} />
      </div>
      <h1 className='font-bold text-center text-3xl text-black py-2 underline'>Books</h1>

      {loading ? (
        <Loader /> // Show Loader component while loading
      ) : (
        <div className="grid grid-cols-1 px-10 py-5 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                _id={book._id}
                title={book.title}
                author={book.author}
                genre={book.genre}
                uploadedAt={book.uploadedAt}
                owner={book.owner}
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

export default Books;
