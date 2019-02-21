import PokeService from "./pokeService.js";

//private
let _ps = new PokeService()

function drawAllPkm() {
  let template = ''
  let pokemon = _ps.PokeList
  pokemon.forEach(p => {
    template += p.getTemplate()
  })
  document.getElementById('list').innerHTML = template
}

function drawActive() {
  let poke = _ps.PokeActive
  let thing = `col-12 col-md-10 offset-md-1`
  let button = `<button class="btn btn-success w-100" onclick="app.controllers.pokeController.addToTeam('${poke.name}')">ADD TO POKEDEX</button>`
  let template = poke.getCard(button, thing)
  document.getElementById('poke-active').innerHTML = template
}

function drawMyTeam() {
  let template = ''
  let pkmn = _ps.PokeDex
  pkmn.forEach(p => {
    let thing = `col-12 col-md-3`
    let button = `<button class="btn btn-danger" onclick="app.controllers.pokeController.removeFromTeam('${p.id}')">Remove</button>`
    template += p.getCard(button, thing)
  })
  document.getElementById('pokedex').innerHTML = template
}

//public
export default class PokeController {
  constructor() {
    _ps.addSubscriber('pokeList', drawAllPkm)
    _ps.addSubscriber('pokeActive', drawActive)
    _ps.addSubscriber('pokeDex', drawMyTeam)
    _ps.getPokeData()
    _ps.getMyTeamData()
  }
  getInfo(name) {
    _ps.getInfo(name)
  }
  addToTeam(name) {
    _ps.addToTeam(name)
  }
  removeFromTeam(name) {
    _ps.removeFromTeam(name)
  }
}