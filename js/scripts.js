let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === "object"
        ) {
            pokemonList.push(pokemon)
        }
        else {
            console.log("pokemon is not correct")
        }
    }
    function getAll() {
        return pokemonList;
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

    //unresolved results variable here
    function loadList() {
        return fetch(apiUrl).then(function (response){
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    };

    // problem with sprites.front default here
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl =details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        })
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then( function (){
            console.log(pokemon)
        })
    }

    //loadDetails function is not getting called here
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };


}) ()
pokemonRepository.add({name: "Pikachu", detailsUrl: "https://pokeapi.co/api/v2/pokemon/5/",
    imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
    height: 0.3,
    type: ["electric"],})

console.log(pokemonRepository.getAll());
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
