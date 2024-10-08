import { useState, useEffect } from 'react';
import axios from 'axios';

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [userLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://book-exchange-1.onrender.com/api/auth/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
       
        setUser(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, userLoading, error };
};

export default useCurrentUser;
