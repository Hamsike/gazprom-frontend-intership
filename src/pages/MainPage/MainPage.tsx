import { useAppStore } from "@/store";
import { UsersTable } from "@/components/UsersTable/UsersTable";
import { PostsTable } from "@/components/PostsTable/PostsTable";
import { UserCard } from "@/pages/UserCard/UserCard";
import { PostCard } from "@/pages/PostCard/PostCard";
import styles from './MainPage.module.css';

export const MainPage: React.FC = () => {
  const { typeView, id, setView } = useAppStore(state => state);

  if (typeView === 'user' && id) {
    return <UserCard userId={id} onBack={() => setView('users', null)} />;
  }

  if (typeView === 'post' && id) {
    return <PostCard postId={id} onBack={() => setView('posts', null)} />;
  }

  const isUsers = typeView === 'users';
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.tabs}>
          <button
            className={isUsers ? styles.active : ''}
            onClick={() => setView('users', null)}
          >
            Пользователи
          </button>
          <button
            className={!isUsers ? styles.active : ''}
            onClick={() => setView('posts', null)}
          >
            Посты
          </button>
        </div>
        
        {isUsers ? (
          <UsersTable onUserClick={(userId: number) => setView('user', userId)} />
        ) : (
          <PostsTable onPostClick={(postId: number) => setView('post', postId)} />
        )}
      </div>
    </div>
  );
};
