import React, { Component } from 'react';
import api from '../api';
import Button from 'react-bootstrap/Button';

class CommentsInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            author: '',
            date: '',
            content: ''
        };
    };

    handleChangeInputAuthor = async event => {
        const author = event.target.value
        this.setState({ author })
    };

    handleChangeInputDate = async event => {
        const date = event.target.value
        this.setState({ date })
    };

    handleChangeInputContent = async event => {
        const content = event.target.value
        this.setState({ content })
    };

    handleIncludeComment = async (e) => {
        e.preventDefault();
        const { author, date, content} = this.state
        const payload = {author, date, content}

        await api.insertComment(payload).then(res => {
            window.alert(`Comment inserted successfully`)
            this.setState({
                author: '',
                date: '',
                content: '',
            })
        });
    };

    render() {
        return (
            <div>
                <h3>Create New Comment</h3>
                <form >
                    <div className="form-group">
                        <label>Comment author: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.author}
                            onChange={this.handleChangeInputAuthor}
                        />
                        <label>Comment date: </label>
                        <input type="date"
                            required
                            className="form-control"
                            value={this.state.date}
                            onChange={this.handleChangeInputDate}
                        />
                        <label>Comment content: </label>
                        <textarea
                            className="form-control"
                            value={this.state.content}
                            onChange={this.handleChangeInputContent}
                        />
                    </div>

                    <div className="form-group">
                        <Button variant="primary" size="sm" onClick={this.onSubmit} block="block" type="submit">
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