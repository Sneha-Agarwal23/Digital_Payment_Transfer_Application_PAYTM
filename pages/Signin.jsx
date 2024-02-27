import { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import { PasswordInputBox } from "../components/PasswordInputBox";


export const Signin = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignin = async () => {
        try{
            const response = await fetch("http://localhost:3000/api/v1/user/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if(response.ok){
                const data = await response.json();
                const token = data.token;
                localStorage.setItem("token", token);
                navigate("/dashboard");
            } else{
                setError("Invalid Credentials!! Please try again..");
            }
        } catch(e){
            console.error("Error Signing In!!", e);
            setError("Server Busy!! Please try later!!");

        }

    }

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
                    <Heading label={"Sign In"}></Heading>
                    <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
                    <InputBox onChange={e => {setUserName(e.target.value);}} placeholder={"john@gmail.com"} label={"Email"} value={username}></InputBox>
                    <PasswordInputBox label={"Password"}  value={password} onChange={e => {setPassword(e.target.value);}}></PasswordInputBox>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="pt-4">
                        <Button onClick={handleSignin} label={"Sign In"}></Button>
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} toWhere={"/signup"}></BottomWarning>
                </div>
            </div>

        </div>
    );
};