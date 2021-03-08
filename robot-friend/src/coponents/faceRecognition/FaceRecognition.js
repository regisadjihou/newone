import React from 'react';
import "./FaceRecognition.css"


function FaceRecognition(props) {
    const {imgUrl, box }= props
    
// style for the bounding box 
    const newStyle = { 
    top: box.topRow,
    right: box.rightCol,
    bottom: box.bottomRow,
    left: box.leftCol
    }

    return ( 
    <div className="center ma">
        <div className="absolute mt2">
            <img  id ="inputimage" alt= "img" src={imgUrl} width="500px" height="auto"/>
            <div className="bounding-box" style={newStyle} ></div>
        </div>
    </div>

  );
}

export default FaceRecognition;