import styles from './Info.module.sass'

const Info = ({ image, title, description, buttonText, buttonEvent }) => {
  return (
    <div className={styles.info}>
        <img src={image} alt="box" />
        <div className={styles.content}>
            <h3>{ title }</h3>
            <p>{ description }</p>
        </div>
        <button onClick={() => buttonEvent()} className="button-green">
            <img src="/assets/img/arrow.svg" alt=""/>
            <span>{ buttonText }</span>
        </button>
    </div>
  )
}

export default Info;
