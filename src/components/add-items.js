
export default function AddItems(){

    return(<>
    
    <h2>Potlukk Name</h2>
        <table>
            <thead>
                <tr><th>Item</th><th>Level of Desire</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                    <input name ="item"/>
                    </td>
                    <td>
                        <input name="status" list="Status"/>
                            <datalist id = "Status">
                                <option value="Wanted"></option>
                                <option value="Needed"></option> 
                            </datalist>
                    </td>
                    <td>
                        <button>Add Item</button> 
                    </td>    
                </tr>    
            </tbody>
        </table>
        <br/>
        <br/>
    
        <h3>Unfulfilled Items</h3>
        <table>
        <thead>
            <tr><th>Item</th><th>Status</th></tr>
        </thead>
        <tbody>
            <tr><td>Potatos</td><td>Needed</td></tr>
            <tr><td>Cake</td><td>Wanted</td></tr>
        </tbody>
    </table>
<br/><h3>Fulfilled Items</h3>
    <table>
        <thead>
            <tr><th>Item</th><th>Status</th><th>Supplier</th></tr>
        </thead>
        <tbody>
            <tr><td>Burgers</td><td>Fulfilled</td><td>John</td></tr>
        </tbody>
    </table>
    
    <br/>
    <button>Return to Home</button>
    
    </>)

}