import React, {useState} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import {makeStyles} from '@material-ui/core/styles'
import Link from '@material-ui/core/Link';
import {NavLink} from 'react-router-dom'
import Button from '@material-ui/core/Button';

import SearchBar from "material-ui-search-bar";
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {auth_logout} from '../../store/actions/Auth'
import '../css.css'



const userStyle = makeStyles((theme) =>({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
}))

 function Header(props) {
    
    const classes = userStyle()
    const history = useHistory()
    const [data, setData] = useState({search:''})


    const handleLogout = () =>{
        props.onLogout()
        history.push('/login')
       
    } 
    const handleSearch = () =>{
        
        history.push({
            search:'?search='+data.search,
            pathname:'/search/'
        })
        window.location.reload()

    }
    const token = localStorage.getItem('refresh_token')
    

    return (
        <React.Fragment>
            <CssBaseline />

            <AppBar
                position="static"
                color="white"
                elevation={0}
                className={classes.appBar}
            >     
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                
                <Link component={NavLink}
                        color="textprimary"
                        to="/"
                        underline="none"
    
                        >
                   BlogMeUp
                   </Link>
                
                </Typography>
                {token !==null && 
                <SearchBar
                className="nav"
                onChange={(newValue) => setData({ search: newValue }) } 
                onRequestSearch={() => handleSearch(data.search)} 
              />  } 
                {token ==null && 
                <nav className='nav'>
                        <Link 
                        component={NavLink}
                        color="textprimary"
                        to="/registration"
                        underline="none"
                        >
                            Registration
                        </Link>
                 
                </nav>}
                {token ==null &&
                <nav className='nav1'>
                    <Button variant="outlined" color="primary">
                    <Link 
                    component={NavLink}
                    color="textprimary"
                    to="/login"
                    underline="none"
                    >
                    Login
                    </Link>
                    </Button>     
                </nav>}
                
                {token !==null &&
                <nav className='nav1'>
                     
                     <Button variant="outlined" color="primary">
                     <Link 
                     component={NavLink}
                     color="textprimary"
                     to="/admin"
                     >
                     Admin
                     </Link> 
                    </Button>
                    </nav>}
                    {token !==null &&
                    <nav className='nav1'>
                <Button onClick={handleLogout} variant="outlined" color="primary">
        
                    Logout
                    
                </Button>
    
                </nav>}
            </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

const mapStateToProps = (state) =>({
    refresh_token : state.auth.refresh_token


})

const mapStateToDispatch = dispatch =>({
    onLogout : () =>dispatch(auth_logout())
})


export default connect(mapStateToProps, mapStateToDispatch) (Header);