import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function CreatePotlukk(){

    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(()=>{
        //Commented code to take user's username from session storage
        //Breaks if there's nothing in sessions storage

        //const user = JSON.parse(sessionStorage.getItem("user"));
        //setUsername(user.username);
        setUsername("jlangston");
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
        const potluck = {description:description,dateTime:Date.parse(date),creator:username,private:isPrivate,url:""};
        
        //Update link to proper host website
        const response = await fetch("http://localhost:8080/potlucks",{
            body:JSON.stringify(potluck),
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(response.status === 200){
            const body = await response.json();
            alert(`${body.description} has been created!`);
        }
        else{
            alert("Failed to create potluck.");
        }
        
        
    }

    //Add a link to the Submit button that goes to the add items page
    //After creating the new potluck
    return(<>
    
    <h1>Create a potluck for {username}</h1>
    
        <table>
            <tbody>
                <tr><td><label htmlFor="potluckname">Name/Description</label></td>
                <td><input onChange={updateDescription} name ="potluckkname"/><br/></td></tr>
            
                <tr><td><label htmlFor="date">Date/Time</label></td>
                <td><input type="datetime-local" onChange={updateDate} value={date}/></td></tr>

                <tr><td><label htmlFor="isprivate">Private:</label></td>
                <td><input type="checkbox" onChange={updateIsPrivate} value={isPrivate}/></td></tr>
            </tbody>
        </table>
        
        <br/>
        <br/>

        <button onClick={createPotluck}>Submit</button>
        
        <br/>
        <button onClick={()=>navigate("/")}> Return to Home </button>
    </>)

}