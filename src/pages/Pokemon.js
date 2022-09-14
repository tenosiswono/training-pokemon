import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Box from "../components/Box";
import useLocalstorage from "../hooks/useLocalstorage";

export default function Pokemon() {
  const params = useParams();
  const [pokemons, setPokemons] = useLocalstorage("pokemons", []);
  const findPokemon = pokemons.find((poke) => poke.name === params.name);
  if (!findPokemon) {
    return <Navigate to="/404" />;
  }
  const id = findPokemon.url.split("/")[6];
  return (
    <Box size="large">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        alt={findPokemon.name}
        height="200px"
        width="200px"
      />
      <Link to={`/pokemon/${findPokemon.name}`}>
        <div>Name: {findPokemon.name}</div>
      </Link>
    </Box>
  );
}
