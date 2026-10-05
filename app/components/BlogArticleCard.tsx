import type { BlogPost } from "../content/blogPosts";

export function BlogArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className="card blog-card">
      <div className="blog-card-meta">
        <time dateTime={post.datePublished}>{post.displayDate}</time>
        <span aria-hidden="true">&middot;</span>
        <span>{post.author}</span>
      </div>
      <h3 className="h3">{post.title}</h3>
      <p>{post.description}</p>
      <a href={"/blog/" + post.slug + "/"}>Read the guide <span aria-hidden="true">&rarr;</span></a>
    </article>
  );
}
