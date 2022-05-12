
export default function PotlukkViewer(){

    //Can we shuffle items to show needed all together?
    //Button only on items no one is signed up for?
    return(<>
    <h1>Potluck Name : Potlukk Date</h1>
    <br/><h3>Sign Up To Contribute!</h3>
    <table>
        <thead>
            <tr><th>Item</th><th>Status</th><th>Supplier</th></tr>
        </thead>
        <tbody>
            <tr><td>Potatos</td><td>Needed</td><td>John</td><td><button>Sign me Up!</button></td></tr>
            <tr><td>Cake</td><td>Wanted</td><td>Bill</td><td><button>Sign me Up!</button></td></tr>
        </tbody>
    </table>
<br/><h3>Current Menu</h3>
<table>
        <thead>
            <tr><th>Item</th><th>Status</th><th>Supplier</th></tr>
        </thead>
        <tbody>
            <tr><td>Burgers</td><td>Fulfilled</td><td>John</td></tr>
        </tbody>
    </table>
<br/>
    <button>Edit Potluck</button>
    <br/>
    <button>Return to Home</button>

    </>)
}