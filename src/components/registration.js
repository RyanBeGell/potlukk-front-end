

export default function RegisterUser(){

    return(<>
    
        <h2>Create a Potlukk Account</h2>

    <table>
            <tbody>

                <tr><td><label htmlFor="username">Username</label></td>
                <td><input name ="username"/><br/></td></tr>
            
                <tr><td><label htmlFor="password">Password</label></td>
                <td><input name ="password"/></td></tr>
                
                <tr><td><label htmlFor="first">First Name</label></td>
                <td><input name ="first"/><br/></td></tr>
            
                <tr><td><label htmlFor="last">Last Name</label></td>
                <td><input name ="last"/></td></tr>

            </tbody>
        </table>
        
        <br/>
        <button>Return to Home</button>
    </>)


}