import React, { useCallback, useEffect, useReducer } from "react";
import Box from "../components/Box";
import useLocalstorage from "../hooks/useLocalstorage";
import axios from "axios";
import {
  initialStatePokemon,
  pokemonReducer,
  POKEMON_ACTIONS,
} from "../hooks/pokemonReducer";
import { Link } from "react-router-dom";

export default function Home() {
  const [pokemons, setPokemons] = useLocalstorage("pokemons", []);
  const [state, dispatch] = useReducer(
    pokemonReducer,
    JSON.parse(window.localStorage.getItem("pokemon-caughts")) ||
      initialStatePokemon
  );

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
      .then((response) => {
        setPokemons(response.data.results);
      });
  }, [setPokemons]);

  const updateLocalStoragePokemonCaught = useCallback(
    () => window.localStorage.setItem("pokemon-caughts", JSON.stringify(state)),
    [state]
  );

  useEffect(() => {
    updateLocalStoragePokemonCaught();
  }, [updateLocalStoragePokemonCaught]);

  return (
    <div>
      <div>Caughts pokemon:</div>
      {state.pokemonCaughts.map((item, index) => {
        const id = item.url.split("/")[6];
        return (
          <Box size="large">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={item.name}
              height="200px"
              width="200px"
            />
            <div>Name: {item.name}</div>
            <button
              onClick={() =>
                dispatch({
                  type: POKEMON_ACTIONS.RELEASE_POKEMON,
                  value: item,
                })
              }
            >
              Release :(
            </button>
          </Box>
        );
      })}
      <div>List pokemon:</div>
      {pokemons.map((item, index) => {
        const id = item.url.split("/")[6];
        return (
          <Box size="large">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={item.name}
              height="200px"
              width="200px"
            />
            <Link to={`/pokemon/${item.name}`}>
              <div>Name: {item.name}</div>
            </Link>
            <button
              onClick={() =>
                dispatch({
                  type: POKEMON_ACTIONS.CATCH_POKEMON,
                  value: item,
                })
              }
            >
              Catch!
            </button>
          </Box>
        );
      })}
    </div>
  );
}
