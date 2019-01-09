import React, { Component } from 'react';
import './Logo.css'

export default class Logo extends Component {
  render() {
    return (
      <div class="logo"><img src={require("./logo.png")} alt="" /></div>
    )
  }
}
