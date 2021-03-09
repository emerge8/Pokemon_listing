import { useState, useEffect } from "react";
import { api } from "./services";

function App() {

  const [pokemon, setPokemon] = useState([]);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
    api
      .get("pokemon")
      .then((res) => {
        setPokemon(res.data.results);
        setNext(res.data.next);
        setPrev(res.data.previous);

      })
      .catch((err) => console.warn(err));
  }, []);

  const seePrev = (prev) => {
    api.get(prev).then((res) => {
      setPokemon(res.data.results);
      setNext(res.data.next);
      setPrev(res.data.previous);
    });

  };

  const seeNext = (next) => {
    api.get(next).then((res) => {
      setPokemon(res.data.results);
      setNext(res.data.next);
      setPrev(res.data.previous);
    });

  };

  const buildImgUrl = (url) => {
    const id = url.split("/");
    const idx = id.length - 2;
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id[idx]}.png`;

    return imgUrl;
  };

  return (
    <div className="container">
      <div className="pokemon-container">
        {

          pokemon.map(pokemon => (
            <div key={pokemon.name} className="pokemon">
              <img src={buildImgUrl(pokemon.url)} alt={pokemon.name} />

              <p>{pokemon.name}</p>
            </div>
          ))}
      </div>
      <div className="buttons-container">

        <button
          onClick={() => seePrev(prev)}
          disabled={prev == null ? true : false}
          className={prev == null ? "btn-disabled" : ""}

        >Ver anteriores
        </button>
        <button
          onClick={() => seeNext(next)}
          disabled={next == null ? true : false}
          className={next == null ? "btn-disabled" : ""}
        >Ver proximos</button>
      </div>
    </div>
  );

};
export default App;
