import { useState, type FormEvent } from "react";
import { useAppStore } from "../../store";
import { TextField } from '@consta/uikit/TextField';            
import { Button } from '@consta/uikit/Button';                  
import { Card } from '@consta/uikit/Card'
import { useValidation } from "@/hooks/useValidation";
import styles from "./LoginPage.module.css"


export const LoginPage: React.FC = () => {
  const [curToken, setCurToken] = useState('');
  const {error, isValid, isValidating, validFetch} = useValidation(curToken)
  const login = useAppStore(state => state.login)
  const setToken = useAppStore(state => state.setToken)

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setToken(curToken)
    const success = await validFetch()
    if (success) {
      login()
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
            value={curToken}
            onChange={(value) => setCurToken(value || '')}
            type="password"
            status={error ? 'alert' : undefined}
            caption={error || 'Введите токен для входа'}
            style={{ width: '100%' }}
          />
          <Button
            type="submit"
            label="Войти"
            view="primary"
            style={{ width: '100%' }}
            disabled={!isValid || isValidating}
            loading={isValidating}
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
