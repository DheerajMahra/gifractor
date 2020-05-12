const addOptions = (text, videoEl) => ({
    gifWidth: 250,
    gifHeight: 250,
    interval: 0.1,
    numFrames: 20,  
    frameDuration: 1,
    fontWeight: 'bold',
    fontSize: '30px',   
    fontFamily: 'Arial',
    fontColor: '#ffffff',
    textAlign: 'center',
    textBaseline: 'bottom',
    sampleInterval: 10,
    numWorkers: 2,
    text,
    webcamVideoElement: videoEl
})

export default addOptions