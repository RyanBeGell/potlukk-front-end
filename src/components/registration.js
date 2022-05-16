import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

export default function RegisterUser(){

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    function updateFirstName(event){
        setFirstName(event.target.value)
    }

    function updateLastName(event){
        setLastName(event.target.value)
    }

    function updateUsername(event){
        setUsername(event.target.value)
    }

    function updatePassword(event){
        setPassword(event.target.value)
    }

    async function createUser(){
        const user = {username:username,firstName:firstName,lastName:lastName,password:password}
        const response = await fetch("http://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/users",{
            body:JSON.stringify(user),
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }     
        });
        
        const body = await response.json();

        if(response.status === 200){
            alert(`${body.username} successfully registered.`)
            navigate("/signin")
        }else{
            alert(`The username ${body.username} is already taken.`);
        }
    }

    return(<>

        <button>Home</button>
        <h2>Create a Potlukk Account</h2>

        <table>
            <tbody>

                <tr><td><label htmlFor="username">Username</label></td>
                <td><input onChange={updateUsername}name ="username" type="text"/><br/></td></tr>
                
                <tr><td><label htmlFor="password">Password</label></td>
                <td><input onChange={updatePassword} name ="password" type="password"/></td></tr>
                    
                <tr><td><label htmlFor="first">First Name</label></td>
                <td><input onChange={updateFirstName}name ="first" type="text"/><br/></td></tr>
                
                <tr><td><label htmlFor="last">Last Name</label></td>
                <td><input onChange={updateLastName} name ="last" type="text"/></td></tr>
            </tbody>
            <br/>
            <button onClick={createUser}>Submit</button>
        </table> 

        <br/>
    </>)
}