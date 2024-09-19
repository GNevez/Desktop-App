import React from 'react'
import style from './Home.module.scss'

import gtav from '../../assets/imgs/gtav.webp'
import val from '../../assets/imgs/val.webp'
import cs from '../../assets/imgs/cs.webp'
import lol from '../../assets/imgs/lol.png'

import Navbar from '../../components/navbar/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row w-100">
          <div className={'col-md-2 '}>
            <ul className={style.ul}>
              <li className={style.li}>
                <img src={gtav} alt="" className={style.iconGame} />
              </li>
              <li className={style.li}>
                <img src={val} alt="" className={style.iconGame} />
              </li>
              <li className={style.li}>
                <img src={cs} alt="" className={style.iconGame} />
              </li>
              <li className={style.li}>
                <img src={lol} alt="" className={style.iconGame} />
              </li>
            </ul>
          </div>
          <div className="col-md-10"></div>
        </div>
      </div>
    </>
  )
}

export default Home
