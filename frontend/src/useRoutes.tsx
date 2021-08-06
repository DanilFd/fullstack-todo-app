import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from './components/login/Login';
import {Registration} from './components/registration/Registration';
import {Todos} from './components/todos/Todos';

export const useRoutes = (isAuth: boolean) => {
    if (!isAuth) {
        return (
            <Switch>
                <Route exact path="/registration" component={Registration}/>
                <Route exact path="/login" component={Login}/>
                <Redirect to="/registration"/>
            </Switch>
        );
    }
    return (
        <Switch>
            <Route exact path="/" component={Todos}/>
            <Redirect to="/"/>
        </Switch>
    )

};

