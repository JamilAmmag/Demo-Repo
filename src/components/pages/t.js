import React, { useEffect, useRef, useState } from 'react';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import bar from '../../assets/images/bar.png';
import nftpost1 from '../../assets/images/banner-img.jpg';
import banner from '../../assets/images/banner-2.png';
import bannerimg from "../../assets/images/banner-img.jpg";
import banner1 from "../../assets/images/small-banner1.png";
import banner2 from "../../assets/images/small-banner2.png";
import banner3 from "../../assets/images/small-banner3.png";
import banner4 from "../../assets/images/small-banner4.png";
import txtbg from "../../assets/images/txt-bg.png";
import txtbg1 from "../../assets/images/txt-bg1.png";
import txtbg2 from "../../assets/images/txt-bg2.png";
import txtbg3 from "../../assets/images/txt-bg3.png";
import nftpost from "../../assets/images/nft-post.png";
import funkloader from "../../assets/images/funk_loader.gif";
import Footer from "../components/footer";
import { PulseLoader, BounceLoader, ScaleLoader } from "react-spinners";
import AuthorList from "../../components/components/authorList";
import Slider from "react-slick";
import { Link, useHistory, useParams, Redirect } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { createGlobalStyle } from 'styled-components';
import { GetMyAllCollectionsRequest } from "../../Redux/Actions/CollectionAction/GetMyAllCollections";
import { useDispatch, useSelector } from "react-redux";
import API from '../../Redux/Api';
var arr = []
const Allcollections = function (props) {
  const history = useHistory();

  const dispatch = useDispatch();
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

  const GetAllCollections = useSelector(
    (state) => state?.GetMyAllCollections?.GetAllMyCollectionsResponse?.data
  );
  const GetNftCollectionCategories = useSelector(
    (state) => state?.GetNftCollectionCategories?.GetNftCollectionCategoriesResponse?.data
  );

  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const [allCollections, setAllCollections] = React.useState([]);
  const [collectionLoad, setCollectionLoad] = React.useState(true);
  const [setter, setSetter] = React.useState([]);

  const [collectionsCheck, setAllCollectionsCheck] = React.useState(true);
  const [popularCollections, setPopularCollections] = React.useState([]);
  const [todaysCollections, setTodaysCollections] = React.useState([]);
  const [hotCollections, setHotCollections] = React.useState([]);
  const [popularCheck, setPopularCheck] = React.useState(false);
  const [todaysCheck, setTodaysCheck] = React.useState(false);
  const [hotCheck, setHotCheck] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = useState([])
  const [todaysNftReset, setTodaysNftReset] = useState([])
  const [categories, setCategories] = useState();
  const [calling_api_on_search, set_calling_api_on_search] = useState("")
  const [calling_api_on_search_change, set_calling_api_on_search_change] = useState(false)
  const [searched_item, setsearched_item] = useState("")
  const [called, setcalled] = useState(0)
  const [totalItems, settotalItems] = useState(0)
  const [is_first_time, set_is_first_time] = useState(false)
  const [currentpag, setcurrentpage] = useState(0)
  const [resetNum, setResetNum] = useState(0)
  const [currentpagpopular, setcurrentpagepopular] = useState(0)
  const [todays_total,settodays_total]=useState(0)
  const [currentpagtoday, setcurrentpagetoday] = useState(1)
  const [currentpag_hot, setcurrentpage_hot] = useState(0)
  useEffect(() => {
    API.GetNftCollectionCategories.GetNftCollectionCategoriesApi().then((response) => {

      setCategories(response.data.data)
    })

    // API.GetAllPopularCollections.GetAllPopularCollectionsApi({
    //   catgoryId: [

    //   ]
    // }).then((payload) => {

    //   setPopularCollections(payload.data.data)
    //   setPopularCheck(true)
    //   if (props.location.state == "collection") {
    //     handleBtnClick1()
    //   }
    // })
    // API.GetAllTodayCollections.GetAllTodayCollectionsApi({
    //   "catgoryId": [

    //   ]
    // }).then((payload) => {
    //   setTodaysCheck(true)
    //   setTodaysCollections(payload.data.data)

    // })
    // API.GetHotCollections.GetHotCollectionsApi().then((payload) => {
    //   setHotCollections(payload.data.data)
    //   setHotCheck(true)
    // })
    // Allcollection()


  }, [])
  const hot_collection_fun = () => {
    let temp = currentpag_hot;
    // API.GetNftsFilter.GetNftsFilterApi(temp+1).then((response) => {
    //   setcurrentpage(temp+1)
    //   let temp1=response.data.data;
    //   Setnfts(prevState => [...prevState, ...temp1]);
    //   // Setnfts([...nfts,...temp1] );
    //   setAllData(response.data.data);
    //   setIsloading(false)
    //   settotalItems(response.data.totalItems)
    // })
    API.GetHotCollectionsFilter.GetHotCollectionsFilterApi(
      temp + 1,
      {
        catgoryId: selectedCategory
      }
      , searched_item
    ).then((payload) => {

      setcurrentpage_hot(temp + 1)
      let temp1 = payload.data.data;
      setHotCollections(prevState => [...prevState, ...temp1]);

      settotalItems(payload.data.totalItems)
      setCollectionLoad(false)
    })
  }
  const Allcollection = () => {

    let temp = currentpag;
 
    API.GetAllCollectionFilterApi.GetAllCollectionsByCatgoriesIds(temp + 1, { catgoryId: selectedCategory },searched_item  ).then((response) => {
      setcurrentpage(temp + 1)
      let temp1 = response.data.data;
      if(currentpag   < parseFloat(response.data.totalItems / 9) )
      setAllCollections(prevState => [...prevState, ...temp1]);
      setAllData(prevState => [...prevState, ...temp1])
      settotalItems(response.data.totalItems)
      setResetNum(response.data.totalItems)
      setCollectionLoad(false)
    })

  }
  const Allcollection_first = () => {

    API.GetAllCollectionFilterApi.GetAllCollectionsByCatgoriesIds( 1, { catgoryId: selectedCategory },searched_item  ).then((response) => {
      setcurrentpage(1)
      let temp1 = response.data.data;
      setAllCollections(temp1);
      setAllData(prevState => [...prevState, ...temp1])
      settotalItems(response.data.totalItems)
      setResetNum(response.data.totalItems)
      setCollectionLoad(false)
    })
  }

  const todaycollection_fun_first = () => {
  API.GetAllTodayCollections.GetAllTodayCollectionsApi(
    1,
   {
     catgoryId: selectedCategory
   },"").then((payload) => {
     let temp1 = payload.data.data;
     setTodaysCollections(temp1);
     settodays_total(payload.data.totalItems)
     setCollectionLoad(false)
     setcurrentpagetoday(1)
   })
  }
  const todaycollection_fun = () => {
    let temp = currentpagtoday;
    API.GetAllTodayCollections.GetAllTodayCollectionsApi(
      temp + 1,
      {
        catgoryId: selectedCategory
      },searched_item).then((payload) => {

        let temp1 = payload.data.data;
        if(currentpagtoday  < parseFloat(payload.data.totalItems / 9))
        setTodaysCollections(prevState => [...prevState, ...temp1]);
        setTodaysNftReset(prevState => [...prevState, ...temp1])
        settodays_total(payload.data.totalItems)
        setCollectionLoad(false)
        setcurrentpagetoday(temp + 1)
      })

  }
  const popularcollections = () => {

    let temp = currentpagpopular;
    // API.GetNftsFilter.GetNftsFilterApi(temp+1).then((response) => {
    //   setcurrentpage(temp+1)
    //   let temp1=response.data.data;
    //   Setnfts(prevState => [...prevState, ...temp1]);
    //   // Setnfts([...nfts,...temp1] );
    //   setAllData(response.data.data);
    //   setIsloading(false)
    //   settotalItems(response.data.totalItems)
    // })
    API.GetAllPopularCollections.GetAllPopularCollectionsApi(
      {
        catgoryId: selectedCategory
      }).then((payload) => {

        setPopularCollections(payload.data.data);
        setCollectionLoad(false)
      })

  }
  useEffect(() => {
 
  }, [selectedCategory])

  useEffect(() => {

    if (openMenu) {

      setAllCollections([])
      Allcollection_first()
    }
    else if (openMenu1) {

      setcurrentpagepopular(0)
      setPopularCollections([])
      popularcollections()
    }
    else if (openMenu2) {
      setTodaysCollections([])
      todaycollection_fun_first()
    }
    else if (openMenu3) {
      setcurrentpage_hot(0)
      setHotCollections([])
      hot_collection_fun()
    }

  }, [selectedCategory])

  // useEffect(() => {

  //   if (localStorage.getItem("Tab") == "allcollections") {

  //     handleBtnClick();

  //   }
  //   else if (localStorage.getItem("Tab") == "popular") {
  //     handleBtnClick1();

  //   }
  //   else if (localStorage.getItem("Tab") == "new") {
  //     handleBtnClick2();

  //   }
  //   else if (localStorage.getItem("Tab") == "topseller") {
  //     handleBtnClick3();

  //   }
  //   else {
  //     handleBtnClick()
  //   }
  // }, [])
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,

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
        breakpoint: 390,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: true

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: true

        }
      }
    ]
  };
  // var settings = {
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 5,
  //   slidesToScroll: 1,
  //   initialSlide: 0,
  //   responsive: [
  //     {
  //       breakpoint: 1900,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         infinite: true,
  //       },
  //     },
  //     {
  //       breakpoint: 1600,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         infinite: true,
  //       },
  //     },
  //     {
  //       breakpoint: 1200,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         infinite: true,
  //       },
  //     },
  //     {
  //       breakpoint: 991,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 767,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 575,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         dots: true,
  //       },
  //     },
  //   ],
  // };
  const [filterState, setFilterState] = React.useState({
    topFilter: "AllNFT",
    walletAddress: 'nill',
    pageSize: 0,
    currentPage: 0,
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

  const handleBtnClick = () => {
    let x = called;
    setcalled(x + 1)
    setcurrentpage(0)
    setAllCollections([])
    Allcollection_first()
    setOpenMenu(true);
    setOpenMenu1(false);
    setOpenMenu2(false);
    setOpenMenu3(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    // if(!openMenu){
    // setSelectedCategory([])
    // }
  };
  const handleBtnClick1 = () => {
    let x = called;
    setcalled(x + 1)
    setcurrentpagepopular(0)
    setPopularCollections([])
    popularcollections()
    setOpenMenu1(true);
    setOpenMenu(false);
    setOpenMenu2(false);
    setOpenMenu3(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    // if(!openMenu1){
    //   setSelectedCategory([])
    //   }
  };
  const handleBtnClick2 = () => {
    let x = called;
    setcalled(x + 1)
    setTodaysCollections([])
    todaycollection_fun_first()
    setOpenMenu2(true);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);

    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn2").classList.add("active");
    // if(!openMenu2){
    //   setSelectedCategory([])
    //   }
  };
  const handleBtnClick3 = () => {
    let x = called;
    setcalled(x + 1)
    setcurrentpage_hot(0)
    setHotCollections([])
    hot_collection_fun()
    setOpenMenu3(true);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu2(false);
    document.getElementById("Mainbtn3").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    // if(!openMenu3){
    //   setSelectedCategory([])
    //   }
  };
  const [filterTrigger, setFilterTrigger] = useState(false);
  const [allData, setAllData] = useState([]);
  const [filter, setfilter] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const searchRef = useRef();

  const setHighlight = (id) => {

    // colFilter(id)
    if (setter.includes(id)) {
      var index = setter.indexOf(id)
      var spl = setter.splice(index, 1)
      var fil = setter.filter((prev) => prev.id != id)
      setSetter((prev) => [...prev, fil])
    }
    else {
      setSetter((prev) => {
        return [...prev, (GetNftCollectionCategories.some((prev) => prev.id === id) && !setter.includes(id)) && id]
      })
    }
  }

  const resetFilter = () => {
 
    setTodaysCollections([])
    setAllCollections(allData);
    setfilter([]);
    setFilterTrigger(false);
    if (openMenu2) {
      settotalItems(todaysNftReset.length)

    }
    else {
      settotalItems(resetNum)
    }
    searchRef.current.value = "";
  };
  const handlerSearchSubmit = (e) => {
    e.preventDefault();
    setFilterTrigger(true);
    setAllCollections(filter);
    setTodaysCollections(filter)
    setFilterData(filter);
    settotalItems(filter.length)
  };
useEffect(()=>{
  if(is_first_time)
{   setAllCollections([])
  API.GetAllCollectionFilterApi.GetAllCollectionsByCatgoriesIds( 1, { catgoryId: selectedCategory },searched_item  ).then((response) => {
    setcurrentpage(1)
    let temp1 = response.data.data;
    setAllCollections(temp1);
    setAllData(prevState => [...prevState, ...temp1])
    settotalItems(response.data.totalItems)
    setResetNum(response.data.totalItems)
    setCollectionLoad(false)
  })

  // API.GetNftsFilter.GetNftsFilterApi(temp+1).then((response) => {
  //   setcurrentpage(temp+1)
  //   let temp1=response.data.data;
  //   Setnfts(prevState => [...prevState, ...temp1]);
  //   // Setnfts([...nfts,...temp1] );
  //   setAllData(response.data.data);
  //   setIsloading(false)
  //   settotalItems(response.data.totalItems)
  // })
  API.GetHotCollectionsFilter.GetHotCollectionsFilterApi(
     1,
    {
      catgoryId: selectedCategory, 
    },searched_item).then((payload) => {

          setcurrentpage_hot(1)
          let temp1 = payload.data.data;
          setHotCollections(temp1);

      settotalItems(payload.data.totalItems)
      setCollectionLoad(false)
    })
}

},[calling_api_on_search])
  const handleSearchChange = (e, collec) => {
    const { value } = e.target;
    set_is_first_time(true)
    // setsearched_item(value)
    let temp = calling_api_on_search;
    set_calling_api_on_search(!temp)
    // if(openMenu2){
    //   setcurrentpagetoday(0)
    //   setfilter(
    //     todaysNftReset?.filter((item) =>
    //       item.name.toLowerCase().includes(value.toLowerCase())
    //     )
    //   );
    // }
    // else{
    //   setfilter(
    //     allData?.filter((item) =>
    //       item.name.toLowerCase().includes(value.toLowerCase())
    //     )
    //   );
    // }
  };

  // const colFilter = (id) => {
  //   if (arr.indexOf(id) === -1) {
  //     arr.push(id)
  //     document.getElementById(`defaultCheck${id}`).setAttribute('checked', true)
  //     API.GetAllPopularCollections.GetAllPopularCollectionsApi({
  //       catgoryId: arr
  //     }).then((payload) => {
  //       setPopularCollections(payload.data.data)
  //       setPopularCheck(true)

  //     })
  //   }
  //   else {
  //     arr.splice(arr.indexOf(id), 1)
  //     document.getElementById(`defaultCheck${id}`).removeAttribute('checked')
  //   }

  //   if (openMenu) {
  //     API.GetAllCollectionFilterApi.GetAllCollectionsByCatgoriesIds({ catgoryId: arr }).then((response) => {
  //       setAllCollections(response.data.data)
  //     })
  //   }
  //   if (openMenu1) {
  //     API.GetAllPopularCollections.GetAllPopularCollectionsApi({
  //       catgoryId: arr
  //     }).then((payload) => {
  //       setPopularCollections(payload.data.data)
  //     })
  //   }
  //   if (openMenu2) {
  //     API.GetAllTodayCollections.GetAllTodayCollectionsApi({
  //       "catgoryId": [

  //       ]
  //     }).then((payload) => {
  //       setTodaysCollections(payload.data.data)

  //     })
  //   }
  // }
  const [allpage, setAllPage] = useState(9);
  const [popPage, setPopPage] = useState(9);
  const [todPage, setTodPage] = useState(9);
  const [topPage, setTopPage] = useState(9);
  const loadMoreAllcollection = () => {
    setAllPage((prev) => prev + 9)
  };
  const loadMorePopCol = () => {
    setPopPage((prev) => prev + 9)
  };
  const loadMoreTodCol = () => {
    setTodPage((prev) => prev + 9)
  };
  const loadMoreTopCol = () => {
    setTopPage((prev) => prev + 9)
  };





  return (
    <>
      <section className="jumbotron breadcumb no-bg">
        <div className="mainbreadcumb ">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12  col-sm-12">
                <div className="middle-header" style={{ backgroundImage: `url(${banner})` }}>
                  <span className="drop-span"></span>
                  <h1>DISCOVER FUNKY NFT<br></br>
                    COLLECTIONS</h1>
                  <p>Trendy and stylish NFT collections on Funktropolis </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12  col-sm-12">
              <div className="col-lg-12 col-md-12  col-sm-12">
                <h5>Categories</h5>
              </div>


              {categories ? (
                <ul className="choose-select-list long">
                  <Slider {...settings}>
                    {categories.map((data, index) => (
                      <>

                        <li onClick={() => {

                          if (selectedCategory.includes(data.id)) {
                            let remaining = selectedCategory.filter(item2 => item2 !== data.id)
                            setSelectedCategory(remaining)
                          }
                          else {
                            setSelectedCategory((prev) => {
                              return [...prev, data.id]
                            })
                          }




                        }}>
                          <a className={selectedCategory.includes(data.id) ? 'choose-item wid border-collection' : 'choose-item wid'} href="javascript:void(0);">
                            <div className="img-pnl">
                              <img src={data.categoryImage} alt="category image" />
                            </div>
                            <div className="txt-pnl" style={{ backgroundImage: `url(${txtbg})` }}>
                              <h6>{data.name}</h6>
                              {/* <p>1573 Items</p> */}
                            </div>
                          </a>
                        </li>
                      </>
                    ))}
                  </Slider>
                </ul>
              ) : (
                <div className="col-sm-12 d-flex justify-content-center">
                  <img width={100} height={100} src={funkloader}/>
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="items_filter">
                <ul className="de_nav de_nav">
                  <li id="Mainbtn" className="active">
                    <span onClick={() => {
                      handleBtnClick()
                      localStorage.setItem("Tab", "allcollections")
                    }}> All Funky Collections</span>
                  </li>
                  <li id="Mainbtn1" className="">
                    <span onClick={() => {
                      handleBtnClick1()
                      localStorage.setItem("Tab", "popular")
                    }}>Popular</span>
                  </li>
                  <li id="Mainbtn2" className="">
                    <span onClick={() => {
                      handleBtnClick2()
                      localStorage.setItem("Tab", "new")
                    }}>New</span>
                  </li>
                  <li id="Mainbtn3" className="">
                    <span onClick={() => {
                      handleBtnClick3()
                      localStorage.setItem("Tab", "topseller")
                    }}>Top Selling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
                  onChange={(e) =>{ setsearched_item(e.target.value) ;handleSearchChange(e)  }}
                  style={{ width: "50%", color: "black" }}
                />
                  <div className="clearfix"></div>
              </div>
            {/* </form> */}
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

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Categories <i className='fa fa-angle-down'></i>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        {

                          categories?.map((item, index) =>
                            <div class="form-check" key={index}>
                              <input
                                checked={selectedCategory.includes(item.id)}
                                onChange={() => {
                                  setAllCollections([])
                                  setcurrentpagepopular(0)
                                  setPopularCollections([])
                             
                                  setTodaysCollections([])
                                  setcurrentpage_hot(0)
                                  setHotCollections([])
                                  let x = called;
                                  setcalled(x + 1)
                                  if (selectedCategory.includes(item.id)) {
                                    let remaining = selectedCategory.filter(item2 => item2 !== item.id)
                                    setSelectedCategory(remaining)
                                  }
                                  else {
                                    setSelectedCategory((prev) => {
                                      return [...prev, item.id]
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
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            </div>
            {/* Side Filter */}
            <div className='tab-inner-container'>
              {openMenu && (
                <div id="zero1" className="onStep fadeIn">

                  <div className="flex-div">
                    <div>
                      <h1>{allCollections ? allCollections?.length == 1 ? allCollections?.length + ' Item' : totalItems + ' Items' : ''}</h1>
                    </div>
                    {/* <ul className='sort-list'>
                      <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                      <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                    </ul> */}
                  </div>

                  <div className='full-div'>
                    <div className='row'>
                      {collectionLoad ? (<>
                        <div className="col-sm-12 d-flex justify-content-center">
                        <img width={100} height={100} src={funkloader}/>
                        </div>
                      </>)

                        : (
                          <>
                            <InfiniteScroll
                              dataLength={allCollections?.length}
                              next={Allcollection}
                              hasMore={currentpag > parseFloat(allCollections?.length / 9) ? false : true}
                              loader={
                                <div className="col-sm-12 d-flex justify-content-center">
                                  <ScaleLoader color="white" size="20" />
                                </div>
                              }
                            >
                              <div className='row'>
                                {allCollections?.map((payload, index) => (
                                  <>
                                    <div className='col-lg-6 col-md-6 col-sm-12 col-xl-4'>
                                      <div onClick={() => {
                                        history.push(
                                          `/nftsbycollections/${payload.id}`
                                        );
                                      }} style={{ cursor: 'pointer' }} class="nft nft-post collection">
                                        <div class="itm">
                                          <div class="nft-inner">
                                            {/* <span class="heart-span">
                                    <i class="fa fa-heart mr-1" aria-hidden="true"></i> 0</span> */}
                                            <div class="img-pnl">
                                              <img src={payload.bannerImage} />
                                              <div class="btn-cntnr">
                                                <button class="reg-btn">Place Bid</button>
                                              </div>
                                              <div class="bid-time-pnl">
                                              <div class="bid-time-pnl-inner">
                                                <h3><span>04</span>:<span>05</span>:<span>12</span>:<span>18</span></h3></div></div></div>
                                            <div class="text-pnl"><span class="owner-image">
                                              <div class="owner-image-inner">
                                                <img src={payload.logoImage} alt="" />
                                              
                                                </div>
                                            </span><div class="flex-div"><div class="collection-info"><h2>{payload?.name.length > 8 ? payload?.name.slice(0, 8) + "..." : payload?.name}</h2>
                                              <h4><span></span></h4></div><div class="info-panel"><h6>Artist name</h6>
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
                                  </>
                                ))}
                              </div>
                            </InfiniteScroll>
                            {/* {allCollections?.length > allpage && (
                              <div className="col-lg-12">

                                <div className="spacer-single"></div>
                                <span onClick={loadMoreAllcollection} className="btn-main lead m-auto">
                                  Load More
                                </span>
                              </div>
                            )} */}
                          </>
                        )}

                    </div>
                  </div>

                </div>

              )}
              {openMenu1 && (
                <div id="zero1" className="onStep fadeIn">
                  <div className="flex-div">
                    <div>
                      <h1>{(popularCollections) ? popularCollections?.length == 1 ? popularCollections?.length + ' Item' : popularCollections?.length + ' Items' : ''}</h1>
                    </div>
                    {/* <ul className='sort-list'>
                      <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                      <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                    </ul> */}
                  </div>

                  <div className='full-div'>

                    <div className='row'>

                      {popularCollections ? popularCollections?.map((payload, index) => (
                        <>
                          <div className='col-lg-6 col-md-6 col-sm-12 col-xl-4'>
                            <div onClick={() => {
                              history.push(
                                `/nftsbycollections/${payload.id}`
                              );
                            }} style={{ cursor: 'pointer' }} class="nft nft-post collection">
                              <div class="itm">
                                <div class="nft-inner">
                                  {/* <span class="heart-span">
                                    <i class="fa fa-heart mr-1" aria-hidden="true"></i> 0</span> */}
                                  <div class="img-pnl">
                                    <img src={payload.bannerImage} />
                                    <div class="btn-cntnr">
                                      <button class="reg-btn">Place Bid</button>
                                    </div>
                                    <div class="bid-time-pnl">
                                    <div class="bid-time-pnl-inner">
                                      <h3><span>04</span>:<span>05</span>:<span>12</span>:<span>18</span></h3></div></div></div>
                                  <div class="text-pnl"><span class="owner-image">
                                    <div class="owner-image-inner">
                                      <img src={payload.logoImage} alt="" />
                                 
                                      </div>
                                  </span><div class="flex-div"><div class="collection-info"><h2>{payload?.name.length > 8 ? payload?.name.slice(0, 8) + "..." : payload?.name}</h2>
                                    <h4><span></span></h4></div><div class="info-panel"><h6>Artist name</h6>
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

                        </>

                      )) : (
                        <div className="col-sm-12 d-flex justify-content-center">
                          <ScaleLoader color="white" size="20" />
                        </div>
                      )}
                    </div>


                    {GetAllCollections && popularCheck && popularCollections && (<>
                      {popularCollections?.length > popPage && (
                        <div className="col-lg-12">

                          <div className="spacer-single"></div>
                          <span onClick={loadMorePopCol} className="btn-main lead m-auto">
                            Load More
                          </span>
                        </div>
                      )}
                    </>)}

                  </div>

                </div>
              )}
              {openMenu2 && (
                <div id="zero1" className="onStep fadeIn">
                  {/* <div className="col-sm-12 d-flex align-items-start justify-content-center">
                <input
                  className="form-control black"
                  id="name_1"
                  name="name_1"
                  ref={searchRef}
                  placeholder="search item here..."
                  type="text"
                  onChange={(e) =>{ setsearched_item(e.target.value) ;handleSearchChange(e)  }}
                  style={{ width: "50%", color: "black" }}
                />
                {filterTrigger && (
                  <button id="btn-submit" type="reset">
                    <i class="fas fa-sync bg-danger m-l-1"></i>
                  </button>
                )}
           
                <div className="clearfix"></div>
              </div> */}
                  <div className="flex-div">
                    <div>
                      <h1>{(todaysCollections) ? todaysCollections?.length == 1 ? todaysCollections?.length + ' Item' : todays_total + ' Items' : ''}</h1>
                    </div>
                    {/* <ul className='sort-list'>
                      <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                      <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                    </ul> */}
                  </div>

                  <div className='full-div'>
                    <InfiniteScroll
                      dataLength={todaysCollections?.length}
                      next={todaycollection_fun}
                      hasMore={ currentpagtoday > parseFloat(todays_total / 9) ? false : true}
                      loader={
                        <div className="col-sm-12 d-flex justify-content-center">
                          <ScaleLoader color="white" size="20" />
                        </div>
                      }
                    >
                      <div className='row'>
                        {(todaysCollections) ? todaysCollections?.map((payload, index) => (
                          <>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xl-4'>
                              <div onClick={() => {
                                history.push(
                                  `/nftsbycollections/${payload.id}`
                                );
                              }} style={{ cursor: 'pointer' }} class="nft nft-post collection">
                                <div class="itm">
                                  <div class="nft-inner">
                                    {/* <span class="heart-span">
                                    <i class="fa fa-heart mr-1" aria-hidden="true"></i> 0</span> */}
                                    <div class="img-pnl">
                                      <img src={ payload.bannerImage} />
                                      <div class="btn-cntnr">
                                        <button class="reg-btn">Place Bid</button>
                                      </div>
                                      <div class="bid-time-pnl">
                                      <div class="bid-time-pnl-inner">
                                        <h3><span>04</span>:<span>05</span>:<span>12</span>:<span>18</span></h3></div></div></div>
                                    <div class="text-pnl"><span class="owner-image">
                                      <div class="owner-image-inner">
                                        <img src={payload.logoImage} alt="" />
                                        {/* <span class="check-span">
                                          <i class="fa fa-check" aria-hidden="true"></i>
                                          </span> */}
                                          </div>
                                    </span><div class="flex-div"><div class="collection-info"><h2>{payload?.name.length > 8 ? payload?.name.slice(0, 8) + "..." : payload?.name}</h2>
                                      <h4><span></span></h4></div><div class="info-panel"><h6>Artist name</h6>
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
                          </>
                        )) : (
                          <>
                            <div className="col-sm-12 d-flex justify-content-center">
                            <img width={100} height={100} src={funkloader}/>
                            </div>
                          </>
                        )}
                      </div>
                    </InfiniteScroll>
                    {GetAllCollections && popularCheck && todaysCollections && (<>
                      {todaysCollections?.length > todPage && (
                        <div className="col-lg-12">

                          <div className="spacer-single"></div>
                          <span onClick={loadMoreTodCol} className="btn-main lead m-auto">
                            Load More
                          </span>
                        </div>
                      )}
                    </>)}
                  </div>

                </div>
              )}
              {openMenu3 && (
                <div id="zero1" className="onStep fadeIn">
                  {/* <div className="col-sm-12 d-flex align-items-start justify-content-center">
                <input
                  className="form-control black"
                  id="name_1"
                  name="name_1"
                  ref={searchRef}
                  placeholder="search item here..."
                  type="text"
                  onChange={(e) =>{ setsearched_item(e.target.value) ;handleSearchChange(e, "top")  }}
                  style={{ width: "50%", color: "black" }}
                />
             
                {filterTrigger && (
                  <button id="btn-submit" type="reset">
                    <i class="fas fa-sync bg-danger m-l-1"></i>
                  </button>
                )}
              
                <div className="clearfix"></div>
              </div> */}
                  <div className="flex-div">
                    <div>
                      <h1>{(hotCollections) ? hotCollections.length == 1 ? hotCollections.length + ' Item' : totalItems + ' Items' : ''}</h1>
                    </div>
                    {/* <ul className='sort-list'>
                      <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                      <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                    </ul> */}
                  </div>

                  <div className='full-div'>
                    <InfiniteScroll
                      dataLength={hotCollections?.length}
                      next={hot_collection_fun}
                      hasMore={currentpag_hot > parseFloat(totalItems / 9) ? false : true}
                      loader={
                        <div className="col-sm-12 d-flex justify-content-center">
                          <ScaleLoader color="white" size="20" />
                        </div>
                      }
                    >
                      <div className='row'>
                        {(hotCollections) ? hotCollections?.map((payload, index) => (
                          <>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xl-4'>
                              <div onClick={() => {
                                history.push(
                                  `/nftsbycollections/${payload.id}`
                                );
                              }} style={{ cursor: 'pointer' }} class="nft nft-post collection">
                                <div class="itm">
                                  <div class="nft-inner">
                                    {/* <span class="heart-span">
                                    <i class="fa fa-heart mr-1" aria-hidden="true"></i> 0</span> */}
                                    <div class="img-pnl">
                                      <img src={payload.bannerImage} />
                                      <div class="btn-cntnr">
                                        <button class="reg-btn">Place Bid</button>
                                      </div>
                                      <div class="bid-time-pnl">
                                      <div class="bid-time-pnl-inner">
                                        <h3><span>04</span>:<span>05</span>:<span>12</span>:<span>18</span></h3></div></div></div>
                                    <div class="text-pnl"><span class="owner-image">
                                      <div class="owner-image-inner">
                                        <img src={payload.logoImage} alt="" />
                                       
                                          </div>
                                    </span><div class="flex-div"><div class="collection-info"><h2>{payload?.name.length > 8 ? payload?.name.slice(0, 8) + "..." : payload?.name}</h2>
                                      <h4><span></span></h4></div><div class="info-panel"><h6>Artist name</h6>
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
                          </>
                        )) : (
                          <>
                            <div className="col-sm-12 d-flex justify-content-center">
                            <img width={100} height={100} src={funkloader}/>
                            </div>
                          </>
                        )}
                      </div>
                    </InfiniteScroll>
                    {GetAllCollections && hotCheck && hotCollections && (<>
                      {hotCollections?.length > topPage && (
                        <div className="col-lg-12">

                          <div className="spacer-single"></div>
                          <span onClick={loadMoreTopCol} className="btn-main lead m-auto">
                            Load More
                          </span>
                        </div>
                      )}
                    </>)}

                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
        <div className='full-div spacer-40'></div>
      </section>
      <Footer />
    </>
  );
};
export default Allcollections;
