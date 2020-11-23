import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function PokemonCard(props) {
  const classes = useStyles();
  const [pokemon, setPokemon] = React.useState(null)

  React.useEffect(() => {
    fetchPokemon();
  }, [])

  const fetchPokemon = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon/'+props.pokemon.name)
      .then(function (response) {
        console.log(props.pokemon.name, response.data)
        // setPokemonArray(response.data.results)
        setPokemon(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
}

  console.log("pokemon card props", props)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={pokemon && pokemon.sprites.other["official-artwork"].front_default}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.pokemon.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
