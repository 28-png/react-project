import { useRef, useState, useEffect, useContext } from 'react';
import useAuth from './UseAuth';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';



const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:3001/admin/login', { username: user, password: pwd });
    const { token, user: userData, isAdmin } = response.data;
    
    // Handle successful login
    navigate(from, { replace: true })
    setAuth({ token, user: userData, isAdmin }); // Set the token in the AuthContext
  } catch (error) {
    if (error.response) {
      // Request was made and server responded with an error status
      setErrMsg(error.response.data.error);
    } else {
      // Something went wrong with the request (e.g., network error)
      setErrMsg('An error occurred. Please try again later.');
    }
  }
};


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-md p-6">
          <section>
            <p ref={errRef} className={errMsg ? 'errMsg' : 'offScreen'} aria-live="assertive">
              {errMsg}
            </p>
            <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block font-semibold mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block font-semibold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  autoComplete="off"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
                Sign In
              </button>
            </form>
            <p className="text-sm text-center mt-4">
              Need to reset password?{' '}
              <a href="#" className="text-blue-500 hover:underline">
                Reset Here
              </a>
            </p>
          </section>

      </div>
    </div>
  );
};

export default Login;
