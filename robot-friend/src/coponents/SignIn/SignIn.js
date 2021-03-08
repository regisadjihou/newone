import React, { useState} from 'react';

function SignIn(props){
    const {handleRouteChange, loadUser} = props

    // useState declaration 
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    // function that handle email input on sign 
    function handleEmail(e){
        setEmailInput(e.target.value)
        
    }

    //function that handle password input on sign 
    function handlePassword(e){
        setPasswordInput(e.target.value)
    }

    // function that handle submit 
    function handleSubmit(){
        fetch('http://localhost:3001/signin', {
        method: 'post',
        headers: { "Content-type": "application/json"},
        body: JSON.stringify({
            email: emailInput, 
            password: passwordInput
        })
        })
        .then(res=>res.json())
        .then(userinfo =>{
            if(userinfo.id){
                loadUser(userinfo)
                handleRouteChange("Home")
            }
        });
        
    }

    return(
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw56 shadow-5 center">
        <div className="pa4 black-80">
            <div className="measure ">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                        onChange={handleEmail}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address"
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                        onChange={handlePassword}
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"
                        />
                    </div>
                </fieldset>
                <div className="center">
                    <input 
                    onClick ={handleSubmit}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Sign in"/>
                </div>
                <div className="lh-copy mt3 center pointer">
                    <p onClick ={()=>handleRouteChange("register")} className="f6 link dim black db">Register</p>
                </div>
            </div>
        </div>
    </article>
    )
}

export default SignIn; 

