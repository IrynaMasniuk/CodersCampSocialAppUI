import React, { Component } from 'react';
import api from '../api';
import Button from 'react-bootstrap/Button';

const Comments = props => (
    <tr>
        <td>{props.comment.author}</td>
        <td>{props.comment.date}</td>
        <td>{props.comment.content}</td>
        <td>
            <DeleteComment id={props.comment._id} />
        </td>
        <td>
            <UpdateComment id={props.comment._id} />
        </td>
    </tr>
);

class DeleteComment extends Component {
    deleteComment = e => {
        e.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the comment ${this.props.id} permanently?`,
            )
        ) {
            api.deleteCommentById(this.props.id)
            window.location.reload()
        }
    };

    render() {
        return <Button onClick={this.deleteComment}>Delete</Button>
    };
};

class UpdateComment extends Component {
    updateComment = e => {
        e.preventDefault()

        window.location.href = `/comments/update/:${this.props.id}`
    };

    render() {
        return <Button onClick={this.updateComment}>Update</Button>
    };
};

class CommentsList extends Component {

    constructor(props) {
        super(props);

        this.state = { comments: [] };
    };

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllComments()
        .then(response => {
            this.setState({
                comments: response.data,
                isLoading: false,
            })
        })
        .catch((error) => {
            console.log(error);
        })
    };

    commentsList() {
        console.log(this.state.comments)
        return this.state.comments.map(comments => {
            return <Comments comment={comments} deletComment={this.deleteComment} key={comments._id} />;
        })
    };

    render() {
        return (
            <div>
                <h3>Comments</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Id</th>
                            <th>Author</th>
                            <th>Date</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.commentsList()}
                    </tbody>
                </table>
                <Button variant="danger" size="sm" href={'/commments'} block="block">
                    Back to Comments
                </Button>
            </div>
        )
    }
}

export default CommentsList;