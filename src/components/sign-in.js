import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
        const response = await fetch("http://localhost:8080/login", {
            method:"POST", 
            body:JSON.stringify(loginInfo),
            headers:{
                "Content-Type":"application/json"
            }
        });
        const userInfo = await response.json()
        sessionStorage.setItem("user", JSON.stringify(userInfo));// store user in session storage
        navigate("/")   //navigate to home page 
    }

    return(<>
        <button>Home</button>
    
        <h2>Sign In</h2>

        <table>
            <tbody>

                <tr><td><label htmlFor="username">Username</label></td>
                <td><input onChange={updateUsername} name ="username" type="text"/><br/></td></tr>
            
                <tr><td><label htmlFor="password">Password</label></td>
                <td><input onChange={updatePassword} name ="password" type="password"/></td></tr>

            </tbody>
        </table>
        <br/>
        <button  onClick={sendLoginInfo}>Sign in</button>
    </>)
}