import { createContext, useContext, useState, useEffect,type ReactNode } from 'react'
import type { User } from '../types/auth'
import { getMe } from '../services/authservice'

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  logoutUser: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await getMe()
          setUser(userData)
        } catch {
          localStorage.removeItem('token')
          setToken(null)
        }
      }
      setLoading(false)
    }
    loadUser()
  }, [token])

  const logoutUser = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, setUser, setToken, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}