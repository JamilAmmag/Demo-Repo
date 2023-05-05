import React, { useEffect, useState, useRef, useReducer } from "react";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import "../../assets/myProfile.scss";
import * as Yup from "yup";
import { WalletDisconnect } from "../../Redux/Actions/WalletActions/WalletAction";
import { AuthConnectRequest } from "../../Redux/Actions/AuthActions/AuthConnectAction";
import { LogoutAction } from "../../Redux/Actions/AuthActions/LogoutAction";
import { ValidateSignatureRequest } from "../../Redux/Actions/AuthActions/ValidateSignatureAction";
import { Formik, Form, Field } from "formik";
import { CopyToClipboard } from "react-copy-to-clipboard";
import banner from '../../assets/images/banner-banner.png';
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import UpdateProfileAction from "../../Redux/Actions/Account/UpdateProfileAction";
import MyProfileAction from "../../Redux/Actions/Account/MyProfileAction";
import { FaCopy, FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { PulseLoader } from "react-spinners";

const GlobalStyles = createGlobalStyle`
`;
const CreateSchema = Yup.object().shape({
  username: Yup.string().required("Name required").max(26, "length should be less than 26"),
  // .required("Please enter the username without any spaces in this field")
  // .matches(
  //   /^[A-Za-z0-9\.\-\/]+$/,
  //   "Only alphabets and number are allowed without space this field "
  // ),
  // ProfileImage: Yup.mixed().required("File is required"),
  bio: Yup.string().max(200, "length should be less than 200"),
  email: Yup.string().required("Email required"),
  DiscordLink: Yup.string().url("Please enter valid URL").nullable(),
  instagramLink: Yup.string().url("Please enter valid URL").nullable(),
  twitterLink: Yup.string().url("Please enter valid URL").nullable(),
  yourSiteLink: Yup.string().url("Please enter valid URL").nullable(),
  faceBook: Yup.string().url("Please enter valid URL").nullable(),
  OrganizationId: Yup.string(),
});
function ProfileSettings() {
  const [files, SetFiles] = useState();
  const [banner, SetBanner] = useState();
  const [organization, setOrganization] = useState();
  const reducer = (state, action) => {
    switch (action.type) {
      case 'clicked':
        return { isDisable: true };
      case 'notClicked':
        return { isDisable: false };
    }
  }
  const initialState = { isDisable: false };
  const [state, disableDispatch] = useReducer(reducer, initialState)
  const [orgID, setOrgID] = useState();
  const [FileError, SetFileError] = useState("");
  const [bannerError, SetBannerError] = useState("");
  const [preimage, setpreimage] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orgCheck, setOrgCheck] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [delImage, setDelImage] = useState(true);
  // const [Image, setImage] = useState(true);
  const history = useHistory();
  const formRef = useRef();

  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);

  const MyProfile = useSelector(
    (state) => state.MyProfile?.MyProfileResponse?.data
  );
  const dispatch = useDispatch();
  const text = MyProfile?.bio ? MyProfile?.bio?.toString() : '';

  useEffect(() => {
    dispatch(MyProfileAction())
      .then((res) => {
        const data = res.data;
        // SetBanner(data?.profileBannerImage)

        formRef.current.setValues({
          yourSiteLink:
            (data?.yourSiteLink &&
              data?.yourSiteLink != "null" &&
              data?.yourSiteLink) ||
            "",
          faceBook:
            (data?.faceBook &&
              data?.faceBook != "null" &&
              data?.faceBook) ||
            "",
          username:
            (data?.username && data?.username != "null" && data?.username) ||
            "",
          // ProfileImage:
          //   (data?.ProfileImage && data?.ProfileImage != "null" && data?.ProfileImage) ||
          //   "",
          bio: (data?.bio && data?.bio != "null" && data?.bio) || "",
          email: (data?.email && data?.email != "null" && data?.email) || "",
          instagramLink:
            (data?.instagramLink &&
              data?.instagramLink != "null" &&
              data?.instagramLink) ||
            "",
          twitterLink:
            (data?.twitterLink &&
              data?.twitterLink != "null" &&
              data?.twitterLink) ||
            "",
          WalletAdres: WalletAddress,
          banner: (data?.profileBannerImage &&
            data?.profileBannerImage != "null" &&
            data?.profileBannerImage) ||
            ""
        });

      })
      .catch((error) => {
      });
  }, []);

  const fileschange = (e) => {
    setpreimage(false)
    const file = e.target.files[0];
    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/png" ||
      file?.type === "image/jpg" ||
      file?.type === "image/gif" ||
      file?.type === "image/webp"
    ) {

      SetFileError(null);
      SetFiles(file);
    } else {
      SetFileError("Invalid File Format");
      SetFiles();
    }
  };
  const bannerChange = (e) => {

    const file = e.target.files[0];
    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/png" ||
      file?.type === "image/jpg" ||
      file?.type === "image/gif" ||
      file?.type === "image/webp"
    ) {

      SetBannerError(null);
      SetBanner(file);
    } else {
      SetBannerError("Invalid File Format");
      SetBanner(null);
    }
  };

  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );

  const [ProfileData, SetProfileData] = useState({
    // ProfileImage: MyProfile?.ProfileImage,
    username: MyProfile?.username,
    bio: MyProfile?.bio,
    email: MyProfile?.email,
    instagramLink: MyProfile?.InstagramLink,
    yourSiteLink: MyProfile?.yourSiteLink,
    twitterLink: MyProfile?.twitterLink,
    faceBook: MyProfile?.faceBook,
    WalletAdres: WalletAddress,
  });
  const inputhandler = (e) => {
    var { name, value } = e.target;
    if (name == 'username') {
      if (/^\s/.test(value)) {
        e.target.value = '';
      }
    }
    SetProfileData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    SetProfileData(MyProfile);
  }, [MyProfile]);

  const onsubmitHandler = async (e) => {
    setIsLoading(true);
    if (files == null && FileError == "Invalid File Format") {
      toast.error(
        `You selected the wrong file type, you can only upload PNG, JPG, JPEG, GIF`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setIsLoading(false);
      return;
    }
    var bodyFormData = new FormData();
    bodyFormData.append("ProfileImage", files);
    bodyFormData.append("ProfileBannerImage", banner);
    bodyFormData.append("Username", ProfileData.username ? ProfileData.username : "Unnamed");
    bodyFormData.append("Email", ProfileData.email);
    bodyFormData.append("TwitterLink", ProfileData.twitterLink);
    bodyFormData.append("InstagramLink", ProfileData.instagramLink);
    bodyFormData.append("YourSiteLink", ProfileData.yourSiteLink);
    bodyFormData.append("FaceBook", ProfileData.faceBook);
    bodyFormData.append("Bio", ProfileData.bio ? ProfileData.bio : " ");
    // console.table([...bodyFormData])

    await dispatch(UpdateProfileAction(bodyFormData))
      .then((res) => {
        setIsLoading(false);
        toast.success(`${res.message}`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(MyProfileAction())
          .then((res) => {
            const data = res.data;

            formRef.current.setValues({
              yourSiteLink:
                (data?.yourSiteLink &&
                  data?.yourSiteLink != "null" &&
                  data?.yourSiteLink) ||
                "",
              faceBook:
                (data?.faceBook &&
                  data?.faceBook != "null" &&
                  data?.faceBook) ||
                "",
              username:
                (data?.username &&
                  data?.username != "null" &&
                  data?.username) ||
                "",
              // ProfileImage:
              //   (data?.ProfileImage && data?.ProfileImage != "null" && data?.ProfileImage) ||
              //   "",
              bio: (data?.bio && data?.bio != "null" && data?.bio) || "",
              email:
                (data?.email && data?.email != "null" && data?.email) || "",
              InstagramLink:
                (data?.instagramLink &&
                  data?.instagramLink != "null" &&
                  data?.instagramLink) ||
                "",
              twitterLink:
                (data?.twitterLink &&
                  data?.twitterLink != "null" &&
                  data?.twitterLink) ||
                "",
              WalletAdres: WalletAddress,
              banner: (data?.profileBannerImage &&
                data?.profileBannerImage != "null" &&
                data?.profileBannerImage) ||
                ""
            });
          })
          .catch((error) => {
          });
        setUserImage(res?.data?.profileImage);
        setTimeout(() => {
          history.push("/myProfile")
        }, 3000);
      })
      .catch((error) => {
        toast.error(`${error?.message}`, {
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
  const Logoutt = async () => {
    await dispatch(WalletDisconnect());
    await dispatch(AuthConnectRequest());
    await dispatch(LogoutAction());
    await dispatch(ValidateSignatureRequest());
  };
  // const handleChange22 = (event) =>{
  //   const image = event.target.files[0];
  //   if (!image) {
  //     console.log('image is required');
  //     return false;
  //     }
  // }
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


      <section className="jumbotron breadcumb no-bg">
        <div className="mainbreadcumb ">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12  col-sm-12">
                <div className="small-header">
                  <div className="bg-layer"></div>
                  <span className="drop-span"></span>
                  <h1>Profile Settings</h1>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active">Profile Settings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="profile-banner">
        <div className="full-div banner" style={{ backgroundImage: `url(${bannerimg})` }}></div>
      </section > */}
      <div class="container inner-page">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="upload-profile-picture">
              <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-12 m-text-center">


                  <div className="upload-profile-picture-inner">
                    <div htmlFor="imagee" className="">
                      {files ? (
                        <div style={{ width: 210, height: "auto", borderRadius: "100%", maxWidth: "100%", background: "white", }}>
                          <img src={URL.createObjectURL(files)} alt="profile.png"
                            style={{ width: 210, background: "white", height: 210, objectFit: "cover", maxWidth: "100%", }} />
                        </div>
                      ) : (
                        MyProfile?.profileImage && delImage ? (
                          <div style={{ width: 210, height: "auto", borderRadius: "100%", maxWidth: "100%", background: "white", }}>
                            <img src={`${MyProfile?.profileImage}`} alt="profile.png" style={{ width: 210, height: 210, maxWidth: "100%", objectFit: "cover", background: "white", }} />
                          </div>
                        ) : (
                          <FaUserCircle size="2x" />
                        ))}
                    </div>
                  </div>
                  {/* <div className="full-div space40"></div>
              <a className="reg-btn w-100" href="#">Upload New Photo</a> */}
                  <div className="full-div space40"></div>
                  <div className="full-div">
                    {
                      preimage ? <div className="full-div">
                        <div className="field-set pic-filed">
                          <input type="file" id="setimage" onChange={fileschange} accept=".png, .jpg, .jpeg, .gif"
                            name="logoImage"
                            style={{ display: "none" }} />

                          <label className='form-control pt-2' style={{ whiteSpace: "nowrap" }}>
                            <label className="custom-input-button" ><label for="setimage" className="input-field-custom-label"
                              style={{ cursor: "pointer" }}> Choose File </label></label>
                            <l className="custom-input-label"> {userImage?.toString().slice(-10)} </l>
                          </label>
                        </div>

                      </div>
                        :
                        <div className="full-div">
                          <div className="field-set">
                            <input
                              onChange={fileschange}
                              id="img"
                              type="file"
                              accept=".png, .jpg, .jpeg, .gif"
                              className="reg-btn pci-input"

                            />
                          </div>
                        </div>
                    }
                  </div>
                  <div className="full-div"></div>
                  {/* <button onClick={() => {
                SetFiles()
                setpreimage(false)
                setDelImage(false)
              }} className="reg-btn trans w-100">Delete</button> */}

                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                  <div className="row">
                    <div className="col-md-12">
                      <h5>Upload Cover Photo</h5>
                    </div>
                    <div className="col-md-12 col-lg-6 m-b-b">
                      <div className="d-create-file">
                        <p id="file_name" className={bannerError ? "text-danger" : ""}>
                          {banner
                            ?
                            (banner?.name.length > 30 ? banner?.name.slice(0, 20) + '...' : banner?.name) || banner
                            : MyProfile?.profileBannerImage ? (
                              MyProfile?.profileBannerImage.split('\\')[2]
                              // <>{MyProfile?.profileBannerImage.split('\\')[2]}</>
                            ) : (
                              "PNG, JPG, GIF, WEBP"
                            )
                          }

                        </p>
                        <div className="browse">
                          <input
                            type="button"
                            id="get_file"
                            name="fileupload"
                            className="reg-btn"
                            value="Upload File"
                          />
                          <input
                            id="upload_file"
                            type="file"
                            name="fileupload"
                            onChange={(e) => {
                              bannerChange(e);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6 text-center">
                      {banner ? (
                        <div className="profile-banner-img">
                          <img src={banner && URL.createObjectURL(banner)} />
                        </div>
                      ) : (
                        <>
                          {MyProfile?.profileBannerImage && (
                            <div className="profile-banner-img">
                              <img src={`${MyProfile.profileBannerImage}`} />
                            </div>
                          )}
                        </>
                      )}

                    </div>
                    {/* <div className="col-md-4 col-lg-4 col-md-6 text-center">
                              <div className="profile-banner-img">
                                <img src={URL.createObjectURL(banner)} />
                              </div>
                            </div> */}
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="row">
              <div className="col-md-12">
                <Formik
                  validationSchema={CreateSchema}
                  innerRef={formRef}
                  onSubmit={() => onsubmitHandler()}
                  validator={() => ({})}
                  initialValues={{
                    // ProfileImage: "",
                    username: "",
                    bio: "",
                    email: "",
                    instagramLink: "",
                    twitterLink: "",
                    faceBook: "",
                    yourSiteLink: "",
                    banner: ''
                  }}
                >

                  {({
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                    setFieldValue,
                  }) => (
                    <Form
                      name="contactForm"
                      id="contact_form"
                      className="form-border"
                      onSubmit={handleSubmit}
                    >

                      <div className="row">
                        <div className="col-md-12">

                          <div className="full-div space40"></div>
                          <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12 vm-text-center">
                              <div className="full-div">
                                <h2 className="bell-font">Account Info</h2>
                              </div>
                              <div className="full-div space20"></div>
                              <div className="full-div">
                                <div className="field-set">
                                  <h5>Display Name</h5>

                                  <input type="text" onChange={(e) => {
                                    inputhandler(e);
                                    handleChange(e);
                                  }}
                                    // disabled={MyProfile?.username ?? false}
                                    value={values.username}
                                    maxLength={27}
                                    name="username" id="username" placeholder="Display Name" className="form-control" />
                                  {errors.username && touched.username && (
                                    <span className="text-red">
                                      {errors.username}
                                    </span>
                                  )}
                                </div>

                                {/* {errors.ProfileImage && touched.ProfileImage && (
                                  <div className="text-red">
                                    {errors.ProfileImage}
                                  </div>
                                )} */}

                              </div>
                              <div className="full-div">
                                <div className="field-set">
                                  <h5>Custom URL</h5>
                                  <input
                                    placeholder="Custom URL"
                                    onChange={(e) => {
                                      inputhandler(e);
                                      handleChange(e);
                                    }}
                                    type="text"
                                    value={values.yourSiteLink}
                                    name="yourSiteLink"
                                    id="yourSiteLink"
                                    className="form-control"
                                  />
                                </div>
                                {errors.yourSiteLink && touched.yourSiteLink && (
                                  <div className="text-red">{errors.yourSiteLink}</div>
                                )}
                              </div>
                              <div className="full-div">
                                <div className="field-set">
                                  <h5>Email</h5>
                                  <input
                                    placeholder="MyEmailAddress@domain.com"
                                    onChange={(e) => {
                                      inputhandler(e);
                                      handleChange(e);
                                    }}
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    id="email"
                                    className="form-control"
                                  />
                                </div>
                                {errors.email && touched.email && (
                                  <div className="text-red">{errors.email}</div>
                                )}
                              </div>


                              <div className="full-div">
                                <div className="field-set">
                                  <h5>Bio</h5>
                                  <textarea
                                    data-autoresize
                                    name="bio"
                                    id="bio"
                                    onChange={(e) => {
                                      inputhandler(e);
                                      handleChange(e);
                                    }}
                                    className="form-control height"
                                    maxLength={350}
                                    value={values.bio}
                                    placeholder="e.g. “This is very limited item”"
                                  ></textarea>
                                </div>
                                {errors.bio && touched.bio && (
                                  <div className="text-red">{errors.bio}</div>
                                )}
                              </div>

                              <div className="full-div">
                                <div className="field-set wallet-field">
                                  <label>Wallet Address</label>
                                  {WalletAddress ? (
                                    <span
                                      style={{
                                        wordBreak: "break-all",
                                      }}
                                      id="name"
                                      className="form-control w-adres"
                                    >
                                      {WalletAddress}{" "}
                                      <CopyToClipboard
                                        text={WalletAddress}
                                        onCopy={() => {
                                          toast.success(
                                            "Address copied successfully",
                                            {
                                              position: "top-right",
                                              autoClose: 5000,
                                              hideProgressBar: false,
                                              closeOnClick: true,
                                              pauseOnHover: false,
                                              draggable: true,
                                              progress: undefined,
                                            }
                                          );
                                        }}
                                      >
                                        <FaCopy
                                          style={{
                                            float: "right",
                                            fontSize: "25px",
                                            marginTop: "0px",
                                            cursor: "pointer",
                                          }}
                                          title="Copy to use paperclip"
                                        />
                                      </CopyToClipboard>
                                    </span>
                                  ) : (
                                    <span
                                      style={{
                                        backgroundColor: "none",
                                        color: "white",
                                      }}
                                      id="name"
                                      className="form-control"
                                    >
                                      Login To View Wallet address
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 social-container">
                              <div className="row">
                                <div className="full-div">
                                  <h2 className="bell-font">Social Profile</h2>
                                </div>
                                <div className="full-div space20"></div>
                                <div className="col-md-6 col-lg-12 ">
                                  <div className="field-set" style={{ marginTop: "6px" }}>
                                    <h5>Facebook </h5>
                                    <input
                                      onChange={(e) => {
                                        inputhandler(e);
                                        handleChange(e);
                                      }}
                                      type="text"
                                      name="faceBook"
                                      value={values.faceBook}
                                      id="faceBook"
                                      className="form-control"
                                      placeholder="https://facebook.com"
                                    />
                                    {errors.faceBook &&
                                      touched.faceBook && (
                                        <div className="text-red">
                                          {errors.faceBook}
                                        </div>
                                      )}
                                  </div>
                                  {/* <div className="full-div">
                                    <a className="social-btn fb" href="#">Connect to Fcebook</a>
                                  </div> */}
                                </div>

                                <div className="col-md-6 col-lg-12 ">
                                  <div className="field-set">
                                    <h5>Twitter </h5>
                                    <input
                                      onChange={(e) => {
                                        inputhandler(e);
                                        handleChange(e);
                                      }}
                                      type="text"
                                      name="twitterLink"
                                      id="twitter"
                                      value={values.twitterLink}
                                      className="form-control"
                                      placeholder="https://twitter.com"
                                    />
                                    {errors.twitterLink && touched.twitterLink && (
                                      <div className="text-red">
                                        {errors.twitterLink}
                                      </div>
                                    )}
                                  </div>
                                  {/* <div className="full-div">
                                    <a className="social-btn tw" href="#">Connect to twitter</a>
                                  </div> */}
                                </div>

                                <div className="col-md-6 col-lg-12 ">
                                  <div className="field-set">
                                    <h5>Discord</h5>
                                    <input
                                      onChange={(e) => {
                                        inputhandler(e);
                                        handleChange(e);
                                      }}
                                      type="text"
                                      name="instagramLink"
                                      value={values.instagramLink}
                                      id="DiscordLink"
                                      className="form-control"
                                      placeholder="https://discord.com"
                                    />
                                    {errors.instagramLink &&
                                      touched.instagramLink && (
                                        <div className="text-red">
                                          {errors.instagramLink}
                                        </div>
                                      )}
                                  </div>
                                  {/* <div className="full-div">
                                    <a className="social-btn dixcrd" href="#">Connect to Discord</a>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="full-div space20"></div>
                      <div className="col-md-12 pt-2 p-0">
                        <div className="btn-cntnr">
                          {isLoading ? (
                            <button
                              id="submit"
                              className="reg-btn"
                            >
                              <PulseLoader color="white" size="11" />

                            </button>
                          ) : (
                            <input
                              type="submit"
                              id="submit"
                              className="reg-btn"
                              value="Update Profile"
                            // onClick={imagevalid}
                            // onChange={handleChange22} 
                            />
                          )}
                          <input
                            value={"Cancel"}
                            className="reg-btn"
                            onClick={() => history.goBack()}
                          />
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="spacer-double"></div>
      <Footer />
    </div>
  );
}

export default ProfileSettings;
