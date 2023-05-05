import React from "react"

 const Image_file=({type,selectedImage,files,NFTdefault})=>{
    return(
        <div>
            {type?alert("true"):alert("false")}
        {type  ? (<>
        <video
          style={{ width: "90%", height: "90%" }}
          controls
          currentTime={11.3}
          src={ URL.createObjectURL(selectedImage)}
        />
        </>
      ) : (
        <img src={NFTdefault} id="get_file_2" className="lazy nft__item_preview " alt="NFT.png" />
      )}
      </div>
    )
}
export default Image_file