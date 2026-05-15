import { useEffect, useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { Card } from '@consta/uikit/Card'
import { apiGorest } from '@/api/apiGorest';
import type { User } from '@/types';
import styles from './UserCard.module.css';

interface UserCardProps {
  userId: number;
  onBack: () => void;
}

export const UserCard = ({ userId, onBack }: UserCardProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(loading)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiGorest.getUser(userId);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) return <div className={styles.container}>
    <div className={styles.loading}>Загрузка...</div>
  </div>;
  if (!user) return <div className={styles.container}>
    <div className={styles.error}>Пользователь не найден</div>
  </div>;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.backButton}>
          <Button label="← Назад к списку" onClick={onBack} view="ghost" style={{color: "white"}}/>
        </div>
        
        <Card className={styles.card}>
          <h1 className={styles.title}>{user.name}</h1>
          <div className={styles.info}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Пол:</strong> {user.gender === 'male' ? 'Мужской' : user.gender === 'female' ? 'Женский' : 'Не указан'}</p>
            <p><strong>Статус:</strong> {user.status === 'active' ? 'Активен' : 'Неактивен'}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};