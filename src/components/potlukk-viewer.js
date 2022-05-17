import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'

export default function PotlukkViewer(){
    const {id} = useParams();
    const navigate = useNavigate();

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
        <tr><td class = "potluckItemInput">{i.description}</td><td class = "potluckItemInput"><input onChange={updateSupplier} 
            placeholder="Your Name"/></td><td class = "potluckItemInput"><Button variant = "primary" size = "sm"
            onClick={() => { bringItem(i);}}>Sign me up!</Button></td></tr>);


    const fulfilled = items.filter(i => i.status==="Fulfilled").map(i =>
        <tr><td class = "potluckItemInput">{i.description}</td><td>{i.supplier}</td></tr>);    


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
        if(description==""){
            alert('Please input an item description');
        }else if(supplier == ""){
            alert('Please input your name as the supplier.');
        }else{
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
     }


//Update item to Fulfilled and add volunteer's (supplier's) name; PATCH to DB
     async function bringItem(item){
         if(supplier ==""){
            alert('Please input your name as the supplier.');
         }else{
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
     }

    //Validate user is the owner when "Edit Potlukk" button is clicked
    async function validateUser(){

        const response = await fetch(`http://potlukk-env.eba-yammgqbq.us-west-1.elasticbeanstalk.com/potlucks/${id}`);
        const body = await response.json();
        const creator = body.creator;

        //Check if user is signed in
        //Then check to see if their username matches the potluck creator
        const user = JSON.parse(sessionStorage.getItem("user"));
        if(user === null){

            alert("Please sign in first to edit your potluck.");          

            //Commented default username for debugging
            //setUsername("jlanfgston");
        }
        else{
            const username = user.username;

            if(username !== creator){
                alert("Sorry, you are not authorized to edit this Potluckk");
            }else{
                navigate(`/additems/${id}`);
            }
        }
    }

    return(<>

    <Button href="/" id = "home" variant="primary" size = "lg">Home</Button>
    <img id ="logo" src="../../images/PotlukkNameLogo.png" alt="Potlukk logo"></img>

    <div id="potluckViewer" align = "center">
        <h1>{potluck.description}</h1>
        <h4>{date}</h4>
        <h3>Sign Up To Contribute! </h3> <br />
    
    
        <table id = "itemTable">

            <thead>
                <th>
                    <h3>Wanted items</h3> 
                    <hr />
                </th>
                <tr>
                    <th>Item</th>
                    <th>Volunteer</th>
                    <th><Button  onClick={() => { validateUser();}} id = "editPotluckButton" variant="warning" size = "sm">Edit Potluck</Button></th>
                    </tr>
            </thead>
            <tbody>
                {missing}
                <tr>
                    <td class = "potluckItemInput">
                        <input onChange={updateDescription} name="otherItem" placeholder="Other Item"/>
                    </td>
                    <td class = "potluckItemInput">
                        <input onChange={updateSupplier} name="supplier" placeholder="Your Name"/>
                    </td>
                    <td class = "potluckItemInput">
                        <Button variant = "primary" size = "sm" onClick={() => { createItem();}}>Sign me Up!</Button>
                    </td>
                </tr>
            </tbody> <br />

            <h3 id = "potluckItemInput">Current Menu</h3>
            <hr />
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Volunteer</th>
                </tr>
            </thead>

            <tbody>
                {fulfilled}
            </tbody>

        </table>
    </div>
    
    </>)
}