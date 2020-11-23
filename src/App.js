import React from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import CardGrid from './CardGrid'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

function App() {
  const [pokemonArray, setPokemonArray] = React.useState([])

  React.useEffect(() => {
    fetchAllPokemon();
  }, [])

  const fetchAllPokemon = () => {
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
        .then(function (response) {
          setPokemonArray(response.data.results)
        })
        .catch(function (error) {
          console.log(error);
        })
  }

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="lg">
        <Box m={3}>
          {pokemonArray.length > 0 ? <CardGrid pokemonArray={pokemonArray} /> : null}
        </Box>
      </Container>
    </div>
  );
}


export default App;
