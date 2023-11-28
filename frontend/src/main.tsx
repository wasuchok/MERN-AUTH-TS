
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import store from './store.ts'
import { Provider } from 'react-redux'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './pages/HomePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App /> }>
      <Route index={true} path="/" element={ <HomePage /> } />
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/register" element={ <RegisterPage /> } />

      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={ router } />
  </Provider>,
)
