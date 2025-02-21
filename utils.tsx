// Assuming you have a function to decode JWT
import {jwtDecode} from 'jwt-decode';

// Function to get userId from token
const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const decodedToken = jwtDecode(token);
  console.log('Decoded Token:', decodedToken.user._id);
  return decodedToken.user._id; // Adjust based on your token's structure
};

export { getUserIdFromToken };
