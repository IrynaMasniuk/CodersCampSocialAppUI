import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class PostsUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            content: '',
            time: ''
        }
    }

    handleChangeInputContent = async event => {
        const content = event.target.value
        this.setState({ content })
    }

    handleChangeInputTime = async event => {
        const time = event.target.value
        this.setState({ time })
    }

    handleUpdatePost = async () => {
        const { id, content } = this.state
        const payload = { content}

        await api.updatePostById(id, payload).then(res => {
            window.alert(`Post updated successfully`)
            this.setState({
                content: '',

            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const post = await api.getPostById(id)

        this.setState({
            content: post.data.data.content,
        })
    }

    render() {
        const { content } = this.state
        return (
            <Wrapper>
                <Title>Create Post</Title>

                <Label>Content: </Label>
                <InputText
                    type="text"
                    value={content}
                    onChange={this.handleChangeInputContent}
                />
                <Button onClick={this.handleUpdatePost}>Update Post</Button>
                <CancelButton href={'/posts/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default PostsUpdate
