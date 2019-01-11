import React, { Component } from 'react';
import YouTube from 'react-youtube';


//https://www.youtube.com/watch?v=OShgy4uv894
//https://youtu.be/OShgy4uv894
export default class Videos extends Component {
  videoOnReady (event) {
    event.target.pauseVideo(0)
    console.log(event.target)
  }
  render() {
    const opts = {
      height: '200',
      width: '270',
    }
    const {videoId} = this.props
    return (
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={this.videoOnReady}
        />
      );
    
  }
}
