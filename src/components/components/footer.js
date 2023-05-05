import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import social1 from '../../assets/images/social-icon-1.png';
import social2 from '../../assets/images/social-icon-2.png';
import social3 from '../../assets/images/social-icon-3.png';
import aroow from '../../assets/images/send-arrow.png';
import footerlogo from '../../assets/images/footer-logo.png';
import { useHistory } from "react-router";
const getCurruntYear = () => {
  return new Date().getFullYear();
}
const Footer = () => {


  const history = useHistory();
  return (
    <footer class="container-fluid">
      <div class="row">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-12 col-sm-12">

              <img src={footerlogo} />
              <h5>FUNKTROPOLIS The FUNKIEST NFT Marketplace on the Planet.</h5>
              <ul className='socail-media-list'>
                <li><a target="_blank" href="https://twitter.com"><img src={social1} alt="twitter" /></a></li>
                {/* <li><a target="_blank" href="javascript:void(0);"><img src={social2} alt="Media" /></a></li> */}
                <li><a target="_blank" href="https://discord.com/"><img src={social3} alt="Social Media" /></a></li>
              </ul>
              <p>
                Copyright &copy;  2022 Funktropolis Bootzilla Records. All Rights Reserved.
              </p>
            </div>
            <div class="col-lg-8 col-md-12 col-sm-12">
              <ul className='three-child-list'>
                <li><a onClick={() => history.push("/")} href="javascript:void(0);">Home</a></li>
                <li><a onClick={() => history.push("/explore")} href="javascript:void(0);">Marketplace</a></li>
                <li><a onClick={() => history.push("/explore")} href="javascript:void(0);">EXPLORE FUNKTROPOLIS</a></li>
                <li><a onClick={() => history.push("/allcollections")} href="javascript:void(0);">Funky Collections</a></li>
                <li><a onClick={() => history.push("/createnft")} href="javascript:void(0);">Create NFT </a></li>
                <li><a onClick={() => history.push("/myprofile")} href="javascript:void(0);">Funkateer Profile</a></li>
                <li><a onClick={() => history.push("/explore")} href="javascript:void(0);">FUNKY NFTS</a></li>
                <li><a onClick={() => history.push("/privacy-policy")} href="javascript:void(0);">Privacy Policy</a></li>
              </ul>
            </div>
            {/* <div class="col-lg-3 col-md-12 col-sm-12">
              <h6>Subscribe Us</h6>
              <div className="subscribe-pnl">
                <input autoComplete="off" className="form-control" placeholder="Info@yourgmail.com" />
                <button><img src={aroow} /></button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer >
  );
};
export default Footer;
