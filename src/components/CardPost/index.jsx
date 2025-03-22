import Image from "next/image"
import { Avatar } from "../Avatar"
import styles from "./cardpost.module.css"
import Link from "next/link"


const types = {
    small: {
        width: 486,
        height: 133
    },

    big: {
        width: 993,
        height: 300
    }
}

export const CardPost = ({ post, type = 'small' }) => {
    const cardType = types[type] || types.small
    return (
        <Link href={`/posts/${post.slug}`} className={styles.link}>
            <article className={styles.card} style={{ width: cardType.width }}>
                <header className={styles.header}>
                    <figure style={{ height: cardType.height }}> 
                        <Image 
                            src={post.cover} 
                            fill 
                            alt={`Imagem do post: ${post.title}`}
                        />
                    </figure>
                </header>
                <section className={styles.body}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </section>
                <footer className={styles.footer}>
                    <Avatar name={post.author.username} imageSrc={post.author.avatar}/>
                </footer>
            </article>
        </Link>
    )
}