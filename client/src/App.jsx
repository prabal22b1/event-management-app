import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <div className='p-10 min-h-screen'> 
        <AppRoutes />
      </div>
    </AuthProvider>
  )
}

export default App
