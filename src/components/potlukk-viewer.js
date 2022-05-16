import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

export default function PotlukkViewer(){
    const {id} = useParams();

    const [potluck, setPotluck] = useState([]);

//Get Potluck Name, Date & Time for display at the top of the page
    async function getPotluckbyId(id){
        const response = await fetch("http://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/potlucks/"+id);
        const body = await response.json();
        setPotluck(body)
    }

    useEffect(()=>{getPotluckbyId(id)})

//Convert Unix Epoch date (BigInt in PostgreSQL) to Readable date & Time
    const date = new Intl.DateTimeFormat('en-US', 
        { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', 
        minute: '2-digit'}).format(potluck.dateTime);

//Stateful variable to track items
    const [items,setItems] = useState([]);

//GET all items from the DB
    async function getAllItems(){
        const response = await fetch("http://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/potlucks/"+id+"/items/");
        const body = await response.json();
        console.log(body);
        setItems(body)
    }

//Upon first load of page, call get all items to populate the lists
    useEffect(()=>{getAllItems()}, [])

//Update the "stateful" items variable (So we don't need the bd connection in getAllItems every time we update)
    function updateItems(item){
        const clonedArray = [...items];
        clonedArray.push(item);
        setItems(clonedArray)
    }

//Divide list of items into "Fulfilled" and "Wanted"/"Needed"
//Map Wanted/Needed for display on first list and add button to sign up
//Why doesn't the item disappear when you click the button and change the status???
    const missing = items.filter(i => i.status!=="Fulfilled").map(i =>
        <tr><td>{i.description}</td><td>{i.status}</td><td><input onChange={updateSupplier} 
            placeholder="Your Name"/></td><td><button 
            onClick={() => { bringItem(i);}}>Sign me Up!</button></td></tr>);


    const fulfilled = items.filter(i => i.status==="Fulfilled").map(i =>
        <tr><td>{i.description}</td><td>{i.supplier}</td></tr>);    


// Description and Supplier Input Boxes and associated states to track entered values    
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
        const response = await fetch("http://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/items",{
            body:JSON.stringify(item),
            method:"Post",
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(response.status != 201){
            alert("Failed to Create New Item");
        } else {
            //Update the "stateful" items variable with the new item that was just added to the db
            updateItems(item);
        }
     }


//Update item to Fulfilled and add volunteer's (supplier's) name; PATCH to DB
     async function bringItem(item){
        item = {itemId:item.itemId, description:item.description, status:"Fulfilled", supplier:supplier, potluckId:item.potluckId}
        const response = await fetch("http://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/items/"+item.itemId+"/fulfilled",{
            body:JSON.stringify(item),
            method:"PATCH", //patch has to be in caps for some reason...but not Post...
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(response.status != 200){
            alert("Failed to Create New Item");
        } else {
            // console.log(item);
            // updateItems(item);
            items.forEach(i => {
                if(item.itemId === i.itemId){
                    i.status = "Fulfilled"
                    i.supplier = supplier
                }
            })
            setItems([...items]);
            setSupplier("");
        }
     }

    return(<>
    <h1>{potluck.description} : {date}</h1>
    <h3>Sign Up To Contribute!</h3>
    <table>
        <thead>
            <tr><th>Item</th><th>Status</th><th>Volunteer</th></tr>
        </thead>
        <tbody>
            {missing}
            <tr>
                <td colSpan="2"><input onChange={updateDescription} name="otherItem" placeholder="Other Item"/></td>
                <td><input onChange={updateSupplier} name="supplier" placeholder="Your Name"/></td>
                <td><button onClick={() => { createItem();}}>Sign me Up!</button></td>
            </tr>
        </tbody>
    </table>
<br/><h3>Current Menu</h3>
<table>
        <thead>
            <tr><th>Item</th><th>Volunteer</th></tr>
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