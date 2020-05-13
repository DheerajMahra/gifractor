import React from 'react'
import './Details.css'

import Button from '../button/Button'

class Details extends React.Component {

    constructor(props) {
        super(props)
        this.state = { text: '' }
    }

    handleChange = e => { this.setState({ [e.target.id]: e.target.value }) }

    handleSubmit = e => {
        e.preventDefault()
        this.props.setText(this.state.text)
        this.props.history.push('/studio')
    }

    render() {
        return (
            <div className="details">
                <div className="details__box">

                    <h1 className="details__head">Enter gif text</h1>             

                    <form className="details__form" onSubmit={this.handleSubmit}>
                        <input
                            className="details__input"
                            type="text" 
                            id="text"
                            autoFocus
                            onChange={this.handleChange}
                        />
                        <div style={{textAlign: "center"}}>
                            <Button
                                to="/details"
                                click={this.handleSubmit}
                            >
                            Start Recording
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Details