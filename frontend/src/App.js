import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import detectEthereumProvider from '@metamask/detect-provider';
import ReactDOM from "react-dom";
import tokenContract from "./contract.json";

function App() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var signer ;
    const connectWallet = async () => {
        await provider.send('eth_requestAccounts', []);}
    signer = provider.getSigner();
    connectWallet();
    const contractAddress = '0x70e6835b709673696444dcf3b62c5d25dbe0120f';
    const ABI = tokenContract.abi;
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    const [storedPrice, setStoredPrice] = useState(contract.getProduct2());
    const [textInput, setTextInput] = React.useState('');
    const [rating, setrating] = useState('');
    const [order, setorder] = useState('');



    const getStoredPrice = async () => {
      try {
        const contractPrice = await contract.getProduct2();
        var a= contractPrice;
        console.log(contractPrice.toString(),"hh")
        setStoredPrice(contractPrice);
        return  contractPrice;
      } catch (error) {
        console.log("getStoredPrice Error: ", error);
      }
    }
    const getorder2 = async () => {
      try {
        const contractPrice = await contract.Getorder();
        var a= contractPrice;
        console.log(contractPrice.toString(),"order")
        setorder(contractPrice);
        return  contractPrice;
      } catch (error) {
        console.log("getStoredPrice Error: ", error);
      }
    }


    async function ADDPRODUCT() {
      try {
        const transaction = await contract.addProduct("shoes",1000);
        await transaction.wait();
        await getStoredPrice();
      } catch (error) {
        console.log("updateNewPrice Error: ", error);
      }
  
    }

    async function addOrder() {
      try {
        const transaction = await contract.addOrder(1);
        await transaction.wait();
        await getorder2();
      } catch (error) {
        console.log("updateNewPrice Error: ", error);
      }
    }

    async function addRating() {
      try {
        const transaction = await contract.addRating(0,3);
        await transaction.wait();
        await getStoredPrice();
      } catch (error) {
        console.log("updateNewPrice Error: ", error);
      }
    }

    const GetRating = async () => {
      try {
        const contractPrice = await contract.GetRating(0);
        var a= contractPrice;
        setrating(contractPrice);
        return  contractPrice;
      } catch (error) {
        console.log("getStoredPrice Error: ", error);
      }
    }



    const Getorder = async () => {
      try {
        const contractPrice = await contract.Getorder();
        var a= contractPrice;
        setorder(contractPrice);
        return  contractPrice;
      } catch (error) {
        console.log("getStoredPrice Error: ", error);
      }
    }




    async function showAllproducts() {
      Object.keys(storedPrice).forEach(function(key, index) {
        return ((storedPrice[key].name));
      })
  
    }
    
    useEffect(() => {
      
   getStoredPrice().catch(console.error);
   setStoredPrice(storedPrice);
   
    // const map1 = storedPrice.map(x => x);
    // console.log(map1,"gyigygiyyyy")
    // setStoredPrice(map1)

  }, [console.log(storedPrice,"ygyyggygygy2"),
,
]
  )
  const handleChange = (event) => {
    setTextInput(event.target.value);
  }


  const NamesList = () => (
    <div>
         { Object.keys(storedPrice).map((key)=> 
        < li>{parseInt(storedPrice[key].id)} {" "}
        {storedPrice[key].name} {" "}
       {parseInt(storedPrice[key].price)}
        </li>
        )}
      
    </div>
);

const vieworder = () => (
  <div>
    { Object.keys(order).map((key)=> 
        < li>{parseInt(order[key].id)} {" "}
       {parseInt(order[key].ProductId)}
        </li>
        )}

  </div>
);

const viewratting = () => (
  <div>
  
  { Object.keys(rating).map((key)=> 
        < li>{parseInt(rating[key].ProductId)} {" "}
       {parseInt(rating[key].rating)}
        </li>
        )}

    
  </div>
);


  
      return (
        
        <div className="container">
          {/* {storedPrice && storedPrice.map(user => (
                <div key={user.name}>
                    <p>{user.id}</p>
                    <p>{user.balance}</p>
                </div>
            ))} */}
           
          <div className="row mt-5">
    ALL PRODUCTS
             {/* <div className="col">
              <h3>Stored Price</h3>
              <p>Stored ETH/USD Price: {storedPrice}</p>
            </div>  */ NamesList()}
     <div className="col">
     {<button type="submit" className="btn btn-dark" 
    onClick={addOrder}>Add Order</button>

    
     /* {
      

              storedPrice && storedPrice.map( ( {name, id} ) => {
                  <p key={name}>{id}</p>
            })
            } */}
            {/* {
                Object.keys(storedPrice).forEach(function(key, index) {
                  return  <li>{(storedPrice[key].name)}</li> ;
                })
            } */}
            </div>


            

            <div className="col">
              <h3>ADD Product</h3>
              On clicking this a product named shoes of 1000 rupess will be added in all products.
              (It is not hard coded in the contract. I was just unable to take input from the user using react js.)
              <li> </li>  <button type="submit" className="btn btn-dark" 
    onClick={ADDPRODUCT}>Add Product</button>





            </div>
            <div className="col">
              <h3>Add Rating</h3>
             
              <li> </li>  <button type="submit" className="btn btn-dark" 
    onClick={addRating}>Add Rating</button>
            </div>


            <div className="col">
              <h3>Get Rating</h3>
             
              <li> </li>  <button type="submit" className="btn btn-dark" 
    onClick={vieworder}>Get Rating</button>
            </div>


            <div className="col">
              <h3>Get order</h3>
             
              <li> </li>  <button type="submit" className="btn btn-dark" 
    onClick={viewratting}>Get order</button>
            </div>



            

          </div>
        </div>
        
      );
      
}

export default App;
