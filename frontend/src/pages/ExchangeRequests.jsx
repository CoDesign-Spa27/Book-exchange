import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../store/loaderSlice';
import Loader from '../components/Loader';
const ExchangeRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
 const [noRequestFound,setNoRequestFound]=useState("");
 const dispatch = useDispatch();
 const loading = useSelector((state) => state.loader.loading);
  useEffect(() => {
    dispatch(showLoader())
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/exchange', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setRequests(response.data);
      } catch (error) {
        if(error.response.status === 404){
          setNoRequestFound("No Exchange Request Exist.")
        }
        if(error.response.status === 500){

          setError("Failed to fetch exchange requests");
        }
      } finally {
       dispatch(hideLoader())
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/exchange/accept/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRequests(requests.filter(request => request._id !== id));
    } catch (error) {
      setError("Failed to accept the exchange request");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/exchange/reject/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRequests(requests.filter(request => request._id !== id));
    } catch (error) {
      setError("Failed to reject the exchange request");
    }
  };

  return (
    <div >
      <Header />
      <div className="flex text-black h-screen bg-white flex-col items-center p-4">
        <h1 className="text-2xl font-bold">Exchange Requests</h1>
        {loading ? (
          <p><Loader /></p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) :
         noRequestFound ? (
          <div className='text-gray-600 flex text-xl items-center mt-[20%] justify-center'>{noRequestFound}</div>
         ):(
          <ul className="w-full max-w-md">
            {requests.map(request => (
              <li key={request._id} className="p-4 border-b">
                <p><strong>From:</strong> {request.fromUser.username}</p>
                <p><strong>Book Offered:</strong> {request.bookOffered.title}</p>
                <p><strong>Book Requested:</strong> {request.bookRequested.title}</p>
                <div className="mt-2">
                  <button onClick={() => handleAccept(request._id)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Accept</button>
                  <button onClick={() => handleReject(request._id)} className="bg-red-500 text-white px-4 py-2 rounded">Reject</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExchangeRequests;
