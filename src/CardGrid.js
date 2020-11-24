import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PokemonCard from './PokemonCard'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CardGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {props.pokemonArray.map((p, i) => {
            return (
            <Grid item key={i} xs={3}>
                <PokemonCard  pokemon={p} />
            </Grid>
            )
        })}
      </Grid>
    </div>
  );
}