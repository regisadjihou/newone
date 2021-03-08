import React, { useState} from 'react';
import './App.css';
import "tachyons";
import Navigation from "./coponents/navigation/Navigation"
import Logo from "./coponents/logo/Logo"
import ImageLinkForm from "./coponents/imageLinkForm/ImageLinkForm"
import Rank from "./coponents/rank/Rank"
import FaceRecognition from "./coponents/faceRecognition/FaceRecognition"
import SignIn from "./coponents/SignIn/SignIn"
import Register from "./coponents/Register/Register"
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

//background animation 
const ParticlesOptions= {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 10,
        distance: 10
      }
    }

  }
}

 
const app = new Clarifai.App({
 apiKey: "edffb0998102493fb4283b5dd24afcbb"
});

function App() {

  // use state declaration *********************
  const [userInput, setuserInput] = useState("");
  const [imgUrl, setImgurl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isLogin, setisLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: ""
  });
  /*const [resetUser, setResetUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: ""
  });*/
  // *******************************************

// load user info when login or register
function loadUser(userData){
  setUserInfo(userData)
}



function handlelink(e){
    const linkValue = e.target.value
    setuserInput(linkValue)
  }

// handle route state
function handleRouteChange(newRoute){
  if(newRoute=== "Home"){
    setisLogin(true)
  }
  else{
    setisLogin(false)
    setUserInfo({})
  }
  setRoute(newRoute)
  
}
  // function to calculate the location of col on the image
  function calculateFaceLocation(data){
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  // function to set the box to the new object from calculateFaceLocation(data) function 
  function displayFaceBox(newbox){
    setBox(newbox)
  }

// function that handle the detect button click 
  function handleurl(){
    setImgurl(userInput)
    app.models.predict(Clarifai.FACE_DETECT_MODEL, userInput)
    .then(
    function(response) {
      // do something with response
      if(response){
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: { "Content-type": "application/json"},
          body: JSON.stringify({
              id: userInfo.id     
          })
          })
          .then(res=>res.json())
          .then(entryUpdated =>{
            setUserInfo({...userInfo, entries: entryUpdated})
          });
      }
      displayFaceBox(calculateFaceLocation(response))
    },
    function(err) {
      console.log(err)
    }
  );
  }

  return (
    <div>
      <Particles className="particles" params={ParticlesOptions}/>
      <Navigation handleRouteChange ={handleRouteChange} isLogin={isLogin}/>
      <Logo/>
      {(route === "Home")?       
      <div>
      <Rank userInfo={userInfo}/>
      <ImageLinkForm handlelink={handlelink} handleurl={handleurl}/>
      <FaceRecognition  box = {box} imgUrl={imgUrl}/>
      </div>:
        (route==="signin")?<SignIn loadUser={loadUser} handleRouteChange={handleRouteChange}/>:
        <Register loadUser={loadUser} handleRouteChange={handleRouteChange}/>
      }
    </div>
    
  );

}

export default App;
