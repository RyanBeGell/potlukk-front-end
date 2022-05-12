

export default function SignIn(){

    return(<>
    
        <h2>Sign In</h2>

    <table>
            <tbody>

                <tr><td><label htmlFor="username">Username</label></td>
                <td><input name ="username"/><br/></td></tr>
            
                <tr><td><label htmlFor="password">Password</label></td>
                <td><input name ="password"/></td></tr>

            </tbody>
        </table>
        <br/>
        <button>Return to Home</button>
    </>)


}