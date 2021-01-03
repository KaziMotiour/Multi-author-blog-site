import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'

const useStyles = makeStyles({
  root: {
    maxWidth: 229,
    minHeight:300,
    maxHeight:300,
    
  },
  media: {
    height: 120,
  },
});

function SearchItems(props) {  
  const classes = useStyles();
  const search = 'search'
  const [appState, setAppState] = useState({
      post: []
  })

  useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/search/${window.location.search}`)
      .then((res)=>{
          setAppState({post:res.data})
         
      })
      
  }, [setAppState])

  console.log(appState.post, 'search')

  let posts=null

    if(appState.post){
        posts =appState.post.map((data)=>(
       
            <div key={data.id} style={{float:'left', marginRight:'10px', marginBottom:'10px'}}>
              <Link 
               component={NavLink}
               underline="none" 
               to={'/retrive/'+data.id} 
              
              >
            <Card className={classes.root}>
            <CardActionArea>
                {data.image ? 
                <CardMedia
                className={classes.media}
                image={data.image}
              />
            
                : 
           <CardMedia
             className={classes.media}
             image="https://post.greatist.com/wp-content/uploads/sites/3/2020/02/325466_1100-1100x628.jpg"
             title="Contemplative Reptile"
           />
                }
           <CardContent>
             <Typography gutterBottom variant="h6" component="h2">
               {data.title.substr(0,20)}...
             </Typography>
             <Typography variant="body2" color="textSecondary" component="p">
               {data.content.substr(0,60)}..
             </Typography>
           </CardContent>
         </CardActionArea>
         <CardActions>
           <Button size="small" color="primary">
             Learn More
           </Button>
         </CardActions>
       </Card>
       </Link>
       </div>
       
    )
 )

    }
    
      

  return (
     <div>
         <Container maxWidth='s'>
            {posts}
         </Container>
         
     </div>

  );
}
export default SearchItems;