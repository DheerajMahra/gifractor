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

    base64ToFile = (url, filename, mimeType) => {
        // return (fetch(url)
        //     .then(res => res.arrayBuffer())
        //     .then(buf => new File([buf], filename,{type:mimeType}))
        // );
        return fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], filename,{ type: mimeType })
            return file
        })
        .catch(error => console.log('Error from base64fun', error))
    }

    handleShare = () => {
        let url = this.state.gif
        this.base64ToFile(url, this.props.text, 'image/gif')
        .then(gif => {
            
            if (navigator.canShare && navigator.canShare({ files: [gif] })) {
                navigator.share({ files: [gif] })
                .then(() => alert('Share was successful.'))
                .catch((error) => alert('Sharing failed', error));
              } else {
                alert(`Your system doesn't support sharing files.`);
              }

        })
        .catch(error => alert(error))
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