import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class Videos extends Component {
  videoOnReady (event) {
    event.target.pauseVideo(0)
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
