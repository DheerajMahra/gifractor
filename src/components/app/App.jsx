import React, { Component } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'

import Home from '../home/Home'
import Details from '../details/Details'
import Studio from '../studio/Studio'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gifText: ''
        }
    }

    setText = text => { this.setState({ gifText: text }) }

    render() {
        return (
            <div className="app">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                        path="/details"
                        render = { props =>
                            <Details
                                {...props}
                                setText={this.setText}
                            />
                        }
                    />
                    <Route
                        path="/studio"
                        render = { props => 
                            <Studio
                                {...props}
                                text={this.state.gifText}
                            />
                        }
                    />
                </Switch>
            </div>
        )
    }
}

export default App
