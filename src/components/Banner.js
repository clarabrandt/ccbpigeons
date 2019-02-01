import React from 'react';
import './Banner.css'

const pigeon = require("./images/Pombal_tio.jpg")
const Banner = () => (
      <div className='faixa'>
        <img src={pigeon} className='pigeon--pic' alt=""  />
      </div>
)
export default Banner