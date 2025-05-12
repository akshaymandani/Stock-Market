import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const tokan = localStorage.getItem('tokan'); // Get the token from localStorage
console.log(tokan)
  if (!tokan) {
    // If no token, redirect to login page
    return <Navigate to="/login" />;
  }

  // If token exists, allow access to the route
  return element;
};

export default PrivateRoute;
