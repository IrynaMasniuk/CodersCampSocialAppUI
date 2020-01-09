import React from "react";
import axios from 'axios';
import config from './config';

class Navbar extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            email:'',
            password:''
        }
    }
    handlePass = async event => {
        const password = event.target.value
        this.setState({ password })
    }
    handleMail = async event => {
        const email = event.target.value
        this.setState({ email })
    }

    render(){
        var logoutdisp = '';
        var maile = '';
        var passy = '';
        if(localStorage.getItem('email')!=null){
            logoutdisp = 'inline-block';
            maile = 'none';
            passy='none'
        }

        return(


        <nav className="navbar navbar-expand-lg navbar-light bg-info">
            <a className="navbar-brand errorr" href="http://localhost:3000/"><img src="https://img.pngio.com/free-media-network-social-tango-icon-tango-png-free-512_512.png" alt="Logo" width="10%" height="10%"/>   SocialApp</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                </ul>
                <form className="form-inline my-2 my-lg-0" target="_blank" action="localhost:3000/Profile/">
                    <input className="form-control mr-sm-2" id="logon" type="text" placeholder="Email" aria-label="Email" value={this.state.email} onChange={this.handleMail} style={{display:maile}}/>
                    <input className="form-control mr-sm-2" id="mailon" type="text" placeholder="Password" aria-label="Password" value={this.state.password} onChange={this.handlePass}style={{display:passy}} />
                        <button className="btn btn-dark my-2 my-sm-0" type="submit" style={{display:maile}} onClick={this.tryLogin} >Login</button>
                    <button className="btn btn-dark my-2 my-sm-0" type="submit" onClick={this.tryLogout} id="logout" style={{display :logoutdisp}}>Logout</button>
                </form>
            </div>
        </nav>

    )}
    tryLogout = async  (e)=> {
        await localStorage.clear();
    }


    tryLogin = async (e) =>{
        await axios.post(config.backend + 'users/login', {
            password:this.state.password,
            email:this.state.email
        })
            .then(response => {
                console.log(response)
                localStorage.setItem('email',this.state.email);
                let tempUrl = 'http://localhost:3000/Profile/';
                e.openWindow(tempUrl);
            })
            .catch(error => {
                console.log(error.response)
            });
    }


}

export default Navbar;