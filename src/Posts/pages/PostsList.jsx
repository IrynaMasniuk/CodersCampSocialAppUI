import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
const Comment = styled.div`
    color: #2244aa;
    cursor: pointer;
`

class AddComment extends Component {
    updateUser = event => {
        event.preventDefault()

//        window.location.href = `/posts/update/${this.props.id}`
    }

    render() {
        return <Comment >Comment</Comment>
    }
}

class UpdatePost extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/posts/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeletePost extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the post ${this.props.id} permanently?`,
            )
        ) {
            api.deletePostById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class PostsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllPosts().then(posts => {
            this.setState({
                posts: posts.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { posts, isLoading } = this.state

        const columns = [
            {
                Header: 'Content',
                accessor: 'content',
                filterable: true,
            },

            {
                Header: 'Created',
                accessor: 'createdAt',
                Cell: props => <span>{props.value}</span>,
            },
            {
                Header: 'Updated',
                accessor: 'updatedAt',
                Cell: props => <span>{props.value}</span>,
            },

            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <AddComment id={props.original._id} />
                        </span>
                    )
                },
            },

            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeletePost id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdatePost id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!posts.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={posts}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default PostsList
