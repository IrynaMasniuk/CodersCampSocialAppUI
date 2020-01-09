import React from 'react';
import faker from 'faker';
import axios from 'axios';
import config from './config';

import Prompt from './components/Prompt';
import { Container, Row, Col, Navbar, Nav, ListGroup, Button  } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.cleanState();
        this.setState({email: props.email});
        this.edit = this.edit.bind(this);
        // this.changeBirthDate = this.changeBirthDate.bind(this);
        this.stateChanged = this.stateChanged.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.updateUserProfile = this.updateUserProfile.bind(this);
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
                this.loadUser();
            }, error => {
                console.log('Error during updating profile: ' + JSON.stringify(error));
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
                this.setState({ showDeletePrompt: false });
                this.setState(this.cleanState());
                localStorage.setItem('email',  null);
                useHistory().push('/');

            }, error => {
                console.log('Error during updating profile: ' + JSON.stringify(error));
                this.setState({ lastError: error?.message ?? JSON.stringify(error) });
            });
    }

    render() {
        //  getUserProfile('au8ujhikect@gmail');
        return (
            <Container style={{ background: '#fff' }}>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="#home">{this.state.username}</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/friends">Friends</Nav.Link>
                        <Nav.Link href="/posts">Posts</Nav.Link>
                        <Nav.Link href="/comments">Comments</Nav.Link>
                        <Nav.Link href="/events">Events</Nav.Link>
                    </Nav>
                </Navbar>
                <Row bg="light">
                    <Col sm={2} bg="light">
                        <div className="left-column">
                            <a href="/" className="avatar" style={{ margin: '25px', display: 'block' }}>
                                <img
                                    alt="avatar"
                                    width='128px'
                                    height='128px'
                                    style={{ borderRadius: '50%' }}
                                    src={ this.state.profilePicture }
                                />
                            </a>
                            {!this.state.isEditing && (
                                <Button
                                    disabled={!this.state.canEdit}
                                    onClick={this.edit}
                                    style={{ marginBottom: '20px' }}
                                >
                                    Edit Profile
                                </Button>
                            )}
                            <Button
                                disabled={!this.state.canEdit}
                                onClick={ this.deleteUser }
                                style={{ marginBottom: '20px' }}
                                variant="danger"
                            >
                                Delete Profile
                            </Button>
                        </div>
                    </Col>
                    <Col sm={10}>
                        {this.state.isEditing
                            ? <this.editUser />
                            : <this.showUser />
                        }
                    </Col>
                </Row>
                <div className='error'>
                    {this.state?.lastError && `Error during last operation: ${ this.state.lastError }`}
                </div>
                <Prompt
                    show={this.state.showDeletePrompt}
                    title="confirm user deletion"
                    text="Are you sure you want delete this user?"
                    onClose={() => this.setState({ showDeletePrompt: false })}
                    onSubmit={() => this.sureDelete(this.state.userId)}
                />
            </Container>
        )
    }

    editUser = () => {
        return (
            <div>
                <div className="label email" style={{ padding: '10px 0' }}>
                    E-mail: <a href='mailto:{this.state.email}'>{this.state.email}</a>
                </div>
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
                
                <div style={{ margin: '20px 0'}}>
                    <Button
                        disabled={!this.state.isModified}
                        onClick={this.save}
                        style={{ marginRight: '20px' }}
                    >
                        Save Changes
                    </Button>
                    <Button
                        disabled={!this.state.isModified}
                        onClick={this.cancel}
                        variant="secondary"
                    >
                        Cancel Changes
                    </Button>
                </div>
            </div>
        );
    }

    showUser = () => {
        return (
            <ListGroup variant="flush">
                <ListGroup.Item>Birthday: {this.state.dateOfBirth}</ListGroup.Item>
                <ListGroup.Item>E-mail: {this.state.email}</ListGroup.Item>
                <ListGroup.Item>Phone Number: {this.state.phoneNumber}</ListGroup.Item>
                <ListGroup.Item>Relations: {this.state.relationship}</ListGroup.Item>
                <ListGroup.Item>Interests: {this.state.hobbies}</ListGroup.Item>
                <ListGroup.Item>From: {this.state.cityOfOrigin}</ListGroup.Item>
                <ListGroup.Item>Living in: {this.state.cityOfLiving}</ListGroup.Item>
                <ListGroup.Item>Work: {this.state.work}</ListGroup.Item>
                <ListGroup.Item>Education: {this.state.education}</ListGroup.Item>
            </ListGroup>
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
    cleanState = () => {
        return {
            isModified: false,
            canEdit: false,
            isEditing: false,
            username: '',
            dateOfBirth: '',
            email: null,
            phoneNumber: '',
            relationship: '',
            cityOfOrigin: '',
            cityOfLiving: '',
            hobbies: '',
            work: '',
            education: '',
            showDeletePrompt: false,
        };
    }
}
export default Profile;   