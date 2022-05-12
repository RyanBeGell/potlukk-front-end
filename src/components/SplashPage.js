

export default function SplashPage(){

    return(<>
    <h1>Welcome to Potlukk!</h1>
    <h3>Choose an Potlukk:</h3>
    <table>
        <thead>
            <tr><td></td><th>Potlukk</th><th>Date/Time</th><th>Host</th></tr>
        </thead>
        <tbody>
            <tr><td><button>Select</button></td><td>Justin's Christmas Potlukk</td><td>5/21/2022</td><td>John</td></tr>
            <tr><td><button>Select</button></td><td>Ryan's Festivus Potlukk</td><td>5/28/2022</td><td>Bill</td></tr>
            <tr><td><button>Select</button></td><td>A different one</td><td>6/21/2022</td><td>John</td></tr>
        </tbody>
    </table>

    <br/>
    <br/>
    
    <button>Register a New User</button>
    <button>Create a New Potlukk</button>
    <button>Sign In</button>
    </>)
}