import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, FloatingLabel } from "react-bootstrap";

export default function CreatePotlukk(){

    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem("user"));
        //Redirect user to home page if they are not signed in
        if(user === null){
            alert("Please sign in first or register to create a potluck.");
            navigate("/");

            //Commented default username for debugging
            //setUsername("jlangston");
        }
        else{
            setUsername(user.username);
        }
    }, []);

    const [description, setDescription] = useState("");
    const [date, setDate] = useState("2022-06-12T19:30");
    const [isPrivate, setIsPrivate] = useState(false);

    function updateDescription(event){
        setDescription(event.target.value);
    }

    function updateDate(event){
        setDate(event.target.value);
    }

    function updateIsPrivate(event){
        setIsPrivate(event.target.checked);
    }

    async function createPotluck(){
        const potluck = {description:description,dateTime:Date.parse(date),creator:username,private:isPrivate};
        
        const response = await fetch("http://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/potlucks/",{
            body:JSON.stringify(potluck),
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(response.status === 200){
            const body = await response.json();
            const potluckId = body.potluckID;
            alert(`${body.description} has been created!`);
            navigate(`/additems/${potluckId}`);
        }
        else{
            alert("Failed to create potluck.");
            console.log(response);
        }
        
        
    }

    return(<>
        <Button href="/" id = "home" variant="primary" size = "lg">Home</Button>
        <img id ="logo" src="../../images/PotlukkNameLogo.png" alt="Potlukk logo"></img>

        <div id ="createPotlukkContent" align ="center">
            <h3>Create a potluck</h3>
            <p><b>Logged in as {username}</b></p>
    
        <table>
            <tbody>
                <tr><td><label htmlFor="potluckname">Name/Description:&nbsp;&nbsp;&nbsp;</label></td>
                <td><input onChange={updateDescription} name ="potluckkname"/><br/></td></tr>
            
                <tr><td><label htmlFor="date">Date/Time:</label></td>
                <td><input type="datetime-local" onChange={updateDate} value={date}/></td></tr>

                <tr><td><label htmlFor="isprivate">Private:</label></td>
                <td><input type="checkbox" onChange={updateIsPrivate} value={isPrivate}/></td></tr>
            </tbody>
        </table>
        
        <br/>
        <br/>

        <Button variant = "primary" size = "md" onClick={createPotluck}>Submit</Button>
        </div>
    </>)

}