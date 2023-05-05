import React, { useEffect, useState, useRef } from "react";
import SellNftToMarket from "./SellToMarkePlace";
import { Link, useHistory } from "react-router-dom";
import { BounceLoader, ScaleLoader } from "react-spinners";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import GetMyAllNftsAction from "../../../Redux/Actions/NftActions/GetMyAllNftsAction";
import RemoveFavouriteNftAction from "../../../Redux/Actions/NftActions/RemoveFavouriteNftAction";
import GetFavouriteNftAction from "../../../Redux/Actions/NftActions/GetFavouriteNftAction";
import defaultImg from "../../../assets/images/default.png";
import funkloader from "../../../assets/images/funk_loader.gif";

import InfiniteScroll from "react-infinite-scroll-component";
import { toast, ToastContainer } from "react-toastify";

import GetNftMarketAction from "../../../Redux/Actions/NftActions/GetNftMarketAction";
import NftItem from "../../Shared/NFT";
import API from "../../../Redux/Api";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

function MyNfts({ status, filterNfts, arrayfromprop,Currentpageupdate,currentpagefromprop }) {
  const history = useHistory();
  const [isloading, setIsloading] = useState(true);

  const dispatch = useDispatch();
  const searchRef = useRef();
  const [allData, setAllData] = useState(   [   ]  );
  const [filterNfts1, setfilterNfts1] = useState(filterNfts)
  const [filterData, setFilterData] = useState([]);
  const [filterTrigger, setFilterTrigger] = useState(false);
  const [favouriteInProgress, setFavouriteInProgress] = useState(false);
  const [pageSize, setPage] = useState(9);
  const [totalItems, settotalItems] = useState(0)
  const [filter, setfilter] = useState([]);
  const [filter1, setfilter1] = useState([]);
  const [currentpag, setcurrentpage] = useState(  2 )
  const [calledfrom, setcalledfrom] = useState(false)
  const MyNfts = useSelector(
    (state) => state.GetMyAllNfts?.GetMyAllNftsResponse?.data
  );
  const isConnected = useSelector((state) => state.Login?.authResponse?.data);
  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);
 const  [search_called,set_searched_called]=useState(false)
 const[search,setsearch]=useState("") 
 const [todaysPick, SetTodaysPick] = useState(MyNfts);

  const [nfts, Setnfts] = useState([]);
  const apisCall = () => {
    // dispatch(GetNftMarketAction());
  }



  useEffect(async () => {
    if (status == 'Favorite') {
      await dispatch(GetFavouriteNftAction())
        .then((res) => {
          setIsloading(false);
        })
        .catch((error) => {
          setIsloading(false);
          toast.success(`${error?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  }, []);
  
  useEffect( () => {
    setcurrentpage(2)
    filterNfts.currentPage=1
    API.GetNftsFilter.GetNftsFilterApi(filterNfts).then((response) => {
      Setnfts(response.data.data);
      setIsloading(false)
      settotalItems(response.data.totalItems)
    })
  }, [filterNfts]);
  useEffect( () => {
    if(search_called)
    {
    setcurrentpage(2)
    filterNfts.currentPage=1
    filterNfts.search=search
    API.GetNftsFilter.GetNftsFilterApi(filterNfts).then((response) => {
      Setnfts(response.data.data);
      setIsloading(false)
      settotalItems(response.data.totalItems)
    })
      }
  }, [search]);

  const callingapifunction = () => {
    // alert("zsa")
        let temp=currentpag;
        filterNfts.currentPage=currentpag
        filterNfts.search=search
      API.GetNftsFilter.GetNftsFilterApi(filterNfts).then((response) => {
      let temp1 = response.data.data;
      setcurrentpage(temp+1)
      Setnfts(prevState => [...prevState, ...temp1]);
      setAllData(prevState => [...prevState, ...temp1]);
      setIsloading(false)
      settotalItems(response.data.totalItems)
    })
  }
  const loadMore = () => {
    setPage((prev) => prev + 9)
  };

  const addToFavourite = async (nftID, OwnerAddress) => {
    if (!isConnected) {
      toast.success(`Please connect to wallet first`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!favouriteInProgress) {
      await axios
        .post(
          httpUrl + "/api/v1/Nft/AddFavouriteNft",
          {
            nftId: nftID,
            nftAddress: OwnerAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then(async (resp) => {
          setFavouriteInProgress(false);
          if (resp?.data?.isSuccess === true) {
            toast.success(`${resp?.data?.data}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            await dispatch(GetFavouriteNftAction());
            // setTimeout(() => window.location.reload(), 2000);
          } else if (resp?.data?.isSuccess === false) {
            toast.error(`NFT already liked`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((error) => {
          setFavouriteInProgress(false);
          toast.error(`${error?.data?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const removeToFavourite = async (nftId, OwnerAddress) => {
    if (!favouriteInProgress) {
      const payload = {
        nftId: nftId,
        nftAddress: OwnerAddress,
      };

      await dispatch(RemoveFavouriteNftAction(payload))
        .then(async (resp) => {
          setFavouriteInProgress(false);

          if (resp?.isSuccess === true) {
            toast.success(`${resp?.data}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            await dispatch(GetFavouriteNftAction());
            // setTimeout(() => window.location.reload(), 2000);
          } else if (resp?.isSuccess === false) {
            toast.error(`${resp?.data}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((error) => {
          setFavouriteInProgress(false);
          toast.error(`${error?.data?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    set_searched_called(true)
    setsearch(value)
  };

  const resetFilter = () => {
    Setnfts(allData?.slice(0, 4));
    setfilter([]);
    setFilterTrigger(false);

    searchRef.current.value = "";
  };
  const resetFilter1 = () => {
    SetTodaysPick(allData?.slice(0, 4));
    setfilter([]);
    setFilterTrigger(false);

    searchRef.current.value = "";
  };
  const handlerSearchSubmit = (e) => {
    e.preventDefault();
    setFilterTrigger(true);

    Setnfts(filter);
    setFilterData(filter);
  };

  const handlerSearchSubmit1 = (e) => {
    e.preventDefault();
    setFilterTrigger(true);

    SetTodaysPick(filter1);
    setFilterData(filter1);
  };

  return (
    <>
      <div className="row">
        <div className="full-div text-center">
            <h1>{nfts ? nfts.length == 1 ? nfts.length + ' Item' : totalItems + ' Items' : 'No items'}</h1>
        </div>

        <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-12">
          <div className="items_filter w-100">
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

                  placeholder="search item here..."
                  type="text"
                  onChange={(e) => handleSearchChange(e)}
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
      <div className="row">
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
        {isloading ? (
          <>
            <div className="col-sm-12 d-flex justify-content-center">
            <img width={100} height={100} src={funkloader}/>
            </div>
          </>
        ) : (
          <>
            {/* {console.log("Created nfts", MyNfts, status)} */}
            {nfts?.length == 0 ? (
              <div className="col-sm-12 text-center" style={{ color: "white" }}>No NFT Record Found</div>
            ) : (
              <>
            {status == 'OnSale' && (
              <>
                <InfiniteScroll
                  dataLength={10}
                  next={callingapifunction}
                  hasMore={currentpag - 1 > parseFloat(totalItems / 9) ? false : true}
                  loader={
                    <div className="col-sm-12 d-flex justify-content-center">
                      <ScaleLoader color="white" size="20" />
                    </div>
                  }
                >
                  <div className="row">
                    {nfts?.map((nft, index) => (
                      <>
                        {(
                          <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                            <NftItem nft={nft} key={index} likeAndDisLikeCallback={apisCall} />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </InfiniteScroll>
              </>
            )
            }
            {status == 'Owner' && (
              <>
                <InfiniteScroll
                  dataLength={nfts?.length}
                  next={callingapifunction}
                  hasMore={currentpag - 1 > parseFloat(totalItems / 9) ? false : true}
                  loader={
                    <div className="col-sm-12 d-flex justify-content-center">
                      <ScaleLoader color="white" size="20" />
                    </div>
                  }
                >
                  <div className="row">
                    {nfts?.map((nft, index) => (
                      <>
                        {(
                          <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                            <NftItem nft={nft} key={index} likeAndDisLikeCallback={apisCall} />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </InfiniteScroll>
              </>
            )
            }
            {status == 'Created' && (
              <>
                <InfiniteScroll
                  dataLength={nfts?.length}
                  next={callingapifunction}
                  hasMore={currentpag - 1 > parseFloat(totalItems / 9) ? false : true}
                  loader={
                    <div className="col-sm-12 d-flex justify-content-center">
                      <ScaleLoader color="white" size="20" />
                    </div>
                  }
                >
                  <div className="row">
                    {nfts?.map((nft, index) => (
                      <>
                        {(
                          <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                            <NftItem nft={nft} key={index} likeAndDisLikeCallback={apisCall} />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </InfiniteScroll>

              </>
            )
            }
            {status == 'AllNFT' && (
              <>
                <InfiniteScroll
                  dataLength={nfts?.length}
                  next={callingapifunction}
                  hasMore={currentpag -1> parseFloat(totalItems / 9) ? false : true}
                  loader={
                    <div className="col-sm-12 d-flex justify-content-center">
                      <ScaleLoader color="white" size="20" />
                    </div>
                  }
                >
                  <div className="row">
                    {nfts?.map((nft, index) => (
                      <>
                        {(
                          <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                            <NftItem nft={nft} key={index} likeAndDisLikeCallback={apisCall} />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </InfiniteScroll>
              </>
            )
            }
            {status == 'LiveAuction' && (
              <>
                <InfiniteScroll
                  dataLength={nfts?.length}
                  next={callingapifunction}
                  hasMore={currentpag - 1 > parseFloat(totalItems / 9) ? false : true}
                  loader={
                    <div className="col-sm-12 d-flex justify-content-center">
                      <ScaleLoader color="white" size="20" />
                    </div>
                  }
                >
                  <div className="row">
                    {nfts?.map((nft, index) => (
                      <>
                        {(
                          <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                            <NftItem nft={nft} key={index} likeAndDisLikeCallback={apisCall} />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </InfiniteScroll>
              </>
            )
            }
            {status == 'TodayPick' && (
              <>
                <InfiniteScroll
                  dataLength={nfts?.length}
                  next={callingapifunction}
                  hasMore={currentpag - 1 > parseFloat(totalItems / 9) ? false : true}
                  loader={
                    <div className="col-sm-12 d-flex justify-content-center">
                      <ScaleLoader color="white" size="20" />
                    </div>
                  }
                >
                  <div className="row">
                    {nfts?.map((nft, index) => (
                      <>
                        {(
                          <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                            <NftItem nft={nft} key={index} likeAndDisLikeCallback={apisCall} />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </InfiniteScroll>
              </>
            )
            }
            {status == 'Favorite' && (
              <>
                <InfiniteScroll
                  dataLength={nfts?.length}
                  next={callingapifunction}
                  hasMore={currentpag - 1 > parseFloat(totalItems / 9) ? false : true}
                  loader={
                    <div className="col-sm-12 d-flex justify-content-center">
                      <ScaleLoader color="white" size="20" />
                    </div>
                  }
                >
                  <div className="row">
                    {nfts?.map((nft, index) => (
                      <>
                        {(
                          <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                            <NftItem nft={nft} key={index} likeAndDisLikeCallback={apisCall} />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </InfiniteScroll>
              </>
            )
            }

            {nfts?.length > pageSize && (
              // <div className="col-lg-12">

              //   <div className="spacer-single"></div>
              //   <span onClick={loadMore} className="btn-main lead m-auto">
              //     Load More
              //   </span>
              // </div>
              <></>
            )}

            {/* Loadmore
            {status === 'ReadyForSell' ? (
              <>
                {filterData?.length && filterTrigger ? (
                  <>
                    {nfts?.length < filterData?.length && (
                      <div className="col-lg-12">
                        <div className="spacer-single"></div>
                        <span onClick={loadMore} className="btn-main lead m-auto">
                          Load More Filter
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {marketNfts?.length < MyNfts?.length && !filterTrigger && (
                      <div className="col-lg-12">
                        <div className="spacer-single"></div>
                        <span onClick={loadMore} className="btn-main lead m-auto">
                          Load More
                        </span>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {filterData?.length && filterTrigger ? (
                  <>
                    {nfts?.length < filterData?.length && (
                      <div className="col-lg-12">
                        <div className="spacer-single"></div>
                        <span onClick={loadMore} className="btn-main lead m-auto">
                          Load More Filter
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {nfts?.length < MyNfts?.length && !filterTrigger && (
                      <div className="col-lg-12">
                        <div className="spacer-single"></div>
                        <span onClick={loadMore} className="btn-main lead m-auto">
                          Load More
                        </span>
                      </div>
                    )}
                  </>
                )}
              </>
            )} */}
          </>
        )
}
        </>
             
            )}
     </div>
    </>
  );
}

export default MyNfts;
