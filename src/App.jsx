import { ContextProvider } from './providers/contextProvider'
import Main from './pages/Main'
import Header from './components/Header'
import './App.css'

function App() {
  return (
    <>
      <ContextProvider>
        <Header />
        <Main />
      </ContextProvider>
    </>
  )
}

export default App
