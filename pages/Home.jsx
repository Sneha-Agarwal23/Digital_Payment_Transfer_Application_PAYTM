import React from "react";
import { Heading } from "../components/Heading";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Home = () => {

    const navigate = useNavigate();

    const gotoSignup = () => {
        navigate('/signup');
    }

    const gotoSignin = () => {
        navigate('/signin');
    }

return (
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
                <Heading label={"PayTM"}></Heading>
                <div className="pt-4">
                    <Button onClick={gotoSignup} label={"Sign Up"}></Button>
                    <Button onClick={gotoSignin} label={"Sign In"}></Button>
                </div>
                
            </div>
        </div>
    </div>
);

};