import React, { useState } from "react";
import axios from "axios";
import Lottie from "react-lottie-player";
import userLottie from "../assets/user.json";
import ExchangeModal from "./ExchangeModal";
import useCurrentUser from "../useCurrenUser";
import Loader from "./Loader";
const BookCard = ({ _id, title, author, genre, uploadedAt, owner }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useCurrentUser();
 
  const formattedDate = uploadedAt
    ? new Date(uploadedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";

  const handleRequest = async (offeredBookId, requestedBookId) => {
    setLoading(true);
    try {
      await axios.post(
        "https://book-exchange-1.onrender.com/api/exchange",
        {
          toUser: owner._id,
          bookOffered: offeredBookId,
          bookRequested: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStatus("sent");
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };
 ;
  const showRequestButton = user && user._id !== owner._id;
 
  return (
    <>
      <div className="relative capitalize block overflow-hidden bg-white rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-purple-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold capitalize text-gray-900 sm:text-xl">
              Book- {title}
            </h3>
            <p className="mt-1 text-xs font-medium text-gray-600">
              By {author}
            </p>
          </div>

          <div className="hidden sm:block sm:shrink-0">
            <Lottie
              loop={false}
              animationData={userLottie}
              play
              style={{ width: 80, height: 80 }}
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-pretty text-sm text-gray-500">{genre}</p>
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Uploaded</dt>
            <dd className="text-xs text-gray-500">{formattedDate}</dd>
          </div>

          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Uploaded By</dt>
            <dd className="text-xs text-gray-500">{owner.username}</dd>
          </div>
        </dl>

        <div className="mt-4">
          {loading ? (
            <p>Loading...</p>
          ) : status === "sent" ? (
            <p className="text-green-500">Request Sent!</p>
          ) : status === "rejected" ? (
            <p className="text-red-500">Request Rejected</p>
          ) : showRequestButton ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Request Exchange
            </button>
          ) : null}
        </div>
      </div>
      {isModalOpen && (
        <ExchangeModal
          onClose={() => setIsModalOpen(false)}
          onRequest={handleRequest}
          offeredBookId={_id}
        />
      )}
    </>
  );
};

export default BookCard;
