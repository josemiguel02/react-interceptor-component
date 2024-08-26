import { useState } from 'react';
import { isAxiosError } from 'axios';
import { Http } from '../Http/Http';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const usePosts = () => {
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  const getPosts = async () => {
    try {
      setIsLoadingPosts(true);

      const data = await Http.get<IPost[]>('/posts');

      setPosts(data.data);
    } catch (error) {
      if (!isAxiosError(error)) return;

      console.log(error);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  return {
    isLoadingPosts,
    posts,
    getPosts,
  };
};
