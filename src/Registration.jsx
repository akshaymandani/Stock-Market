import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from './firebase';
// This is a functional component that displays a registration form.

const RegistrationForm = () => {
  const[user,setUser]=useState([])
 // const [filter, setFilter] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobile:'',
    std:'',
    medium:''
  });
const filter =[];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const fachUserc=async()=>{
  //   try{
  //     const temp =[]
  //   const data=  await getDocs(collection(db,"users"))
  //  data.forEach(user => {
  //   temp.push(user.data())
  //   // console.log(temp)
  //   setUser(temp)
  //  });
  //   }catch(error){
  //     console.log(error);
  //   }
  // }
  // useEffect(()=>{
  //   fachUserc()
    
  // },[]) 
  // //console.log(user);

  const handleSubmit =async (e) => {
  e.preventDefault()

  const generateToken = () => {
    const rand = function() {
      return Math.random().toString(36).substr(2); 
    };
    return  rand() + "-" + rand(); // to make it longer
  };

  // Generate the token
  const token = generateToken();
  
  console.log(token)
   
  const id = 5; // Example id
  if (id !== null) {
    const filteredUsers = user.filter((item) => item.std == id);
    filter.push(filteredUsers);
  }



    
  
  ;
    await addDoc(collection(db, "users"),{tokan:token,...formData} );
    localStorage.setItem("token", token);
   
    setFormData({
      username: '',
      email: '',
      password: '',
      mobile:'',
      std:'',
      medium:''
    })
   // console.log(formData); // You can handle form submission logic here
  
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded shadow-xl">
      <h2 className="text-2xl mb-4 font-bold text-center">Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
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
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Std</label>
          <input
            type="number"
            id="password"
            name="std"
            value={formData.std}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            max={12}
            min={0}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Medium</label>
          <select name="medium"  value={formData.medium}
            onChange={handleChange}  className="block text-gray-700 font-bold mb-2">
        <option value="Gujarati">Gujarati</option>
        <option value="English">English</option>
        
      </select>
       
        </div>
        
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};


export default RegistrationForm;