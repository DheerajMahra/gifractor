import React from 'react'
import './Studio.css'
import error from '../../assets/error.gif'
import addOptions from '../../utils/addOptions'
import Button from '../button/Button'
const FileSaver = require('file-saver');

class Studio extends React.Component {

    constructor(props) {
        super(props)
        this.videoEl = React.createRef()
        this.videoBox = React.createRef()
        this.state = {
            gif: null,
            isError: false,
            errorMsg: null
        }
    }

    async componentDidMount() {
        let options = addOptions(this.props.text, this.videoEl.current)

        let gifshot = await import('../../utils/gifCreator')

        try {
            let gif = await gifshot.gifCreator(options)
            this.videoEl.current.style.display = 'none'
            this.videoBox.current.style.display = 'none'
            this.setState({
                gif,
                isError: false
            })
        } catch (error) {
            this.setState({
                isError: true,
                errorMsg: error
            })
        }
    }

    handleSave = () => {
        FileSaver.saveAs(this.state.gif, "meme")
    }

    handleShare = () => {
        if(navigator.canShare && navigator.canShare({ files: [this.state.gif] })) {
            navigator.share({
                files: [this.state.gif],
                title: 'mygif',
            })
            .then(() => console.log('successfully shared.'))
            .catch((error) => console.log('Sharing failed', error))
        } else {
            console.log('Your system doesn\'t support sharing files.')
        }
    }

    render() {
         return (
            <div className="studio">
                {
                    !this.state.isError ?
                    <div
                        className="studio__preview-box"
                        ref={this.videoBox}
                    >
                        <video
                            className="studio__preview"
                            ref={this.videoEl}
                        ></video>
                    </div> :

                    <div className="studio__error">
                        <img className="error__gif" src={error} alt="error"/>
                        <div className="error__msg">{this.state.errorMsg}</div>
                        <Button to="/">Go To Home</Button>
                    </div>
                }

                {
                    this.state.gif ?
                    <div className="studio__result">
                        <p className="success__text">Click on the gif to download</p>
                        <img
                            className="success__gif"
                            src={this.state.gif}
                            alt="user gif"
                            onClick={this.handleSave}
                        />
                        <Button to="/studio" click={this.handleShare}>Share</Button>
                        <Button to="/details">Record Again</Button>
                    </div> :
                    null
                }
            </div>
        )
    }
}

export default Studio