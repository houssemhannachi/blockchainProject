import classnames from "classnames";
import { Routes, Route, useParams } from 'react-router-dom';
import {ethers} from "ethers";
import React,{useState,useContext} from "react";

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
import { wallet } from "Store";



const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();


const ABI = abi.ABI


const carouselItems = [
  {
    src: require("assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: "Big City Life, United States"
  },
  {
    src: require("assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States"
  },
  {
    src: require("assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: "Stocks, United States"
  }
];

let ps = null;

export default function ProductHistory(prop) {
  const params = useParams();
  const address = useContext(wallet);
  const myContract =new  ethers.Contract(address,ABI,signer);
  const [item,setItem]=useState(null);
  const [tabs, setTabs] = React.useState(1);
  const [date, setDate] = React.useState(null);
  React.useEffect(() => {
    const getData = async () =>{
      myContract.getItemById(params.id).then((res)=>{
        setItem(res);
      })
    }
    getData();
    let date = new Date(item!==null?ethers.BigNumber.from(item?.productDate).toNumber():"ok")
    let date_utc = date.toDateString();
    setDate(date_utc)
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
  }, [item]);
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
              <Col lg="3" md="6">
                {/* <h1 style={{fontSize : "18px"}} className="profile-title text-left">{item!==null?item.originFarmerID:'unkown'}</h1> */}
                <h5  className="text-on-back">{item!==null?ethers.BigNumber.from(item?.productNumber).toString():"ok"}</h5>
                <p className="profile-description">
                  
                </p>
                
              </Col>
              <Col className="ml-auto mr-auto" lg="9" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <h4 className="title">{item!==null?item.productNotes:'unkown'}</h4>
                  </CardHeader>
                  <CardBody>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead >
                            <tr>
                              <th className="header">Original farmer</th>
                              <th className="header">{item!==null?item.originFarmerID:'unkown'}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th className="header">Distributor</th>
                              <th className="header">{item!==null?item.distributorID:'unkown'}</th>
                            </tr>
                            <tr>
                              <th className="header">Retailer</th>
                              <th className="header">{item!==null?item.retailerID:'unkown'}</th>
                            </tr>
                            <tr>
                              <th className="header">Consumer</th>
                              <th className="header">{item!==null?item.consumerID:'unkown'}</th>
                            </tr>
                            <tr>
                              <th className="header">Time stamp</th>
                              <th className="header">{item!==null?ethers.BigNumber.from(item?.productDate).toString():"ok"}</th>
                            </tr>
                            <tr>
                              <th className="header">Formatted date</th>
                              <th className="header">{date}</th>
                            </tr>
                            
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
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
