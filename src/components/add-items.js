import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button'

export default function AddItems(){

    const navigate = useNavigate();
    const {potluckId} = useParams();

    const [items, setItems] = useState([]);
    const [potluckName, setPotluckname] = useState("");

    async function getItemsByPotluck(){

        const response = await fetch(`http://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/potlucks/${potluckId}/items`);
        const body = await response.json();
        setItems(body);

    }

    async function validateUser(){

        const response = await fetch(`http://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/potlucks/${potluckId}`);
        const body = await response.json();
        const creator = body.creator;
        setPotluckname(body.description);

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
        <td width="50%">{i.description}</td>
        <td width="33%">{i.status}</td>
        <td width="33%"><Button variant="danger" size = "md"  onClick={() => deleteItem(i.itemId)}>Delete</Button></td>
    </tr>);

    const itemsFulfilledRows = items.filter(i => i.status === "Fulfilled")
    .map(i => <tr key ={i.itemId}>
        <td width="50%">{i.description}</td>
        <td width="20%">{i.status}</td>
        <td width="30%">{i.supplier}</td>
        <td width="10%"><Button variant="danger" size = "md" onClick={() => deleteItem(i.itemId)}>Delete</Button></td>
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
    <Button href="/" id = "home" variant="primary" size = "lg">Home</Button>
    <img id ="logo" src="../../images/PotlukkNameLogo.png" alt="Potlukk logo"></img>
    <div id = "splashPageContent" align ="center">
        <h2>{potluckName}</h2>
            <table width="500px">
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
                        <Button variant="primary" size="md" onClick={createItem}>Add Item</Button> 
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
        <br/>
            <h3>Fulfilled Items</h3>
            <table>
                <thead>
                    <tr><th>Item</th><th>Status</th><th>Supplier</th></tr>
                </thead>
                <tbody>
                    {itemsFulfilledRows}
                </tbody>
            </table>
        <br/>
        <p>Direct link to this Potluck-{URL}</p>
        <br/>
        <Button variant="danger" size = "md" onClick={deletePotluck}>Delete Potluck</Button>
    </div>
    
    </>)

}