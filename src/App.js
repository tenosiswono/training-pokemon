import { useState } from "react";
import "./App.css";
import Box from "./components/Box";

const items = [
  {
    id: 1,
    name: "Bulbasaur",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
  },
  {
    id: 2,
    name: "Ivyasaur",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png",
  },
  {
    id: 3,
    name: "Vennusaur",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png",
  },
];
const charmanders = [
  {
    id: 4,
    name: "Charmander",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
  },
  {
    id: 5,
    name: "Charmeleon",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png",
  },
  {
    id: 6,
    name: "Charizard",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png",
  },
];

function App() {
  const [pokemons, setPokemons] = useState(items);
  const [pokemonName, setPokemonName] = useState("");
  const [error, setError] = useState("");

  const changeCharmander = () => {
    setPokemons([...pokemons, ...charmanders]);
  };

  const removeCharmander = () => {
    setPokemons(pokemons.filter((poke) => !charmanders.includes(poke)));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setPokemonName(event.target.elements.pokemonName.value);
  };

  const onChange = (evt) => {
    if (evt.target.value === "pikachu") {
      return setError("Tidak boleh cari pikachu");
    }
    setError("");
    setPokemonName(evt.target.value)
  };

  const filteredPokemons = pokemons.filter((poke) =>
    poke.name.toLowerCase().includes(pokemonName)
  );

  return (
    <div className="App">
      <button onClick={changeCharmander}>Add to charmander</button>
      <button onClick={removeCharmander}>Remove to charmander</button>
      <form onSubmit={onSubmit}>
        <input
          name="pokemonName"
          id="pokemonName"
          value={pokemonName}
          onChange={onChange}
        />
        <div>{error}</div>
        {/* <button type="submit">search</button> */}
      </form>
      <button onClick={() => setPokemonName('saur')}>set to saur</button>
      {pokemonName ? (
        <div>
          <div>Hasil Pencarian {pokemonName}</div>
          <div>
            {filteredPokemons.map((item, index) => (
              <Box key={item.id} size="large">
                <img src={item.img} />
                <div>{item.name}</div>
              </Box>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {pokemons.map((item, index) => (
            <Box key={item.id} size="large">
              <img src={item.img} />
              <div>{item.name}</div>
            </Box>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
