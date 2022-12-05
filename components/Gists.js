import useGists from '../hooks/gists'
import styles from '../styles/Gists.module.css'
import Gist from './Gist'
import { useState, useRef, useEffect, useCallback } from 'react'

const Gists = ({ username }) => {
    const [pageNum, setPageNum] = useState(1)
    const [allGists, setAllGists] = useState([])
    const { gists, isLoading } = useGists(username, pageNum)
    const loadMoreRef = useRef(null)
    const currentUserName = useRef(username)
    if (currentUserName.current !== username) {
        setAllGists([])
        setPageNum(1)
        currentUserName.current = username
    }

    const handleObserver = useCallback((entries) => {
        const [target] = entries
        if (target.isIntersecting) {
            setPageNum((prev) => prev + 1)
        }
    }, [])

    useEffect(() => {
        if (allGists.length === 2) {
            const option = { root: null, rootMargin: '0px', threshold: 1.0 }
            const observer = new IntersectionObserver(handleObserver, option)
            const currentRef = loadMoreRef.current

            if (currentRef) {
                observer.observe(currentRef)
            }
            if (pageNum > 1 && gists.length === 0) {
                observer.unobserve(currentRef)
            }
        }
    }, [handleObserver, allGists?.length])

    useEffect(() => {
        const uniqueGists = new Set([...allGists, ...gists])
        setAllGists([...uniqueGists])
    }, [gists])

    return (
        <>
            <div className={styles.grid}>
                {allGists.map((gist) => <Gist key={gist.id} gist={gist} />)}
            </div>
            {allGists.length >= 2 && <div ref={loadMoreRef}>{isLoading && <span>Loading...</span>}</div>}
        </>
    )
}

Gists.whyDidYouRender = true

export default Gists
