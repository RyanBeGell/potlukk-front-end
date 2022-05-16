import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function SplashPage(){

    const [potlukks,setPotlukks] = useState([]);
    const [potlukk,setPotlukk] = useState("");

//GET all Potlukks from the DB
    async function getAllPotlukks(){
        const response = await fetch("http://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/potlucks");
        const body = await response.json();
        setPotlukks(body);
        console.log(potlukks);
    }

    useEffect(()=>{
        getAllPotlukks()
    },[]);

//Create list to display ONLY public Potlukks
    const listItems = potlukks.filter(p => !p.private).map(p => 
        <tr>
            <td><Link to={"potlukkviewer/"+p.potluckID}><button>Select</button></Link></td>
            <td>{p.description}</td>
            <td>{Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', 
                day: '2-digit'}).format(p.datetime)}</td>
            <td>{Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit'})
                .format(p.datetime)}</td>
            <td>{p.creator}</td>
        </tr>);

//Display
    return(<>
        <h1>Welcome to Potlukk!</h1>
        <h3>Choose a Potlukk:</h3>
        <table>
            <thead>
                <tr><td></td><th>Potlukk</th><th>Date</th><th>Time</th><th>Host</th></tr>
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