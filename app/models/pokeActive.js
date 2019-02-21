export default class ActivePokemon {
  constructor(data) {
    this.name = data.name
    this.url = data.url
    this.id = data.id || data._id
    this.img = data.img || data.sprites.front_default
    this.description = data.description || data.types[0].type.name
    // this.move1 = data.moves1 || data.moves[0].move.name
    // this.move2 = data.moves2 || data.moves[1].move.name

  }
  getCard(button, thing) {
    return `
    <div class="${thing}">
      <div class="card">
        <img src="${this.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${this.name.toUpperCase()}</h5>
          <p class="card-text">Primary Type: ${this.description.toUpperCase()}</p>
          ${button}
        </div>
      </div>
    </div>
    `
  }
}