import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import digitalFlakeBg from '../../assets/images/digitalflake-bg.png';
import { ReqClass } from '../../services/Api';

const Login = () => {
  const initialUserState = {
    email: '',
    password: '',
  };
  const [error, setError] = useState(null);
  const [user, setUser] = useState(initialUserState);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    ReqClass.postReq('/user/login', user)
      .then((response) => {
        console.log(response.data);
        navigate('/');
      })
      .catch((error) => {
        if (error.response && error.response.status === "passWord Invalid Response") {
          setError('Invalid email or password. Please try again.');
        } else {
          setError('An error occurred while logging in. Please try again later.');
        }
        console.error('Error logging in:', error);
      });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen p-4 text-center bg-cover" style={{backgroundImage: `url(${digitalFlakeBg})`}}>
    <div className="w-50 bg-white border rounded-4">
      <div className="text-center">
        <img style={{ width:"200px", height:"150px"}} src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png" alt="digital flake" />
        <h4>Welcome to DigitalFlake Admin</h4>
      </div>
      <div className="mt-4">
        <h2 className="font-extrabold">Login to your account</h2>
        <p>
          Or <a href="#" className="font-medium text-blue-500 hover:text-blue-400" onClick={() => navigate("/register")}>register a new account</a>
        </p>
        <div className='ml-4 text-center'>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className='ml-4'>
              <label htmlFor="email" className="font-semilight">Email ID</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="w-full p-3 text-center border-[1px] border-[#eee] rounded-sm mt-2"
                placeholder="Email address"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className='' >
              <label htmlFor="password" className="font-semilight">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                required
                className="w-full p-3 text-lg text-center border-[1px] border-[#eee] rounded-sm mt-2"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
              />
              <span onClick={togglePasswordVisibility} className="text-sm text-gray-400 hover:text-white cursor-pointer">
                {showPassword ? 'Hide' : 'Show'} password
              </span>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <button style={{backgroundColor: '#7C0089'}}
                type="submit"
                className="w-full py-2 rounded-md mt-4 bg-blue-500  font-semibold"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
