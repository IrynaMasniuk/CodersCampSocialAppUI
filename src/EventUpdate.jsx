import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

import api from './api'
export default class EventUpdate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            place: '',
            date: '',
            description: ''
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
    handleUpdateEvent = async () => {
        const { id, name, place, date, description } = this.state
        const payload = { name, place, date, description }

        await api.updateEventById(id, payload).then(res => {
            window.alert(`Event updated successfully`)
            this.setState({
                name: '',
                place: '',
                date: '',
                description: ''
            })
        })
        this.props.history.push('/events')
    }

    componentDidMount = async () => {
        const { id } = this.state
        const event = await api.getEventById(id)

        this.setState({
            name: event.data.name,
            place: event.data.place,
            date: event.data.date,
            description: event.data.description
        })
    }


    render() {
        return (<div className="form-wrapper">
            <Form >
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={this.state.name} onChange={this.handleChangeInputName} />
                </Form.Group>

                <Form.Group controlId="Name">
                    <Form.Label>Place</Form.Label>
                    <Form.Control type="text" value={this.state.place} onChange={this.handleChangeInputPlace} />
                </Form.Group>

                <Form.Group controlId="Name">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" value={this.state.date} onChange={this.handleChangeInputDate} />
                </Form.Group>
                <Form.Group controlId="Name">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="textarea" value={this.state.description} onChange={this.handleChangeInputDescription} />
                </Form.Group>


                <Button variant="primary" size="sm" onClick={this.handleUpdateEvent} block="block" type="submit">
                    Update Event
        </Button>
                <Button variant="danger" size="sm" href={'/events'} block="block">
                    Back to Events
        </Button>
            </Form>
        </div>);
    }
}