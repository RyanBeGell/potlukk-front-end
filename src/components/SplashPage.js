import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function SplashPage(){

    const [potlukks,setPotlukks] = useState([]);
    const [potlukk,setPotlukk] = useState("");

    async function getAllPotlukks(){
        const response = await fetch("http://localhost:8080/potlucks");
        const body = await response.json();
        setPotlukks(body);
        console.log(body);
    }

    useEffect(()=>{
        getAllPotlukks()
    },[]);

    const listItems = potlukks.filter(p => !p.isPrivate).map(p => 
        <tr>
            <td><Link to={"http://localhost:3000/potlukkviewer/"+p.potlukkId}></Link><button>Select</button></td> 
            <td>{p.description}</td>
            <td>{Date(p.datetime)}</td>
            <td>{p.creator}</td>
        </tr>);

    return(<>
        <h1>Welcome to Potlukk!</h1>
        <Link to={"/potlukkviewer/"+15}>go to potluck 15</Link>
        <Link to={"/potlukkviewer/"+25}>go to potluck 25</Link>
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