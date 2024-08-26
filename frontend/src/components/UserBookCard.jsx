import { useState } from 'react';
import React from 'react';
import userLottie from '../assets/user.json';
import Lottie from 'react-lottie-player';
import { useNavigate } from 'react-router-dom';
 
const UserBookCard = ({ _id, title, author, genre, uploadedAt, owner ,onDelete,onEdit}) => {
  const navigate = useNavigate();
  const [animationStopped, setAnimationStopped] = useState(false);
  const formattedDate = uploadedAt
    ? new Date(uploadedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date not available';

 
    const handleEdit = ()=>{
      navigate(`/me/updateBook/${_id}`);
    }
  return (
    <div className="relative capitalize block overflow-hidden bg-white rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold capitalize text-gray-900 sm:text-xl">
          Book-  {title}
          </h3>
          <p className="mt-1 text-xs font-medium text-gray-600">
            By {author}
          </p>
        </div>

        <div className="hidden sm:block sm:shrink-0">
          <Lottie
             loop={false}  
             animationData={userLottie}
             play={!animationStopped}  
             onComplete={() => setAnimationStopped(true)} 
             style={{ width: 80, height: 80 }}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-pretty text-sm text-gray-500">
          {genre}
        </p>
      </div>

      <dl className="mt-6 flex items-center gap-4 sm:gap-12">
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">Uploaded</dt>
          <dd className="text-xs text-gray-500">{formattedDate}</dd>
        </div>

        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">Uploaded By</dt>
          <dd className="text-xs text-gray-500">{owner}</dd>
        </div>


        <div>
        <span className="inline-flex overflow-hidde rounded-lg border shadow-sm">
  <button
    className="inline-block border-e p-3 text-gray-700 hover:bg-gray-100 bg-white border-none hover:border-none focus:outline-none focus:ring-0"
    title="Edit Product"
    onClick={handleEdit}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  </button>

  <button
    className="inline-block p-3 text-red-700 bg-red-100 hover:bg-red-200 border-none hover:border-none hover:focus:outline-none focus:outline-none focus:ring-0"
    title="Delete Product"
    onClick={onDelete}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  </button>
</span>

      </div>
      </dl>
     
    
    </div>
  );
};

export default UserBookCard;
