import { useEffect, useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { Card } from '@consta/uikit/Card';
import { apiGorest } from '@/api/apiGorest';
import type { Post, Comment } from '@/types';
import styles from './PostCard.module.css';

interface PostCardProps {
  postId: number;
  onBack: () => void;
}

export const PostCard = ({ postId, onBack }: PostCardProps) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          apiGorest.getPost(postId),
          apiGorest.getComments(postId)
        ]);
        setPost(postRes.data);
        setComments(commentsRes.data);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostAndComments();
  }, [postId]);

  if (loading) return <div className={styles.container}>
    <div className={styles.loading}>Загрузка...</div>
  </div>;
  if (!post) return <div className={styles.container}>
    <div className={styles.error}>Пост не найден</div>
  </div>;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.backButton}>
          <Button label="← Назад к списку" onClick={onBack} view="ghost" style={{color: "white"}}/>
        </div>
        
        <Card className={styles.postCard}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.body}>{post.body}</p>
        </Card>
        
        <h2 className={styles.commentsTitle}>
          Комментарии ({comments.length})
        </h2>
        
        <div className={styles.comments}>
          {comments.map(comment => (
            <Card key={comment.id} className={styles.comment}>
              <h3 className={styles.commentName}>{comment.name}</h3>
              <p className={styles.commentEmail}>{comment.email}</p>
              <p className={styles.commentBody}>{comment.body}</p>
            </Card>
          ))}
          
          {comments.length === 0 && (
            <div className={styles.noComments}>
              Нет комментариев
            </div>
          )}
        </div>
      </div>
    </div>
  );
};