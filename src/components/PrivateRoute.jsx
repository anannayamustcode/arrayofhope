// // src/components/PrivateRoute.jsx
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// export default function PrivateRoute({ children }) {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" replace />;
// }
// console.log("PrivateRoute user:", user);

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Optional: or a spinner, etc
  }

  return user ? children : <Navigate to="/login" replace />;
}
