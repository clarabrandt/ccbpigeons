import React, { Component, Fragment } from 'react';
import './AdminAbout.css'

export default class AdminAbout extends Component {
//   render() {
//     return (
//       <div className='adminabout'>
//         Sobre
//       </div>
//     )
//   }
// }


baseUrl = 'https://us-central1-pigeon-90548.cloudfunctions.net/api/';

  constructor(props) {
    super(props);
    this.state = {
      sobre: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleClick(event) {
    const endpoint = `${this.baseUrl}sobre`;
    event.preventDefault();
    const data = { sobre: this.state.sobre };
    
    console.log(this.state.sobre)
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
  }

  render() {
    return (
      <Fragment>
        <form className='postData'>
          <div>Alterar texto sobre o CCB Pigeons</div>
          <textarea type='text' id='conteudo' name='conteudo' placeholder='texto' onChange={ this.handleChange }/>
          <div className='buttons'>
            <button onClick={ this.props.goBack }>Voltar</button>
            <button onClick={ this.handleClick }>Postar</button>
          </div>
        </form>
      </Fragment>

    )
  }
}
