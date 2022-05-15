import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

export default function PotlukkViewer(){
    const {id} = useParams();

    const [potluck, setPotluck] = useState([]);

    async function getPotluckbyId(id){
        const response = await fetch("http://localhost:8080/potlucks/"+id);
        const body = await response.json();
        setPotluck(body)
    }

    useEffect(()=>{getPotluckbyId(id)}, [])

    const date = new Intl.DateTimeFormat('en-US', 
        { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', 
        minute: '2-digit'}).format(potluck.dateTime);

    const [items,setItems] = useState([]);

    async function getAllItems(){
        const response = await fetch("http://localhost:8080/potlucks/"+id+"/items/");
        const body = await response.json();
        console.log(body);
        setItems(body)
    }

    function updateItems(item){
        const clonedArray = [...items];
        clonedArray.push(item);
        setItems(clonedArray)
    }

    useEffect(()=>{getAllItems()}, [])

    const missing = items.filter(i => i.status!="Fulfilled").map(i =>
        <tr><td>{i.description}</td><td><input onChange={updateSupplier} placeholder="Your Name"/></td><td><button onClick={() => { bringItem(i); getAllItems();}}>Sign me Up!</button></td></tr>);

    const fulfilled = items.filter(i => i.status=="Fulfilled").map(i =>
        <tr><td>{i.description}</td><td>{i.supplier}</td></tr>);    

     const [description, setDescription] = useState("");
     const [supplier,setSupplier] = useState("");

     function updateDescription(event){
        setDescription(event.target.value)
     }

     function updateSupplier(event){
        setSupplier(event.target.value)
     }



//Create and sign up to bring a new item
     async function createItem(){
        const item = {itemId:0, description:description, status:"Fulfilled", supplier:supplier, potluckId:id}
        const response = await fetch("http://localhost:8080/items",{
            body:JSON.stringify(item),
            method:"Post",
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(response.status != 201){
            alert("Failed to Create New Item");
        } else {
            updateItems(item);
        }
     }


//Update item to Fulfilled
     async function bringItem(item){
        item = {itemId:item.itemId, description:item.description, status:"Fulfilled", supplier:supplier, potluckId:item.potluckId}
        const response = await fetch("http://localhost:8080/items/"+item.itemId+"/fulfilled",{
            body:JSON.stringify(item),
            method:"PATCH", //patch has to be in caps for some reason...but not Post...
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(response.status != 200){
            alert("Failed to Create New Item");
        } else {
            updateItems(item);
        }
     }

    return(<>
    <h1>{potluck.description} : {date}</h1>
    <h3>Sign Up To Contribute!</h3>
    <table>
        <thead>
            <tr><th>Item</th><th>Supplier</th></tr>
        </thead>
        <tbody>
            {missing}
            <tr>
                <td><input onChange={updateDescription} name="otherItem" placeholder="Other Item"/></td>
                <td><input onChange={updateSupplier} name="supplier" placeholder="Your Name"/></td>
                <td><button onClick={() => { createItem(); getAllItems();}}>Sign me Up!</button></td>
            </tr>
        </tbody>
    </table>
<br/><h3>Current Menu</h3>
<table>
        <thead>
            <tr><th>Item</th><th>Supplier</th></tr>
        </thead>
        <tbody>
            {fulfilled}
        </tbody>
    </table>
<br/>

    <a href="/additems">
        <button>Edit Potluck</button>
    </a>
    
    <a href="/">
        <button>Return to Home</button>
    </a>
    </>)
}