
import React,{useState} from "react";
import {ethers} from "ethers";
import { useNavigate } from "react-router-dom";
import ActionButtom from "./ActionButton"
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
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

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import abi from "../../ABI.json";
import { useContext } from "react";
import { wallet } from "Store";



const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();


const ABI = abi.ABI


   



let ps = null;


export default function Products() {
  let navigate=useNavigate()
  const address = useContext(wallet);
  const myContract =new  ethers.Contract(address,ABI,signer);
   

  const [tabs, setTabs] = React.useState(1);
  const [data, setData] = React.useState([]);
  const [code, setCode] = useState(0);
  const [farmerName, setFarmerName] = useState("");
  const [farmName, setFarmName] = useState("");
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState(0);
  const Submit = async () =>{
    await myContract.produceItemByFarmer(code,farmerName,farmName,"1666","2549",productname,price).then(()=>{navigate("/products")})
  }
   const PutOnSale = async () =>{
     await myContract.shippedItemByFarmer(1)
   }

  const handleChange = (e)=>{
    if(e.target.name==="code"){    
      setCode(e.target.value);
     
    }
    else if(e.target.name==="farmername"){    
      setFarmerName(e.target.value);
     
    }
    else if(e.target.name==="farmname"){    
      setFarmName(e.target.value);
     
    }
    else if(e.target.name==="product"){    
      setProductname(e.target.value);
     
    }
    else if(e.target.name==="amount"){    
      setPrice(e.target.value);
     
    }

  }
  const getData= async () => {
    await myContract.callStatic.get_all_items().then((res)=>{setData(res);
    })
   
   }
  React.useEffect(() => {
    getData()
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("profile-page");
    };
  }, []);
  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="dots"
            src={require("assets/img/dots.png")}
          />
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png")}
          />
          <Container className="align-items-center">
            <Row>
              <Col className="ml-auto mr-auto" lg="12" md="2">
                <Card className="card-coin card-plain">
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#pablo"
                        >
                          Products
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#pablo"
                        >
                          Add Product
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Farmer Name</th>
                              <th className="header">Farme Name</th>
                              <th className="header">Product State</th>
                              <th className="header">Product Name</th>
                              <th className="header">Product Price</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((item) => {
                              return (
                                <>
                                  <tr>
                                    <td>{item.originFarmName}</td>
                                    <td>{item.originFarmInformation}</td>
                                    <td>{item.itemState}</td>
                                    <td>{item.productNotes}</td>
                                    <td>{ethers.BigNumber.from(item.productPrice).toString()}</td>
                                    {
                                      <td>
                                        <ActionButtom
                                          id={item.productNumber}
                                          name={item.itemState}
                                          price={item.productPrice}
                                          code={item.productCode}
                                        />
                                      </td>
                                    }
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Product Code</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                name="code"
                                placeholder="Product code"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                type="number"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Farmer Name</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                name="farmername"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                placeholder="farmer name"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Farm Name</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                name="farmname"
                                placeholder="Farmer Name"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Product</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                name="product"
                                placeholder="Farmer Name"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                name="amount"
                                placeholder="1.587"
                                type="number"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          onClick={() => {
                            Submit();
                          }}
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Latest Crypto News</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>The Daily: Nexo to Pay on Stable...</td>
                            </tr>
                            <tr>
                              <td>Venezuela Begins Public of Nation...</td>
                            </tr>
                            <tr>
                              <td>PR: BitCanna – Dutch Blockchain...</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}
