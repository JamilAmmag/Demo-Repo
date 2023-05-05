import React, { useEffect, useRef, useState } from 'react';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import { useHistory } from "react-router";
import { Link, useHistory, useParams, Redirect } from "react-router-dom";
import $ from 'jquery';
import bar from '../../assets/images/bar.png';
import nftpost1 from '../../assets/images/banner-img.jpg';
import banner from '../../assets/images/banner-1.png';
import bannerimg from "../../assets/images/banner-img.jpg";
import banner1 from "../../assets/images/small-banner1.png";
import banner2 from "../../assets/images/small-banner2.png";
import banner3 from "../../assets/images/small-banner3.png";
import banner4 from "../../assets/images/small-banner4.png";
import funkloader from "../../assets/images/funk_loader.gif";
import { ScaleLoader } from 'react-spinners';
import txtbg from "../../assets/images/txt-bg.png";
import txtbg1 from "../../assets/images/txt-bg1.png";
import txtbg2 from "../../assets/images/txt-bg2.png";
import txtbg3 from "../../assets/images/txt-bg3.png";
import nftpost from "../../assets/images/nft-post.png";
import defaultImg from "../../assets/images/default.png";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import API from '../../Redux/Api';
import { isUndefined, toInteger } from 'lodash';
import { PulseLoader, BounceLoader } from "react-spinners";
import NftItem from '../Shared/NFT';
import moment from "moment";
import GetNftMarketAction from "../../Redux/Actions/NftActions/GetNftMarketAction";
import Slider from "react-slick";
import AuthorList from '../components/authorList';
import MyNfts from './MyNfts/MyNfts';
import RangeSlider from 'react-bootstrap-range-slider';
import InfiniteScroll from "react-infinite-scroll-component";
var arr = []
var colArr = []



function Explore(props) {
    const history = useHistory();
    const classRef = useRef(null)
    const Marketplaceprodu = useSelector(
        (state) => state.GetNftMarket?.GetNftMarketResponse?.data
    );
    const GetAllCollections = useSelector(
        (state) => state?.GetMyAllCollections?.GetAllMyCollectionsResponse?.data
    );

    const GetNftCollectionCategories = useSelector(
        (state) => state?.GetNftCollectionCategories?.GetNftCollectionCategoriesResponse?.data
    );



    const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;


    const dispatch = useDispatch();
    const [allData, setAllData] = useState([]);
    const [days, setDays] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [timer, setTimer] = useState(false);
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    const [favnft, setfavnft] = useState(false);
    const [isInterval, setIsInterval] = useState(false);
    const [countoffav, setcountoffav] = useState(0);
    const [reaminingChech, setreaminingChech] = useState(false);
    const [Todaycheck, setTodaycheck] = useState(false);
    const [categories, setCategories] = useState();
    const [todayNfts, setTodayNfts] = useState(false);
    const [error, setError] = useState(false);
    const [allCollections, setAllCollections] = useState([]);
    const [minValue, setMinValue] = useState();
    const [maxValue, setMaxValue] = useState();
    const [reset, setResetState] = useState(false);
    const [pageSize, setPage] = useState(9);
    const [CurrentPagec, setCurrentPagec] = useState(1)

    const [totalItems, settotalItems] = useState(0)

    const [currentpag, setcurrentpage] = useState(1)

    const [collectionFilterState, setCollectionFilterState] = React.useState({
        categories: [

        ],
    });
    const [filterState, setFilterState] = React.useState({
        topFilter: "AllNFT",
        walletAddress: 'nill',
        pageSize: 9,
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
        sortBy: "desc",
        sortIndex: 1,
        search: ""
    });

    const callingcollection = () => {
        let temp = currentpag;
        // API.GetNftsFilter.GetNftsFilterApi(temp+1).then((response) => {
        //   setcurrentpage(temp+1)
        //   let temp1=response.data.data;
        //   Setnfts(prevState => [...prevState, ...temp1]);
        //   // Setnfts([...nfts,...temp1] );
        //   setAllData(response.data.data);
        //   setIsloading(false)
        //   settotalItems(response.data.totalItems)
        // })
        API.GetAllCollectionFilterApi.GetAllCollectionsByCatgoriesIds(temp + 1, { catgoryId: filterState.categories }).then((response) => {
            setcurrentpage(temp + 1)
            let temp1 = response.data.data;
            setAllCollections(prevState => [...prevState, ...temp1]);
            // setAllCollections(response.da
            settotalItems(response.data.totalItems)
        })
    }

    useEffect(() => {
        API.GetNftCollectionCategories.GetNftCollectionCategoriesApi().then((response) => {

            setCategories(response.data.data)
        })
        // API.GetNftMarket.GetNftMarketApi().then((response) => {
        //     setAllData(response.data.data)
        // })
        // API.GetTodayNfts.GetTodayNftsApi().then((response) => {
        //     setTodayNfts(response.data.data)
        // })

    }, [])

    // useEffect(() => {
    //     callingcollection()
    //     setcurrentpage(0)
    //     setAllCollections([]);
    // }, [filterState])

    useEffect(() => {
        setcurrentpage(1)
        setAllCollections([]);
        setCurrentPagec(1)
    }, [filterState])


    const colFilter = (id) => {
        // setCollectionFilterState((prev, index) => collectionFilterState.categories.some(element => element == id) ? { ...prev, categories: collectionFilterState.categories.filter((item, i) => item != id) } : { ...prev, categories: [...collectionFilterState.categories, id] })
        arr.indexOf(id) === -1 ? arr.push(id) : arr.splice(arr.indexOf(id), 1);
        API.GetAllCollectionFilterApi.GetAllCollectionsByCatgoriesIds({ catgoryId: arr }).then((response) => {
            setAllCollections(response.data.data)
        })

    }

    const [openMenu, setOpenMenu] = React.useState(true);
    const [openMenu1, setOpenMenu1] = React.useState(false);
    const [openMenu2, setOpenMenu2] = React.useState(false);
    const [openMenu3, setOpenMenu3] = React.useState(false);
    const [openMenu4, setOpenMenu4] = React.useState(false);
    const [priceEnter, setpriceEnter] = React.useState(true);

    const [setter, setSetter] = React.useState([]);


    useEffect(() => {
        if (priceEnter == false) {
            setMinValue("");

        }
    }, [priceEnter])


    const MinPrice = (value) => {
        setError(false);


        setMinValue(value);


    }

    useEffect(() => {


        // if (openMenu || openMenu2) {
        //     // Setnfts(response.data.data?.slice(0, 3));
        //     API.GetNftsFilter.GetNftsFilterApi(filterState).then((response) => {
        //     setAllData(response.data.data);
        //     })
        // }

        // else if (openMenu3) {
        //     API.GetNftsFilter.GetNftsFilterApi(filterState).then((response) => {

        //     setTodayNfts(response.data.data)
        //         })
        // }


    }, [filterState || openMenu2 || openMenu || openMenu3])

    // useEffect(() => {

    //     if (localStorage.getItem("Tab") == "allnfts") {
    //         handleBtnClick();

    //     }
    //     else if (localStorage.getItem("Tab") == "collections") {
    //         handleBtnClick1();

    //     }
    //     else if (localStorage.getItem("Tab") == "live") {
    //         handleBtnClick2();

    //     }
    //     else if (localStorage.getItem("Tab") == "todayspick") {
    //         handleBtnClick3();

    //     }
    //     else if (localStorage.getItem("Tab") == "topseller") {
    //         handleBtnClick4();

    //     }
    //     else {
    //         handleBtnClick()
    //     }
    // }, [])

    const setfilterupda = () => {
        setCurrentPagec(CurrentPagec + 1)
    }



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
                return { ...prev, min: parseFloat(minValue), max: parseFloat(maxValue) }
            })
            setError(false)
        }
    }

    const handleBtnClick = () => {
        setFilterState((prev) => {
            return { ...prev, topFilter: 'AllNFT' }
        })
        setOpenMenu(true);
        setOpenMenu1(false);
        setOpenMenu2(false);
        setOpenMenu3(false);
        setOpenMenu4(false);
        document.getElementById("Mainbtn")?.classList?.add("active");
        document.getElementById("Mainbtn1")?.classList?.remove("active");
        document.getElementById("Mainbtn2")?.classList?.remove("active");
        document.getElementById("Mainbtn3")?.classList?.remove("active");
        document.getElementById("Mainbtn4")?.classList?.remove("active");
    };
    const handleBtnClick1 = () => {
        setOpenMenu(false);
        setOpenMenu1(true);
        setOpenMenu2(false);
        setOpenMenu3(false);
        setOpenMenu4(false);
        document.getElementById("Mainbtn")?.classList?.remove("active");
        document.getElementById("Mainbtn1")?.classList?.add("active");
        document.getElementById("Mainbtn2")?.classList?.remove("active");
        document.getElementById("Mainbtn3")?.classList?.remove("active");
        document.getElementById("Mainbtn4")?.classList?.remove("active");
    };
    const handleBtnClick2 = () => {
        setFilterState((prev) => {
            return { ...prev, topFilter: 'LiveAuction' }
        })
        setOpenMenu(false);
        setOpenMenu1(false);
        setOpenMenu2(true);
        setOpenMenu3(false);
        setOpenMenu4(false);

        document.getElementById("Mainbtn")?.classList?.remove("active");
        document.getElementById("Mainbtn1")?.classList?.remove("active");
        document.getElementById("Mainbtn2")?.classList?.add("active");
        document.getElementById("Mainbtn3")?.classList?.remove("active");
        document.getElementById("Mainbtn4")?.classList?.remove("active");

    };
    const handleBtnClick3 = () => {
        setFilterState((prev) => {
            return { ...prev, topFilter: 'TodayPick' }
        })
        setOpenMenu(false);
        setOpenMenu1(false);
        setOpenMenu2(false);
        setOpenMenu3(true);
        setOpenMenu4(false);
        document.getElementById("Mainbtn")?.classList?.remove("active");
        document.getElementById("Mainbtn1")?.classList?.remove("active");
        document.getElementById("Mainbtn2")?.classList?.remove("active");
        document.getElementById("Mainbtn3")?.classList?.add("active");
        document.getElementById("Mainbtn4")?.classList?.remove("active");
    };
    const handleBtnClick4 = () => {
        setOpenMenu(false);
        setOpenMenu1(false);
        setOpenMenu2(false);
        setOpenMenu3(false);
        setOpenMenu4(true);
        document.getElementById("Mainbtn")?.classList?.remove("active");
        document.getElementById("Mainbtn1")?.classList?.remove("active");
        document.getElementById("Mainbtn2")?.classList?.remove("active");
        document.getElementById("Mainbtn3")?.classList?.remove("active");
        document.getElementById("Mainbtn4")?.classList?.add("active");
    };

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,

        slidesToScroll: 1,
        responsive: [


            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,

                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const [filterTrigger, setFilterTrigger] = useState(false);

    const [filter, setfilter] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const searchRef = useRef();
    const resetFilter = () => {
        setAllCollections(allData);
        setfilter([]);
        setFilterTrigger(false);

        searchRef.current.value = "";
    };
    const handlerSearchSubmit = (e) => {
        e.preventDefault();
        setFilterTrigger(true);

        setAllCollections(filter);
        setFilterData(filter);
    };
    const handleSearchChange = (e) => {
        const { value } = e.target;

        setfilter(
            allData?.filter((item) =>
                item.name.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    useEffect(() => {
        if (props.location.state == "auction") {
            handleBtnClick2()
        }
        else if (props.location.state == "collection") {
            handleBtnClick1()
        }
        else if (props.location.state == "today") {
            handleBtnClick3()
        }
    }, [])
    const loadMore = () => {
        setPage((prev) => prev + 9)
    };
    const [minCheck, setMinCheck] = useState(false);

    return (
        <>
            <section className="jumbotron breadcumb no-bg">
                <div className="mainbreadcumb ">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12  col-sm-12">
                                <div className="middle-header" style={{ backgroundImage: `url(${banner})` }}>
                                    <span className="drop-span"></span>
                                    <span className="star-span-1"></span>
                                    <span className="star-span-2"></span>
                                    <h1> <span>EXPLORE FUNKTROPOLIS NFTs</span>
                                       </h1>
                                    <p>Trendy and stylish NFTs on Funktropolis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    {/* <div className="row">
                        <div className="col-lg-12 col-md-12  col-sm-12">
                            <h5>Categories</h5>
                        </div>
                        <ul className="choose-select-list">
                            {categories ? (
                                <>
                                    <Slider {...settings} >
                                        {categories?.map((data, index) => {
                                            return (<>
                                                <li onClick={() => {

                                                    if (filterState.categories.includes(data.id)) {
                                                        let remaining = filterState.categories.filter(item2 => item2 !== data.id)
                                                        setFilterState((prev) => {
                                                            return { ...prev, categories: remaining }
                                                        })
                                                    }
                                                    else {
                                                        setFilterState((prev) => {
                                                            return { ...prev, categories: [...filterState.categories, data.id] }
                                                        })
                                                    }
                                                }}>
                                                    <a className={filterState.categories.includes(data.id) ? 'choose-item wid border-collection' : 'choose-item wid'} href="javascript:void(0);">
                                                        <div className="img-pnl">
                                                            <img src={httpUrl + '/' + data.categoryImage} alt="category image" />
                                                        </div>
                                                        <div className="txt-pnl" style={{ backgroundImage: `url(${txtbg})` }}>
                                                            <h6>{data.name}</h6>
                                                        </div>
                                                    </a>
                                                </li>
                                            </>)
                                        })}
                                    </Slider>
                                </>
                            ) : (
                                <div className="col-sm-12 d-flex justify-content-center">
                                    <BounceLoader color="white" size="60" />
                                </div>
                            )}
                        </ul>
                    </div> */}
                    {/* <div className="row"> */}
                    {/* <div className="col-lg-12"> */}
                    {/* <div className="items_filter"> */}
                    {/* <ul className="de_nav de_nav"> */}
                    <li id="Mainbtn">
                        {/* <span onClick={() => {
                                            handleBtnClick()
                                            localStorage.setItem("Tab", "allnfts")
                                        }}> All NFTs</span> */}
                    </li>
                    {/* <li id="Mainbtn1" className=""> */}
                    {/* <span onClick={() => {
                                            handleBtnClick1()
                                            localStorage.setItem("Tab", "collections")
                                        }}>Collections</span> */}
                    {/* </li> */}
                    {/* <li id="Mainbtn2" className=""> */}
                    {/* <span onClick={() => {
                                            handleBtnClick2()
                                            localStorage.setItem("Tab", "live")
                                        }}>Live Auctions</span> */}
                    {/* </li> */}
                    {/* <li id="Mainbtn3" className=""> */}
                    {/* <span onClick={() => {
                                            handleBtnClick3()
                                            localStorage.setItem("Tab", "todayspick")
                                        }}>Today's Picks</span> */}
                    {/* </li> */}
                    {/* <li id="Mainbtn4" className=""> */}
                    {/* <span onClick={() => {
                                            handleBtnClick4()
                                            localStorage.setItem("Tab", "topseller")
                                        }}>  Top Sellers</span> */}
                    {/* </li> */}
                    {/* </ul> */}
                    {/* </div> */}
                    {/* </div> */}
                    {/* </div> */}
                    <div className='tab-container full-div'>
                        {/* Side Filter */}
                        {(openMenu || openMenu2 || openMenu3 || openMenu1) && (
                            <div className="side-filter-bar">
                                <div className="filter-head-pnl">
                                    <h5>Filters</h5>
                                    <i className="fa fa-filter"></i>
                                </div>
                                <div className="filter-body-pnl">
                                    <div class="accordion" id="myAccordion">
                                      
                                        {(openMenu || openMenu2 || openMenu3 || openMenu1) && (
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="headingTwo">
                                                    <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo">Categories</button>
                                                </h2>
                                                <div id="collapseTwo" class="accordion-collapse collapse">
                                                    <div class="card-body">
                                                        {

                                                            categories?.map((item, index) =>
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
                                        )}
                                        {(openMenu || openMenu2 || openMenu3) && (
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

                                                                        <input

                                                                            onKeyPress={(event) => {
                                                                                if (/[+-]/.test(event.key)) {
                                                                                    event.preventDefault();
                                                                                }
                                                                            }}

                                                                            onChange={e => {
                                                                                MinPrice(e.target.value)}}
                                                                            min="0" type="number" className="form-control-custom inputtextColor" value={minValue}



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
                                                                                return { ...prev, min: 0, max: 0 }
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
                                                                    <input onChange={() => setFilterState((prev) => filterState.video ? { ...prev, video: false } : { ...prev, video: true })} class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
                                                                    <label class="form-check-label" for="defaultCheck11">
                                                                        Video
                                                                    </label>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>

                                            </>
                                        )}
                                          {(openMenu || openMenu2 || openMenu3) && (
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
                                    </div>

                                </div>
                            </div>

                        )}
                        {/* Side Filter */}
                        <div className='tab-inner-container'>
                            {openMenu && (
                                <div id="zero1" className="onStep fadeIn">
                                    {/* {GetNftMarket ? GetNftMarket.map((payload, index)=>{}): ()} */}
                                    {/* <div className="flex-div">
                                        <div>
                                            <h1>{allData ? allData.length == 1 ? allData.length + ' Item' : allData.length + ' Items' : 'No items'}</h1>
                                        </div>
                                    </div> */}

                                    <div className='full-div'>
                                        <div id="zero2" className="onStep nft-poori-chahy fadeIn">
                                            <div className="flex-div">
                                            </div>
                                            {/* <MyNfts filterNfts={filterState} status={'AllNFT'} /> */}
                                            <MyNfts filterNfts={filterState} arrayfromprop={[]} status={'AllNFT'} Currentpageupdate={setfilterupda} currentpagefromprop={CurrentPagec} />

                                        </div>
                                    </div>
                                </div>

                            )}
                            {openMenu1 && (
                                <>
                                    <div>
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
                                                    onChange={(e) => handleSearchChange(e)}
                                                    style={{ width: "50%", color: "black" }}
                                                />
                                            
                                                <div className="clearfix"></div>
                                            </div>
                                        {/* </form> */}
                                    </div>
                                    <div id="zero1" className="onStep fadeIn">
                                        <div className="full-div text-center">
                                            <div>
                                                <h1>{allCollections ? allCollections.length == 1 ? allCollections.length + ' Item' : totalItems + ' Items' : ''}</h1>
                                            </div>
                                            {/* <ul className='sort-list'>
                                            <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                                            <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                                        </ul> */}
                                        </div>

                                        <div className='row'>
                                            <div className='full-div'>
                                                <InfiniteScroll
                                                    dataLength={allCollections?.length}
                                                    next={callingcollection}
                                                    hasMore={currentpag > parseFloat(totalItems / 9) ? false : true}
                                                    loader={
                                                        <div className="col-sm-12 d-flex justify-content-center">
                                                            <ScaleLoader color="white" size="20" />
                                                        </div>
                                                    }
                                                >
                                                    <div className='row'>
                                                        {allCollections ? allCollections?.map((payload, index) => {
                                                            return (

                                                                <div className='col-lg-6 col-md-6 col-sm-12 col-xl-4'>
                                                                    <div onClick={() => {
                                                                        history.push(
                                                                            `/nftsbycollections/${payload.id}`
                                                                        );
                                                                    }} style={{ cursor: 'pointer' }} class="nft nft-post collection">
                                                                        <div class="itm">
                                                                            <div class="nft-inner">
                                                                                <div class="img-pnl">

                                                                                    <img src={payload.bannerImage} />
                                                                                    <div class="btn-cntnr">
                                                                                        <button class="reg-btn">Place Bid</button>
                                                                                    </div>
                                                                                    <div class="bid-time-pnl">
                                                                                        <div class="bid-time-pnl-inner">
                                                                                            <h3><span>04</span>:<span>05</span>:<span>12</span>:<span>18</span></h3></div></div>
                                                                                </div>
                                                                                <div class="text-pnl"><span class="owner-image">
                                                                                    <div class="owner-image-inner">

                                                                                        <img src={payload.logoImage} alt="" />
                                                                                       
                                                                                        </div>
                                                                                </span><div class="flex-div"><div class="collection-info"><h2>{payload?.name.length > 18 ? payload?.name.slice(0, 8) + "..." : payload?.name}</h2>
                                                                                    <h4><span>Created By</span> {payload.createrName ? payload.createrName.length > 15 ? payload?.createrName.slice(0, 8) : payload.createrName : 'Unnamed'}</h4></div><div class="info-panel"><h6>Artist name</h6>
                                                                                            <h2> marianna</h2><h3> marianna</h3></div><div class="post-bid-panel"><h3> Price</h3><p>
                                                                                                0.023..</p><span class="future-price">$2156.68</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="space10"></div>
                                                                                    <div class="flex-div bottom-btn">
                                                                                        {/* <a href="#" class="history-refresh-btn"><i class="fa fa-refresh" aria-hidden="true"></i>
                                                                                            View History</a> */}
                                                                                            <a class="reg-btn small brdr-rad" href="#">Buy Now</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                            );
                                                        }
                                                        ) : (
                                                            <>
                                                                <div className="col-sm-12 d-flex justify-content-center">

                                                                    <img width={100} height={100} src={funkloader} />
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>

                                                </InfiniteScroll>
                                            </div></div>

                                    </div>
                                    {/* {allCollections?.length > pageSize && (
                                        <div className="col-lg-12">

                                            <div className="spacer-single"></div>
                                            <span onClick={loadMore} className="btn-main lead m-auto">
                                                Load More
                                            </span>
                                        </div>
                                    )} */}
                                </>
                            )}
                            {openMenu2 && (
                                <>
                                    <div id="zero1" className="onStep fadeIn">
                                        {/* {GetNftMarket ? GetNftMarket.map((payload, index)=>{}): ()} */}
                                        {/* <div className="flex-div">
                                            <div>
                                                <h1>{allData ? allData.length == 1 ? allData.length + ' Item' : allData.length + ' Items' : 'No items'}</h1>
                                            </div>
                                        </div> */}

                                        <div className='full-div'>
                                            <div id="zero2" className="onStep nft-poori-chahy fadeIn">
                                                <div className="flex-div">
                                                </div>
                                                <MyNfts filterNfts={filterState} status={'LiveAuction'} />
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )}
                            {openMenu3 && (
                                <>
                                    <div id="zero1" className="onStep fadeIn">
                                        {/* {GetNftMarket ? GetNftMarket.map((payload, index)=>{}): ()} */}
                                        {/* <div className="flex-div">
                                            <div>
                                                <h1>{todayNfts ? todayNfts.length == 1 ? todayNfts.length + ' Item' : todayNfts.length + ' Items' : 'No items'}</h1>
                                            </div>
                                        </div> */}

                                        <div className='full-div'>
                                            <div id="zero2" className="onStep nft-poori-chahy fadeIn">
                                                <div className="flex-div">
                                                </div>

                                                <MyNfts filterNfts={filterState} status={'TodayPick'} />

                                            </div>
                                        </div>
                                    </div>

                                </>
                            )}
                            {openMenu4 && (
                                <>
                                    <div className='chepi'>
                                        <AuthorList />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <div className='full-div spacer-40'></div>
            <Footer />
        </>
    );
};
export default Explore;
