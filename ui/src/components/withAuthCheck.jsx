import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthCheck = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Check if user is logged in, endpoint should return 200 if logged in (/checkLogIn)
      fetch('/checkLogIn', {
        method: 'GET',
      })
        .then((response) => {
          if (response.status !== 200) {
            navigate('/login');
          }
          console.log('User: ', response.json().then((data) => console.log(data.email)));
        })
        .catch((error) => {
          console.error('Error:', error);
          navigate('/login');
        });
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuthCheck;