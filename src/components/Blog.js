import React, { Component } from "react";
import moment from 'moment';
import "./Blog.css";

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: [],
      open: false
    };

    this.showBlog = this.showBlog.bind(this);
    this.toggleList = this.toggleList.bind(this);
  }

  componentDidMount() {
    this.showBlog();
  }

  showBlog() {
    const blog = this.props.api.getBlog();
    blog.then(docs => {
      this.setState({
        blog: Object.values(docs.blog)
      });
    });
  }
  toggleList() {
    if (this.state.open === false) {
      this.setState({
        open: true
      });
    } else {
      this.setState({
        open: false
      });
    }
  }

  render() {
    return (
      <div className="blog section-layout" ref={this.props.blog}>
        <div className="blog-content ">
          <div className="blog-title box-title">Blog</div>
          <div className="posts box-content">
            <div className="post-arquivo box-inside--left">
              <div className="post-subtitle--arquivo"> Arquivo</div>
              <div className="post-arquivo--date" onClick={this.toggleList}>
                2019
              </div>
              {this.state.blog.map((res, index) => {
                return (
                  <div
                    key={index}
                    className={`post-date--content ${
                      this.state.open ? "open" : "closed"
                      }`}
                  >
                    <div className="post-title--date">{res.titulo} </div>
                    <div className="post-date--left">{moment(new Date(res.date)).format("DD/MM/YYYY")} </div>
                  </div>
                );
              })}
            </div>
            <div className="post-new box-inside--right">
              {this.state.blog.map((res, index) => {
                return (
                  <div
                    key={index}
                    className="post-new--content"
                    onClick={this.toggleList}
                  >
                    <div className="post-title">{res.titulo} </div>
                    <div className="post-date">{moment(new Date(res.date)).format("DD/MM/YYYY")} </div>
                    <div className="post-content">{res.conteudo}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
