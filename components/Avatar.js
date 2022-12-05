import Image from "next/image"
import styles from '../styles/Avatar.module.css'

const Avatar = ({ alt, src, href }) => {
    return (
        <span className={styles.container}>
            <a target="_blank" rel="noreferrer" href={href}>
                <Image width={24} height={24} alt={alt} src={src} className={styles.image} />
            </a>
        </span>
    )
}

export default Avatar
