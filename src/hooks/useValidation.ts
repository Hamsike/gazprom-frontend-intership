import { apiGorest } from "@/api/apiGorest"
import { useEffect, useState } from "react"

interface useValidationType {
  isValid: boolean
  error: string
  isValidating: boolean,
  validFetch: () => Promise<boolean>
}

export const useValidation = (token: string): useValidationType => {
  const [isValid, setIsValid] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [isValidating, setIsValidating] = useState(false)

  const validFetch = async () => {
    try {
      setIsValidating(true)
      await apiGorest.getUsers(1, 1)
      setIsValid(true)
      setError('')
      setIsValidating(false)
      return true
    }
    catch (e) {
      setError("Некорректный токен")
      setIsValid(false)
      setIsValidating(false)
      return false
    }
  }

  useEffect(() => {
    if (token.trim() === '') {
      setIsValid(false)
      setError("Токен не может быть пустым")
      return
    }
    setIsValid(true)
    setError("")
  }, [token])

  return {isValid, error, isValidating, validFetch}
}