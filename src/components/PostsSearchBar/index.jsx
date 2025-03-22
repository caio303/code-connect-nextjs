'use client'

import Link from "next/link";
import styles from "./searchbar.module.css"
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const PostsSearchBar = () => {
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get('q')

    const [query, setQuery] = useState(searchQuery || '')
    return (
        <div className={styles.searchBar}>
            <input 
                type="text" 
                placeholder="Digite o que você procura"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
            />
            <Link href={`/?q=${query}`}>Buscar</Link>
        </div>
    )
}

export default PostsSearchBar;