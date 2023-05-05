import React, { useEffect, useState, Component } from "react";
import { useHistory } from "react-router-dom";
import heart from "../../assets/images/heart-icon.png";
// import verified from "../../assets/images/orange.png";
import defaultImg from "../../assets/images/default.png";
import { useDispatch, useSelector } from "react-redux";
import GetFavouriteNftAction from "../../Redux/Actions/NftActions/GetFavouriteNftAction";
import GetNftMarketAction from "../../Redux/Actions/NftActions/GetNftMarketAction";
import { toast } from "react-toastify";
import rlc from "../../assets/images/favicon.ico";
import http from "../../Redux/Api/http";
import { PulseLoader, BounceLoader } from "react-spinners";

import moment from "moment";
class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return <div {...props}></div>;
  }
}

const NftItem = ({ nft, likeAndDisLikeCallback, index, color, filtering }) => {
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

  const history = useHistory();
  const dispatch = useDispatch();
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const isConnected = useSelector((state) => state.Login?.authResponse?.data);
  const myFouritesNFTs = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );
  const [days, setDays] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [hours, setHours] = useState();
  const [timer, setTimer] = useState(false);
  const [minutes, setMinutes] = useState();
  const [starttimein, setstarttimein] = useState(false);
  const [reaminingChech, setreaminingChech] = useState(false);
  const [Todaycheck, setTodaycheck] = useState(false);

  const [seconds, setSeconds] = useState();
  const [buttonclicked, setbuttonclicked] = useState(false);
  const [countoffav, setcountoffav] = useState(0);
  const [favnft, setfavnft] = useState(false);

  const [isInterval, setIsInterval] = useState(false);
  useEffect(() => {
    if (myFouritesNFTs?.some((data) => data.id === nft?.id)) {
      setfavnft(true);
    } else {
      setfavnft(false);
    }
    setcountoffav(nft?.nftFavouritesCount);
    if (nft && !isInterval) {
      // let eventTime = moment(nft?.bidEndDate).unix();
      // const starttimecheck = moment(startDate).unix();

      // if (moment(startDate).isBefore(nft?.bidStartDate)) {
      //   setstarttimein(true);
      //   eventTime = moment(nft?.bidStartDate).unix();
      // } else if (moment(startDate).isSame(nft?.bidEndDate)) {
      //   setreaminingChech(true);
      //   setTodaycheck(true);
      //   return;
      // } else if (moment(nft?.bidEndDate).isBefore(startDate)) {
      //   setreaminingChech(true);
      //   setTodaycheck(false);
      //   return;
      // }
      // const currentTime = moment().unix();

      // const diffTime = eventTime - currentTime;
      // let duration = moment.duration(diffTime * 1000, "milliseconds");
      // const interval = 1000;
      // var timerID = setInterval(() => {
      //   setIsInterval(true);
      //   if (duration._milliseconds <= 0) {
      //     setDays("0");
      //     setHours("0");
      //     setMinutes("0");
      //     setSeconds("0");
      //     setTimer(true);
      //   } else {
      //     duration = moment.duration(duration - interval, "milliseconds");
      //     setDays(parseInt(duration.asDays()));
      //     setHours(duration.hours());
      //     setMinutes(duration.minutes());
      //     setSeconds(duration.seconds());
      //     setTimer(true);
      //   }
      // }, interval);
      const eventTime = moment(nft?.bidEndDate).utc().unix();
      const currentTime = moment.utc().unix()
      const endtime12 = moment(nft?.bidEndDate).utc().unix()
      const diffTime = endtime12 - currentTime
      // console.log("zain endtime",endtime12)
      // console.log("zain currentTime",currentTime)
      let duration = moment.duration(diffTime * 1000, "milliseconds");
      const interval = 1000;
      var timerID = setInterval(() => {
        setIsInterval(true);
        if (duration._milliseconds <= 0) {
          setDays("0");
          setHours("0");
          setMinutes("0");
          setSeconds("0");
          setTimer(true);
        } else {
          duration = moment.duration(duration - interval, "milliseconds");
          console.log("calculating days", duration)
          setDays(parseInt(duration.asDays()));
          setHours(duration.hours());
          setMinutes(duration.minutes());
          setSeconds(duration.seconds());
          setTimer(true);
        }
      }, interval);
      return () => clearInterval(timerID);
    }
  }, []);

  const removeFromLike = () => {
    setbuttonclicked(true);
    if (!isConnected) {
      toast.error(`Please connect to wallet first`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setbuttonclicked(false);
      return;
    }
    http
      .put(httpUrl + "/api/v1/Nft/RemoveFavouriteNft", {
        nftId: nft?.id,
        nftAddress: nft?.ownerAddress,
      })
      .then((resp) => {
        toast.success(`Removed from favourite`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(GetFavouriteNftAction())
          .then((resp) => {
            likeAndDisLikeCallback();
            setbuttonclicked(false);
            setfavnft(false);
            setcountoffav(countoffav - 1);
          })
          .catch((error) => {
            setbuttonclicked(false);
          });
      })
      .catch((error) => {
        setbuttonclicked(false);
      });
  };

  const addToLike = () => {
    setbuttonclicked(true);
    if (!isConnected) {
      toast.warn(`Please connect to wallet first`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setbuttonclicked(false);
      return;
    }
    http
      .post(httpUrl + "/api/v1/Nft/AddFavouriteNft", {
        nftId: nft?.id,
        nftAddress: nft?.ownerAddress,
      })
      .then((resp) => {
        toast.success(`Added to favourite`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        dispatch(GetFavouriteNftAction())
          .then((resp) => {
            likeAndDisLikeCallback();
            setfavnft(true);
            setcountoffav(countoffav + 1);
            setbuttonclicked(false);
          })
          .catch((error) => {
            setbuttonclicked(false);
          });
      })
      .catch((error) => {
        setbuttonclicked(false);
      });
  };

  const [play, setPlay] = useState(false);
  const playPause = (id) => {
    let vidPlay = document.getElementById(id);
    let dura = vidPlay.duration * 1000;
    if (vidPlay.paused) {
      vidPlay.play();
      setPlay(true)
    } else {
      vidPlay.pause();
      setPlay(false)
    }
    setTimeout(() => {
      setPlay(false)
    }, dura);
  };

  return (
    // live
    // collection
    <div
      className={
        window.location.pathname.split("/")[1] == "explore"
          ? "col-lg-6 col-md-6 col-sm-12 col-xl-4"
          : ""
      }
    >
      <div
        className={nft?.isBidOpen ? "nft nft-post live" : "nft nft-post live"}
      >
        {/* <CustomSlide className="itm" index={1}> */}
        <div style={{ minHeight: "506px" }} className="nft-inner">
          {/* //heart icon */}

          {/* <span className="heart-span" style={{ cursor: "pointer" }} onClick={buttonclicked ? <></> : favnft ? removeFromLike : addToLike} >
            {
              myFouritesNFTs?.some((data) => data.id === nft.id) ?  <i style={{color:'red'}} className='fa fa-heart'/> : <i className='fa fa-heart mr-1'/>
            }
            {" "}
            {countoffav}
          </span> */}

          <div
            className="img-pnl"
            onClick={() => history.push(`/usernftdetail/${nft?.id}`)}
          >
            {/* <img src={httpUrl + "/" + nft?.image} className="lazy img-fluid" alt="" style={{ textAlign: "center" }} /> */}

            {nft?.image.includes(".mp4") ? (
              <>
                <video
                  id={nft?.id}
                  style={{ width: "100%", height: "100%" }}
                  src={`${nft?.image}`}
                  currentTime={11.3}
                />
              </>
            ) : (
              <img
                src={`${nft?.image}`}
                className="img-fluid img-rounded mb-sm-30"
                alt="NFT.png"
              />
            )}

            {nft?.isBidOpen && (
              <div className="bid-time-pnl">
                <div class="bid-time-pnl-inner">
                  <h3>
                    <span>{days ? days : days === 0 ? 0 : 0} </span>:{" "}
                    <span>{hours ? hours : hours === 0 ? 0 : 0} </span> :{" "}
                    <span>{minutes ? minutes : minutes === 0 ? 0 : 0} </span> :{" "}
                    <span>{seconds ? seconds : seconds === 0 ? 0 : 0} </span>
                  </h3>
                </div>
              </div>
            )}
          </div>
          <div>
            {nft?.image.includes(".mp4") && (
              <button
                className="play-pause"
                id={nft?.id}
                onClick={() => {
                  playPause(nft?.id);
                }}
              >
                <i className={!play? "fa fa-play": "fa fa-pause"} aria-hidden="true"></i>
              </button>
            )}
          </div>
          <div className="text-pnl">
            <div className="flex-div" style={{ marginBottom: "15px" }}>
              <h2
                className="wordbreak"
                onClick={() => window.open("", "_self")}
              >
                {" "}
                {nft?.name?.length > 8
                  ? nft?.name?.slice(0, 8) + "..."
                  : nft?.name}
              </h2>
            </div>

            <div className="flex-div">
              <div className="collection-info">
                <h2>Neon City Collection</h2>
                <h4>
                  <span>Created By</span> {nft?.name}
                </h4>
              </div>
              <div className="info-panel">
                <div className="full-div" style={{ display: "flex" }}>
                  <span
                    className="owner-image"
                    onClick={() => {
                      history.push(
                        nft.ownerAddress === WalletAddress
                          ? `/myprofile`
                          : `/profile/${nft.ownerAddress}`
                      );
                    }}
                  >
                    <div className="owner-image-inner">
                      <img
                        src={nft?.ownerImage ? nft?.ownerImage : defaultImg}
                        alt=""
                      />
                      {/* <span className='check-span'><i className='fa fa-check'></i></span> */}
                    </div>
                  </span>
                  <div>
                    <h6 className="wordbreak">
                      {nft?.ownerName
                        ? nft?.ownerName?.length > 8
                          ? nft?.ownerName?.slice(0, 8) + "..."
                          : nft?.ownerName
                        : "Unanmed"}
                    </h6>
                    <h3 style={{ paddingLeft: "10px" }} className="wordbreak">
                      {" "}
                      {"#" + nft?.id}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="post-bid-panel">
                <h3> Price</h3>
                <p>
                  <img
                    style={{
                      display: "inline-block",
                      maxWidth: "20px",
                      marginRight: "4px",
                      marginBottom: "4px",
                    }}
                    src={rlc}
                    alt="REDLC"
                  />
                  {" " + nft?.sellPrice == 0
                    ? nft.buyPrice
                    : nft?.sellPrice?.toString()?.length > 5
                    ? nft?.sellPrice?.toString()?.slice(0, 5) + ".."
                    : nft?.sellPrice + " "}
                </p>
                {/* <span className='future-price wordbreak'>({nft?.sellPriceRateInUSD ? "$" + nft?.sellPriceRateInUSD : nft?.buyPriceRateInUSD})</span> */}
              </div>
            </div>
            <div className="space10"></div>
            <div className="flex-div bottom-btn">
              {/* <a className='history-refresh-btn' onClick={() => history.push(`/usernftdetail/${nft?.id}`)}><i className='fa fa-refresh'></i> View History </a> */}
              {nft?.ownerAddress != WalletAddress &&
                nft?.staus == "ReadyForSell" &&
                !nft?.isBidOpen && (
                  <a
                    onClick={() => history.push(`/usernftdetail/${nft?.id}`)}
                    className="reg-btn small brdr-rad"
                    href="javascript:void(0);"
                  >
                    Buy Now
                  </a>
                )}
              {nft?.ownerAddress != WalletAddress && nft?.isBidOpen && (
                <a
                  onClick={() => history.push(`/usernftdetail/${nft?.id}`)}
                  className="reg-btn small brdr-rad"
                  href="javascript:void(0);"
                >
                  Place Bid
                </a>
              )}
            </div>
          </div>
        </div>

        {/* </CustomSlide> */}
      </div>
    </div>
  );
};

export default NftItem;
