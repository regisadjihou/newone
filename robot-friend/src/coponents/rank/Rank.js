import React from 'react';


function Rank(props) {
  const {userInfo} = props
  return (
    <div className="center">
        <div className="white f3">
            {userInfo.name}, your current rank is ...
            <div className="white f1 center">{userInfo.entries}</div>
        </div>
    </div>

  );
}

export default Rank;