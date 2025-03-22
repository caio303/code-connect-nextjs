
import { CardPost } from "@/components/CardPost";
import logger from '@/logger'
import PostsSearchBar from "@/components/PostsSearchBar";
import styles from './page.module.css'
import Link from "next/link";

// Esse componente ta sendo renderizado no servidor
// por conta do 'async' no componente, a função faz o fetch dos posts server side

const postsPerPage = 6;

const getAllPosts = async (page, postTitleQuery) => {
  const isSearch = !!(postTitleQuery && postTitleQuery !== '')

  const searchPage = page ? page : 1
  const apiUrl = `http://localhost:3001/posts?_page=${searchPage}&_per_page=${postsPerPage}${isSearch ? `&title_like=${postTitleQuery}` : ''}`

  const response = await fetch(apiUrl)
  if (!response.ok) {
    logger.error('Falha ao buscar posts...')
    return {data: []}
  }

  const json = await response.json()
  if (isSearch) {
    return { data: json }
  }

  // paginação parou de funcionar, mas quando implementar o back eu ajeito
  return { data: json }
}

// Para usar o searchParams no client side tem o hook useSearchParams do 'next/navigation'
export default async function Home({ searchParams }) {
  const { page, q } = await searchParams

  const { data: posts, prev, next } = await getAllPosts(page, q)

  console.log(posts, prev, next)

  return (
    <main className={styles.grid}>
      <PostsSearchBar />
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
