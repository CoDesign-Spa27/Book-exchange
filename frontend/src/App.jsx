import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import UserBooks from "./pages/UserBooks";
import Preference from "./pages/Preference";
import UpdateBookCard from "./components/UpdateBookCard";
import ExchangeRequests from "./pages/ExchangeRequests";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/me/addBook" element={<AddBook />} />
          <Route path="/me/books" element={<UserBooks />} />
          <Route path="/me/preference" element={<Preference />} />
          <Route path="/me/updateBook/:bookId" element={<UpdateBookCard />} />
          <Route path="/requests" element={<ExchangeRequests />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
