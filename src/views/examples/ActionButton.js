import React,{useEffect,useState} from 'react';
import {ethers} from "ethers"
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Label,
    FormGroup,
    Form,
    Input,
    FormText,
    NavItem,
    NavLink,
    Nav,
    Table,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    UncontrolledCarousel
  } from "reactstrap";
  import abi from "../../ABI.json";
  import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { wallet } from 'Store';
import { parseEther } from 'ethers/lib/utils';



const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();


const ABI = abi.ABI





const ActionButton = (prop) => {
    let navigate=useNavigate();
    const address = useContext(wallet);
    const myContract =new  ethers.Contract(address,ABI,signer);
    const [action, setAction] = useState(null);
    const [price,setPrice] = useState(null);
    const [productCode,setProductCode] = useState(null);
    const [id,setId] = useState(0);
    const viewHistory =()=>{
         navigate(`/productHistory/${id}`)

    }

    const handleSubmit = () =>{
        if(action ==0){
            myContract.sellItemByFarmer(productCode,price);


        }
        else if(action==1){
            myContract.purchaseItemByDistributor(productCode,{value:1});
        }
        else if(action==2){
            myContract.shippedItemByFarmer(productCode);
        }
        else if(action==3){
            myContract.receivedItemByDistributor(productCode);
        }
        else if(action==4){
            myContract.processedItemByDistributor(productCode);
        }
        else if(action==5){
            myContract.packageItemByDistributor(productCode);
        }
        else if(action==6){
            myContract.sellItemByDistributor(productCode,price);
        }
        else if(action==7){
            myContract.purchaseItemByRetailer(productCode,{value:1});
        }
        else if(action==8){
            myContract.shippedItemByDistributor(productCode);
        }
        else if(action==9){
            myContract.receivedItemByRetailer(productCode);
        }
        else if(action==10){
            myContract.sellItemByRetailer(productCode,price);
        }
        else if(action==11){
            myContract.purchaseItemByConsumer(productCode);
        }
        




    }
    const provideButton = () =>{
        if(action==0){
            return <Button onClick={() => {handleSubmit()}} >Sell Product By farmer</Button>
        }
        else if(action==1){
            return <Button onClick={() => {handleSubmit()}} >Buy Product By distributor</Button>
        }
        else if(action==2){
            return <Button onClick={() => {handleSubmit()}} >Ship Item By Farmer</Button>
        }
        else if(action==3){
            return <Button onClick={() => {handleSubmit()}} >Recieve Item By distributor  </Button>
        }
        else if(action==4){
            return <Button onClick={() => {handleSubmit()}} >process Item</Button>
        }
        else if(action==5){
            return <Button onClick={() => {handleSubmit()}} >package Item</Button>
        }
        else if(action==6){
            return <Button onClick={() => {handleSubmit()}} >sell Item By Distributor</Button>
        }
        else if(action==7){
            return <Button onClick={() => {handleSubmit()}} >Buy Item by retailer</Button>
        }
        else if(action==8){
            return <Button onClick={() => {handleSubmit()}} >ship Item by distributor</Button>
        }
        else if(action==9){
            return <Button onClick={() => {handleSubmit()}} >recieve Item by retailer</Button>
        }
        else if(action==10){
            return <Button onClick={() => {handleSubmit()}} >Sell Item by retailer </Button>
        }
        else if(action==11){
            return <Button onClick={() => {handleSubmit()}} >Purchase Item by Consumer</Button>
        }
        else if(action==12){
            return <Button onClick={() => {viewHistory()}} > Already bought this Item</Button>
        }

    }
    useEffect(() => {
        const setNewAction = () =>{
            setAction(prop.name);
            setPrice(prop.price);
            setProductCode(prop.code);
            setId(prop.id)
        }
    setNewAction();
      
    }, [action]);
  return (
    <>
        {provideButton()}
        </>
  );
}

export default ActionButton;
