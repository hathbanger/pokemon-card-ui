import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  animatedItem: {
    animation: `$enterPokemon 1000ms ${theme.transitions.easing.easeInOut}`,
  },
  animatedItemExiting: {
    animation: `$myEffectExit 1000ms ${theme.transitions.easing.easeInOut}`,
    opacity: 0,
    transform: "translateY(-200%)",
  },
  attackOpponent: {
    animation: `$attackOpponent 500ms ${theme.transitions.easing.easeInOut}`,
  },
  opponentAttack: {
    animation: `$opponentAttack 500ms ${theme.transitions.easing.easeInOut}`,
  },
  receiveDamage: {
    animation: `$receiveDamage 500ms ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes enterPokemon": {
    "0%": {
      opacity: 0,
      transform: "translateY(-200%)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  "@keyframes myEffectExit": {
    "0%": {
      opacity: 1,
      transform: "translateY(0)",
    },
    "100%": {
      opacity: 0,
      transform: "translateY(-200%)",
    },
  },
  "@keyframes attackOpponent": {
    "0%": {
      transform: "translateY(0)",
    },
    "35%": {
      transform: "translateX(50vw) translateY(-30vh)",
    },
    "50%": {
      transform: "translateX(50vw) translateY(-30vh)",
      height: "30vh",
    },
    "85%": {
      transform: "translateX(50vw) translateY(-30vh)",
    },
    "100%": {
      transform: "translateX(0%) translateY(0%)",
    },
  },
  "@keyframes receiveDamageOpponent": {
    "0%": {
      opacity: 1,
      transform: "translateY(0)",
    },
    "35%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.3,
    },
    "85%": {
      opacity: 1,
    },
    "100%": {
      opacity: 1,
    },
  },
  "@keyframes opponentAttack": {
    "0%": {
      transform: "translateX(0vw) translateY(0)",
    },
    "35%": {
      transform: "translateX(-55vw) translateY(20vh)",
    },
    "50%": {
      transform: "translateX(-55vw) translateY(20vh)",
      height: "50vh",
    },
    "85%": {
      transform: "translateX(-55vw) translateY(20vh)",
      height: "50vh",
    },
    "100%": {
      transform: "translateX(0%) translateY(0%)",
    },
  },
}));

export default function PokemonCard(props) {
  const classes = useStyles();
  const [pokemon, setPokemon] = React.useState(props.pokemon);
  const [attacking, setAttacking] = React.useState(false);

  let opponent = {
    position: "absolute",
    left: "70vw",
    bottom: "50vh",
    height: "30vh",
  };

  let homeTeam = {
    position: "absolute",
    left: "10vw",
    bottom: "15vh",
    height: "40vh",
  };

  const attackPokemon = () => {
    let attackDamage = Math.ceil(Math.random() * 50);
    setAttacking(true);
    setPokemon({ ...pokemon, health: pokemon.health - attackDamage });
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAttacking(false);
    }, 550);
    return () => clearTimeout(timer);
  }, [attacking]);
  console.log(pokemon);

  return (
    <>
      <img
        style={props.me ? homeTeam : opponent}
        className={clsx(
          attacking
            ? props.me
              ? classes.attackOpponent
              : classes.receiveDamage
            : !props.me
            ? classes.opponentAttack
            : classes.receiveDamage
        )}
        onClick={attackPokemon}
        src={
          pokemon &&
          pokemon.sprites.versions["generation-v"]["black-white"].animated[
            props.i === 0 ? "front_default" : "back_default"
          ]
        }
      />
      <h2 className={"name"} style={props.me ? homeTeam : opponent}>
        {pokemon && pokemon.name}
        <LinearProgressWithLabel value={pokemon && pokemon.health} />
      </h2>
    </>
  );
}

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
