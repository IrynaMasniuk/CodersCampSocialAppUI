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

class PostsInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: '',
            userId: '5e0db54484a4cc2a186a6b4e'
        }
    }

    handleChangeInputContent = async event => {
        const content = event.target.value
        this.setState({ content })
    }

    handleIncludePost = async () => {
        const { content, userId } = this.state
        const payload = { content, userId }

        await api.insertPost(payload).then(res => {
            window.alert(`Post inserted successfully`)
            this.setState({
                content: '',
                userId: '5e0db54484a4cc2a186a6b4e',
            })
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

                <Button onClick={this.handleIncludePost}>Add Post</Button>
                <CancelButton href={'/posts/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default PostsInsert
