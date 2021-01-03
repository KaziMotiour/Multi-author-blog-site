import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import {NavLink, useHistory} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux'
import {UserLogin} from '../../store/actions/Auth'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {

    let successFullRegistration=null
    const classes = useStyles();
    const history = useHistory();
    const [FormData, setFormData] = useState({
            email:'',
            password:''
    })

    const handleChange =  (e) =>{
        setFormData(prevdata => ({
            ...prevdata,
            [e.target.name]:e.target.value.trim()
        }))
    }

    async function goToHome (){
        await new Promise((resolve) => setTimeout(() => { 
            const refresh_token = localStorage.getItem('refresh_token') 
            if(refresh_token){
                history.push('/')
            }
          
        }, 1000))

    }

    const handleSubmit = (e) => {
        e.preventDefault()
       
        props.onLogin(FormData.email, FormData.password)
        goToHome()
        
        
    }
 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
         
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="Email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
              onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to="/registration" variant="body2">
                Create an account
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
     
    </Container>
  );
}

const mapStateToProps = state =>({
    access_token:state.auth.access_token,
    refresh_token:state.auth.refresh_token,
    
})

const mapStateToDispatch = dispatch =>({
    onLogin : (email, password) => dispatch(UserLogin(email, password)) 
})


export default connect(mapStateToProps, mapStateToDispatch)(Login)