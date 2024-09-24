
// router
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

// styles
import "animate.css/animate.compat.css"
import './App.css'

// query client
import { QueryClient, QueryClientProvider} from "react-query"

// layouts
import { MainLayout } from './layouts/MainLayout'

// pages
import { ErrorPage } from "./pages/ErrorPage"
import { MainPage } from './pages/MainPage'
import { SignInPage } from './pages/SignInPage'
import { SignUpPage } from './pages/SignUpPage'
import { BasketPage } from './pages/BasketPage'


const queryClient = new QueryClient()

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<MainLayout/>} errorElement={<ErrorPage/>}>
      {/* path / */}
      <Route index element={<MainPage/>}/>

      {/* path /signIn */}
      <Route path="signIn" element={<SignInPage/>}/>

      {/* path /signUp */}
      <Route path="signUp" element={<SignUpPage/>}/>

      {/* path /basket */}
      <Route path="basket" element={<BasketPage/>}/>
      
  </Route>
))

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
      </QueryClientProvider>
    </>
  )
}

export default App
