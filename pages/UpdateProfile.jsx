import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UpdateProfile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpdateUser = async () => {
    try {
      if(password !== confirmpass){
        setError("Password Mismatch!! Please try again.");
      }
      const response = await axios.put(
        'http://localhost:3000/api/v1/user/updateuser',
        {
          id: email,
          password,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      console.log('User updated successfully', response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-96 border border-gray-300 bg-white rounded-lg shadow-lg p-6">
        <div className="text-2xl mb-4 flex justify-center font-bold">
          Update Profile
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full px-2 py-1 border rounded border-slate-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full px-2 py-1 border rounded border-slate-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-2 py-1 border rounded border-slate-200"
            value={confirmpass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <button
            onClick={handleUpdateUser}
            className="w-full bg-green-500 text-white text-sm font-medium py-2 px-4 rounded-md"
          >
            Update
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};
