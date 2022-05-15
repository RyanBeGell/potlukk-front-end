import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function AddItems(){

    const navigate = useNavigate();

    const [items, setItems] = useState([]);

    async function getItemsByPotluck(){

        const response = await fetch("http://localhost:8080/potlucks/7/items");
        const body = await response.json();
        setItems(body);

    }

    useEffect(()=>{
        getItemsByPotluck();
    },[]);

    const itemsMissingRows = items.filter(i => i.status !== "Fulfilled")
    .map(i => <tr key ={i.item_id}>
        <td>{i.description}</td>
        <td>{i.status}</td>
        <td><button>Delete</button></td>
    </tr>);

    const itemsFulfilledRows = items.filter(i => i.status === "Fulfilled")
    .map(i => <tr key ={i.item_id}>
        <td>{i.description}</td>
        <td>{i.status}</td>
        <td>{i.supplier}</td>
        <td><button>Delete</button></td>
    </tr>);

    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    function updateDescription(event){
        setDescription(event.target.value);
    }

    function updateStatus(event){
        setStatus(event.target.value);
    }

    async function createItem(){
        const item = {description:description, status:status, supplier:"", potluckId:7};

        const response = await fetch("http://localhost:8080/items",{
            body:JSON.stringify(item),
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(response.status === 201){
            getItemsByPotluck();
        }
        else{
            alert("Failed to add item.");
        }
    }

    return(<>
    
    <h2>Potlukk Name</h2>
        <table>
            <thead>
                <tr><th>Item</th><th>Level of Desire</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                    <input onChange={updateDescription} name ="item"/>
                    </td>
                    <td>
                        <input onChange={updateStatus} name="status" list="Status"/>
                            <datalist id = "Status">
                                <option value="Wanted"></option>
                                <option value="Needed"></option> 
                            </datalist>
                    </td>
                    <td>
                        <button onClick={createItem} >Add Item</button> 
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
            {itemsMissingRows}
        </tbody>
    </table>
<br/><h3>Fulfilled Items</h3>
    <table>
        <thead>
            <tr><th>Item</th><th>Status</th><th>Supplier</th></tr>
        </thead>
        <tbody>
            {itemsFulfilledRows}
        </tbody>
    </table>
    
    <br/>
    <button onClick={()=>navigate("/")}>Return to Home</button>
    
    </>)

}