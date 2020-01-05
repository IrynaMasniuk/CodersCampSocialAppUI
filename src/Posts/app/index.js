import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { PostsList, PostsInsert, PostsUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/posts/list" exact component={PostsList} />
                <Route path="/posts/create" exact component={PostsInsert} />
                <Route
                    path="/posts/update/:id"
                    exact
                    component={PostsUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App
