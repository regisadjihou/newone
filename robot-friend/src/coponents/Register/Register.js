import React, { useState} from 'react';

function Register(props){
    const {handleRouteChange, loadUser} = props
    // useState declaration 
    const [namelInput, setNameInput] = useState("");
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

    //function that handle password input on sign 
    function handleName(e){
        setNameInput(e.target.value)
    }

    // fiunction that handle submit 
    function handleSubmit(e){
        fetch('http://localhost:3001/register', {
        method: 'post',
        headers: { "Content-type": "application/json"},
        body: JSON.stringify({
            name: namelInput,
            email: emailInput, 
            password: passwordInput
        })
        })
        .then(res=>res.json())
        .then(user =>{
            if(user){
                loadUser(user)
                handleRouteChange("Home") 
            }  
        });
        e.preventDefault();
    }

    return(
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw56 shadow-5 center">
        <div className="pa4 black-80">
            <form className="measure ">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0 center">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input
                        onChange={handleName}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" 
                        name="name"  
                        id="name"
                        />
                    </div>
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
                    <div class="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                        onChange={handlePassword}
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"/>
                    </div>
                </fieldset>
                <div className="center">
                    <input 
                    onClick ={handleSubmit}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" 
                    type="submit" 
                    value="Register"/>
                </div>
            </form>
        </div>
    </article>
    )
}

export default Register; 

