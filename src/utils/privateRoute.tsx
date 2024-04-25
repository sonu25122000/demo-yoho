import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error('Please Login First.');
      navigate('/auth/sign-in');
    }
  }, [navigate, token]); // Dependency array ensures this effect runs only when navigate or token changes

  return <div>{children}</div>;
}

export default PrivateRoute;
