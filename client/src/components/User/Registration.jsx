import React, { useState } from 'react';
import { ReqClass } from '../../services/Api';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();

  // Initial state for form fields
  const initialUserState = {
    name: '',
    email: '',
    password: '',
    mobile: '',
  };

  const [user, setUser] = useState(initialUserState);


  //  handle the input fields
  const handleSubmit = (e) => {
    e.preventDefault();

    ReqClass.postReq('/user', user)
      .then((response) => {
        console.log(response.data);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="max-w-md w-45 space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Register to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Or <a href="#" className="font-medium text-blue-500 hover:text-blue-400">register a new account</a>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium ">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="off"
                required
                className="w-full ml-4 p-3 text-lg text-center border-[1px] border-[#eee] rounded-sm mt-2"
                placeholder="Full Name"
                value={user.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium ">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
                className="w-full ml-4 p-3 text-lg text-center border-[1px] border-[#eee] rounded-sm mt-2"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium ">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full ml-4 p-3 text-lg text-center border-[1px] border-[#eee] rounded-sm mt-2"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="mobile" className="block mb-2 text-sm font-medium ">Mobile Number</label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                autoComplete="tel"
                required
                className="w-full ml-4 p-3 text-lg text-center border-[1px] border-[#eee] rounded-sm mt-2"
                placeholder="Mobile Number"
                value={user.mobile}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button style={{backgroundColor: '#7C0089'}}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account? <a href="#" className="font-medium text-blue-500 hover:text-blue-400" onClick={()=>{
              navigate("/login")
            }}>Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
