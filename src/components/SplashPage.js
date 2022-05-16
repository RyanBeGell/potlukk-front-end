import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, FloatingLabel } from "react-bootstrap";

export default function SplashPage(){

    const [potlukks,setPotlukks] = useState([]);
    const [potlukk,setPotlukk] = useState("");

//GET all Potlukks from the DB
    async function getAllPotlukks(){
        const response = await fetch("https://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/potlucks");
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
            <td width="10%"><Link to={"potlukkviewer/"+p.potluckID}><Button variant = "primary" size = "md" padding-right="100px">Select</Button></Link></td>
            <td width="36%">{p.description}</td>
            <td width="18%">{Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', 
                day: '2-digit'}).format(p.datetime)}</td>
            <td width="18%">{Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit'})
                .format(p.datetime)}</td>
            <td width="18%">{p.creator}</td>
        </tr>);

//Display
    return(<>
        <br/>
        <br/>
        <br/>
        <img id ="logo" src="../../images/PotlukkNameLogo.png" alt="Potlukk logo"></img>
        <div id ="splashPageContent" align ="center">
        <h3>Choose a Potlukk:</h3>

        <table width="100%">
            <thead>
                <tr><td></td><th>Potlukk</th><th>Date</th><th>Time</th><th>Host</th></tr>
            </thead>
            <tbody>
                {listItems}
            </tbody>
        </table>
        </div>

        <div id="splashPageLinks">
            <table>
                <tr>                   
                    <td width="400px"><a href="/createpotlukk">
                        <Button variant="link">Create a New Potlukk</Button>
                    </a>  </td>  

                    <td width="400px"><a href="/register">
                        <Button variant="link">Register a New User</Button>
                    </a></td>
                </tr>
                
            </table>
        </div>
        <a href="/signin">
                        <Button id="signIn" variant="link">Sign In</Button>
                    </a>
    </>)
}