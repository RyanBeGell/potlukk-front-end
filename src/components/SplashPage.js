import { useState, useEffect } from "react";


export default function SplashPage(){

    const [potlukks,setPotlukks] = useState([]);
    const [potlukk,setPotlukk] = useState("");

    async function getAllPotlukks(){
        const response = await fetch(".../potlukks");
        const body = await response.json();
        setPotlukks(body);
    }

    useEffect(()=>{
        getAllPotlukks()
    },[]);

    const listItems = potlukks.filter(p => !p.isPrivate).map(p => 
        <tr>
            <td><a href="/potlukkviewer"><button onClick={setPotlukk(p)}>Select</button></a></td> 
            <td>p.description</td>
            <td>p.datetime</td>
            <td>p.creator</td>
        </tr>);

    return(<>
        <h1>Welcome to Potlukk!</h1>
        <h3>Choose a Potlukk:</h3>
        <table>
            <thead>
                <tr><td></td><th>Potlukk</th><th>Date/Time</th><th>Host</th></tr>
            </thead>
            <tbody>
                {listItems}
            </tbody>
        </table>

        <br/>
        <br/>
        <a href="/register">
            <button>Register a New User</button>
        </a>
        
        <a href="/createpotlukk">
            <button>Create a New Potlukk</button>
        </a>    

        <a href="/signin">
            <button>Sign In</button>
        </a>
    </>)
}