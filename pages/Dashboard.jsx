import React from "react";
import { useState, useEffect } from "react";
import { Balance } from "../components/Balance";
import { Appbar } from "../components/Appbar";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        async function fetchUserBalance (){
            try{
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer "  + localStorage.getItem('token'),
                    },
                });
                setBalance(response.data.balance);
            } catch(e){
                console.error("Error fetching balance !!" + e);
            }
        };
        fetchUserBalance();
    }, [])


    return(
        <div>
            <Appbar></Appbar>
            <div className="m-8">
                <Balance value={balance}></Balance>
                <Users></Users>
            </div>

        </div>
    );
    
};