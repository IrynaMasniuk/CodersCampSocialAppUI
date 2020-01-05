import React from "react";
import ReactDOM from 'react-dom';

 function Navbar() {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
            <a className="navbar-brand errorr" href="http://localhost:3000/"><img src="https://img.pngio.com/free-media-network-social-tango-icon-tango-png-free-512_512.png" width="10%" height="10%"/>   SocialApp</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Email" aria-label="Email"/>
                    <input className="form-control mr-sm-2" type="text" placeholder="Password" aria-label="Password"/>
                        <button className="btn btn-dark my-2 my-sm-0" type="submit">Login</button>
                </form>
            </div>
        </nav>
    );
    
}
export default Navbar;