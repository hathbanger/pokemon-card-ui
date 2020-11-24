import React from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import CardGrid from "./CardGrid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import PokemonCard from "./PokemonCard";

function App() {
  const [pokemonArray, setPokemonArray] = React.useState([]);

  React.useEffect(() => {
    // fetchAllPokemon(Math.ceil(Math.random() * 100));
    for (var i = 0; i < 2; i++) {
      fetchPokemon(Math.ceil(Math.random() * 800));
    }
  }, []);

  const fetchAllPokemon = (randomNumber) => {
    setPokemonArray([]);
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=2&offset=" + randomNumber)
      .then(function (response) {
        setPokemonArray(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchPokemonData = (pokemonName) => {
    return axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
  };

  const fetchPokemon = (randomNumber) => {
    if (pokemonArray.length >= 2) {
      setPokemonArray([]);
    }
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1&offset=" + randomNumber)
      .then(function (response) {
        fetchPokemonData(response.data.results[0].name)
          .then((r) => {
            // console.log(props.pokemon.name, response.data);
            // setPokemonArray(response.data.results)
            // setPokemon({ ...response.data, health: 100 });
            let p = { ...response.data.results, ...r.data, health: 100 };
            setPokemonArray((pArray) => [...pArray, p]);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const bgs = [
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d83i5qk-329cf19f-2025-4333-b2b2-7a3400e07d94.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMmZiMjgyMWEtMTQwNi00YTFkLTliMDQtNjY2OGYyNzhlOTQ0XC9kODNpNXFrLTMyOWNmMTlmLTIwMjUtNDMzMy1iMmIyLTdhMzQwMGUwN2Q5NC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.gbcaaHz3bl2NOpGWmk1VXkr9DYL2NB-VRui6XW5IYdA",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d874gjl-59e79083-fec5-4234-8879-2aa8afd7f9f4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMmZiMjgyMWEtMTQwNi00YTFkLTliMDQtNjY2OGYyNzhlOTQ0XC9kODc0Z2psLTU5ZTc5MDgzLWZlYzUtNDIzNC04ODc5LTJhYThhZmQ3ZjlmNC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.UMFdXoCcqHSZ0U3dFWt8351ncIACJOCM9Zrb_tBzx90",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d88wyk1-5825bbcc-0104-4317-b743-065122db1d15.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMmZiMjgyMWEtMTQwNi00YTFkLTliMDQtNjY2OGYyNzhlOTQ0XC9kODh3eWsxLTU4MjViYmNjLTAxMDQtNDMxNy1iNzQzLTA2NTEyMmRiMWQxNS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.WmlHYwGcmpuhFePCOSjIY3V1905aGVFeiXVGtBxL_iM",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d8937eq-0475612f-9da7-482c-b3db-f481329d5a53.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMmZiMjgyMWEtMTQwNi00YTFkLTliMDQtNjY2OGYyNzhlOTQ0XC9kODkzN2VxLTA0NzU2MTJmLTlkYTctNDgyYy1iM2RiLWY0ODEzMjlkNWE1My5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.KznpC3PU2uS0MyT5FtlS2qAneA8xWanUZBNuteEbadk",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d87700j-41e3e246-6716-46bf-820e-fb7b9e17d66d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMmZiMjgyMWEtMTQwNi00YTFkLTliMDQtNjY2OGYyNzhlOTQ0XC9kODc3MDBqLTQxZTNlMjQ2LTY3MTYtNDZiZi04MjBlLWZiN2I5ZTE3ZDY2ZC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.axYat0vO0fOULsCexfyYuA6h6mIeLI6owighvh_aTjY",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d88wvad-5f045d49-989f-4a2e-b95d-170b5cef57fa.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMmZiMjgyMWEtMTQwNi00YTFkLTliMDQtNjY2OGYyNzhlOTQ0XC9kODh3dmFkLTVmMDQ1ZDQ5LTk4OWYtNGEyZS1iOTVkLTE3MGI1Y2VmNTdmYS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.j6Buf_o0glyCxGwjHthg9_kzO7J4SfPXeRK4LZZ0lb4",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d83m6q1-a731bf85-a0ff-47b4-9c3b-6627f067d056.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMmZiMjgyMWEtMTQwNi00YTFkLTliMDQtNjY2OGYyNzhlOTQ0XC9kODNtNnExLWE3MzFiZjg1LWEwZmYtNDdiNC05YzNiLTY2MjdmMDY3ZDA1Ni5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.gY5bF4JEdtoDvygm7YRJ5ZlN2CDCS3ReVAnnc5F7xtM",
  ];

  const bgSelectInt = Math.ceil(Math.random() * bgs.length - 1);

  const statsContainer = {
    position: "absolute",
    border: "solid 2px black",
    margin: 60,
    padding: 20,
    fontSize: "24px",
    minWidth: "400px",
    minHeight: "100px",
    fontWeight: 700,
    background: "white",
  };

  return (
    <div className="App">
      <CssBaseline />
      <Container
        maxWidth="lg"
        style={{
          height: "100vh",
          width: "100vw",
          maxWidth: "100vw",
          backgroundImage: "url('" + bgs[bgSelectInt] + "')",
          backgroundPosition: 0,
          backgroundSize: "cover",
          padding: 0,
          margin: 0,
          overflow: "hidden",
        }}
      >
        <Box m={3}>
          {pokemonArray.length === 2 && (
            <>
              <div>
                <div
                  style={{
                    ...statsContainer,
                    borderRadius: "5px",
                    bottom: 0,
                    right: 0,

                    boxShadow: "inset -12px -8px 40px #464646",
                  }}
                >
                  <DataHolder me={0} pokemon={pokemonArray[0]} />
                  <div
                    style={{ position: "absolute", width: "90%", bottom: 0 }}
                  >
                    <LinearProgressWithLabel value={pokemonArray[0].health} />
                  </div>
                </div>
                <PokemonCard
                  attacking={true}
                  me={0}
                  pokemon={pokemonArray[0]}
                  i={0}
                />
              </div>

              <div>
                <div
                  style={{
                    ...statsContainer,
                    borderRadius: "5px",
                    top: 0,
                    left: 0,

                    boxShadow: "inset -12px -8px 40px #464646",
                  }}
                >
                  <DataHolder me={1} pokemon={pokemonArray[1]} />
                  <div
                    style={{ position: "absolute", width: "90%", bottom: 0 }}
                  >
                    <LinearProgressWithLabel value={pokemonArray[1].health} />
                  </div>
                </div>
                <PokemonCard
                  me={1}
                  attacking={true}
                  pokemon={pokemonArray[1]}
                  i={1}
                />
              </div>
            </>
          )}
        </Box>
      </Container>
    </div>
  );
}

function DataHolder(props) {
  let style = {
    position: "absolute",
    padding: "10px",
    top: 10,
    background: "white",
    borderRadius: "5px",
    margin: "auto",
    fontWeight: 800,
  };
  if (!props.me) {
    style.right = 10;
  } else {
    style.left = 10;
  }
  return <Button style={style}>{props.pokemon.name}</Button>;
}

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress
          style={{ height: 10 }}
          variant="determinate"
          {...props}
        />
      </Box>
      <Box minWidth={60}>
        <Typography variant="body1" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default App;
