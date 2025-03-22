
import { CardPost } from "@/components/CardPost";
import logger from '@/logger'

import styles from './page.module.css'
import Link from "next/link";

// Esse componente ta sendo renderizado no servidor
// por conta do 'async' no componente, a função faz o fetch dos posts server side

const getAllPosts = async (page) => {
  const response = await fetch(`http://localhost:3001/posts?_page=${page}&_per_page=6`)
  if (!response.ok) {
    logger.error('Falha ao buscar posts...')
    return {data: []}
  }

  return response.json()
}

// Para usar o searchParams no client side tem o hook useSearchParams do 'next/navigation'
export default async function Home({ searchParams }) {
  const searchedPage = searchParams?.page || 1
  const { data: posts, prev, next } = await getAllPosts(searchedPage)
  return (
    <main className={styles.grid}>
      {posts.map(post => (
        <CardPost key={post.id} post={post} />
      ))}
      <div className={styles.pagination}>
        {prev && <Link href={`/?page=${prev}`}>Página Anterior</Link>}
        {next && <Link href={`/?page=${next}`}>Próxima Página</Link>}
      </div>
    </main>
  );
}
