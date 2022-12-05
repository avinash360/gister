import { forwardRef } from 'react'
import styles from '../styles/Search.module.css'

const Search = forwardRef(function Search({ handleClick }, ref) {
    return (
        <div className={styles.searchContainer}>
            <input ref={ref} className={styles.usernameBox} type="text" placeholder="Github Username" />
            <button onClick={handleClick} className={styles.fetchButton}>Fetch!</button>
        </div>
    )
})

export default Search
