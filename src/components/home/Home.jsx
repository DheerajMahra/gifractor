import React from 'react'
import './Home.css'
import gif from '../../assets/giphy.gif'
import Button from '../button/Button'

const Home = () => {
    return (
        <div className="home">
            <div className="home__box">
                <img className="home__gif" src={gif} alt="excited"/>
                <h1 className="home__head">Gifractor</h1>
                <p className="home__sub-head">Record and make custom meme gifs</p>
                <Button to="/details">Create</Button>
            </div>
        </div>
    )
}

export default Home
