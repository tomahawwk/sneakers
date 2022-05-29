import styles from './Search.module.sass'

const Search = ({ onChangeInput, setValue, value }) => {
    return (
        <div className={ styles.search }>
          <img src="/assets/img/search.svg" alt=""/>
          {value &&
            <button className={styles.clear} onClick={() => setValue("")}>
              <img src="/assets/img/close.svg" alt=""/>
            </button>
          }
          <input placeholder="Поиск..." onChange={onChangeInput} value={value}/>
        </div>
    );
}

export default Search;