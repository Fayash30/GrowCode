import React, { useState } from 'react';
import { ToastContainer , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () =>{
    window.location.href='/';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


      const response = await fetch('http://127.0.0.1:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(data);
      if (data.status == 'ok') {
       
        const token = data.token;

        localStorage.setItem('token', token);
        toast.info("Login Successfull")
        
        window.location.href='/';
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
         console.error('Login failed');
      }
    
  };

  return (
    <>
  <div className='flex justify-center items-center h-screen bg-stone-300'>
  <div className='max-w-md w-full p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl'>
    <h2 className='text-2xl font-bold mb-4'>Login</h2>
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='block mb-2'>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          placeholder='Your Email'
          onChange={handleChange}
          required
          className='w-full border rounded-md px-4 py-2 bg-slate-200'
        />
      </div>
      <div>
        <label className='block mb-2'>Password:</label>
        <input
          type="password"
          placeholder="Your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className='w-full border rounded-md px-4 py-2 bg-slate-200'
        />
      </div>
      <div className='flex justify-around'>
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md'>Login</button>
        <button type="button" className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md' onClick={handleCancel}>Cancel</button>
      </div>

    </form>
  </div>
</div>

      <ToastContainer
             position="top-right"
             autoClose={5000}
             hideProgressBar={false}
             newestOnTop={false}
             closeOnClick
             rtl={false}
             draggable
             pauseOnHover
             theme="light"
             
         />
    </>
  );
};

export default Login
