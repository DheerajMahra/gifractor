import React from 'react'
import './Button.css'
import { Link } from 'react-router-dom'

const Button = props => {
    return (
        <Link to={props.to} onClick={props.click}>
            <span className="btn">
            {props.children}
            </span>
        </Link>   
    )
}

export default Button
