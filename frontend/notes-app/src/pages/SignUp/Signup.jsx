import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";

import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
        setError("Please enter your name")
        return;
    }

    if(!validateEmail(email)){
        setError("Please enter a valid email address.")
        return
    }

    if(!password){
        setError("Password required")
        return
    }
    setError("")

    //Signup api call

    try {
      const response = await axiosInstance.post('/users/register',{
          name:name,
          email:email,
          password:password
      })
       
  //Handle successful login response
  if(response.data){
      navigate("/dashboard")
  }
  }
  catch (error) {
      if(error.response && error.response.data)
      {
          setError(error.response.data)
      }
      else{
          console.log(error);
          
          setError("An unexpected error occured. Please try again.")
      }
  }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center  mt-28">
        <div className="w-96 border rounde bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
