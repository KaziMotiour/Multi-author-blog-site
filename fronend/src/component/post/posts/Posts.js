import React from 'react';
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

function Posts(props) {  
  const classes = useStyles();
  const post = props.post


  let posts=(
    <div key={post.id} style={{float:'left', marginRight:'10px', marginBottom:'10px'}}>
    <Link 
     component={NavLink}
     underline="none" 
     to={'/retrive/'+post.id} 
    
    >
  <Card className={classes.root}>
  <CardActionArea>
{post.image? <CardMedia
   className={classes.media}
   image={post.image}
   title="Contemplative Reptile"
 />:<CardMedia
 className={classes.media}
 image="https://post.greatist.com/wp-content/uploads/sites/3/2020/02/325466_1100-1100x628.jpg"
 title="Contemplative Reptile"
/> }
 
 <CardContent>
   <Typography gutterBottom variant="h6" component="h2">
     {post.title.substr(0,20)}...
   </Typography>
   <Typography variant="body2" color="textSecondary" component="p">
     {post.content.substr(0,60)}..
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

  return (
     <div>
         <Container maxWidth='s'>
            {posts}
         </Container>
         
     </div>

  );
}
export default Posts;