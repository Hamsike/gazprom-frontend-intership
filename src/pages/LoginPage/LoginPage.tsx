import { useState } from "react";
import { useAppStore } from "../../store";
import { TextField } from '@consta/uikit/TextField';            // ← Поле ввода
import { Button } from '@consta/uikit/Button';                  // ← Кнопка
import { Card } from '@consta/uikit/Card'
import { useValidation } from "@/hooks/useValidation";
import styles from "./LoginPage.module.css"


export const LoginPage: React.FC = () => {
  const [token, setToken] = useState('');
  const {error, isValid} = useValidation(token)
  const login = useAppStore(state => state.login)

  const handleSubmit = () => {
    if (isValid) {
      login(token)
    }
  }

   return (
    <div className={styles.container}>
      <Card className={styles.card} verticalSpace="xl" horizontalSpace="xl">
        <h1 className={styles.title}>Добро пожаловать</h1>
        <p className={styles.subtitle}>Введите Access Token</p>
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Access Token"
            value={token}
            onChange={(value) => setToken(value || '')}
            type="password"
            status={error ? 'alert' : undefined}
            caption={error || 'Токен не может быть пустым'}
            style={{ width: '100%' }}
          />
          <Button
            type="submit"
            label="Войти"
            view="primary"
            style={{ width: '100%' }}
            disabled={!isValid}
          />
        </form>
        
        <div className={styles.hint}>
          <a 
            href="https://gorest.co.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.link}
          >
            Получить токен на gorest.co.in
          </a>
        </div>
      </Card>
    </div>
  );
};
