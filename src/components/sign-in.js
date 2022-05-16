import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import { Form, FloatingLabel } from "react-bootstrap"

export default function SignIn(){

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    function updateUsername(event){
        setUsername(event.target.value)
    }

    function updatePassword(event){
        setPassword(event.target.value)
    }

    async function sendLoginInfo(){
        const loginInfo = {username,password}
        const response = await fetch("https://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/login", {
            method:"POST", 
            body:JSON.stringify(loginInfo),
            headers:{
                "Content-Type":"application/json"
            }
        });
        const userInfo = await response.json()

        if(response.status === 200){
            alert(`${userInfo.username} successfully signed in.`)
            navigate("/")
        }else{
            alert('Username or password incorrect. Please try again.');
            navigate("/signin")
        }

        sessionStorage.setItem("user", JSON.stringify(userInfo));// store user in session storage
    }

    return(<>
        <Button href="/" id = "home" variant="primary" size = "lg">Home</Button>
        <img id ="logo" src="../../images/PotlukkNameLogo.png" alt="Potlukk logo"></img>
        <div id = "centerWithBox" align ="center">
            <h2>Sign In</h2>
            <br/>
            <table>
                <tbody>

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
                            <Form.Control onChange={updatePassword} name = "password" htmlFor="password" type="password" placeholder="Password" />
                            </FloatingLabel>
                        
                        </td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <Button variant = "primary" size = "lg" onClick={sendLoginInfo}>Sign in</Button>{' '}
            <br/>
            <Button href="/register" id= "linkButton" variant="link">Create Account</Button>
        </div>
    </>)
}