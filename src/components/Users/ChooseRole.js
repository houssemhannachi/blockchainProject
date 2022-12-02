import React from "react";
import {ethers} from "ethers"
import { useState, createContext, } from "react";
import { useNavigate, } from "react-router-dom";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    ListGroupItem,
    ListGroup,
    Container,
    Row,
    Col
  } from "reactstrap";
import abi from "../../ABI.json";
import { useContext } from "react";
import { wallet } from "Store";



const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const myAddress= signer.getAddress();


const ABI = abi.ABI


   

export default function ChooseRole() {

  let navigate=useNavigate()
  let address = useContext(wallet);
  const myContract =new  ethers.Contract(address,ABI,signer);
  const [role, setRole] = useState("");
  const [myaddresss, setMyaddresss] = useState("");
  



  const handleChange = (e) => {
    setRole(e.target.value);
  };
  const Submit = async (e) =>{
   
    if(role=="farmer"){await myContract.add_farmer(myAddress).then((res)=>{navigate("/products")})
    }
        
    else if(role=="distributor"){    await myContract.add_destributer(myAddress).then((res)=>{navigate("/products")})
    }  

    else if(role=="retailer"){    await myContract.add_retailer(myAddress).then((res)=>{navigate("/products")})       
    } 

    else if(role=="consumer"){    await myContract.add_consumer(myAddress).then((res)=>{navigate("/products")})    
    }    
    
     
    
    
    

  }
  React.useEffect(() => {
    const getMyAddress= async () => {
      const addr=await signer.getAddress().then((res)=>{setMyaddresss(addr)})
    }
    getMyAddress();
    document.body.classList.toggle("landing-page");
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, [myAddress]);
  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/blob.png")}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path2.png")}
          />
          <img
            alt="..."
            className="shapes triangle"
            src={require("assets/img/triunghiuri.png")}
          />
          <img
            alt="..."
            className="shapes wave"
            src={require("assets/img/waves.png")}
          />
          <img
            alt="..."
            className="shapes squares"
            src={require("assets/img/patrat.png")}
          />
          <img
            alt="..."
            className="shapes circle"
            src={require("assets/img/cercuri.png")}
          />
          <div className="centerImage">
            <div id="images">
              <h3 className="mb-5">Choose your role</h3>
              <Row>
                <Col sm="3" xs="6">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="farmer"
                      className="card-input-element"
                      onChange={handleChange}
                    ></input>
                    <div className="card-input">
                      <small className="d-block text-uppercase font-weight-bold mb-4">
                        Farmer
                      </small>
                      <img
                        alt="..."
                        className="img-fluid rounded"
                        src={require("assets/img/farmer.png")}
                        style={{ width: "150px" }}
                      />
                    </div>
                  </label>
                </Col>
                <Col sm="3" xs="6">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="distributor"
                      onChange={handleChange}
                      className="card-input-element"
                    ></input>
                    <div className="card-input">
                      <small className="d-block text-uppercase font-weight-bold mb-4">
                        Distributor
                      </small>
                      <img
                        alt="..."
                        className="img-fluid rounded"
                        src={require("assets/img/dist.png")}
                        style={{ width: "150px" }}
                      />
                    </div>
                  </label>
                </Col>
                <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      className="card-input-element"
                      onChange={handleChange}
                      value="retailer"
                    ></input>
                    <div className="card-input">
                      <small className="d-block text-uppercase font-weight-bold mb-4">
                        Retailer
                      </small>
                      <img
                        alt="..."
                        className="img-fluid rounded"
                        src={require("assets/img/retailer.png")}
                        style={{ width: "150px" }}
                      />
                    </div>
                  </label>
                </Col>
                <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="consumer"
                      onChange={handleChange}
                      className="card-input-element"
                    ></input>
                    <div className="card-input">
                      <small className="d-block text-uppercase font-weight-bold mb-4">
                        Consumer
                      </small>
                      <img
                        alt="..."
                        className="img-fluid rounded"
                        src={require("assets/img/consumer.png")}
                        style={{ width: "150px" }}
                      />
                    </div>
                  </label>
                </Col>
              </Row>
            </div>
          </div>
          <div className="confirmButton">
            <Button
              className="nav-link d-none d-lg-block"
              color="success"
              onClick={(e) =>{Submit()}}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
