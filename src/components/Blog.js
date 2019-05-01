import React, { Component } from "react";
import "./Blog.css";

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: []
    };

    this.showBlog = this.showBlog.bind(this);
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

  render() {
    return (
      <div className="blog section-layout" ref={this.props.blog}>
        <div className="blog-content ">
          <div className="blog-title box-title">Blog</div>
          <div className="posts box-content">
            <div className="post-arquivo box-inside--left">
              <div className="post-subtitle--arquivo"> Arquivo</div>
              <div className="post-arquivo--date">2019</div>
              <div className="post-arquivo--date">2018</div>
              <div className="post-arquivo--date">2017</div>
              <div className="post-arquivo--date">2016</div>
            </div>
            <div className="post-new box-inside--right">
              <div className="post-subtitle--new">Mais recentes</div>
              {this.state.blog.map((res, index) => {
                return (
                  <div
                    key={index}
                    className="post-new--content"
                    onClick={this.toggleList}
                  >
                    <div className="post-title">{res.titulo} </div>
                    <div className="post-date">{res.date} </div>
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
