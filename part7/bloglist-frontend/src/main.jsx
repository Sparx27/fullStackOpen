import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'
import { Provider } from 'react-redux'
import store from './store/store'
import { UserListContextProvider } from './context/UserListContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <UserListContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserListContextProvider>
  </Provider>
)