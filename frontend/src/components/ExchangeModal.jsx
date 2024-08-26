import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExchangeModal = ({ onClose, onRequest, offeredBookId }) => {
  const [myBooks, setMyBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/me/books', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMyBooks(response.data);
      } catch (error) {
        console.error('Failed to fetch books');
      }
    };

    fetchMyBooks();
  }, []);

  const handleSelect = (bookId) => {
    setSelectedBook(bookId);
  };

  const handleSubmit = () => {
    onRequest(offeredBookId, selectedBook);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-black mb-4">Select a Book to Exchange</h2>
        <ul className="mb-4">
          {myBooks.map((book) => (
            <li key={book._id} className="p-2 border-b cursor-pointer">
              <button
                onClick={() => handleSelect(book._id)}
                className={`w-full text-left ${selectedBook === book._id ? 'bg-blue-100' : ''}`}
              >
                {book.title}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={handleSubmit}
          disabled={!selectedBook}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Send Request
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ExchangeModal;
