import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class CommentsInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: ''
        };
    };

    handleChangeInputContent = async event => {
        const content = event.target.value
        this.setState({ content })
    };

    handleIncludeComment = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/comments', {
            author: this.state.author,
            date: this.state.date,
            content: this.state.content
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });
    };

    render() {
        return (
            <div>
                <h3>Create New Comment</h3>
                <form >
                    <div className="form-group">
                        <label>Comment content: </label>
                        <textarea
                            required
                            className="form-control"
                            value={this.state.content}
                            onChange={this.handleChangeInputContent}
                        />
                    </div>

                    <div className="form-group">
                        <Button variant="primary" size="sm" onClick={this.handleIncludeComment} block="block" type="submit">
                            Create Comment
                        </Button>

                        <Button variant="danger" size="sm" href={'/comments'} block="block">
                            Back to Comments
                        </Button>
                    </div>
                </form>
            </div>
        );
    };
};

export default CommentsInsert;