import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
    
  const [pokemons, setPokemons] = useState([])
  const [page, setPage] = useState(1)
  const [add, setAdd] = useState(20)
  const [showPoke, setShowPoke] = useState(false)
  const [pokeLink, setPokeLink] = useState("")
  const [pokeAbil, setPokeAbil] = useState([])
  const [pokeMove, setPokeMove] = useState([])
  const [pokeForm, setPokeForm] = useState([])
  const [pokeHei, setPokeHei] = useState(1)
  
  
  useEffect(() => {
      axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${add}&limit=20`)
        .then((res) => {
            setPokemons(res.data.results);
        })
      if(add === 200){
          setAdd(20)
      }else{
          setAdd(prevAdd => prevAdd + 20)
      }
  
  },[page])

  useEffect(()=>{
      axios.get(pokeLink)
        .then((res) => {
            setPokeAbil(res.data.abilities)
            setPokeMove(res.data.moves)
            setPokeForm(res.data.forms)
            setPokeHei(res.data.height)
        })
  },[pokeLink])


  function info(event){
    setPokeLink(event.target.value);
    setShowPoke(true)
  }

  function backHandler(){
    setShowPoke(false)
  }   

  if(!showPoke){
      var poke = pokemons.map((data) => {
    return (
      <div key={uuidv4()}>
          <button onClick={info} value={data.url} >{data.name}</button>
      </div>
    )
  })
}

  if(showPoke && typeof pokeAbil !== "undefined" ){
    var abilities = pokeAbil.map(data => {
        return (
            <div key={uuidv4()}>
                <h1 >{data.ability}</h1>
            </div>
        )
    }) 
    var move = pokeMove.map(data => {
        return (
            <div key={uuidv4()}>
                <h1 >{data.moves}</h1>
            </div>
        )
    }) 
    var forms = pokeForm.map(data => {
        return (
            <div key={uuidv4()}>
                <h1 >{data.forms}</h1>
            </div>
        )
    }) 
    
  }
  

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
        {!showPoke && (<div>
            <Pagination count={10} onChange={handleChange}/>
            {poke}
        </div>)}
        {showPoke && (<div>
                {abilities}
                {forms}
                {move}
                {pokeHei}
                <button onClick={backHandler} >Back</button>
            </div>)}
    </div>
  )
};

export default Home;
