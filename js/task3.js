let pokemonRepository = (function () {
    let repository = [
        {name: "Bulbasaur", type: "Grass", height: ".7"},
        {name: "Charmander", type: "Fire", height: ".6"},
        {name: "Caterpie", type: "Bug", height: ".3"}
    ];
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "type" in pokemon)
        {repository.push(pokemon)}
        else {
            console.log("pokemon is not correct")
        }
    }
    function getAll() {
        return repository;
    }
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);

        button.addEventListener("click", function(event){
            showDetails(pokemon)
        })
    }

    function showDetails(pokemon) {
        console.log(pokemon.name)
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
}) ()
pokemonRepository.add({name: "Pikachu", height: 0.3, type: ["electric"] })

console.log(pokemonRepository.getAll());
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});