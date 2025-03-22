import logo from './logo.png'
import styles from './aside.module.css'
import Image from 'next/image'
import Link from 'next/link'

export const Aside = () => (
    <Link className={styles.link} href="/">
        <aside className={styles.aside} >
            <Image src={logo} alt="Logo Code Connect"/>
        </aside>
    </Link>
)