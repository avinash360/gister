import { useEffect, useState } from 'react'
import Avatar from './Avatar'
import styles from '../styles/Gist.module.css'
import Tag from './Tag'

const Gist = ({ gist }) => {
    const [data, setData] = useState({})

    useEffect(() => {
        fetch(`https://api.github.com/gists/${gist.id}`)
            .then(res => res.json())
            .then(data => {
                const sortedForks = data.forks.sort((objA, objB) => Number(objB.created_at) - Number(objA.created_at))
                    .slice(0, 4)
                    .map(fork => {
                        return {
                            url: fork.url,
                            user: {
                                avatar_url: fork?.user?.avatar_url,
                                name: fork?.user?.name,
                            }
                        }
                    })
                const values = {
                    content: Object.values(data.files)[0].content,
                    forks: sortedForks,
                }
                setData(values)
            })
    }, [])

    return (
        <div className={styles.card}>
            <a href={gist.link}>
                <div className={styles.header}>
                    <h2>{gist.name}</h2>
                    <p>{gist.description}</p>
                    <p>{gist?.tags?.map(tag => <Tag key={tag} name={tag} />)}</p>
                    <p>{data?.forks?.map(fork => <Avatar key={fork.url} alt={fork.user.name} src={fork.user.avatar_url} href={fork.url} />)}</p>
                </div>
                <pre className={styles.content}>{data.content}</pre>
            </a>
        </div>
    )
}

export default Gist
