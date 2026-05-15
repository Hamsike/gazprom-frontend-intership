import { useEffect, useState } from "react"

interface useValidationType {
  isValid: boolean,
  error: string
}

export const useValidation = (token: string): useValidationType => {
  const [isValid, setIsValid] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (token.trim() === '') {
      setIsValid(false)
      setError("Токен не может быть пустым")
      return
    }
    setIsValid(true)
    setError("")
  }, [token])

  return {isValid, error}
}