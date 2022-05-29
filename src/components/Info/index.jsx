import styles from './Info.module.sass'
import { Link } from 'react-router-dom';
import React from 'react';

const Info = ({ image, title, description, text, buttonEvent, link }) => {
  return (
    <div className={styles.info}>
        <img src={image} alt="box" />
        <div className={styles.content}>
            <h3>{ title }</h3>
            <p dangerouslySetInnerHTML={{__html: description}}></p>
        </div>
        {buttonEvent ? 
        <button onClick={() => buttonEvent()} className="button-green">
          <img src="/assets/img/arrow.svg" alt=""/>
          <span>{ text }</span>
        </button>
        :
        <Link to={link} className="button-green">
          <img src="/assets/img/arrow.svg" alt=""/>
          <span>{ text }</span>
        </Link>
        }
    </div>
  )
}

export default Info;
