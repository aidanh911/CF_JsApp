let pokemonRepository = (function () {
    let Repository = [
        {name: 'Bulbasaur', type: 'Grass', height: '.7'},
        {name: 'Charmander', type: 'Fire', height: '.6'},
        {name: 'Caterpie', type: 'Bug', height: '.3'}
    ];
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "types" in pokemon)
        {Repository.push(pokemon)}
        else {
            console.log("pokemon is not correct")
        };
    };
    function getAll() {
        return Repository;
    };

    return {
        add: add,
        getAll: getAll
    };
}) ()

pokemonRepository.getAll().forEach(function (pokemon) {
    document.write(pokemon.name + ' is ' + pokemon.height + ' meters tall and is a ' + pokemon.type + ' type,<br>' );
});