import Pokemon from "../models/pokemon.js";
import ActivePokemon from "../models/pokeActive.js";

//private
let _pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

let _sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Clair/heroes'
})

let _state = {
  pokeList: [],
  pokeActive: {},
  pokeDex: []
}

let _subscribers = {
  pokeList: [],
  pokeActive: [],
  pokeDex: []
}

function setState(prop, data) {
  _state[prop] = data
  _subscribers[prop].forEach(fn => fn())
}


//public
export default class PokeService {

  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get PokeList() {
    return _state.pokeList.map(p => new Pokemon(p))
  }
  get PokeActive() {
    return new ActivePokemon(_state.pokeActive)
  }
  get PokeDex() {
    return _state.pokeDex.map(p => new ActivePokemon(p))
  }

  getPokeData() {
    _pokeApi.get()
      .then(res => {
        let data = res.data.results.map(d => new Pokemon(d))
        setState('pokeList', data)
      })
      .catch(err => {
        console.error(err)
      })
  }
  getInfo(name) {
    _pokeApi.get(name)
      .then(res => {
        console.log(res.data)
        let data = new ActivePokemon(res.data)
        setState('pokeActive', data)
      })
  }
  getMyTeamData() {
    _sandbox.get()
      .then(res => {
        let data = res.data.data.map(d => new ActivePokemon(d))
        setState('pokeDex', data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  addToTeam(name) {
    let pkmn = _state.pokeActive
    let myPkmn = _state.pokeDex.find(p => p.name == pkmn.name)
    if (myPkmn) {
      alert('DUPLICATE HERO')
      return
    }
    _sandbox.post('', pkmn)
      .then(res => {
        this.getMyTeamData()
      })
      .catch(err => {
        console.log(err)
      })
  }
  removeFromTeam(name) {
    _sandbox.delete(name)
      .then(res => {
        console.log(res.data)
        this.getMyTeamData()
      })
      .catch(err => {
        console.error(err)
      })
  }

}
