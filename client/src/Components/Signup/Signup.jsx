import React, { useState } from 'react';
import { ToastContainer , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    user_name: '',
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

    try {
      const response = await fetch('http://127.0.0.1:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log(response.status);
      
      const data = await response.json();

      console.log(data);
      if (data.status == 'ok') {
        console.log(data.message);
        toast.info(data.message);
        window.location.href='/login';
      } else {
        toast.error(data.error, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
          
          });
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <div className='flex justify-center items-center h-screen bg-stone-300'>
  <div className='max-w-md w-full p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl'>
    <h2 className="text-2xl font-semibold mb-4">Signup</h2>
    <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label className='block text-sm font-medium'>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className='w-full border rounded-md px-4 py-2 bg-slate-200'
          required
          placeholder='Enter you full name'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium'>Username:</label>
        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          className='w-full border rounded-md px-4 py-2 bg-slate-200'
          placeholder='Enter username'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium'>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          className='w-full border rounded-md px-4 py-2 bg-slate-200'
          onChange={handleChange}
          placeholder='Your email '
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium'>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className='w-full border rounded-md px-4 py-2 bg-slate-200'
          placeholder='Enter your password'
          required
        />
      </div>
      <div className='flex justify-around'>
      <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md'>Sign Up</button>
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
            
export default Signup;

