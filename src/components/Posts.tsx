import { usePosts } from '../useCases/usePosts';

export const Posts = () => {
  const { isLoadingPosts, posts, getPosts } = usePosts();

  return (
    <div>
      <h1>Post</h1>

      <button onClick={getPosts}>Fetch posts</button>

      {isLoadingPosts ? (
        <span>Cargando...</span>
      ) : (
        <ul>
          {posts.map(p => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
