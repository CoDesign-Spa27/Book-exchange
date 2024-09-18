import React, { useEffect, useState } from 'react';
import BookReadingImage from '/register-page-image.png';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true); 
    const formData = { email, password };

    try {
      const response = await axios.post('https://book-exchange-1.onrender.com/api/auth/login', formData);

      if (response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/home'); // Navigate to the home page after successful login
      } else {
        console.log("Error setting token");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrors(prevErrors => ({ ...prevErrors, general: 'User not found, please register first' }));
      } else if (error.response && error.response.status === 401) {
        setErrors(prevErrors => ({ ...prevErrors, general: 'Credentials are incorrect' }));
      } else {
        console.error('Error submitting form data:', error);
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="w-full">
      <section className="bg-neutral-200 h-screen">
        <div className="lg:grid w-screen lg:min-h-screen lg:grid-cols-12">
          <aside className="relative bg-purple-300 md:flex md:items-center md:justify-center hidden h-10 md:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img src={BookReadingImage} className="object-contain hidden lg:block w-96 h-96" alt="image" />
          </aside>

          <main
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Book Exchange
              </h1>

              <h1 className="mt-6 text-xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Please Login
              </h1>

              {errors.general && <p className="mt-4 text-red-500 text-sm">{errors.general}</p>}

              {loading ? (
                <div className="flex justify-center items-center mt-8">
                  <div className="loader border-t-transparent border-solid animate-spin rounded-full border-purple-600 border-4 h-12 w-12"></div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
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
                    {errors.email && <p className="text-red-500 py-1 text-sm">{errors.email}</p>}
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
                    {errors.password && <p className="text-red-500 py-1 text-sm">{errors.password}</p>}
                  </div>

                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                      type="submit"
                      className="inline-block shrink-0 rounded-md border border-purple-600 bg-purple-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-purple-600 focus:outline-none focus:ring active:text-purple-500"
                    >
                      Login
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                      Don't have an account?
                      <Link to={'/register'}>
                        <span className="text-gray-700 underline ml-1">Register</span>
                      </Link>.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Login;
