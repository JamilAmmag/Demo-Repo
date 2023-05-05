import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import metamask from "../../assets/images/metamask.png";
import anim from "../../assets/images/anim.gif";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { PulseLoader } from "react-spinners";
import connectMetaMaskaction from "../../Redux/Actions/WalletActions/WalletAction";
import AuthConnectAction from "../../Redux/Actions/AuthActions/AuthConnectAction";
import ValidateSignatureAction from "../../Redux/Actions/AuthActions/ValidateSignatureAction";
import { ToastContainer, toast } from "react-toastify";
import lottie from "lottie-web";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";


import connectionAnimation from "../../assets/animation/connection/data.json";
function ConnectWallet() {
  const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    
  }
  .box-login p{
    color: #a2a2a2 !important;
  }
  .box-login{
    border-radius: 3px;
    padding: 40px 50px;
  }
`;

  const history = useHistory();
  const dispatch = useDispatch();
  const AuthConnectState = useSelector((state) => state.AuthConnect);
  const AuthConnect = AuthConnectState?.AuthConnectResponse?.data;
  const isConnected = useSelector(
    (state) => state.Login?.authResponse?.data?.token
  );
  const [isLoading, setIsLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [chain, setChain] = useState(false);
  const [SigError, SetSigError] = useState();
  const dispatchConnect = () => dispatch(connectMetaMaskaction());
  var isUserLogedIn = false;
  const User = useSelector((state) => state.Login);
  const Tokenn = User.authResponse?.data?.token;
  const GetAllBlockChain = useSelector(
    (state) => state?.GetAllBlockChain?.GetAllBlockChainResponse?.data
  );

  if (
    User.authResponse &&
    User.authResponse.data &&
    User.authResponse?.data?.token
  ) {
    isUserLogedIn = true;
  } else {
    isUserLogedIn = false;
  }


  const connnectwallet = async () => {
    setIsLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    if (provider._network != 8486) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x2126',
            chainName: 'FCC Mainnet',
            rpcUrls: ["https://dataseed.funktropolismetaverse.com/"],
            blockExplorerUrls: ["https://explorer.funktropolismetaverse.com/"],
            nativeCurrency: {
              symbol: 'FCC',
              decimals: 18
            }
          }
        ],
      }).then(async () => {
        const provider1 = await detectEthereumProvider();
        if (provider1 !== window.ethereum) {
          window.web3 = new Web3(provider1);
        } else {
          window.web3 = new Web3(window.ethereum);
        }
        let signer =  await window.web3.eth.getChainId()
        if (signer != 8486) {

          setIsLoading(false)
          toast.error(`Please Switch to FCC Network`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        else {

          setTrigger(true);
          if (window.ethereum) {
            await window.ethereum.enable().then(async (res) => {

              setTimeout(async () => {
                await dispatchConnect().then(async (res) => {
                  connectionFunc(res)
                }).catch(() => {
                  setIsLoading(false)
                });
              }, 1000);
            });

          } else {
            setIsLoading(false);
            toast.error(`Please Install Metamask Extension`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }

      }).catch((e) => {
        if(e.code == -32002){
          toast.error('Metamask connection is already processing', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setIsLoading(false)
      })

    }
    else {
      setTrigger(true);
      if (window.ethereum) {
        await window.ethereum.enable().then(async (res) => {
          setTimeout(async () => {
            await dispatchConnect().then(async (res) => {
              connectionFunc(res)
            }).catch(() => {
              setIsLoading(false)
            });
          }, 1000);
        });

      } else {
        setIsLoading(false);
        toast.error(`Please Install Metamask Extension`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }

  };


const connectionFunc = async (res) => {

    await dispatch(AuthConnectAction({ address: res }))
      .then(async (response) => {
        // console.log(response);
        // setTimeout(async () => {

        if (response?.data?.message && !Tokenn) {

          await signMessage(response?.data?.message);
          setTrigger(false);
        }
        // }, 1000);
      })
      .catch((error) => {
        if (error.code == 4001 || error.status == 500) {
          toast.error(error.message.split(':')[1], {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setIsLoading(false);

        }
        // setIsLoading(false)
      });
  }

  // const checkMetamask = async () => {
  //   let isUnlocked = await window.ethereum._metamask.isUnlocked()
  //   if (isUnlocked) {
  //     setUnlocked(true)
  //   }
  //   else {
  //     setUnlocked(false)
  //     dispatch(WalletDisconnect());

  //   }
  // }
  // useEffect(() => {
  //   checkMetamask()
  // }, [])

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#connectionCircle"),
      animationData: connectionAnimation,
      renderer: "svg", // "canvas", "html"
      loop: true, // boolean
      autoplay: true, // boolean
    });
  }, []);

  const signMessage = async (message) => {

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    await dispatch(
      ValidateSignatureAction({
        address: address,
        signature: signature,
      })
    )
      .then((res) => {

        toast.success(
          `${res.message} you are going to redirect to profile page`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );


        setTimeout(() => {
          history.push("/myprofile");
        }, 3000);


        setIsLoading(false);

      })
      .catch((err) => {
        setIsLoading(false);

        toast.error(`${err.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });


  };

  return (
    <div>
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


      <section className="jumbotron breadcumb no-bg">
        <div className="mainbreadcumb ">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="anim-pic">
                  <img src={anim} />
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            (
            <div className="row">
              <div className="offset-lg-4 col-lg-4 col-md-6 offset-md-3 col-sm-12">
                <div className="text-center">
                  <div className="wallet-connect-pnl active">

                    <img src={metamask} />
                    {isLoading ? (
                      <div className="w-100">
                        <button className="reg-btn">
                          <PulseLoader color="white" size="11" />
                        </button>
                      </div>
                    ) : (
                      <div className="field-set">
                        <input
                          type="submit"
                          id="send_message"
                          value={(isConnected && window.web3.currentProvider.networkVersion == '2109') ? "Connected" : "Connect Wallet"}
                          className="reg-btn"
                          onClick={connnectwallet}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
            )
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ConnectWallet;
