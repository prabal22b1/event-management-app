import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
  )
}

export default App
