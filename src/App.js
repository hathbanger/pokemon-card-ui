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
    fetchAllPokemon(0);
  }, [])

  const fetchAllPokemon = (offset) => {
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset='+offset )
        .then(function (response) {

          setPokemonArray(tempArray => [...tempArray, ...response.data.results])
          let newOffset = offset + 20
          if(offset <= 1500){
            console.log("fetch again")
            fetchAllPokemon(newOffset)
          }
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
          <CardGrid pokemonArray={pokemonArray} /> 
        </Box>
      </Container>
    </div>
  );
}


export default App;
