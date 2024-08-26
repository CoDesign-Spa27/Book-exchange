import React, { useState, useEffect } from 'react';
import BookReadingImage from '/register-page-image.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [newPreference, setNewPreference] = useState('');
  const [errors, setErrors] = useState({ username: '', email: '', password: '', general: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: '', email: '', password: '' };

    if (username.trim().length < 4) {
      newErrors.username = 'Username must be at least 4 characters long';
      isValid = false;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (password.trim().length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddPreference = () => {
    if (newPreference.trim() !== '') {
      setPreferences([...preferences, newPreference.trim()]);
      setNewPreference('');
    }
  };

  const handleRemovePreference = (index) => {
    const newPreferences = preferences.filter((_, i) => i !== index);
    setPreferences(newPreferences);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formData = { username, email, password, bookPreferences: preferences };
    try {
      const response = await axios.post('https://book-exchange-1.onrender.com/api/auth/register', formData);
      console.log('Form data submitted successfully:', response.data);
      navigate('/login'); // Redirect to login page on successful registration
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrors(prevErrors => ({ ...prevErrors, general: 'Email is already in use' }));
      } else {
        console.error('Error submitting form data:', error);
      }
    }
  };

  return (
    <div className='w-full'>
      <section className="bg-neutral-200">
        <div className="lg:grid w-screen lg:min-h-screen lg:grid-cols-12">
          <aside className="relative bg-purple-300 md:flex md:items-center md:justify-center hidden h-10 md:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img src={BookReadingImage} className='object-contain hidden lg:block w-96 h-96' alt="image" />
          </aside>

          <main
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            >
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Book Exchange
              </h1>

              <h1 className="mt-6 text-xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Please Register
              </h1>

            {errors.general && <p className="py-4 text-red-500 text-sm">{errors.general}</p>}
              <form onSubmit={handleSubmit} className="mt-3 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 w-full rounded-md h-9 px-2 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                  {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-md px-2 h-9 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-md px-2 h-9 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <div className="col-span-6">
                  <label htmlFor="preferences" className="block text-sm font-medium text-gray-700">
                    Preferences
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {preferences.map((preference, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center justify-center rounded-full border border-purple-500 px-2.5 py-0.5 text-purple-700"
                      >
                        <p className="whitespace-nowrap text-sm">{preference}</p>
                        <button
                          type="button"
                          onClick={() => handleRemovePreference(index)}
                          className="-me-1 ms-1.5 inline-block rounded-full bg-purple-200 p-0.5 text-purple-700 transition hover:bg-purple-300"
                        >
                          <span className="sr-only">Remove badge</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-3"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Please add your genre preference"
                      value={newPreference}
                      onChange={(e) => setNewPreference(e.target.value)}
                      className="w-full rounded-md px-2 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddPreference}
                      className="inline-block rounded-md border border-purple-600 bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-purple-600 focus:outline-none focus:ring active:text-purple-500"
                    >
                      Add
                    </button>
                  </div>
                  <p className='py-1 text-sm font-light text-black'>For example - Comedy, Philosophy, Love story</p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-purple-600 bg-purple-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-purple-600 focus:outline-none focus:ring active:text-purple-500"
                  >
                    Create an account
                  </button>
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <a href="/login" className="text-gray-700 underline" >Log in</a>.
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Register;
