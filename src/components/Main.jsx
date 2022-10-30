import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useEffect, useState } from "react";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [preUrl, setPreUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url); // name + url(information)
    // console.log(res.data.results)
    //หน้าถัดไป
    setNextUrl(res.data.next);
    //ก่อนหน้านี้
    setPreUrl(res.data.previous);
    getPokemon(res.data.results);

    setLoading(false);
    // console.log(pokeData)
  };

  const getPokemon = (res) => {
    // res = 20 items(name + link)
    res.map(async (item) => {
      // console.log(item.url)
      const result = await axios.get(item.url);
      // console.log(result)
      setPokeData((state) => {
        // 0 = [], 1 = [{info1}], 2 = [{info1}, {info2}], 20 = [{info1}, ..., {info20} ]
        // state = oldDataArray.push(newData)
        state = [...state, result.data];
        // 20 = [...state => {info1}, ..., {info19} + result.data => {info20}]
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    pokeFun();
  },[url]);

  return (
    <div className="container">
      <div className="left-content">
        <Card
          pokemon={pokeData}
          loading={loading}
          infoPokemon={(poke) => setPokeDex(poke)}
        />
        <div className="btn-group">
          {
            //ซ่อนปุ่มไว้ก่อนตอนแรก
            preUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(preUrl);
                }}
              >
                Previous
              </button>
            )
          }
          {
          nextUrl && (
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(nextUrl);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="right-content">
        <Pokeinfo data={pokeDex} />
      </div>
    </div>
  );
};

export default Main;
