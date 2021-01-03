import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom'
import Link from '@material-ui/core/Link';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {UserRegistration} from '../../store/actions/Auth'

function Registration(props) {

    const history = useHistory();
    let error=null
    const [FormData, setInitalFormData] = useState({
            email:'',
            user_name:'',
            password:''
    })

    const handleChange =  (e) =>{
        setInitalFormData(prevdata => ({
            ...prevdata,
            [e.target.name]:e.target.value.trim()
        }))

    }
    const handleSubmit =  (e) =>{
        const {email, user_name, password}=FormData
        props.onRegistration(email,user_name,password)
        goToLogin()

    }

    async function goToLogin (){
        await new Promise((resolve) => setTimeout(() => { 
            const refresh_token = localStorage.getItem('refresh_token') 
            if(props.success){
                setInitalFormData({
                    email:'',
                    user_name:'',
                    password:''
                })
                alert("You have successfully complete you're registration please try to login")
                history.push('/login')
            }else if(props.error){
                error='Invalid username or password, or maybe this email is allready exists'
            }
          
        }, 2000))

    }


  return (
      <Container maxWidth='sm' style={{marginTop:'30px'}}>
    <React.Fragment>
        {error && (<h2>{error}</h2>)}
      <Typography variant="h6" gutterBottom>
        Registration
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={8} sm={10}>
          <TextField
          onChange={handleChange}
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="given-email"
          />
        </Grid>
        
        <Grid item xs={8} sm={10}>
          <TextField
          onChange={handleChange}
            required
            id="usename"
            name="user_name"
            label="User_name"
            fullWidth
            autoComplete="user name"
          />
        </Grid>
        <Grid item xs={8} sm={10}>
          <TextField
          onChange={handleChange}
            id="password"
            name="password"
            label="Password"
            fullWidth
            autoComplete="Password"
          />
        </Grid> 
        <Button onClick={handleSubmit} type="submit" style={{marginTop:'10px'}} variant="contained" color="primary">
        Registartion
      </Button>
      <Grid container justify="flex-end">
            <Grid item>
            <NavLink to="/login" variant="body2">
                Already have a account ? go to login
              </NavLink>
            </Grid>
        </Grid>
       
      </Grid>
    </React.Fragment>
    </Container>
  );
}

const mapStateToProps = state =>({
    success:state.auth.registration,
    error:state.auth.error
})

const mapStateToDispatch = dispatch =>({
    onRegistration : (email,user_name,password) => dispatch(UserRegistration(email,user_name,password))
    
})




export default connect(mapStateToProps, mapStateToDispatch)(Registration)