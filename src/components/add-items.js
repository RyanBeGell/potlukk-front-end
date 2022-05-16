import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function AddItems(){

    const navigate = useNavigate();
    const {potluckId} = useParams();

    const [items, setItems] = useState([]);

    async function getItemsByPotluck(){

        const response = await fetch(`http://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/potlucks/${potluckId}/items`);
        const body = await response.json();
        setItems(body);

    }

    async function validateUser(){

        const response = await fetch(`http://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/potlucks/${potluckId}`);
        const body = await response.json();
        const creator = body.creator;

        //Check if user is signed in
        //Then check to see if their username matches the potluck creator
        const user = JSON.parse(sessionStorage.getItem("user"));
        if(user === null){
            
            alert("Please sign in first to edit your potluck.");
            navigate("/");
            

            //Commented default username for debugging
            //setUsername("jlanfgston");
        }
        else{
            const username = user.username;

            if(username !== creator){
                alert("You are not the owner of this potluck");
                navigate("/");
            }
        }
    }

    useEffect(()=>{
        validateUser();

        getItemsByPotluck();
    },[]);

    //Generate direct URL to potluck page
    const URL = (window.location.href).replace("additems", "potlukkviewer");

    const itemsMissingRows = items.filter(i => i.status !== "Fulfilled")
    .map(i => <tr key ={i.itemId}>
        <td>{i.description}</td>
        <td>{i.status}</td>
        <td><button  onClick={() => deleteItem(i.itemId)}>Delete</button></td>
    </tr>);

    const itemsFulfilledRows = items.filter(i => i.status === "Fulfilled")
    .map(i => <tr key ={i.itemId}>
        <td>{i.description}</td>
        <td>{i.status}</td>
        <td>{i.supplier}</td>
        <td><button onClick={() => deleteItem(i.itemId)}>Delete</button></td>
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
        const item = {description:description, status:status, supplier:"", potluckId:potluckId};

        const response = await fetch('http://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/items',{
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

    async function deleteItem(itemId){

        const response = await fetch(`http://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/items/${itemId}`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(response.status !== 200){
            alert("Failed to delete item.")
        }

        getItemsByPotluck();
    }

    async function deletePotluck(){
        
        const response = await fetch(`http://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/potlucks/${potluckId}`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(response.status !== 200){
            alert("Failed to delete potluck.")
        }
        else{
            alert("Potluck has been deleted")
            navigate("/");
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
    <p>Direct link to this Potluck: <a href={URL}>{URL}</a></p>
    
    <br/>
    <button onClick={()=>navigate("/")}>Return to Home</button>
    <button onClick={deletePotluck}>Delete Potluck</button>
    
    
    </>)

}