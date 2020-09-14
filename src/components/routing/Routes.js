import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Alert from '../layouts/Alert';
import NotFound from '../layouts/NotFound';

import Login from '../auth/Login';
import Register from '../auth/Register';
import ProfileForm from '../profile-forms/ProfileForm';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';

import Posts from '../Posts/Posts';
import Post from '../post/Post';

import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';

const Routes = () => (
    <section className='container'>
        <Alert />

        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/developers" component={Profiles} />
            <Route exact path="/developers/:id" component={Profile} />

            <PrivateRoute exact path="/dashboard" component={Dashboard} />

            <PrivateRoute exact path="/create-profile" component={ProfileForm} />
            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/post/:id" component={Post} />

            <Route component={NotFound} />
        </Switch>
    </section>
)

export default Routes;