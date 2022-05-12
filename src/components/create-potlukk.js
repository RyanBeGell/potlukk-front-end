
export default function CreatePotlukk(){

    return(<>
    
    <h1>Create/Edit A Potlukk</h1>
    
        <table>
            <tbody>
                <tr><td><label htmlFor="potluckname">Name/Description</label></td>
                <td><input name ="potluckkname"/><br/></td></tr>
            
                <tr><td><label htmlFor="date">Date/Time</label></td>
                <td><input name ="date"/></td></tr>
            </tbody>
        </table>
        
        {/* Center this Checkbox */}
        <br/>
        <label htmlFor="isprivate">Private:</label>
        <input type="checkbox" id="isprivate" name="isprivate" value="private"></input>
        <br/>       
        <br/>

        <button>Submit</button>
        
        <br/>
        <button>Return to Home</button>
    </>)

}