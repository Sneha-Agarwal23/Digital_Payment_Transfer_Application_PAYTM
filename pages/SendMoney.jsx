import { useSearchParams } from "react-router-dom";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export function SendMoney() {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const id = searchParams.get("id");
    const [success , setSuccess] = useState(false);  
    const navigate = useNavigate();

     async function initiateTransfer(){
        try{
            //step-1 Deduct form user balance
            const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount: amount,
            },
            {headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }});

            console.log("Transfer Succesfull" , response.data);

            //step-2 Update receiver's balance
            const response2 = await axios.post("http://localhost:3000/api/v1/account/updateBalance", {
                userId: id,
                amount: amount,
            },
            {headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }});

            console.log("Receiver's Balance Updated", response2.data);
            setSuccess(true);
            setTimeout(() => {
                navigate("/dashboard");
            }, 5000);
                
        } catch(e){
            console.error("Transfer Error! Check Server.." , e);
        }

    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="w-96 border border-gray-300 bg-white rounded-lg shadow-lg p-6">
                <div className="text-3xl mb-4 flex justify-center font-bold">
                    <Heading label={"Send Money"} />
                </div>
                <div className="flex items-center mb-4">
                    <div className="rounded-full bg-green-500 h-12 w-12 flex justify-center items-center mr-2 text-white text-lg">
                        {name && name[0].toUpperCase()}
                    </div>
                    <div className="text-xl font-semibold italic">
                        {name}
                    </div>
                </div>
                <div className="mb-4">
                    <InputBox type="number" placeholder="Enter Amount" label="Amount" onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="mb-4">
                    <button onClick={initiateTransfer} className="w-full bg-green-500 text-white text-sm font-medium py-2 px-4 rounded-md">Initiate Transfer</button>
                    {success && (
                        <div className="bg-black text-2xl text-white p-2 rounded-md mt-2 flex justify-center items-center">
                            Transfer Successfull!
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}