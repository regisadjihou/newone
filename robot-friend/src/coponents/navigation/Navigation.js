import React from 'react';


function Navigation(props) {
  const {handleRouteChange, isLogin} = props
  if(isLogin){
    return(
      <div>
        <nav style={{display:"flex", justifyContent:"flex-end"}}>
        <p onClick={()=>handleRouteChange("signin")} className="f3 link dim black underline pa3 pointer">Sign Out</p>
        </nav>
      </div>
)
  }
  else{ 
    return(
    <div>
      <nav style={{display:"flex", justifyContent:"flex-end"}}>
      <p onClick={()=>handleRouteChange("signin")} className="f3 link dim black underline pa3 pointer">Sign In</p>
      <p onClick={()=>handleRouteChange("Register")} className="f3 link dim black underline pa3 pointer">Register</p>
      </nav>
    </div>
  )
  }

}

export default Navigation;
