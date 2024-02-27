import { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async() => {
        try{
            let flag = false;
            if(password.length >= 6){
                flag = true;
            }
            if(flag === false){
                setError("Password length is too small!!");
            }
            else{
                const response = await axios.post("http://localhost:3000/api/v1/user/signup",
                {
                    username,
                    firstName,
                    lastName,
                    password,
                });
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            }  
        } catch(e){
            console.error("Password too small!!", e);
            setError("Password length is too small!! Try again");
        }
        

    }



    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
                    <Heading label={"Sign Up"}></Heading>
                    <SubHeading label={"Enter your information to create an account"}></SubHeading>
                    <InputBox onChange={e => {setFirstName(e.target.value);}} placeholder={"John"} label={"First Name"}></InputBox>
                    <InputBox onChange={e => {setLastName(e.target.value);}} placeholder={"Doe"} label={"Last Name"}></InputBox>
                    <InputBox onChange={e => {setUserName(e.target.value);}} placeholder={"john@gmail.com"} label={"Email"}></InputBox>
                    <InputBox onChange={e => {setPassword(e.target.value);}} label={"Password"}></InputBox>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="pt-4">
                        <Button onClick={handleSignup}
                        label={"Sign Up"}></Button>

                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} toWhere={"/signin"}></BottomWarning>
                </div>
            </div>
        </div>
    );
};
