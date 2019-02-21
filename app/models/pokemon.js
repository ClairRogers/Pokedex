export default class Pokemon {
  constructor(data) {
    this.name = data.name
    this.url = data.url
    this.id = data.id
    // this.img = data.img || data.sprites.front_default
    // this.description = data.description || data.types[0].type.name
    // this.move1 = data.moves1 || data.moves[0].move.name
    // this.move2 = data.moves2 || data.moves[1].move.name

  }
  getTemplate() {
    return `<button class="btn btn-info my-2 mx-2" onclick="app.controllers.pokeController.getInfo('${this.name}')">${this.name.toUpperCase()}</button>`
  }
  // getCard() {
  //   return `
  //   <div class="col-12">
  //           <div class="card">
  //             <img src="${this.img}" class="card-img-top" alt="...">
  //             <div class="card-body">
  //               <h5 class="card-title">${this.name}</h5>
  //               <p class="card-text">${this.description}</p>
  //               <button class="btn btn-primary">ADD TO POKEDEX</button>
  //             </div>
  //           </div>
  //         </div>
  //   `
  // }
}
