import React, { Component } from "react";
import "./Banner.css";
import Menu from "./Menu";

export default class Banner extends Component {
  render() {
    return (
      <div className="faixa">
        <Menu handleClick={this.props.handleClick} sticky={this.props.sticky} />
        <div className="new--title">
          <div className="title--over--pic">CCB Pigeons</div>
          <div
            className="arrow"
            ref={this.props.sobre}
            anchor="arrow"
            onClick={() => this.props.handleClick("arrow")}
          />
        </div>
      </div>
    );
  }
}
