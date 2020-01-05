import React from "react";
import {
    BrowserRouter,
    Route
} from 'react-router-dom';

import Navbar from "./Navbar";
import RegisterForm from "./RegisterForm";
import UserProfile from "./UserProfile";

import Friends from "./Friends/app";

import Event from './Event.jsx';
import EventList from './EventList.jsx';
import EventInsert from './EventInsert.jsx';
import EventUpdate from './EventUpdate.jsx';

import Comments from './pages/Comments';
import CommentsInsert from './pages/CommentsInsert';
import CommentsList from './pages/CommentsList';
import CommentsUpdate from './pages/CommentsUpdate';

import Posts from "./Posts/app";

const App = () => {
    return ( 
        <div style = {{
            backgroundColor: "#d0ecf0",
            minHeight: "100vh"
        }}>
        <Navbar />
            <BrowserRouter >
                <div>
                    <Route path="/" exact component ={RegisterForm} />
                    <Route path="/profile" render = { () => < UserProfile email='deniro@gmail.com' /> }/>
                    <Route path="/friends" component={ () => <Friends/> } />
                    <Route path="/posts" component={ () => <Posts/> }/>

                    <Route path="/events" exact component={Event} />
                    <Route path="/events/list" exact component={EventList} />
                    <Route path="/events/create" exact component={EventInsert}/>
                    <Route path="/events/update/:id" exact component={EventUpdate}/>

                    <Route path="/comments" exact component={Comments}/>
                    <Route path="/comments/list" exact component={CommentsList}/>
                    <Route path="/comments/create" exact component={CommentsInsert}/>
                    <Route path="/comments/update/:id" exact component={CommentsUpdate}/>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
