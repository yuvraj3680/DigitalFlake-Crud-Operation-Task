import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import digitalFlakeBg from '../../assets/images/digitalflake-bg.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen p-4 text-center bg-cover" style={{backgroundImage: `url(${digitalFlakeBg})`}}>
     
     <div className="   w-50 bg-white border rounded-4   ">
     <div className="text-center">
        <img style={{ width:"200px", height:"150px"}} src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png" alt="digital flake" />
        <h4>Welcome to DigitalFlake Admin</h4>
      </div>
        
        <div className="  mt-4 " >
          <h2 className=" font-extrabold ">Login to your account</h2>
          <p className="   ">
            Or <a href="#" className="font-medium text-blue-500 hover:text-blue-400"
            onClick={()=>{
              navigate("/register")
            }}>register a new account</a>
          </p>
          <div className='ml-4 text-center   justify-contet-center'>
          <div onSubmit={handleSubmit} className="space-y-4  ">
            <div className=' ml-4'>
              <label htmlFor="email" className="font-semilight ">Email ID</label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                required
                className="w-full p-3 text-center border-[1px] border-[#eee] rounded-sm mt-2"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='' >
              <label htmlFor="password" className="font-semilight">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                required
                className="w-full p-3 text-lg text-center border-[1px] border-[#eee] rounded-sm mt-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={togglePasswordVisibility} className="text-sm text-gray-400 hover:text-white cursor-pointer">
                {showPassword ? 'Hide' : 'Show'} password
              </span>
            </div>
            <div className="">
               <button style={{ width:"10px", height:"50px",backgroundColor: '#7C0089',}}
                type="submit"
                className="w-50 text-center border-blue-950 py-2 rounded-md mt-4 font-semibold"
              onClick={()=>{
                navigate('/')
              }}>
                Log in
              </button>
            </div>
          </div> <a href="#" className="text-sm  font-medium text-blue-500 hover:text-blue-400 ">Forgot your password?</a>
          </div>
          
            
        </div>
      </div>
    </div>
  );
};

export default Login;
