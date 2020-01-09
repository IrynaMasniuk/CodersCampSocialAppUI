import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import config from './config'
export default class CreateEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            place: '',
            date: '',
            description: '',
            userId: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }
    handleChangeInputPlace = async event => {
        const place = event.target.value
        this.setState({ place })
    }
    handleChangeInputDate = async event => {
        const date = event.target.value
        this.setState({ date })
    }
    handleChangeInputDescription = async event => {
        const description = event.target.value
        this.setState({ description })
    }
    handleChangeInputUserId = async event => {
        const userId = event.target.value
        this.setState({ userId })
    }

    handleIncludeEvent = async (e) => {
        e.preventDefault();
        await axios.post(config.backend + 'events', {
            name: this.state.name,
            place: this.state.place,
            date: this.state.date,
            description: this.state.description
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            });

    }
    render() {
        return (
            <div>
                <h3>Create New Event</h3>
                <form >
                    <div className="form-group">
                        <label>Event name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.handleChangeInputName}
                        />
                        <label>Event place: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.place}
                            onChange={this.handleChangeInputPlace}
                        />
                        <label>Event date: </label>
                        <input type="date"
                            required
                            className="form-control"
                            value={this.state.date}
                            onChange={this.handleChangeInputDate}
                        />
                        <label>Event description: </label>
                        <textarea
                            className="form-control"
                            value={this.state.description}
                            onChange={this.handleChangeInputDescription}
                        />

                        <label>User Id </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.userId}
                            onChange={this.handleChangeInputUserId}
                        />
                    </div>
                    <div className="form-group">
                        <Button variant="primary" size="sm" onClick={this.handleIncludeEvent} block="block" type="submit">
                            Create Event
        </Button>

                        <Button variant="danger" size="sm" href={'/events'} block="block">
                            Back to Events
        </Button>
                    </div>
                </form>
            </div>
        )
    }
}