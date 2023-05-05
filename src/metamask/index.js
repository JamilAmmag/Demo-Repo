import detectEthereumProvider from "@metamask/detect-provider";
import { ethers, utils } from "ethers";
import localforage from "localforage";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Web3 from "web3";
import { MyProfileRequest } from "../Redux/Actions/Account/MyProfileAction";
import AuthConnectAction, {
  AuthConnectRequest,
} from "../Redux/Actions/AuthActions/AuthConnectAction";
import ValidateSignatureAction, {
  ValidateSignatureRequest,
} from "../Redux/Actions/AuthActions/ValidateSignatureAction";
import { WalletDisconnect } from "../Redux/Actions/WalletActions/WalletAction";

export const signMessage = (message) => async (dispatch) => {
  if (window.ethereum) {
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();
    return new Promise((resolve, reject) => {
      dispatch(
        ValidateSignatureAction(
          {
            address: address,
            signature: signature,
          }
          // true
        )
      )
        .then((res) => {
          // toast.success(
          //   `${res.message} you are going to redirect to profile page`,
          //   {
          //     position: "top-right",
          //     autoClose: 5000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          //   }
          // );

          // setIsLoading(false);
          resolve(res);
        })
        .catch((err) => {
          // setIsLoading(false);

          // toast.error(`${err.message}`, {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          // });
          reject(err);
        });
    });
  }
};

export const buyNftMarket = (payload) => async (dispatch) => {
  // console.log("buy nft paylod",payload)
 
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }

  return new Promise(async (resolve, reject) => {
    let minABI = [
      {
        inputs: [
          {
            internalType: "address",
            name: "nftContractId",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "closeMarketForFixedType",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ];
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();
    const priceVal = Web3.utils.toWei(String(payload.price, "ether"));
    // console.log("buy nft wei price", priceVal)

    let d = {
      value: payload.price.toString(),
    };
    let contract = new ethers.Contract(payload.contractAddress, minABI, signer);
    await contract
    .closeMarketForFixedType(payload.nftContractId, payload.tokenId, {
      value: priceVal,
      gasLimit: 250000,
    })
      .then(async (response) => {
        response.wait().then((receipt) => {
          resolve(response);
        }).catch((e) => {
          reject(e)
        })
      })
      .catch((err) => {
        reject(err);
        // console.log("err",err)
      });
  });
};

export const cancelNft = (payload) => async (dispatch) => {
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }

  return new Promise(async (resolve, reject) => {
    let minABI = [
      {
        inputs: [
          {
            internalType: "address",
            name: "nftContractId",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          }
        ],
        name: "cancel",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
    ];
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();
    let contract = new ethers.Contract(payload.contractAddress, minABI, signer);
    await contract
      .cancel(payload.nftContractId, payload.tokenId, {
        gasLimit: 500000,
      })
      .then(async (res) => {
        res.wait().then(() => {
          resolve(res)
        }).catch((e) => {
          reject(e)
        })
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const openForAuction = (payload) => async (dispatch) => {
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }

  return new Promise(async (resolve, reject) => {
    let minABI = [
      {
        inputs: [
          {
            internalType: "address",
            name: "_approved",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();
    let contract = new ethers.Contract(payload.nftContractId, minABI, signer);
    await contract
      .approve(payload.contractAddress, payload.tokenId, {
        gasLimit: 500000,
      })
      .then(async (res) => {
        let minABI = [
          {
            inputs: [
              {
                internalType: "address",
                name: "nftContractId",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "price",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "maxPrice",
                type: "uint256"
              }
            ],
            name: "openMarketForAuctionType",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
        ];
        const provider1 = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider1.getSigner();
        const priceVal = window.web3.utils.toWei(String(payload.price));
        // const orgPercentage = window.web3.utils.toWei(payload.orgnizationPercentage, "ether");
        const maxPrice = window.web3.utils.toWei(String(payload.maxPrice));

        // const priceVal = window.web3.utils.toWei(payload.price, 'ether').toString();
        let contract = new ethers.Contract(
          payload.contractAddress,
          minABI,
          signer
        );
        await contract
          .openMarketForAuctionType(
            payload.nftContractId,
            payload.tokenId,
            priceVal,
            maxPrice,
            {
              gasLimit: 500000,
            }
          )
          .then(async (response) => {
            resolve({ response });
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const acceptBid = (payload) => async (dispatch) => {
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }

  return new Promise(async (resolve, reject) => {
    let minABI = [
      {
        inputs: [
          {
            internalType: "address",
            name: "nftContractId",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "buyerAccount",
            type: "address",
          },
        ],
        name: "closeMarketForAuctionType",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();
    const priceVal = window.web3.utils.toWei(String(payload.price));
    let contract = new ethers.Contract(payload.contractAddress, minABI, signer);
    await contract
      .closeMarketForAuctionType(
        payload.nftContractAddress,
        payload.tokenId,
        priceVal,
        payload.buyerAddress,
        {
          gasLimit: 500000,
        }
      )
      .then(async (response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const approveNft = (payload) => async (dispatch) => {
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }

  return new Promise(async (resolve, reject) => {
    let minABI = [
      {
        inputs: [
          {
            internalType: "address",
            name: "_approved",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();
    const priceVal = window.web3.utils.toWei(String(payload.price));
    let contract = new ethers.Contract(payload.contractAddress, minABI, signer);
    await contract
      .approve(payload.marketPlaceContract, priceVal, {
        gasLimit: 500000,
      })
      .then(async (response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export async function approveContract(payload, contractAddress, payloadMarket) {
  // console.log("payload", payload)
  // console.log("contract address", contractAddress)
  // console.log("payloadMarket", payloadMarket)
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }
  return new Promise(async (resolve, reject) => {
    let minABI = [
      {
        inputs: [
          {
            internalType: "address",
            name: "_approved",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();
    let contract = new ethers.Contract(contractAddress, minABI, signer);
    await contract
      .approve(payload.approved, payload.tokenId, {
        gasLimit: 500000,
      })
      .then(async (response) => {
        let minABI = [
          {
            inputs: [
              {
                internalType: "address",
                name: "nftContractId",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "price",
                type: "uint256"
              }
            ],
            name: "openMarketForFixedType",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
        ];
        const provider1 = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider1.getSigner();
        const priceVal = window.web3.utils.toWei(payloadMarket.price, "ether");
        let contract = new ethers.Contract(
          payload.approved,
          minABI,
          signer
        );
        await contract
          .openMarketForFixedType(
            payloadMarket.nftContractId,
            payloadMarket.tokenId,
            priceVal,
            {
              gasLimit: 500000,
            }
          )
          .then(async (res) => {
            resolve({ res, response });
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });

  });
}

export async function mint(payload, contractAddress) {
  // console.log("wallet ki payload", payload)
  // console.log("wallet ki address", contractAddress)
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }
  return new Promise(async (resolve, reject) => {
    let minABI = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_royality",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_uri",
            "type": "string"
          }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ];
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();
    let contract = new ethers.Contract(contractAddress, minABI, signer);
    await contract
      .mint( payload[0].tokenId, payload[0].royality, payload[0].uri, {
        gasLimit: 500000,
      })
      .then((res) => {
        res.wait().then(() => {
          resolve(res);
        }).catch((e) => {
          reject(e);
        })
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function approvebcc(payload, contractAddress) {
  // console.log("pay", payload.token)
  // console.log("pay", payload)

  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }
  return new Promise( (resolve, reject) => {
    let minABI = [
      {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [
          {
            "type": "bool",
            "name": "",
            "internalType": "bool"
          }
        ],
        "name": "approve",
        "inputs": [
          {
            "type": "address",
            "name": "spender",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "amount",
            "internalType": "uint256"
          }
        ]
      },
    ];
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();
    const priceVal = Web3.utils.toWei(String(payload.price, "ether"));
    // console.log("wei change price ",priceVal )
    let contract = new ethers.Contract(payload.token, minABI, signer);
     contract
      .approve(payload.marketAddress,priceVal, {
        gasLimit: 500000,
      })
      .then((res) => {
        res.wait().then(() => {
          resolve(res);
        }).catch((e) => {
          reject(e);
        })
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function openMarketForFixed(payload, contractAddress) {
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }

  return new Promise(async (resolve, reject) => {
    let minABI = [
      {
        inputs: [
          {
            internalType: "address",
            name: "nftContractId",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
        ],
        name: "openMarketForFixedType",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();

    let contract = new ethers.Contract(contractAddress, minABI, signer);
    await contract
      .openMarketForFixedType(
        payload.nftContractId,
        payload.tokenId,
        payload.price,
        {
          gasLimit: 500000,
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const sendTransection = (payload) => async (dispatch) => {
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }
  return new Promise((res, rej) => {
    localStorage.setItem("confirmDialogOpen", true);
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: payload,
        })
        .then(async (data) => {
          res(data);
        })
        .catch((error) => {
          rej(error);
        });
    }
  });
};

export const sellNFTAmount = (payload) => async (dispatch) => {
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }

  return new Promise(async (resolve, reject) => {
    let minABI = [
      {
        inputs: [
          {
            internalType: "address",
            name: "_from",
            type: "address",
          },
          {
            internalType: "address",
            name: "_to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    let decimals = window.web3.utils.toBN(18);
    const accounts = await window.web3.eth.getAccounts();

    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();


    let contract = new ethers.Contract(
      payload.from,
      minABI,
      signer
    );

    // payload.from
    // payload.to
    // payload.tokenId

    await contract
      .transferFrom(accounts[0], payload.to, payload.tokenId, {
        gasLimit: 500000,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};






export const checkBalance1 = async (tokenAddress, walletAddress) => {
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }

  return new Promise((resolve, reject) => {

    const minABI = [
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
      },
    ];
    const contract = new window.web3.eth.Contract(minABI, tokenAddress);

    contract.methods.balanceOf(walletAddress).call().then(resp => {
      resolve(resp)

    }).catch(error => {
      reject(error)

    })

  })

}
