import useGists from '../hooks/gists'
import styles from '../styles/Gists.module.css'
import Gist from './Gist'
import { useState, useRef, useEffect, useCallback } from 'react'

const Gists = ({ username }) => {
    const [pageNum, setPageNum] = useState(1)
    const [allGists, setAllGists] = useState([])
    const { gists, isLoading } = useGists(username, pageNum)
    const loadMoreRef = useRef(null)

    const handleObserver = useCallback((entries) => {
        const [target] = entries
        if (target.isIntersecting) {
            setPageNum((prev) => prev + 1)
        }
    }, [])

    useEffect(() => setAllGists([]), [])

    useEffect(() => {
        if (allGists.length) {
            const option = { root: null, rootMargin: '0px', threshold: 1.0 }
            const observer = new IntersectionObserver(handleObserver, option)
            const currentRef = loadMoreRef.current

            if (currentRef) {
                observer.observe(currentRef)
            }
            if (pageNum > 1 && gists.length === 0) {
                observer.unobserve(currentRef)
            }
            return () => observer.unobserve(currentRef)
        }
    }, [handleObserver, pageNum, allGists.length])

    useEffect(() => {
        const uniqueGists = new Set([...allGists, ...gists])
        setAllGists([...uniqueGists])
    }, [gists])

    return (
        <>
            <div className={styles.grid}>
                {allGists.map((gist) => <Gist key={gist.id} gist={gist} />)}
            </div>
            {allGists.length > 0 && <div ref={loadMoreRef}>{isLoading && <span>Loading...</span>}</div>}
        </>
    )
}

export default Gists
