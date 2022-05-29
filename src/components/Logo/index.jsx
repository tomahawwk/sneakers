import styles from './Logo.module.sass'

const Logo = () => {
    return (
        <div className={ styles.logo }>
            <div className={ styles.image }>
                <img src="/assets/img/logo.svg" alt=""/>
            </div>
            <div className={ styles.part }>
                <h3>React sneakers</h3>
                <p>Магазин лучших кроссовок</p>
            </div>
        </div>
    );
}

export default Logo;