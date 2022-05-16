import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Form, Button, FloatingLabel } from "react-bootstrap"

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

        <Button href="/" id = "home" variant="primary" size = "lg">Home</Button>
        <img id ="logo" src="../../images/PotlukkNameLogo.png" alt="Potlukk logo"></img>
        <div id ="centerWithBox" align ="center">
        <h2>Create a Potlukk Account</h2>
        <br />
        <table>
            <tbody>
                <tr>
                    <td>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="First name"
                            className="mb-3"
                            >

                            <Form.Control htmlFor="firstName" onChange={updateFirstName} name = "firstName" type="text" placeholder="First name" />
                        </FloatingLabel>
                    </td>
                </tr>
                <tr>
                    <td>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Last name"
                            className="mb-3"
                            >

                            <Form.Control htmlFor="lastName" onChange={updateLastName} name = "LastName" type="text" placeholder="Last name" />
                        </FloatingLabel>
                    </td>
                </tr>
                    <tr>
                        <td>
                            <FloatingLabel
                                 controlId="floatingInput"
                                label="Username"
                                className="mb-3"
                                >

                                <Form.Control htmlFor="username" onChange={updateUsername} name = "username" type="text" placeholder="Username" />
                            </FloatingLabel>
                        </td>
                    </tr>

                    <tr>
                        <td>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Password"
                            className="mb-3"
                        >

                            <Form.Control onChange={updatePassword} name = "password" htmlFor="password" type="password" placeholder="Password" />Wine
                            </FloatingLabel>
                        </td>
                    </tr>
            </tbody>
            </table>
            <br/>
            <Button variant = "primary" size = "lg" onClick={createUser}>Submit</Button>
            <br/>
            <Button href="/signin" id= "linkButton" variant="link">Sign in instead</Button>
        </div> 
        <br/>
    </>)
}