import React from "react";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from './config';

class RegisterForm extends React.Component {
//     state = {
//         username: '',
//         dateOfBirth: '',
//         email: '',
//         phoneNumber: '',
//         relationship: '',
//         cityOfOrigin: '',
//         cityOfLiving: '',
//         hobbies: '',
//         work: '',
//         education: ''
//        };

// onFormSubmit(event) {
//     event.preventDefault();
//     console.log("working");
// }

// userNameChanged = (e) => {
//         this.setState({username: e.target.value});
//         console.log(JSON.stringify(this.state));
// }
// dateOfBirthChanged = (e) => {
//         this.setState({dateOfBirth: e.target.value});
//         console.log(JSON.stringify(this.state));
// }
// relationChanged = (e) => {
//     this.setState({relationship: e.target.value });
//     console.log(JSON.stringify(this.state));
//}

    render() {
        return(
            <div className="container register">
                <h1 className="toast-header">Sign Up right now</h1>
                <form onSubmit={this.onFormSubmit} className="needs-validation" noValidate>
                    <div className="form-row">
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom01">Username</label>
                            <input type="text" className="form-control" id="validationCustom01" required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom02">Date of Birth</label>
                            <input type="text" className="form-control" id="validationCustom02" required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustomUsername">E-mail</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                                </div>
                                <input type="text" className="form-control" id="validationCustomUsername"
                                       aria-describedby="inputGroupPrepend"  required/>
                                <div className="invalid-feedback">
                                    Please choose a username.
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom03">Phone number</label>
                            <input type="text" className="form-control" id="validationCustom03"  required/>
                            <div className="invalid-feedback">
                                Please provide a valid city.
                            </div>
                        </div>
                    </div>
                    <div className="form-row">

                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom04">Relationship</label>
                            <select className="custom-select" id="validationCustom04" required>
                                <option value="Single">Single</option>
                                <option value='Dating'>Dating</option>
                                <option value='Married'>Married</option>
                                <option value='Divorced'>Divorced</option>
                                <option value='Complicated'>Complicated</option>
                            </select>
                            <div className="invalid-feedback">
                                Please select a valid state.
                            </div>
                        </div>
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom05">Hobbies</label>
                            <input type="text" className="form-control" id="validationCustom05" required/>
                            <div className="invalid-feedback">
                                Please provide a valid zip.
                            </div>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom05">CityOfOrigin</label>
                            <input type="text" className="form-control" id="validationCustom05" />
                            <div className="invalid-feedback">
                                Please provide a valid zip.
                            </div>
                        </div>
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom05">CityOfLiving</label>
                            <input type="text" className="form-control" id="validationCustom05" />
                            <div className="invalid-feedback">
                                Please provide a valid zip.
                            </div>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom05">Work</label>
                            <input type="text" className="form-control" id="validationCustom05"  />
                            <div className="invalid-feedback">
                                Please provide a valid zip.
                            </div>
                        </div>
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom05">Education</label>
                            <input type="text" className="form-control" id="validationCustom05" />
                            <div className="invalid-feedback">
                                Please provide a valid zip.
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                            <label className="form-check-label" htmlFor="invalidCheck">
                                Agree to <a href="#" >terms and condition</a>
                            </label>
                            <div className="invalid-feedback">
                                You must agree before submitting.
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-dark" type="submit" onClick={this.tryRegister}>Register</button>

                    <div><Link to="/Profile/au8ujhikect@gmail">To profile</Link></div>


                </form>
            </div>

        )}

    tryRegister(){
        axios.post('http://localhost:5000/api/');
        console.log("cos pyklo");
    }

}

export default RegisterForm;