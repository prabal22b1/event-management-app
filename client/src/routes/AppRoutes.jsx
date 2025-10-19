// AppRoutes.jsx
import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const LandingPage = lazy(() => import('../pages/LandingPage'))
const Home = lazy(() => import('../pages/Home'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'))
const EventDetails = lazy(() => import('../pages/EventDetails'))
const Login = lazy(() => import('../pages/Login'))
const SignUp = lazy(() => import('../pages/SignUp'))
const Unauthorized = lazy(() => import('../pages/Unauthorized'))
const NotFound = lazy(() => import('../pages/NotFound'))

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div className='p-20'>Loading...</div>}>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/home" element={<Home />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/admin" element={<AdminDashboard />} />
					<Route path="/events/:id" element={<EventDetails />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/unauthorized" element={<Unauthorized />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="*" element={<Navigate replace to="/404" />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

