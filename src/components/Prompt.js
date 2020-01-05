import React, { Component } from "react";
import { Button, Modal } from 'react-bootstrap';

export default class Prompt extends Component {
    render() {
        const { show, title, text, onClose, onSubmit } = this.props;
        return (
            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered={true}
            >
                <Modal.Header closeButton onClick={onClose}>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{text}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" onClick={onSubmit}>OK</Button>
                </Modal.Footer>
            </Modal>
        )    
    }
}