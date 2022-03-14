import React, { Fragment } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from "./login";
import Dashboard from "./dashboard"

export default function Pages() {
    return(
        <Fragment>
            <Router>
                <Routes>
                    <Route path="Dashboard/" element={<Dashboard />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </Router>
        </Fragment>
    )
}