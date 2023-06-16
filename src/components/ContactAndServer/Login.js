import { useRef, useState, useEffect, useContext } from 'react';
import './Login.css';
import AuthContext from './Context/AuthProvider';
import axios from 'axios';
const LOGIN_URL = '/api/admin/login';
const UserModel = require('./models/User.js');
const { v4: uuidv4 } = require('uuid');

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    function generateUniqueToken() {
        // Generate a unique UUID token
        return uuidv4();
      }
      


    useEffect(() =>{
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('/api/admin/login', async (req, res) => {
            try {
              const { username, password } = req.body;
          
              const user = await UserModel.findOne({ username });
          
              if (!user) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
              }
          
              if (user.isAdmin && password === user.password) {
                // Generate and return a token for admin user
                const token = generateUniqueToken(user);
                res.status(200).json({ token });
              } else {
                res.status(401).json({ error: 'Invalid credentials' });
              }
            } catch (error) {
              res.status(500).json({ error: 'Internal server error' });
            }
          });
    }

    return (
    <>
    {success ? (
        <section>
            <h1>you are logged in!</h1>
            <br />
            <p>
                <a href='#'>Go to Home</a>
            </p>
        </section>
    ) : (

    <section>
        <p ref={errRef} className={errMsg ? "errMsg" :
        "offScreed"} aria-live='assertive'>{errMsg}</p>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>username</label>
            <input 
            type='text' 
            id='username' 
            ref={userRef} 
            autoComplete='off' 
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            />
            <label htmlFor='password'>password</label>
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

}

export default Login;