import { useRef, useState, useEffect, useContext } from 'react';
import './Login.css';
import AuthContext from './Context/AuthProvider';
import axios from 'axios';

const LOGIN_URL = 'http://localhost:3001/api/admin/login';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(LOGIN_URL, { username: user, password: pwd });

        const { token } = response.data;

        // Handle successful login
        setSuccess(true);
        setAuth({ token }); // Set the token in the AuthContext
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
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href='#'>Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? 'errMsg' : 'offScreen'} aria-live='assertive'>
            {errMsg}
          </p>
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              autoComplete='off'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />

            <button>Sign In</button>
          </form>
          <p>
            Need to reset password?<br />
            <span className='line'>
              <a href='#'>Reset Here</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
