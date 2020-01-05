import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "../App.css";

import Button from 'react-bootstrap/Button';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import CommentsInsert from "./CommentsInsert";
import CommentsList from "./CommentsList";

const CommentsPage = () => {
    return (
        <div>
            <div style={{ width: "60%", margin: "0 auto" }}>
                <Button variant="danger" size="sm" href={'/profile'} block="block">
                    Back to Profile
                </Button>
            </div>
        </div>
    );
};

function Comments() {
    return (
        <Router>
            <div className="App ">
                <Navbar bg="dark" variant="dark">
                    <Container className="justify-content-start">
                        <Navbar.Brand>
                            <Link to={"/comments"} className="nav-link">
                                Comment
                            </Link>
                        </Navbar.Brand>
                        <Nav>
                            <Nav>
                                <Link to={"/comments/create"} className="nav-link">
                                    Create Comment
                                </Link>
                            </Nav>
                            <Nav>
                                <Link to={"/comments/list"} className="nav-link">
                                    Comment List
                                </Link>
                            </Nav>
                        </Nav>
                    </Container>
                </Navbar>
                <Container>
                    <Col>
                        <div className="wrapper">
                            <Switch>
                                <Route exact path='/comments/' component={CommentsPage} />
                                <Route path="/comments/create" component={CommentsInsert} />
                                <Route path="/comments/list" component={CommentsList} />
                            </Switch>
                        </div>
                    </Col>
                </Container>
            </div>
        </Router>
    );
};

export default Comments;