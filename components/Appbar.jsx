import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function Appbar(){

    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const toggle = () => {
        setShowDropdown((prev) => !prev);
    }

    const handleLogout = () => {
        console.log("Logging Out");
        setShowDropdown(false);
        navigate("/signin", {
            replace: true,
        });
    
    }

    const handleUpdate = () => {
        setShowDropdown(false);
        navigate("/update");

    }

    return (
        <div className="shadow h-15 flex justify-between ">
            <div className="flex flex-col justify-center h-full ml-5 mt-5 text-xl font-bold italic">
                PayTM
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-5">
                    Hello
                </div>
                <div onClick={toggle} className=" cursor-pointer rounded-full bg-slate-300 h-12 w-12 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        U
                    </div>
                </div>
                {showDropdown && (
                    <div className="absolute top-10 right-0 bg-white shadow-md rounded-md p-3"> 
                        <div onClick={handleUpdate} className="cursor-pointer py-2">
                            Update Profile
                        </div>
                        <div onClick={handleLogout} className="cursor-pointer py-2">
                            Log Out
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};