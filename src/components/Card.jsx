
const Card = ({ pokemon, loading, infoPokemon }) => {
  // console.log(pokemon);
  return (
    <div className="container__card">
      { loading ? 
        <h1>Loading...</h1>
       : 
        pokemon.map((item,keys) => {
          return (            
              <div className="card" key={keys} onClick={() => infoPokemon(item)}>
                <h2>{item.id}</h2>
                <img src={item.sprites.front_default} alt="" />
                <h2>{item.name}</h2>
              </div>            
          );
        })      
      }
    </div>
  );
};

export default Card;
