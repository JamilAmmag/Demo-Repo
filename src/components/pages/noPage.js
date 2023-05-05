import React from "react";
import SliderCarousel from "../components/SliderCarouselsingle";
import FeatureBox from "../components/FeatureBox";
import CarouselCollection from "../components/CarouselCollection";
import MarketNfts from "./MarketPlace/MarketPlaceProducts";
import AuthorList from "../components/authorList";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import selling from "../../assets/images/selling.png";
import nft from "../../assets/images/nft.png";
import wallet from "../../assets/images/wallet.png";
import heroimage from "../../assets/images/hero-image.png";

import { Link, NavLink } from "react-router-dom";

const fadeInUp = keyframes` 
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: white;
    border-bottom: 0;
    box-shadow: 0 4px 20px 0 rgba(10,10,10, .8);
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn-custom, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: #fff;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: none !important;
  }
  header#myHeader .logo .d-3{
    display: block !important;
  }
  .jumbotron.no-bg{
    background: center bottom;
    background-size: cover;
    height: 100vh;
  }
  footer.footer-light .subfooter span img.d-1{
    display: none !important;
  }
  footer.footer-light .subfooter span img.d-3{
    display: inline-block !important;
  }
  .de_countdown{
    right: 10px;
    color: #fff;
  }
  .author_list_pp{
    margin-left:0;
  }
  // footer.footer-light .subfooter{
  //   border-top: 1px solid rgba(255,255,255,.1);
  // }
`;

const noPage = () => (
  <div>
    <GlobalStyles />

    <section className="conatienr-fluid landing-header">
      <div className="table-cell">
        <div className="table-cell-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="full-div text-pnl">
                  <span className="drop-span"></span>
                  <span className="drop-span-2"></span>
                  <h1>
                    Oops! <br></br> <span>Page</span> not found
                  </h1>
                  <p>
                    We've searched for your page but we can't find the page you are looking for.
                  </p>
                  <Link to="/" className="reg-btn">Navigate back to home </Link>
                </div>
              </div>
              {/* <div className="col-lg-6 col-md-12 col-sm-12">
                <img src={heroimage} className="big-img" alt='image' />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="conatienr-fluid gradient-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <ul className="step-list">
              <li>
                <div className="img-pnl">
                  <img src={wallet} alt="step1" />
                </div>
                <h5>Set up your wallet</h5>
                <p>Once you’ve set up your wallet of choice, connect it to Funktropolis  by clicking the “Connect Wallet” button in the top right corner.</p>
              </li>
              <li>
                <div className="img-pnl">
                  <img src={nft} alt="step2" />
                </div>
                <h5>Add your NFT</h5>
                <p>Once you are connected, Click “Create NFT” to get started minting your NFT (0 GAS FEES!).</p>
              </li>
              <li>
                <div className="img-pnl">
                  <img src={selling} alt="step3" />
                </div>
                <h5>Start Selling</h5>
                <p>Once your NFT is minted you can list it on the open market! Sell your NFT art and earn money!</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <Footer />

  </div>
);
export default noPage;
