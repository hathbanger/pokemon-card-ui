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
        setPokemon(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
}



let pokeHeight = pokemon ? pokemon.height + "vh" : "10vh"


  return (
    <img style={{position: "absolute", left: props.count + "vw", bottom: 0, height: pokeHeight, zIndex: pokemon ? -pokemon.height : 1 }} src={ pokemon && pokemon.sprites.other["official-artwork"].front_default} />
  );
}
