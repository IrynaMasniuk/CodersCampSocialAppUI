import React, { Component } from 'react';
import api from '../api'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

class CommentsUpdate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            date: '',
            description: ''
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

    handleUpdateComment = async () => {
        const { id, author, date, content } = this.state
        const payload = { author, date, content }

        await api.updateCommentById(id, payload).then(res => {
            window.alert(`Comment updated successfully`)
            this.setState({
                author: '',
                date: '',
                content: '',
            })
        })
        this.props.history.push('/comments')
    };

    componentDidMount = async () => {
        const { id } = this.state
        const comment = await api.getCommentById(id)

        this.setState({
            author: comment.data.data.author,
            date: comment.data.data.date,
            content: comment.data.data.content
        })
    };

    render() {
        return (
            <div className="form-wrapper">
                <Form >
                    <Form.Group controlId="Author">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" value={this.state.author} onChange={this.handleChangeInputAuthor} />
                    </Form.Group>

                    <Form.Group controlId="Date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" value={this.state.date} onChange={this.handleChangeInputDate} />
                    </Form.Group>

                    <Form.Group controlId="Content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control type="textarea" value={this.state.content} onChange={this.handleChangeInputContent} />
                    </Form.Group>


                    <Button variant="primary" size="sm" onClick={this.handleUpdateComment} block="block" type="submit">
                        Update Comment
                    </Button>
                    <Button variant="danger" size="sm" href={'/comments'} block="block">
                        Back to Comment
                    </Button>
                </Form>
            </div>
        )
    };
};

export default CommentsUpdate;