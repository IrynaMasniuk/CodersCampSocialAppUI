import React from "react";
import axios from 'axios';
import config from './config';
import { useHistory } from "react-router-dom";

class RegisterForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
            dateOfBirth: '',
            email: '',
            phoneNumber: '',
            relationStatus: '',
            cityOfOrigin: '',
            cityOfLiving: '',
            hobbies: '',
            work: '',
            education: ''
        }
    }

    handleUsername = async event => {
        const username = event.target.value
        this.setState({ username })
    }
    handlePass = async event => {
        const password = event.target.value
        this.setState({ password })
    }
    handleBirth = async event => {
        const dateOfBirth = event.target.value
        this.setState({ dateOfBirth })
    }
    handleMail = async event => {
        const email = event.target.value
        this.setState({ email })
    }
    handlePhone = async event => {
        const phoneNumber = event.target.value
        this.setState({ phoneNumber })
    }
    handleRelation = async event => {
        const relationStatus = event.target.value
        this.setState({ relationStatus })
    }
    handleCityO = async event => {
        const cityOfOrigin = event.target.value
        this.setState({ cityOfOrigin })
    }
    handleCityL = async event => {
        const cityOfLiving = event.target.value
        this.setState({ cityOfLiving })
    }
    handleHobbies = async event => {
        const hobbies = event.target.value
        this.setState({ hobbies })
    }
    handleEducation = async event => {
        const education = event.target.value
        this.setState({ education })
    }
    handleWork = async event => {
        const work = event.target.value
        this.setState({ work })
    }



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
                <form  className="needs-validation" noValidate target="_blank" onSubmit={ this.submitting } action='/Profile/'>
                    <div className="form-row">
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom01">Username</label>
                            <input type="text" className="form-control" id="validationCustom01" required value={this.state.username} onChange={this.handleUsername}/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom02">Date of Birth</label>
                            <input type="text" className="form-control" id="validationCustom02" required value={this.state.dateOfBirth} onChange={this.handleBirth}/>
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
                                       aria-describedby="inputGroupPrepend"  required value={this.state.email} onChange={this.handleMail}/>
                                <div className="invalid-feedback">
                                    Please choose a email.
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom03">Phone number</label>
                            <input type="text" className="form-control" id="validationCustom03"  required value={this.state.phoneNumber} onChange={this.handlePhone}/>
                            <div className="invalid-feedback">
                                Please provide a valid phone number.
                            </div>
                        </div>
                    </div>
                    <div className="form-row">

                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom04">Relationship</label>
                            <select className="custom-select" id="validationCustom04" required value={this.state.relationStatus} onChange={this.handleRelation}>
                                <option value="single">single</option>
                                <option value='dating'>dating</option>
                                <option value='married'>married</option>
                                <option value='divorced'>divorced</option>
                                <option value='complicated'>complicated</option>
                            </select>
                            <div className="invalid-feedback">
                                Please select a valid state.
                            </div>
                        </div>
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom05">Hobbies</label>
                            <input type="text" className="form-control" id="validationCustom05" required value={this.state.hobbies} onChange={this.handleHobbies}/>
                            <div className="invalid-feedback">
                                Please provide a valid hobbies.
                            </div>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom05">CityOfOrigin</label>
                            <input type="text" className="form-control" id="validationCustom05"value={this.state.cityOfOrigin} onChange={this.handleCityO} />
                            <div className="invalid-feedback">
                                Please provide a valid city of origin.
                            </div>
                        </div>
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom05">CityOfLiving</label>
                            <input type="text" className="form-control" id="validationCustom05"value={this.state.cityOfLiving} onChange={this.handleCityL}/>
                            <div className="invalid-feedback">
                                Please provide a valid city of living.
                            </div>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom05">Work</label>
                            <input type="text" className="form-control" id="validationCustom05" value={this.state.work} onChange={this.handleWork} />
                            <div className="invalid-feedback">
                                Please provide a valid work status.
                            </div>
                        </div>
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom05">Education</label>
                            <input type="text" className="form-control" id="validationCustom05" value={this.state.education} onChange={this.handleEducation}/>
                            <div className="invalid-feedback">
                                Please provide a valid education status.
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-md-3 mb-1">
                            <label htmlFor="validationCustom05">Password</label>
                            <input type="text" className="form-control" id="validationCustom05" value={this.state.password} onChange={this.handlePass}/>
                            <div className="invalid-feedback">
                                Please provide a valid password.
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                            <label className="form-check-label" htmlFor="invalidCheck">
                                Agree to <a href="/" >terms and condition</a>
                            </label>
                            <div className="invalid-feedback">
                                You must agree before submitting.
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-dark" type="submit" onClick={this.tryRegister}>Register</button>

                </form>
            </div>

        )}

    tryRegister = async  (e) => {

        await axios.post(config.backend + 'users/', {
            username : this.state.username,
            password:this.state.password,
            dateOfBirth: this.state.dateOfBirth,
            phoneNumber: this.state.phoneNumber,
            work:this.state.work,
            education:this.state.education,
            cityOfLiving:this.state.cityOfLiving,
            cityOfOrigin:this.state.cityOfOrigin,
            relationStatus:this.state.relationStatus,
            email:this.state.email,
            hobbies:this.state.hobbies
        })
            .then(response => {
                console.log(response)
                localStorage.setItem('email',this.state.email);
                useHistory().push('/Profile/');
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    submitting = (e) => {
        e.preventDefault();
    }


}

export default RegisterForm;
