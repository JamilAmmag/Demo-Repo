import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import GetMyAllCollectionsAction from "../../../Redux/Actions/CollectionAction/GetMyAllCollections";
import { toast, ToastContainer } from "react-toastify";
import { PropagateLoader, BounceLoader } from "react-spinners";

import bannerimg from '../../../assets/images/profile-banner.jpg';
import funkloader from '../../../assets/images/funk_loader.gif';
import API from "../../../Redux/Api";
import http from "../../../Redux/Api/http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

const MyCollections = ({ filterState }) => {
  const myAllCollectionsState = useSelector(
    (state) => state.GetMyAllCollections?.GetAllMyCollectionsResponse?.data
  );
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const [isloading, setIsloading] = useState(true);

  // console.log("myAllCollectionsState", myAllCollectionsState);
  const dispatch = useDispatch();
  const searchRef = useRef();
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [filter, setfilter] = useState([]);
  const [filterTrigger, setFilterTrigger] = useState(false);

  const [allPage, setAllPage] = useState(9);
  const [myAllCollections, SetMyAllCollections] = useState();
  const [height, Setheight] = useState(270);
  const [route, setRoute] = useState("");
  const [totalItems, settotalItems] = useState(0)

  const history = useHistory();

  useEffect(() => {
    if (filterState) {
      API.GetMyAllCollectionFilter.GetMyAllCollectionFilterApi({ catgoryId: filterState.categories ? filterState.categories : [], }).then((response) => {
        SetMyAllCollections(response.data.data?.slice(0, 8));
        settotalItems(response.data.totalItems)
        setAllData(response.data.data);
        setIsloading(false)
      })
    }
    else {
      let route = window.location.pathname;
      setRoute(route);
      SetMyAllCollections(myAllCollectionsState?.slice(0, 8));
      setAllData(myAllCollectionsState);
      setIsloading(false)
    }

  }, [filterState, myAllCollectionsState]);

  // useEffect(() => {
  //   collectionsGet()
  // }, []);

  // useEffect(() => {
  //     API.GetMyAllCollectionFilter.GetMyAllCollectionFilterApi({catgoryId: filterState.categories?filterState.categories: []}).then((response)=>{
  //       console.log("filtered data", response.data.data)
  //       SetMyAllCollections(response.data.data?.slice(0, 8));
  //       setAllData(response.data.data);
  //       setIsloading(false)
  //     })
  // }, [filterState]);

  // const collectionsGet = async () => {
  //   await dispatch(GetMyAllCollectionsAction())
  //     .then((res) => {
  //       setIsloading(false);
  //     })
  //     .catch((error) => {

  //       setIsloading(false);
  //     });
  // }

  // const loadMore = () => {
  //   let collectionState = myAllCollections;
  //   let start = collectionState?.length;
  //   let end = collectionState?.length + 3;
  //   SetMyAllCollections([
  //     ...collectionState,
  //     ...myAllCollections?.slice(start, end),
  //   ]);
  // };
  const loadMore = () => {
    setAllPage((prev) => prev + 9)
  };

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      Setheight({
        height: img?.offsetHeight,
      });
    }
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;

    setfilter(
      allData?.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const resetFilter = () => {
    SetMyAllCollections(allData?.slice(0, 8));
    setfilter([]);
    setFilterTrigger(false);
    searchRef.current.value = "";
  };
  const handlerSearchSubmit = (e) => {
    e.preventDefault();
    setFilterTrigger(true);
    SetMyAllCollections(filter);
    setFilterData(filter);
  };
  const handleSearch=(data)=>{

    const payload = {
      catgoryId: [], }
    http.post(
      httpUrl + `/api/v1/Nft/GetMyAllCollections?Search=${data}`, payload
    ).then((response)=>{
      // SetMyAllCollections(response.data.data?.slice(0, 8));
      SetMyAllCollections(response.data.data?.slice(0, 8));
      settotalItems(response.data.totalItems)
      setAllData(response.data.data);
    })
  }

  return (
    <>
      <div className="container">
        <div className="row">
        <div className="flex-div">
          <div>
            <h1>{myAllCollections ? myAllCollections.length == 1 ? myAllCollections.length + ' Item' : totalItems + ' Items' : 'No items'}</h1>
          </div>
        </div>
          <div className="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
            <div className="items_filter w-100">
              {route == "/collections" ? (
                <div className="full-div text-center">
                  <Link className="sell-item-btn spc" to="/addcollection">
                    Add collection
                  </Link>
                  <div className="height"></div>
                </div>

              ) : (
                <></>
              )}




              {/* <form
                className="row form-dark w-100"
                id="form_quick_search"
                name="form_quick_search"
                onReset={() => {
                  resetFilter();
                }}
                onSubmit={handlerSearchSubmit}
              > */}
                <div className="col-sm-12 d-flex align-items-start justify-content-center">
                  <input
                    className="form-control black"
                    id="name_1"
                    name="name_1"
                    ref={searchRef}
                    placeholder="search item here..."
                    type="text"
                    onChange={(e) => {handleSearchChange(e); handleSearch(e.target.value)}}
                    style={{ width: "100%", color: "black" }}
                  />
                  {/* <button id="btn-submit">
                    <i className="fa fa-search bg-color-secondary"></i>
                  </button>
               
                  {filterTrigger && (
                    <button id="btn-submit" type="reset">
                      <i class="fas fa-sync bg-danger m-l-1"></i>
                    </button>
                  )} */}
                
                  <div className="clearfix"></div>
                </div>
              {/* </form> */}

            </div>
          </div>
        </div>
        {/* </div> */}
      </div>

      <div className="container">
        <div className="row w-100">
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
          <div className="flex-div">
            {/* <div>
              <h1>{myAllCollections ? myAllCollections.length : 0} Items</h1>
            </div> */}
            {/* <ul className='sort-list'>
                    <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                    <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                  </ul> */}
          </div>

          {isloading ? (
            <>
              <div className="col-sm-12 d-flex justify-content-center">
              <img width={100} height={100} src={funkloader}/>
              </div>
            </>
          ) : (
            <>
              {myAllCollections?.length == 0 ? (
                <div className="col-sm-12 text-center" style={{ color: "white" }}>
                  No Collections Record Found
                </div>
              ) : (
                ""
              )}

              {myAllCollections?.slice(0, allPage).map((collections, index) => (
                <div
                  key={index}
                  className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4"
                  onClick={() => {
                    history.push(`/nftsbycollections/${collections.id}`);
                  }}
                >
                  <div className="nft__item m-0">
                    <div className="author_list_pp">
                      <span
                        onClick={() =>
                          window.open(collections.authorLink, "_self")
                        }
                      >
                        <img
                          className="lazy"
                          src={collections?.logoImage}
                          alt=""
                        />
                        {/* <i className="fa fa-check"></i> */}
                      </span>
                    </div>
                    <div className="nft__item_wrap">
                      <span className="nft__item_wrap">
                        <img
                          onLoad={onImgLoad}
                          src={collections?.featuredImage}
                          className="lazy "
                          alt="NFT Pic"
                          style={{
                            width: "100%",
                            height: 200,
                            borderRadius: 8,
                            objectFit: "contain",
                          }}
                        />
                      </span>
                    </div>
                    <div className="nft__item_info">
                      <span onClick={() => window.open(collections.nftLink, "_self")}>
                        <h4>{collections?.name?.length > 10 ? collections?.name?.slice(0, 9) + '...' : collections?.name}</h4>
                      </span>
                    </div>
                  </div>
                </div>
              ))}


              {/* <>
                  {myAllCollections?.length < filterData?.length && (
                    <div className="col-lg-12">
                      <div className="spacer-single"></div>
                      <span onClick={loadMore} className="btn-main lead m-auto">
                        Load More Filter
                      </span>
                    </div>
                  )}
                </> */}

              <>
                {myAllCollections?.length > allPage &&
                  !filterTrigger && (
                    <div className="col-lg-12">
                      <div className="spacer-single"></div>
                      <span
                        onClick={loadMore}
                        className="btn-main lead m-auto"
                      >
                        Load More
                      </span>
                    </div>
                  )}
              </>

            </>
          )}
        </div>
        <div className="spacer-double"></div>
      </div>
    </>
  );
};

export default MyCollections;
