import logger from "@/logger";
import { remark } from "remark";
import html from "remark-html"

import styles from "./page.module.css"
import { CardPost } from "@/components/CardPost";

const getPostBySlug = async (slug) => {
  const response = await fetch(`http://localhost:3001/posts?slug=${slug}`);
  if (!response || !response.ok) {
    logger.error(`Erro ao buscar pelo slug=${slug}`);
    return {};
  }

  const data = await response.json();
  logger.debug(data);
  if (data.length < 1) {
    return {};
  }

  const post = data[0];

  if (post.markdown) {
    const processedContent = await remark().use(html).process(post.markdown);
    const contentHtml = processedContent.toString();

    post.markdown = contentHtml;
  }

  return post;
};

const PagePost = async ({ params }) => {
  const { postSlug } = await params;
  const post = await getPostBySlug(postSlug);

  return (
    <>
      <section className={styles.codigo}>
        <CardPost post={post} type="big"/>
        <h3 className={styles.subtitle}>Código</h3>
        <div dangerouslySetInnerHTML={{ __html: post.markdown}}></div>
      </section>
    </>
  );
};

export default PagePost;
