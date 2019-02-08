import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class Videos extends Component {
  videoOnReady (event) {
    event.target.pauseVideo(0)
  }
  render() {
    const opts = {
      height: '250',
      width: '300',
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
