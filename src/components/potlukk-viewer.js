import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

export default function PotlukkViewer(){
    const {id} = useParams()
    console.log(id)

    const [items,setItems] = useState([])

    // async function getAllItems(){
    //     const response = await fetch(".../items");
    //     const body = await response.json();
    //     setItems(body)
    // }

    // useEffect(()=>{
    //     getAllItems();
    // })

    const fulfilled = items.filter(i => i.status==="Fulfilled").map(i =>
        <tr><td>i.description</td><td>i.supplier</td></tr>);

    const missing = items.filter(i => !i.status==="Fulfilled").map(i =>
        <tr><td>i.description</td><td>i.supplier</td><td><button>Sign me Up!</button></td></tr>);
  

    const [description, setDescription] = useState("");
    const [supplier,setSupplier] = useState("");

    function updateDescription(event){
        setDescription(event.target.value)
    }

    function updateSupplier(event){
        setSupplier(event.target.value)
    }

    async function createItem(){
        const item = {itemId:0, description:description, status:"Fulfilled", supplier:supplier, potluckId:0}

    // }

    return(<>
    <h1>Potluck Name : Potlukk Date</h1>
    <h3>Sign Up To Contribute!</h3>
    <table>
        <thead>
            <tr><th>Item</th><th>Supplier</th></tr>
        </thead>
        <tbody>
            {missing}
            <tr>
                <td><input name="otherItem" placeholder="Other Item"/></td>
                <td><input name="supplier" placeholder="Your Name"/></td>
                <td><button>Sign me Up!</button></td>
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
}