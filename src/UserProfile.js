import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import faker from 'faker';
import axios from 'axios';
import config from './config';
import Prompt from './components/Prompt';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModified: false,
            canEdit: false,
            isEditing: false,
            username: '',
            dateOfBirth: '',
            email: props.email,
            phoneNumber: '',
            relationship: '',
            cityOfOrigin: '',
            cityOfLiving: '',
            hobbies: '',
            work: '',
            education: '',
            showDeletePrompt: false,
        }
        this.edit = this.edit.bind(this);
        // this.changeBirthDate = this.changeBirthDate.bind(this);
        this.stateChanged = this.stateChanged.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        // this.cancel = this.cancel.bind(this);
    }
    componentDidMount = async () => {
        this.getUserProfile(this.state.email);
    }

    async loadUser() {
        console.log(' --- email: '+ this.state.email);
        return this.getUserProfile(this.state.email);
    }
    async getUserProfile(email) {
        axios.get(config.userApi.find(email)).then(response => {
            this.setState({
                username: response.data.username,
                dateOfBirth: response.data.dateOfBirth,
                email: response.data.email,
                phoneNumber: response.data.phoneNumber,
                relationship: response.data.relationStatus,
                cityOfOrigin: response.data.cityOfOrigin,
                cityOfLiving: response.data.cityOfLiving,
                hobbies: response.data.hobbies,
                work: response.data.work,
                education: response.data.education,
                userId: response.data._id,
                profilePicture: faker.image.avatar(),
                canEdit: true,
                isModified: false,
                isEditing: false,
                lastError: null
            });
        });
    }

    async updateUserProfile() {
        axios.put(config.userApi.particularUser(this.state.userId), this.toEditedUserProfile(this.state), {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                this.getUserProfile();
            }, error => {
                console.log('Error during updting profile: ' + JSON.stringify(error));
                this.setState({ lastError: error?.message ?? JSON.stringify(error) });
            });
    }

    deleteUser() {
        this.setState({ showDeletePrompt: true });
    }
    
    async sureDelete(userId){
        console.log(userId);
        axios.delete(config.userApi.particularUser(userId), {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                this.getUserProfile();
            }, error => {
                console.log('Error during updating profile: ' + JSON.stringify(error));
                this.setState({ lastError: error?.message ?? JSON.stringify(error) });
            });
    }

    render() {
        //  getUserProfile('au8ujhikect@gmail');
        return (
            <div className="ui container profile">
                <div className="profile">
                    <div className="profile top">
                        <a href="/" className="avatar">
                            <img alt="avatar" src={ this.state.profilePicture } />
                        </a>
                        <h1 className="name-header">{this.state.username}</h1>
                    </div>
                    <div className="button-area">
                        <div><Link to="/friends">Friends</Link></div>
                        <div><Link to="/posts">Posts</Link></div>
                        <div><Link to="/comments">Comments</Link></div>
                        <div><Link to="/events">Events</Link></div>
                        <div><Link to="/photos">Photos</Link></div>

                    </div>
                    <div className="content">
                        {this.state.isEditing ?
                            <this.editUser /> :
                            <this.showUser />}
                    </div>
                </div>
                <div>
                    {!this.state.isEditing && <button disabled={!this.state.canEdit} onClick={this.edit}>Edit Profile</button>}
                    {this.state.isModified
                        && [<button onClick={this.save}>Save Changes</button>,
                        <button onClick={this.cancel}>Cancel Changes</button>]}
                    <button disabled={!this.state.canEdit} onClick={ this.deleteUser }>Delete User Profile</button>
                </div>
                <div className='error'>{this.state?.lastError && `Error during last operation: ${ this.state.lastError }`}</div>
                <Prompt
                    show={this.state.showDeletePrompt}
                    title="confirm user deletion"
                    text="Are you sure you want delete this user?"
                    onClose={() => this.setState({ showDeletePrompt: false })}
                    onSubmit={() => this.sureDelete(this.state.userId)}
                />
            </div>
        )
    }

    editUser = () => {
        return (<div>
            <div className="label email">E-mail: {this.state.email}</div>
            <div className="form-row">
                <div className="col-md-4">
                    <label className="birth-date" for="birthday">Birth date: <input type="text" id="birthday"
                        onChange={e => this.change('dateOfBirth', e)} value={this.state.dateOfBirth} required />
                    </label>
                </div>
                <div className="col-md-4">
                    <label className="label phone">Phone: <input type="text" id="phone"
                        onChange={e => this.change('phoneNumber', e)} value={this.state.phoneNumber} required />
                    </label>
                </div>
            </div>
            <div className="label relations">Relations:<input type="text" className="form-control" id="relationship"
                onChange={e => this.change('relationship', e)} value={this.state.relationship} required />
            </div>
            <div className="label hobbies">Hobbies:<input type="text" className="form-control" id="hobbies"
                onChange={e => this.change('hobbies', e)} value={this.state.hobbies} required />
            </div>
            <div className="label origin-city">City of origin:<input type="text" className="form-control" id="hobbies"
                onChange={e => this.change('cityOfOrigin', e)} value={this.state.cityOfOrigin} required />
            </div>
            <div className="label city-of-living">Currently live in:<input type="text" className="form-control" id="hobbies"
                onChange={e => this.change('cityOfLiving', e)} value={this.state.cityOfLiving} required />
            </div>
            <div className="label work-place">Work place:<input type="text" className="form-control" id="hobbies"
                onChange={e => this.change('work', e)} value={this.state.work} required />
            </div>
            <div className="label education">Education:<input type="text" className="form-control" id="hobbies"
                onChange={e => this.change('education', e)} value={this.state.education} required />
            </div>
        </div>
        );
    }

    showUser = () => {
        return (
            <div>
                <div className="birthday">Birthday: {this.state.dateOfBirth}</div>
                <div className="email">E-mail: {this.state.email}</div>
                <div className="email">Phone Number: {this.state.phoneNumber}</div>
                <div className="email">Relations: {this.state.relationship}</div>
                <div className="email">Interests: {this.state.hobbies}</div>
                <div className="email">From: {this.state.cityOfOrigin}</div>
                <div className="email">Living in: {this.state.cityOfLiving}</div>
                <div className="email">Work: {this.state.work}</div>
                <div className="email">Education: {this.state.education}</div>
            </div>
        );
    }

    stateChanged = () => {
        this.setState({ isModified: true });
    }
    edit() {
        this.setState({ isEditing: true });
    }
    change = (key, e) => {
        this.stateChanged();
        this.setState({ [key]: e.target.value });
    }
    save = () => {
        this.updateUserProfile();
    }
    cancel = () => {
        this.loadUser();
    }
    toEditedUserProfile = (state) => {
        return {
            username: state.username,
            dateOfBirth: state.dateOfBirth,
            email: state.email,
            phoneNumber: state.phoneNumber,
            relationStatus: state.relationship,
            cityOfOrigin: state.cityOfOrigin,
            cityOfLiving: state.cityOfLiving,
            hobbies: state.hobbies,
            work: state.work,
            education: state.education,
        }
    }
}
export default Profile;   