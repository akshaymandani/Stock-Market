import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db } from './firebase';

const RegistrationForm = () => {
  const navigate = useNavigate(); 
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    password: '',
    mobile: '',
  });

  const fachUserc = async () => {
    try {
      const temp = [];
      const data = await getDocs(collection(db, "users"));
      data.forEach(user => {
        temp.push(user.data());
      });
      setUser(temp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('tokan');
    if (token) {
      navigate('/');
    }

    fachUserc();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = e.target.mobile.value;
    if (id !== null) {
      const filteredUsers = user.filter((item) => item.mobile === id);
      if (filteredUsers.length > 0) {
        const pass = user.filter((item) => item.password === formData.password);
        if (pass.length > 0) {
          var rand = function() {
            return Math.random().toString(36).substr(2); // remove `0.`
          };
          var token = function() {
            return rand() + rand() + rand(); // to make it longer
          };
          localStorage.setItem("tokan", token());
          navigate(`/`);
          // Refresh user data after successful login
          fachUserc();
        } else {
          Swal.fire({
            icon: "error",
            title: "Username And Password not exists!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Mobile number not exists!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white  rounded shadow-md ">
      <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Mobile No.</label>
          <input
            type="number"
            id="email"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-center ">
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-400  text-white font-bold py-2 px-4 rounded-lg p-2 focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;