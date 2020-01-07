import React, {Component} from 'react';
import { HashRouter as Router } from 'react-router-dom'
import { renderRoutes } from "react-router-config";
import {IonApp} from '@ionic/react'
import {router} from './config'

console.log(renderRoutes(router))
class Index extends Component {
    render() {
        return (
            <IonApp>
                <Router>
                    {renderRoutes(router)}
                </Router>
            </IonApp>
        );
    }
}

export default Index;