import React, { useEffect, useState, useReducer } from "react";
import ColumnZero from "../components/ColumnZero";
import ColumnZeroTwo from "../components/ColumnZeroTwo";
import ColumnZeroThree from "../components/ColumnZeroThree";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import bar from '../../assets/images/bar.png';
import Footer from "../components/footer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import defaultImg from "../../assets/images/default.png";
import UserNfts from "./UserNft/UserNfts";
import OnSaleUserNfts from "./UserNft/OnSaleUserNfts";
import UserFavNft from "./UserNft/UserFavNft";
import { useDispatch, useSelector } from "react-redux";
import http from "../../Redux/Api/http";
import { PulseLoader, BounceLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import bannerimg from '../../assets/images/profile-banner.png';
import funkloader from '../../assets/images/funk_loader.gif';
import rlf from '../../assets/images/RLF-icon.png';
import { useHistory } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import API from '../../Redux/Api';
import MyNfts from './MyNfts/MyNfts';

const GlobalStyles = createGlobalStyle``;
const initialState = { isDisable: false };
const reducer = (state, action) => {
  switch (action.type) {
    case 'clicked':
      return { isDisable: true };
    case 'notClicked':
      return { isDisable: false };
  }
}

var arr = []

const UserProfile = function () {
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const [userData, setUserData] = useState();
  const [itemsCounter, setItemsCounter] = useState();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [text, settext] = useState("")
  const [showMore, setShowMore] = useState(false);
  const history = useHistory();
  const [state, disableDispatch] = useReducer(reducer, initialState)
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();
  const [reset, setResetState] = useState(false);
  const [error, setError] = useState(false);
  const [allCollections, setAllCollections] = useState();


  const [setter, setSetter] = React.useState([]);

  const [filterState, setFilterState] = React.useState({
    topFilter: "OnSale",
    walletAddress: window.location.pathname.split("/")[2],
    pageSize: 10,
    currentPage: 1,
    buyNow: false,
    onAuctions: false,
    hasOffers: false,
    image: false,
    video: false,
    categories: [

    ],
    min: 0,
    max: 0,
    sortBy: "",
    sortIndex: 0,
    search: ""
  });

  useEffect(async () => {
    let params = window.location.pathname;
    setAddress(params.split("/")[2]);
    await http
      .get(
        httpUrl +
        `/api/v1/Account/GetAccount?address=${params.split("/")[2]}`
      )
      .then((res) => {
        setUserData(res.data.data);
        setLoading(false);
        const text1 = res?.data?.data?.accountViewModel?.bio ? res?.data?.data?.accountViewModel?.bio?.toString() : ''
        settext(text1)
      })
      .catch((error) => {
      });
  }, []);
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const handleBtnClick = () => {
    setFilterState((prev) => {
      return { ...prev, topFilter: 'OnSale' }
    })
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setFilterState((prev) => {
      return { ...prev, topFilter: 'Owner' }
    })
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    setFilterState((prev) => {
      return { ...prev, topFilter: 'Favorite' }
    })
    setOpenMenu2(!openMenu2);
    setOpenMenu(false);
    setOpenMenu1(false);
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };


  const colFilter = (id) => {
    // setCollectionFilterState((prev, index) => collectionFilterState.categories.some(element => element == id) ? { ...prev, categories: collectionFilterState.categories.filter((item, i) => item != id) } : { ...prev, categories: [...collectionFilterState.categories, id] })
    arr.indexOf(id) === -1 ? arr.push(id) : arr.splice(arr.indexOf(id), 1);
    API.GetAllCollectionFilterApi.GetAllCollectionsByCatgoriesIds({ catgoryId: arr }).then((response) => {
      setAllCollections(response.data.data)
    })

  }

  const priceHandler = () => {
    if (minValue > maxValue) {
      setError(true)
      return
    }
    if (maxValue == 0) {
      setError(true)
      return
    }
    if ((minValue && maxValue) && (minValue <= maxValue)) {
      setResetState(true)
      setFilterState((prev) => {
        return { ...prev, min: parseFloat(minValue), max: parseFloat(maxValue) }
      })
      setError(false)
    }
  }

  return (
    <div className="gradient-bg-light">
      {loading ? (
        <>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="col-sm-12 d-flex justify-content-center">
          <img width={100} height={100} src={funkloader}/>
          </div>
        </>
      ) : (
        <>
          <GlobalStyles />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
          />
          <div className="profile-banner">
            <div className="container">
              <div className="banner">
                <div className="bg-layer" style={{
                  backgroundImage: `url(${userData?.profileBannerImage?.replaceAll(
                    "\\",
                    "/"
                  )})`,
                }}></div>
                {/* <img src={bannerimg} /> */}
                <div className="share-list-pnl">
                  <ul className="share-list-list">
                    {/* <li><a href="#"><i class="fa fa-share-alt"></i></a></li> */}
                  </ul>
                </div>

                <div className="profile-image-holder">
                  <div className="img-pnl">
                    <img src={userData?.profileImage ?userData?.profileImage : defaultImg} alt="" />
                    {/* <span className="check-span">
                      <i class="fa fa-check"></i>
                    </span> */}
                  </div>
                  <div className="text-pnl">
                    <h2>
                      {userData?.username ? userData?.username : "Unnamed"}
                    </h2>
                    <p id="wallet">
                      {/* <span className="email-span" style={{ wordWrap: 'break-word' }}>{userData?.name} </span><br /> */}
                      {/* <img src={rlf} style={{
                        display: "inline-block",
                        maxWidth: "20px",
                        marginRight: "4px",
                        marginBottom: "4px"

                        // display: inline-block;
                        // max-width: 20px;
                        // margin-right: 4px;
                      }} /> */}
                      {userData?.address}{" "}
                      <CopyToClipboard
                        text={userData?.address}
                        onCopy={() => {
                          disableDispatch({ type: 'clicked' })
                          toast.success("Address copied successfully", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                          });
                          setTimeout(() => {
                            disableDispatch({ type: 'notClicked' })
                          }, 5000);
                        }}
                      >
                        <button
                          id="btn_copy"
                          title="Copy Address"
                          disabled={state.isDisable}
                        >
                          Copy
                        </button>
                      </CopyToClipboard>

                    </p>

                    <div className="user-social-contacts">
                      {
                        userData?.instagramLink && userData?.instagramLink != "null" ?
                          <a target="_blank" href={userData?.instagramLink}><i className="fa fa-instagram"></i></a>
                          : <></>
                      }
                      {
                        userData?.twitterLink && userData?.twitterLink != "null" ?
                          <a target="_blank" href={userData?.twitterLink}><i className="fa fa-twitter"></i></a>
                          : <></>
                      }
                      {
                        userData?.yourSiteLink && userData?.yourSiteLink != "null" ?
                          <a target="_blank" href={userData?.yourSiteLink}><i className="fa fa-link"></i></a>
                          : <></>
                      }
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>



          <section className="container p-t-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="items_filter">
                  <ul className=" de_nav">
                    <li id="Mainbtn" className="active">
                      <span onClick={handleBtnClick}>On Sale</span>
                    </li>
                    <li id="Mainbtn1" className="">
                      <span onClick={handleBtnClick1}>FUNKY NFTs</span>
                    </li>
                    <li id="Mainbtn2" className="">
                      <span onClick={handleBtnClick2}>Liked</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='tab-container full-div'>
              {/* Side Filter */}
              <div className="side-filter-bar">
                <div className="filter-head-pnl">
                  <h5>Filters</h5>
                  <i className="fa fa-filter"></i>
                </div>
                <div className="filter-body-pnl">
                  <Accordion id='accordion'>

                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                          Status <i className='fa fa-angle-down'></i>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <form>
                            <div class="form-check">
                              <input onChange={() => setFilterState((prev) => filterState.buyNow ? { ...prev, buyNow: false } : { ...prev, buyNow: true })} class="form-check-input" type="checkbox" value="" id="defaultCheck8" />
                              <label class="form-check-label" for="defaultCheck8">
                                Buy Now
                              </label>
                            </div>
                            <div class="form-check">
                              <input onChange={() => setFilterState((prev) => filterState.onAuctions ? { ...prev, onAuctions: false } : { ...prev, onAuctions: true })} class="form-check-input" type="checkbox" value="" id="defaultCheck9" />
                              <label class="form-check-label" for="defaultCheck9">
                                On Auctions
                              </label>
                            </div>
                            <div class="form-check">
                              <input onChange={() => setFilterState((prev) => filterState.hasOffers ? { ...prev, hasOffers: false } : { ...prev, hasOffers: true })} class="form-check-input" type="checkbox" value="" id="defaultCheck10" />
                              <label class="form-check-label" for="defaultCheck10">
                                Has Offers
                              </label>
                            </div>
                          </form>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>


                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                          Categories <i className='fa fa-angle-down'></i>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <form>
                            <div class="form-check">
                              {/* {console.log()} */}
                              <input onChange={() => {
                                if (setter.includes(1)) {
                                  var index = setter.indexOf(1)

                                  var spl = setter.splice(index, 1)
                                  var fil = setter.filter((prev) => prev.id != 1)
                                  setSetter((prev) => [...prev, fil])
                                }
                                else {
                                  setSetter((prev) => [...prev, 1])
                                }
                                setFilterState((prev, index) => filterState.categories.some(element => element == 1) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 1) } : { ...prev, categories: [...filterState.categories, 1] })
                              }} class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                              <label class="form-check-label" for="defaultCheck1">
                                Art
                              </label>
                            </div>
                            <div class="form-check">
                              <input onChange={() => {
                                if (setter.includes(2)) {
                                  var index = setter.indexOf(2)
                                  var spl = setter.splice(index, 2)
                                  var fil = setter.filter((prev) => prev.id != 2)
                                  setSetter((prev) => [...prev, fil])
                                }
                                else {
                                  setSetter((prev) => [...prev, 2])
                                }
                                setFilterState((prev, index) => filterState.categories.some(element => element == 2) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 2) } : { ...prev, categories: [...filterState.categories, 2] })
                              }
                              } class="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                              <label class="form-check-label" for="defaultCheck2">
                                Music
                              </label>
                            </div>
                            <div class="form-check">
                              <input onChange={() => {
                                if (setter.includes(3)) {
                                  var index = setter.indexOf(3)
                                  var spl = setter.splice(index, 3)
                                  var fil = setter.filter((prev) => prev.id != 3)
                                  setSetter((prev) => [...prev, fil])
                                }
                                else {
                                  setSetter((prev) => [...prev, 3])
                                }
                                setFilterState((prev, index) => filterState.categories.some(element => element == 3) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 3) } : { ...prev, categories: [...filterState.categories, 3] })
                              }
                              } class="form-check-input" type="checkbox" value="" id="defaultCheck3" />
                              <label class="form-check-label" for="defaultCheck3">
                                Photography
                              </label>
                            </div>
                            <div class="form-check">
                              <input onChange={() => {
                                if (setter.includes(4)) {
                                  var index = setter.indexOf(4)
                                  var spl = setter.splice(index, 4)
                                  var fil = setter.filter((prev) => prev.id != 4)
                                  setSetter((prev) => [...prev, fil])
                                }
                                else {
                                  setSetter((prev) => [...prev, 4])
                                }
                                setFilterState((prev, index) => filterState.categories.some(element => element == 4) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 4) } : { ...prev, categories: [...filterState.categories, 4] })
                              }
                              } class="form-check-input" type="checkbox" value="" id="defaultCheck4" />
                              <label class="form-check-label" for="defaultCheck4">
                                Utility
                              </label>
                            </div>
                            <div class="form-check">
                              <input onChange={() => {
                                if (setter.includes(5)) {
                                  var index = setter.indexOf(5)
                                  var spl = setter.splice(index, 5)
                                  var fil = setter.filter((prev) => prev.id != 5)
                                  setSetter((prev) => [...prev, fil])
                                }
                                else {
                                  setSetter((prev) => [...prev, 5])
                                }
                                setFilterState((prev, index) => filterState.categories.some(element => element == 5) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 5) } : { ...prev, categories: [...filterState.categories, 5] })
                              }
                              } class="form-check-input" type="checkbox" value="" id="defaultCheck5" />
                              <label class="form-check-label" for="defaultCheck5">
                                Certificate
                              </label>
                            </div>
                            <div class="form-check">
                              <input onChange={() => {
                                if (setter.includes(6)) {
                                  var index = setter.indexOf(6)
                                  var spl = setter.splice(index, 6)
                                  var fil = setter.filter((prev) => prev.id != 6)
                                  setSetter((prev) => [...prev, fil])
                                }
                                else {
                                  setSetter((prev) => [...prev, 6])
                                }
                                setFilterState((prev, index) => filterState.categories.some(element => element == 6) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 6) } : { ...prev, categories: [...filterState.categories, 6] })
                              }
                              } class="form-check-input" type="checkbox" value="" id="defaultCheck6" />
                              <label class="form-check-label" for="defaultCheck6">
                                Collectibles
                              </label>
                            </div>
                            <div class="form-check">
                              <input onChange={() => {
                                if (setter.includes(7)) {
                                  var index = setter.indexOf(7)
                                  var spl = setter.splice(index, 7)
                                  var fil = setter.filter((prev) => prev.id != 7)
                                  setSetter((prev) => [...prev, fil])
                                }
                                else {
                                  setSetter((prev) => [...prev, 7])
                                }
                                setFilterState((prev, index) => filterState.categories.some(element => element == 7) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 7) } : { ...prev, categories: [...filterState.categories, 7] })
                              }
                              } class="form-check-input" type="checkbox" value="" id="defaultCheck7" />
                              <label class="form-check-label" for="defaultCheck7">
                                Sports
                              </label>
                            </div>
                          </form>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>


                    <>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            Price <i className='fa fa-angle-down'></i>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                          <Card.Body>
                            <div className='bar-pnl'>
                              <div>
                                <div className="col-lg-12 col-md-6 col-sm-12">
                                  <div className="my-3"></div>
                                  <h5 className="txt-dark">Min price</h5>
                                  <input onKeyPress={(event) => {
                                        if (/[+-]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                      }} type="number" className="form-control-custom inputtextColor" value={minValue}
                                    onChange={e => { setError(false); setMinValue(e.target.value) }}
                                  />
                                </div>
                              </div>
                              {
                                parseFloat(minValue) > parseFloat(maxValue) && <div className="col-lg-12 col-md-6 col-sm-12" style={{ color: "red" }}>Min value can not be greater then Max value</div>
                              }
                              <div>
                                <div className="col-lg-12 col-md-6 col-sm-12">
                                  <div className="my-3"></div>
                                  <h5 className="txt-dark">Max price</h5>
                                  <input onKeyPress={(event) => {
                                        if (/[+-]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                      }} type="number" className="form-control-custom inputtextColor" value={maxValue}
                                    onChange={e => { setError(false); setMaxValue(e.target.value) }}
                                  />
                                </div>
                              </div>
                              <div className='col-md-12 text-align-left'>
                                <button disabled={error} onClick={() => priceHandler()} className={error ? "reg-btn grey" : "reg-btn blue"} href="javascript:void(0);">Apply </button>
                                {reset && (
                                  <button onClick={() => {
                                    setError(false)
                                    setMinValue(0)
                                    setMaxValue(0)
                                    setFilterState((prev) => {
                                      return { ...prev, min: 0, max: 0 }
                                    })
                                    setResetState(false)
                                  }} className="reg-btn blue" style={{ padding: '10px 13px', marginLeft: '10px' }}>
                                    <i class="fas fa-sync m-l-1"></i>
                                  </button>
                                )}
                              </div>
                            </div>
                            <p>
                            </p>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="3">
                            File  <i className='fa fa-angle-down'></i>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="3">
                          <Card.Body>
                            <form>
                              <div class="form-check">
                                <input onChange={() => setFilterState((prev) => filterState.image ? { ...prev, image: false } : { ...prev, image: true })} class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
                                <label class="form-check-label" for="defaultCheck11">
                                  Image
                                </label>
                              </div>
                              <div class="form-check">
                                <input onChange={() => setFilterState((prev) => filterState.video ? { ...prev, video: false } : { ...prev, video: true })} class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
                                <label class="form-check-label" for="defaultCheck11">
                                  Video
                                </label>
                              </div>
                              {/* <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
                                                            <label class="form-check-label" for="defaultCheck11">
                                                                Audio
                                                            </label>
                                                        </div> */}
                            </form>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      {/* <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="4">
                            Chains <i className='fa fa-angle-down'></i>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="4">
                          <Card.Body>
                            <form>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
                                <label class="form-check-label" for="defaultCheck11">
                                  REDLC
                                </label>
                              </div>
                            </form>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card> */}
                    </>

                  </Accordion>
                </div>
              </div>
              {/* Side Filter */}
              <div className='tab-inner-container'>
                {openMenu && (
                  <div id="zero1" className="onStep fadeIn">
                    <div className="flex-div">
                      {/* <div>
                        <h1>200 Items</h1>
                      </div> */}
                      {/* <ul className='sort-list'>
                        <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                        <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                      </ul> */}
                    </div>
                    {/* <OnSaleUserNfts /> */}
                    <MyNfts filterNfts={filterState} status={'OnSale'} />
                  </div>
                )}
                {openMenu1 && (
                  <div id="zero2" className="onStep fadeIn">
                    <div className="flex-div">
                      {/* <div>
                        <h1>200 Items</h1>
                      </div> */}
                      {/* <ul className='sort-list'>
                        <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                        <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                      </ul> */}
                    </div>
                    {/* <UserNfts /> */}
                    <MyNfts filterNfts={filterState} status={'Owner'} />

                  </div>
                )}
                {openMenu2 && (
                  <div id="zero3" className="onStep fadeIn">
                    <div className="flex-div">

                      {/* <ul className='sort-list'>
                        <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                        <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                      </ul> */}
                    </div>
                    {/* <UserFavNft /> */}
                    <MyNfts filterNfts={filterState} status={'Favorite'} />

                  </div>
                )}
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </div>
  );
};
export default UserProfile;
