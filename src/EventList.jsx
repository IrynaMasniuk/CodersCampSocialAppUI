
import React, { Component } from 'react';
import api from './api'
import Button from 'react-bootstrap/Button';
const Events = props => (
    <tr>
        <td>{props.event._id}</td>
        <td>{props.event.name}</td>
        <td>{props.event.place}</td>
        <td>{props.event.date}</td>
        <td>{props.event.description}</td>
        <td>
            <DeleteEvent id={props.event._id} />
        </td>
        <td>
            <UpdateEvent id={props.event._id} />
        </td>
    </tr>
)
class DeleteEvent extends Component {
    deleteEvent = e => {
        e.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the event ${this.props.id} permanently?`,
            )
        ) {
            api.deleteEventById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Button onClick={this.deleteEvent}>Delete</Button>
    }
}

class UpdateEvent extends Component {
    updateEvent = e => {
        e.preventDefault()

        window.location.href = `/events/update/${this.props.id}`
    }

    render() {
        return <Button onClick={this.updateEvent}>Update</Button>
    }
}
export default class EventsList extends Component {
    constructor(props) {
        super(props);

        this.state = { events: [] };
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllEvents()
            .then(response => {
                this.setState({
                    events: response.data,
                    isLoading: false,
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    eventsList() {
        console.log(this.state.events)
        return this.state.events.map(events => {
            return <Events event={events} deletEvent={this.deleteEvent} key={events._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Events</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Place</th>
                            <th>Date</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.eventsList()}
                    </tbody>
                </table>
                <Button variant="danger" size="sm" href={'/events'} block="block">
                    Back to Events
        </Button>
            </div>
        )
    }
}