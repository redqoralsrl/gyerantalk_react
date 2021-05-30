import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Main from './components/MainPage/Main';
import Auth from './api/auth/auth';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route path="/main/:category/:search?/:select?/:process?" component={Auth(Main, true)} />
          {/* <Route exact path="/payready" component={Auth(PayReady, true)}></Route> */}
          {/* <Route path="/payresult" component={Auth(PayResult, true)} /> */}
        </Switch>
      </div>
    </Router>
  )
}

export default App;
