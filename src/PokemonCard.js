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
import {green, red, blue, yellow, brown, purple, grey, orange, blueGrey, pink} from '@material-ui/core/colors';

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
  const [flavorText, setFlavorText] = React.useState("")


  const typeObj = {
    "fire": red[200], 
    "water": blue[300], 
    "grass": green[200], 
    "electric": yellow[200], 
    "normal": brown[100], 
    "fighting": red[100], 
    "poison": purple[200], 
    "ground": brown[200], 
    "rock": "#e0e0e0",
    "bug": orange[100],
    "psychic": purple[400],
    "ghost": blueGrey[100],
    "fairy": pink[100],
    "ice": blue[200],
    "dragon": orange[300],
    "steel": blueGrey[400],
    "flying": blue[100],
  }


  React.useEffect(() => {
    fetchPokemon();
  }, [])

  const fetchPokemon = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon/'+props.pokemon.name)
      .then(function (response) {
        console.log(props.pokemon.name, response.data)
        // setPokemonArray(response.data.results)
          setPokemon(response.data)
          fetchSpecies(response.data.species.url)
      })
      .catch(function (error) {
        console.log(error);
      })
}
    const fetchSpecies = (speciesURL) => {
        axios.get( speciesURL)
            .then(function (response) {
                setFlavorText(response.data.flavor_text_entries[0].flavor_text)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    
    React.useEffect(() => {
      if(pokemon){
        console.log("type", pokemon.types[0].type.name)
      }
    }, [pokemon])

  return (
    <Card className={classes.root} style={{background: pokemon ? typeObj[pokemon.types[0].type.name] : "grey"}}>
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
          <Typography variant="h6" color="textSecondary" component="p">
            {pokemon && pokemon.weight} lbs.
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" component="p">
            {pokemon && pokemon.height} ft.
          </Typography>
          <Typography variant="subtitle2" color="textPrimary" component="p">
            {pokemon && pokemon.types[0].type.name}
          </Typography>
          <Typography  variant="subtitle2" color="textSecondary" component="p">
            {flavorText}
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
  );
}
