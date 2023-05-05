import React, { useEffect, useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import MyNft from "./MyNfts/MyNfts";
import Footer from "../components/footer";
import bannerimg from '../../assets/images/BannerU.jpg';
import { createGlobalStyle } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import bar from '../../assets/images/bar.png';
import { FaGlobe, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import MyCollections from "./MyCollections";
import hearticon from "../../assets/images/icon-heart.png";
import nfticon from "../../assets/images/nft-icon.png";
import collectionicon from "../../assets/images/collection-icon.png";
import GetMyAllCollectionsAction from "../../Redux/Actions/CollectionAction/GetMyAllCollections";
import AllFavourite from "./AllFavorite/AllFavourite";
import { WalletDisconnect } from "../../Redux/Actions/WalletActions/WalletAction";
import { AuthConnectRequest } from "../../Redux/Actions/AuthActions/AuthConnectAction";
import { LogoutAction } from "../../Redux/Actions/AuthActions/LogoutAction";
import { ValidateSignatureRequest } from "../../Redux/Actions/AuthActions/ValidateSignatureAction";
import { Dropdown, DropdownButton, SplitButton } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import http from "../../Redux/Api/http";
import moment from "moment";
import lINK from '../../assets/images/LINK.png';
import API from "../../Redux/Api";
import rlc from "../../assets/images/RLF-icon.png";
// import Slider from 'react-rangeslider'
import { SingleSlider } from 'react-slider-kit';
import TestNfts from "./MyNfts/TestNfts";
import { toInteger } from "lodash";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
const PUBLIC_URL = process.env.REACT_APP_COPY;
const initialState = { isDisable: false };
const reducer = (state, action) => {
  switch (action.type) {
    case 'clicked':
      return { isDisable: true };
    case 'notClicked':
      return { isDisable: false };
  }
}
const GlobalStyles = createGlobalStyle`

`;
const changeImage = (event) => {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};
const MyProfile = function (props) {
  const [value, setValue] = useState();
  const [value1, setValue1] = useState();
  const [route, setRoute] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [ProfileData, setprofiledata] = useState(false);
  const [nftHistory, setNftHistory] = useState();
  const history = useHistory();
  const [state, disableDispatch] = useReducer(reducer, initialState)
  const location = useLocation()
  useEffect(() => {
    if (location.state?.center) {
      handleBtnClick1()
    }
  }, [location.state])
  const dispatch = useDispatch();
  const User = useSelector((state) => state.Login);

  const myAllCollectionsState = useSelector(
    (state) => state.GetMyAllCollections?.GetAllMyCollectionsResponse?.data
  );

  const MyNfts = useSelector(
    (state) => state.GetMyAllNfts?.GetMyAllNftsResponse?.data
  );


  const Logoutt = async () => {
    await dispatch(WalletDisconnect());
    await dispatch(AuthConnectRequest());
    await dispatch(LogoutAction());
    await dispatch(ValidateSignatureRequest());
  };


  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const MyProfile = useSelector(
    (state) => state.MyProfile?.MyProfileResponse?.data
  );

  const GetNftCollectionCategories = useSelector(
    (state) => state?.GetNftCollectionCategories?.GetNftCollectionCategoriesResponse?.data
  );
  var counter = 0
  useEffect(() => {
    setprofiledata(MyProfile)
  }, [MyProfile])


  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const [openMenu4, setOpenMenu4] = React.useState(false);
  const [openMenu5, setOpenMenu5] = React.useState(false);
  const [error, setError] = useState(false);
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();
  const [reset, setResetState] = useState(false);


  const [filterState, setFilterState] = React.useState({
    topFilter: "OnSale",
    walletAddress: WalletAddress ? WalletAddress : 'nill',
    pageSize: 9,
    currentPage: 1,
    buyNow: false,
    onAuctions: false,
    hasOffers: false,
    categories: [

    ],
    min: 0,
    max: 0,
    sortBy: "desc",
    sortIndex: 1,
    search: ""
  });


  const priceHandler = () => {
    setError(false)
    if (parseFloat(minValue) > parseFloat(maxValue)) {
      setError(true)
      return
    }
    if (maxValue == 0) {
      setError(true)
      return
    }
    if ((minValue && maxValue) && (parseFloat(minValue) <= parseFloat(maxValue))) {
      setResetState(true)
      setFilterState((prev) => {
        return { ...prev, min: parseFloat(minValue), max: parseFloat(maxValue), sortIndex: 0 }
      })
      setError(false)
    }
  }

  const handleBtnClick = () => {


    setFilterState((prev) => filterState.topFilter ? { ...prev, topFilter: 0 } : { ...prev, topFilter: 0 })
    setOpenMenu(true);
    setOpenMenu1(false);
    setOpenMenu2(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    setOpenMenu5(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    // document.getElementById("Mainbtn5").classList.remove("active");
  };
  const handleBtnClick1 = () => {

    setFilterState((prev) => filterState.topFilter ? { ...prev, topFilter: "Owner" } : { ...prev, topFilter: "Owner" })
    setFilterState((prev) => {
      return { ...prev, buyNow: false }
    })

    setOpenMenu1(true);
    setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    setOpenMenu5(false);

    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    // document.getElementById("Mainbtn5").classList.remove("active");
  };
  const handleBtnClick2 = () => {

    setFilterState((prev) => filterState.topFilter ? { ...prev, topFilter: "Created" } : { ...prev, topFilter: "Created" })
    setFilterState((prev) => {
      return { ...prev, buyNow: false }
    })

    setOpenMenu2(true);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    setOpenMenu5(false);

    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    // document.getElementById("Mainbtn5").classList.remove("active");
  };
  const handleBtnClick3 = () => {

    setFilterState((prev) => filterState.topFilter ? { ...prev, topFilter: "Favorite " } : { ...prev, topFilter: "Favorite " })
    setFilterState((prev) => {
      return { ...prev, buyNow: false }
    })

    setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(true);
    setOpenMenu4(false);
    setOpenMenu5(false);
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.add("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    // document.getElementById("Mainbtn5").classList.remove("active");
  };
  const handleBtnClick4 = () => {


    setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);
    setOpenMenu4(true);
    setOpenMenu5(false);
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.add("active");
    // document.getElementById("Mainbtn5").classList.remove("active");
  };
  const handleBtnClick5 = () => {

    if (!nftHistory) {
      API.GetNftHistoryByAccount.GetNftHistoryByAccountApi().then((response) => {
        setNftHistory(response.data.data)
      })
    }
    setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    setOpenMenu5(true);
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    // document.getElementById("Mainbtn5").classList.add("active");
  };
  useEffect(() => {
    if (props.location.state == "bought") {
      handleBtnClick1()
    }
  }, [])

  useEffect(() => {

    if (localStorage.getItem("Tab") == "onsale") {
      handleBtnClick();

    }
    else if (localStorage.getItem("Tab") == "owned") {
      handleBtnClick1();

    }
    else if (localStorage.getItem("Tab") == "created") {
      handleBtnClick2();

    }
    else if (localStorage.getItem("Tab") == "favourites") {
      handleBtnClick3();

    }
    else if (localStorage.getItem("Tab") == "collections") {
      handleBtnClick4();

    }
    else if (localStorage.getItem("Tab") == "activity") {
      handleBtnClick4();

    }
    else {
      handleBtnClick()
    }
  }, [])

  const text = MyProfile?.bio ? MyProfile?.bio?.toString() : '';
  return (
    <div className="gradient-bg-light">
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
          {ProfileData?.profileBannerImage && (
            <div className="banner">
              <div className="bg-layer" style={{
                backgroundImage: `url(${ProfileData?.profileBannerImage?.replaceAll(
                  "\\",
                  "/"
                )})`,
              }}></div>
              {/* <img  src={httpUrl + "/" + ProfileData?.profileBannerImage} alt="Banner images" /> */}
          

              <div className="share-list-pnl">
                <ul className="share-list-list">
                  
                  <CopyToClipboard
                    text={`${PUBLIC_URL}profile/${WalletAddress}`}
                    onCopy={() => {
                      disableDispatch({ type: 'clicked' })
                      toast.success("Profile copied successfully", {
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


                    <li><a href="javascript:void(0);"><i class="fa fa-share-alt"></i></a></li>

                  </CopyToClipboard>

                  {
                    ProfileData?.instagramLink && ProfileData?.instagramLink != "null" &&
                    <li>
                      <a href="javascript:void(0)" onClick={() => { window.open(ProfileData?.instagramLink) }} style={{ cursor: "pointer", marginRight: "0px" }}   ><i class="fab fa-discord"></i></a>
                    </li>
                  }


                  {
                    ProfileData?.twitterLink && ProfileData?.twitterLink != "null" &&
                    <li>
                      <a href="javascript:void(0)" onClick={() => { window.open(ProfileData?.twitterLink) }} style={{ cursor: "pointer" }}   ><i className="fa fa-twitter"   ></i></a>

                    </li>
                  }


                  {
                    ProfileData?.yourSiteLink && ProfileData?.yourSiteLink != "null" &&
                    <li>
                      <a onClick={() => { window.open(ProfileData?.yourSiteLink) }} href="javascript:void(0)" style={{ cursor: "pointer" }}

                      ><i class="fa fa-globe" aria-hidden="true"></i></a>
                    </li>
                  }


                  {
                    ProfileData?.faceBook && ProfileData?.faceBook != "null" &&
                    <li>
                      <a onClick={() => { window.open(ProfileData?.faceBook) }} href="javascript:void(0)" style={{ cursor: "pointer" }}   ><i class="fa fa-facebook-square" aria-hidden="true"></i></a>
                    </li>
                  }

                  <li><a className="reg-btn" style={{padding: "0px"}} onClick={() => history.push('/settings')} href="javascript:void(0);"><i class="fa fa-cog"></i></a></li>
                </ul>
              </div>

              <div className="profile-image-holder">
                <div className="img-pnl">
                  {ProfileData?.profileImage ? (
                    <img src={ProfileData?.profileImage} alt="profile.png" />
                  ) : (
                    <div style={{ color: 'white' }}> <FaUserCircle size="2x" /> </div>
                  )}

                </div>
                <div className="text-pnl">
                  <h2>
                    {ProfileData?.username ? ProfileData?.username : "Unnamed"}
                  </h2>
                  <p id="wallet">
                    {/* <span className="email-span" style={{ wordWrap: 'break-word' }}>{ProfileData?.email} </span><br /> */}
                    {/* <img src={rlc} style={{
              display: "inline-block",
              maxWidth: "20px",
              marginRight: "4px",
              marginBottom: "4px"

              // display: inline-block;
              // max-width: 20px;
              // margin-right: 4px;
            }} /> */}
                    {WalletAddress ? WalletAddress : ProfileData?.address}{" "}
                    <CopyToClipboard
                      text={WalletAddress}
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
                        style={{ background: "#27002A", color: "white", border: "none" }}
                        title="Copy Address"
                        disabled={state.isDisable}
                      >
                        Copy
                      </button>
                    </CopyToClipboard>

                  </p>
                  <br />
                  {text && (
                    <p id="wallet" className="email-span" style={{ wordWrap: 'break-word', maxWidth: '500px', }}>
                      {showMore ? text : `${text?.substring(0, 45)}`}
                      {text?.length > 45 ? (
                        <button id="btn_copy" style={{ marginLeft: "5px", cursor: "pointer", background: "#27002A", color: 'white', wordBreak: 'break-word' }} onClick={() => setShowMore(!showMore)}>
                          {showMore ? " show less" : "show more"}
                        </button>
                      ) : null
                      }</p>
                  )}

                </div>
              </div>
            </div>
          )}
          {!ProfileData?.profileBannerImage && (

            <div className="banner">
              <div className="bg-layer" style={{
                backgroundImage: `url(${bannerimg})`,
              }}></div>
              {/* <img src={bannerimg} alt="Banner images" /> */}
              <div className="share-list-pnl">
                <ul className="share-list-list">
                <CopyToClipboard
                    text={`${PUBLIC_URL}profile/${WalletAddress}`}
                    onCopy={() => {
                      disableDispatch({ type: 'clicked' })
                      toast.success("Profile copied successfully", {
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


                    <li><a href="javascript:void(0);"><i class="fa fa-share-alt"></i></a></li>

                  </CopyToClipboard>
                  <li>
                    {
                      ProfileData?.instagramLink && ProfileData?.instagramLink != "null" ?
                        <a onClick={() => window.open(ProfileData?.instagramLink)} href="javascript:void(0)" style={{ cursor: "pointer", color: "#E250E5",  }}   ><i class="fab fa-discord"></i></a>
                        : <></>
                    }

                  </li>
                  <li>
                    {
                      ProfileData?.twitterLink && ProfileData?.twitterLink != "null" ?
                        <a onClick={() => window.open(ProfileData?.twitterLink)} href="javascript:void(0)" style={{ cursor: "pointer", color: "#E250E5",  }}   ><i className="fa fa-twitter"   ></i></a>
                        : <></>
                    }
                  </li>
                  <li>
                    {
                      ProfileData?.yourSiteLink && ProfileData?.yourSiteLink != "null" ?
                        <a onClick={() => { window.open(ProfileData?.yourSiteLink) }} href="javascript:void(0)" style={{ cursor: "pointer", color: "#E250E5",  }}   ><i class="fa fa-globe" aria-hidden="true"></i></a>
                        : <></>
                    }
                  </li>
                  <li>
                    {
                      ProfileData?.faceBook && ProfileData?.faceBook != "null" ?
                        <a onClick={() => window.open(ProfileData?.faceBook)} href="javascript:void(0)" style={{ cursor: "pointer", color: "#E250E5" }}   ><i class="fa fa-facebook-square" aria-hidden="true"></i></a>
                        : <></>
                    }
                  </li>
                  <li><a className="reg-btn" style={{padding: "0px"}} onClick={() => history.push('/settings')} href="javascript:void(0);"><i class="fa fa-cog"></i></a></li>
                </ul>
              </div>

              <div className="profile-image-holder">
                <div className="img-pnl">
                  {ProfileData?.profileImage ? (
                    <img src={ProfileData?.profileImage} alt="profile.png" />
                  ) : (
                    <div style={{ color: 'white' }}> <FaUserCircle size="2x" /> </div>
                  )}

                </div>
                <div className="text-pnl">
                  <h2>
                    {ProfileData?.username ? ProfileData?.username : "Unnamed"}
                  </h2>
                  <p id="wallet">
                    {/* <span className="email-span" style={{ wordWrap: 'break-word' }}>{ProfileData?.email} </span><br /> */}
                    {/* <img src={rlc} style={{
              display: "inline-block",
              maxWidth: "20px",
              marginRight: "4px",
              marginBottom: "4px"

              // display: inline-block;
              // max-width: 20px;
              // margin-right: 4px;
            }} /> */}
                    {WalletAddress ? WalletAddress : ProfileData?.address}{" "}
                    <CopyToClipboard
                      text={WalletAddress}
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
                        style={{ background: "#27002A", color: "white", border: "none" }}
                        title="Copy Address"
                        disabled={state.isDisable}
                      >
                        Copy
                      </button>
                    </CopyToClipboard>

                  </p>
                  <br />
                  {text && (
                    <p id="wallet" className="email-span" style={{ wordWrap: 'break-word', maxWidth: '500px', }}>
                      {showMore ? text : `${text?.substring(0, 45)}`}
                      {text?.length > 45 ? (
                        <button id="btn_copy" style={{ marginLeft: "5px", cursor: "pointer", background: "#27002A", color: 'white', wordBreak: 'break-word' }} onClick={() => setShowMore(!showMore)}>
                          {showMore ? " show less" : "show more"}
                        </button>
                      ) : null
                      }</p>
                  )}

                </div>
              </div>
            </div>
          )}
        </div>
      </div>




      <section className="container p-t-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav de_nav">
                <li id="Mainbtn" className="active">
                  <span onClick={() => {
                    handleBtnClick()
                    localStorage.setItem("Tab", "onsale")
                  }}> On Sale</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={() => {
                    handleBtnClick1()
                    localStorage.setItem("Tab", "owned")
                  }}> Owned</span>
                </li>
                <li id="Mainbtn2" className="">
                  <span onClick={() => {
                    handleBtnClick2()
                    localStorage.setItem("Tab", "created")
                  }}> Created</span>
                </li>
                <li id="Mainbtn3" className="">
                  <span onClick={() => {
                    handleBtnClick3()
                    localStorage.setItem("Tab", "favourites")
                  }}> Funky Favourites</span>
                </li>
                <li id="Mainbtn4" className="">
                  <span onClick={() => {
                    handleBtnClick4()
                    localStorage.setItem("Tab", "collections")
                  }}>Funky Collections</span>
                </li>
                {/* <li id="Mainbtn5" className="">
                  <span onClick={() => {
                    handleBtnClick5()
                    localStorage.setItem("Tab", "activity")
                  }}> Activity</span>
                </li> */}
              </ul>
            </div>
          </div>
        </div>

        <div className='tab-container full-div'>
          {/* Side Filter */}
          {(openMenu || openMenu1 || openMenu2 || openMenu3 || openMenu4) && (
            <div className="side-filter-bar">
              <div className="filter-head-pnl">
                <h5>Filters</h5>
                <i className="fa fa-filter"></i>
              </div>
              <div className="filter-body-pnl">
                <Accordion>
                  <Card>

                    <div class="accordion" id="myAccordion">
                      {(openMenu || openMenu1 || openMenu2 || openMenu3) && (
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="headingOne">
                            <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne">Status</button>
                          </h2>
                          <div id="collapseOne" class="accordion-collapse collapse">
                            <div class="card-body">
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
                            </div>
                          </div>
                        </div>
                      )}
                      {(openMenu || openMenu1 || openMenu2 || openMenu3 || openMenu4) && (
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="headingTwo">
                            <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo">Categories</button>
                          </h2>
                          <div id="collapseTwo" class="accordion-collapse collapse">
                            <div class="card-body">
                              {
                                GetNftCollectionCategories &&
                                GetNftCollectionCategories.map((item, index) =>
                                  <div class="form-check" key={index}>
                                    <input
                                      checked={filterState.categories.includes(item.id)}
                                      onChange={() => {
                                        if (filterState.categories.includes(item.id)) {
                                          let remaining = filterState.categories.filter(item2 => item2 !== item.id)
                                          setFilterState((prev) => {
                                            return { ...prev, categories: remaining }
                                          })
                                        }
                                        else {
                                          setFilterState((prev) => {
                                            return { ...prev, categories: [...filterState.categories, item.id] }
                                          })
                                        }
                                      }
                                      } class="form-check-input" type="checkbox" value="" id={index} />
                                    <label class="form-check-label" for={index}>
                                      {item.name}
                                    </label>
                                  </div>
                                )
                              }
                            </div>
                          </div>
                        </div>
                      )}
                      {(openMenu || openMenu1 || openMenu2 || openMenu3) && (
                        <>
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThree">
                              <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree">Price</button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse">
                              <div class="card-body">
                                <div className='bar-pnl'>

                                  <div>
                                    <div className="col-lg-12 col-md-6 col-sm-12">
                                      <div className="my-3"></div>
                                      <h5 className="txt-dark">Min price</h5>
                                      <input onKeyPress={(event) => {
                                        if (/[+-]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                      }} type="number" className="inputtextColor form-control-custom" value={minValue}
                                        onChange={e => {
                                          setError(false);
                                          const regex = /^[0-9]{0,9}(\.[0-9]{1,5})?$|^(100)(\.[0]{1,4})?$/
                                          // if(regex.test(e.target.value)){
                                          setMinValue(e.target.value);
                                          // }
                                          //   minValue > maxValue ? setMinCheck(true): setMinCheck(false)
                                        }}
                                      />
                                    </div>
                                  </div >
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
                                    <button onClick={() => priceHandler()} className={error ? "reg-btn grey" : "reg-btn blue"} href="javascript:void(0);">Apply </button>
                                    {reset && (
                                      <button onClick={() => {
                                        setError(false)
                                        setMinValue(0)
                                        setMaxValue(0)
                                        setFilterState((prev) => {
                                          return { ...prev, min: 0, max: 0, sortIndex: 1 }
                                        })
                                        setResetState(false)
                                      }} className="reg-btn blue" style={{ padding: '10px 13px', marginLeft: '10px' }}>
                                        <i class="fas fa-sync m-l-1"></i>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="headingFour">
                              <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFour">File</button>
                            </h2>
                            <div id="collapseFour" class="accordion-collapse collapse">
                              <div class="card-body">
                                <form>
                                  <div class="form-check">
                                    <input onChange={() => setFilterState((prev) => filterState.image ? { ...prev, image: false } : { ...prev, image: true })} class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
                                    <label class="form-check-label" for="defaultCheck11">
                                      Image
                                    </label>
                                  </div>
                                  <div class="form-check">
                                    <input onChange={() => setFilterState((prev) => filterState.video ? { ...prev, video: false } : { ...prev, video: true })} class="form-check-input" type="checkbox" value="" id="defaultCheck12" />
                                    <label class="form-check-label" for="defaultCheck12">
                                      Video
                                    </label>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          {/* <div class="accordion-item">
                            <h2 class="accordion-header" id="headingFive">
                              <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFive">Chains</button>
                            </h2>
                            <div id="collapseFive" class="accordion-collapse collapse">
                              <div class="card-body">
                                <form>
                                  <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck13" />
                                    <label class="form-check-label" for="defaultCheck13">
                                      BCC
                                    </label>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div> */}
                        </>
                      )}
                    </div>

                  </Card>
                </Accordion>
              </div>
            </div>
          )}

          {/* Side Filter */}
          <div id="collectionsList" className={'tab-inner-container'}>
            {openMenu && (
              <div id="zero2" className="onStep fadeIn">
                <div className="flex-div">
                  {/* <div>
                    <h1>{MyNfts ? MyNfts.length == 1 ? MyNfts?.filter((nft) => nft.staus == 'ReadyForSell').length + ' Item' : MyNfts?.filter((nft) => nft.staus == 'ReadyForSell').length + ' Items' : ''}</h1>
                  </div> */}
                  {/* <ul className='sort-list'>
                    <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                    <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                  </ul> */}
                </div>
                <MyNft filterNfts={filterState} status={'OnSale'} />
              </div>
            )}
            {openMenu1 && (
              <div id="zero2" className="onStep fadeIn">
                <div className="flex-div">
                  {/* <div>
                    <h1>{MyNfts ? MyNfts.length == 1 ? MyNfts.length + ' Item' : MyNfts.length + ' Items' : ''}</h1>
                  </div> */}
                  {/* <ul className='sort-list'>
                    <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                    <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                  </ul> */}
                </div>
                <MyNft filterNfts={filterState} status={'Owner'} />
              </div>
            )}
            {openMenu2 && (
              <div id="zero2" className="onStep fadeIn">
                <div className="flex-div">
                  {/* <div>
                    <h1>{MyNfts ? MyNfts.length == 1 ? MyNfts.length + ' Item' : MyNfts.length + ' Items' : ''}</h1>
                  </div> */}
                  {/* <ul className='sort-list'>
                    <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                    <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                  </ul> */}
                </div>
                <MyNft filterNfts={filterState} status={'Created'} />
              </div>
            )}
            {openMenu3 && (
              <div id="zero3" className="onStep fadeIn">
                <div className="flex-div">
                  {/* <div>
                    <h1>{GetFavouriteNft ? GetFavouriteNft.length == 1 ? GetFavouriteNft.length + ' Item' : GetFavouriteNft.length + ' Items' : ''}</h1>

                  </div> */}
                  {/* <ul className='sort-list'>
                  <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                  <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                </ul> */}
                </div>
                {/* <AllFavourite /> */}
                <MyNft filterNfts={filterState} status={'Favorite'} />
              </div>
            )}
            {openMenu4 && (
              <div id="zero1" className="onStep fadeIn">
                <div className="flex-div">
                  {/* <div>
                    <h1>{myAllCollectionsState ? myAllCollectionsState.length == 1 ? myAllCollectionsState.length + ' Item' : myAllCollectionsState.length + ' Items' : ''}</h1>
                  </div> */}

                </div>
                <MyCollections filterState={filterState} />
              </div>




            )}
            {openMenu5 && (
              <div id="zero3" className="onStep fadeIn">
                {/* <MyNft />{" "} */}
                <div className="full-div">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      {nftHistory ? nftHistory.map((payload) => (
                        <>
                          <div style={{ cursor: 'pointer' }} onClick={() => history.push(`/usernftdetail/${payload?.nftId}/${ProfileData?.id}`)} className="activity-pnl">
                            <div className="left-pnl">
                              <div className="img-pnl">
                                {/* <img src={httpUrl + '/' + payload.nftImage} /> */}
                               
                                {payload?.nftImage.includes(".mp4") ? (
                                  <video
                                    style={{ width: '100%', height: "100%" }}
                                    src={`${payload?.nftImage}`}
                                    controls
                                    currentTime={11.3}
                                  />
                                ) : (
                                  <img
                                    src={`${payload?.nftImage}`}
                                  />
                                )}
                              </div>
                              <div className="txt-pnl">
                                <h3>Acitivy Here</h3>
                                {/* {payload.ownerAccountAddress == WalletAddress && (

                            )} */}
                                <p>{payload.nftHistoryType} item #{payload.nftId} for {payload.nftPrice} FCC </p>
                                <span>At {moment(payload.createdAt.split('T')[0], "hours").format('Do [of] MMMM, YYYY')}</span>
                              </div>
                            </div>
                            <div className="right-pnl">
                              <a className="cart-btn" href="javascript:void(0)"><i class="fa fa-shopping-cart"></i></a>
                            </div>
                          </div>
                        </>
                      )) : <>

                      </>}


                    </div>
                    {/* <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="full-div">
                        <div class="subscribe-pnl">
                          <input autocomplete="off" class="form-control" placeholder="Enter your word art" /><button>
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                      <div className="full-div">
                        <h5>Filter</h5>
                      </div>
                      <div className="full-div">
                        <ul className="filter-select-listing">
                          <li>
                            <a href="#"><i class="fa fa-bars"></i> Listings</a>
                          </li>
                          <li>
                            <a href="#"><i className="fa fa-heart"></i> Like</a>
                          </li>
                          <li>
                            <a href="#"><i class="fa fa-shopping-cart"></i> Purchases</a>
                          </li>
                          <li>
                            <a href="#"><i class="fa fa-percent"></i> Sales</a>
                          </li>
                          <li>
                            <a href="#"><i class="fa fa-sign-out"></i> Transfer</a>
                          </li>
                          <li>
                            <a href="#"><i className="fa fa-star"></i> Burns</a>
                          </li>
                          <li>
                            <a href="#"><i class="fa fa-window-maximize"></i> Bids</a>
                          </li>
                        </ul>
                        <a href="#" className="clear-btn">Clear All</a>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* {openMenu && (

          <div id="zero1" className="onStep fadeIn">
            <MyCollections />
          </div>
        )}
        {openMenu1 && (
          <div id="zero2" className="onStep fadeIn">
            <MyNft />
          </div>
        )}
        {openMenu2 && (
          <div id="zero3" className="onStep fadeIn">
            <AllFavourite />
          </div>
        )}
        {openMenu3 && (
          <div id="zero3" className="onStep fadeIn">
            <MyNft />{" "}
          </div>
        )} */}
      </section>
      <div className="spacer-single"></div>
      <Footer />
    </div >
  );
};
export default MyProfile;
