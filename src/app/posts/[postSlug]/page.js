import logger from "@/logger"

const getPostBySlug = async (slug) => {
    const response = await fetch(`http://localhost:3001/posts?slug=${slug}`)
    if (!response || !response.ok) {
        logger.error(`Erro ao buscar pelo slug=${slug}`)
        return {}
    }

    const data = await response.json()
    logger.debug(data)
    if (data.length < 1) {
        return {}
    }

    return data[0];
}

const PagePost = async ({ params }) => {
    const { postSlug } = await params
    const post = await getPostBySlug(postSlug)

    return (
        <h1 style={{color:'white'}}>{post.title}</h1>
    )
}

export default PagePost;