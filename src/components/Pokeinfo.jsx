import React from "react";

export default function Pokeinfo({ data }) {
  console.log(data);
  return (
    <div>
      {!data ? 
        ""
       : (
        <div>
          <h1>{data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt=""
          />
          <div className="abilities">
            {data.abilities.map((poke, index) => (
                <div key={index}>
                  <div className="group">
                    <h2>{poke.ability.name}</h2>
                  </div>
                </div>
            ))}
          </div>
          <div className="base-stat">
            {data.stats.map((poke, keys) => {
              return (
                <div key={keys}>
                  <h3>{poke.stat.name} : {poke.base_stat}</h3>                 
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
