import React, { useEffect, useState } from "react";
import ColumnZero from "../components/ColumnZero";
import ColumnZeroTwo from "../components/ColumnZeroTwo";
import Footer from "../components/footer";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import bar from '../../assets/images/bar.png';
import { createGlobalStyle } from "styled-components";
import GetMyAllCollectionsAction from "../../Redux/Actions/CollectionAction/GetMyAllCollections";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router";
import MyCollections from "./MyCollections";
import defaultImg from "../../assets/images/default.png";
import bannerimg from '../../assets/images/BannerU.jpg';

const GlobalStyles = createGlobalStyle`

`;

const Collections = function () {
  const dispatch = useDispatch();

  const history = useHistory();

  const allMyCollections = useSelector(
    (state) => state.GetMyAllCollections?.GetAllMyCollectionsResponse?.data
  );
  const GetNftCollectionCategories = useSelector(
    (state) => state?.GetNftCollectionCategories?.GetNftCollectionCategoriesResponse?.data
  );
  const [isloading, setIsloading] = useState(true);

  const MyProfile = useSelector(
    (state) => state.MyProfile?.MyProfileResponse?.data
  );
  const data = useSelector((state) => state);
  const [allCollectionsState, setAllCollectionsState] = useState([]);
  const [height, Setheight] = useState(270);
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

  const [filterState, setFilterState] = React.useState({
    topFilter: "OnSale",
    walletAddress: WalletAddress ? WalletAddress : 'nill',
    pageSize: 0,
    currentPage: 0,
    buyNow: false,
    onAuctions: false,
    hasOffers: false,
    categories: [

    ],
    min: 0,
    max: 0,
    sortBy: "",
    sortIndex: 0,
    search: ""
  });
  // useEffect(async () => {
  //   await dispatch(GetMyAllCollectionsAction())
  //     .then((res) => {
  //       console.log("collectoin lengh", res.data.length)
  //       setCollectionLength(res.data.length)
  //       setIsloading(false);
  //     })
  //     .catch((error) => {
  //       setIsloading(false);
  //       toast.success(`${error?.message}`, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     });
  // }, []);

  const loadMore = () => {
    let collectionsState = allCollectionsState;
    let start = collectionsState?.length;
    let end = collectionsState?.length + 8;
    setAllCollectionsState([
      ...collectionsState,
      ...allMyCollections.slice(start, end),
    ]);
  };

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      Setheight({
        height: img.offsetHeight,
      });
    }
  };

  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };

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
          {MyProfile?.profileBannerImage && (
            <div className=" banner">
              <div className="bg-layer"               style={{
                backgroundImage: `url(${MyProfile?.profileBannerImage?.replaceAll(
                  "\\",
                  "/"
                )})`,
              }}></div>
              {/* <img src={bannerimg} /> */}
              {/* <img src={MyProfile?.profileBannerImage ? httpUrl + "/" + MyProfile?.profileBannerImage : bannerimg} alt="Banner images" /> */}
              <div className="share-list-pnl">
                <ul className="share-list-list">
                  {/* <li><a href="#"><i class="fa fa-share-alt"></i></a></li> */}
                  <li><a className="reg-btn" style={{padding: "0px"}} onClick={() => history.push('/settings')} href="javascript:void(0);"><i class="fa fa-cog"></i></a></li>
                </ul>
              </div>

              <div className="profile-image-holder">
                <div className="img-pnl">
                  <img src={MyProfile?.profileImage ? MyProfile?.profileImage : defaultImg} alt="" />
                  {/* <span className="check-span"><i class="fa fa-check"></i></span> */}
                </div>
                <div className="text-pnl">
                  <h2>
                    {MyProfile?.username ? MyProfile?.username : 'Unnamed'}
                  </h2>
                  <h6>Created by: {MyProfile?.username ? MyProfile?.username : 'Unnamed'}</h6>
                </div>
              </div>
            </div>
          )}
          {!MyProfile?.profileBannerImage && (
            <div className=" banner">
              <div className="bg-layer" style={{ backgroundImage: `url(${bannerimg})`,}}></div>
              {/* <img src={bannerimg} /> */}
              {/* <img src={MyProfile?.profileBannerImage ? httpUrl + "/" + MyProfile?.profileBannerImage : bannerimg} alt="Banner images" /> */}
              <div className="share-list-pnl">
                <ul className="share-list-list">
                  {/* <li><a href="#"><i class="fa fa-share-alt"></i></a></li> */}
                  <li><a className="reg-btn" style={{padding: "0px"}} onClick={() => history.push('/settings')} href="javascript:void(0);"><i class="fa fa-cog"></i></a></li>
                </ul>
              </div>

              <div className="profile-image-holder">
                <div className="img-pnl">
                  <img src={MyProfile?.profileImage ? MyProfile?.profileImage : defaultImg} alt="" />
                  {/* <span className="check-span"><i class="fa fa-check"></i></span> */}
                </div>
                <div className="text-pnl">
                  <h2>
                    {MyProfile?.username ? MyProfile?.username : 'Unnamed'}
                  </h2>
                  <h6>Created by: {MyProfile?.username ? MyProfile?.username : 'Unnamed'}</h6>
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
              <ul className="d-flex justify-content-center de_nav text-left">
                <li id="Mainbtn" className="active">
                  <span>Items</span>
                </li>
                {/* <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>Activity</span>
                </li> */}
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
              <Accordion>
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
                              } class="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                            <p class="form-check-label" for="defaultCheck2">
                              {item.name}
                            </p>
                          </div>

                        )
                      }
                    </div>
                  </div>
                </div>
              </Accordion>
            </div>
          </div>
          {/* Side Filter */}
          <div className='tab-inner-container'>
            {openMenu && (
              <div id="zero1" className="onStep fadeIn">
                <div className="full-div spacer60"></div>
                <div className="full-div">
                  <MyCollections filterState={filterState} />
                </div>
              </div>
            )}
            {/* {openMenu1 && (
              <div id="zero2" className="onStep fadeIn">
                <div className="full-div spacer60"></div>
                <div className="full-div">
                  <MyCollections />
                </div>
              </div>
            )} */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Collections;
