
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from './api'
const Events = props => (
    <tr>
        <td>{props.event.name}</td>
        <td>{props.event.description}</td>
        <td>{props.event.place}</td>
        <td>{props.event.date}</td>
        <td>
            {/* <Link to={"/update/" + props.events._id}>edit</Link> | <a href="#" onClick={() => { props.deleteEvent(props.events._id) }}>delete</a> */}
        </td>
    </tr>
)

export default class EventsList extends Component {
    constructor(props) {
        super(props);

        this.deleteEvents = this.deleteEvents.bind(this)

        this.state = { events: [] };
    }

    // componentDidMount() {
    //     axios.get('api/events/')
    //         .then(response => {
    //             console.log(`${response.data}`)
    //             this.setState({ events: response.data })
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }
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

    // componentDidMount() {
    //     fetch('/api/proposals')
    //       .then(response => {
    //         console.log(response);
    //         return response.json();
    //       })
    //       .then((proposals) => { 
    //         console.log(proposals);
    //         this.setState({ proposals }); 
    //       });
    // }
    deleteEvents(id) {
        axios.delete('api/events/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            events: this.state.events.filter(el => el._id !== id)
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
            </div>
        )
    }
}