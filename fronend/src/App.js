
import './App.css';
import Post from './component/post/Post'
import AdminTable from './component/admin/admin'
import Singlepost from './component/post/singlePost/SinglePost'
import SearchItems from './component/searchitems/SearchItems'
import Login from './component/login/Login'
import Registration from './component/registration/Registration'
import Header from './component/header/Header'
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

function App(props) {
  const history = useHistory();
  const token = localStorage.getItem('refresh_token')
  function push(){
    history.push('/login')
  }
  return (
    <Router>
    <div>
      <Header />
      <switch>
      
     
      <Route exact path="/" component={Post} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/registration" component={Registration} />
      <PrivateRoute path="/admin" component={AdminTable} />
      <Route exact path="/retrive/:id" component={Singlepost} />
      <Route exact path="/search" component={SearchItems} />
     
    
      
      
      </switch>




    </div>
    </Router>
  );
}

export default App;
