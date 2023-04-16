let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Bulbasaur', type: 'Grass', height: '.7'},
        {name: 'Charmander', type: 'Fire', height: '.6'},
        {name: 'Caterpie', type: 'Bug', height: '.3'}
    ];
    function add(pokemon) {
        pokemonList.push(pokemon);
    };
    function getAll() {
        return pokemonList;
    };

    return {
        add: add,
        getAll: getAll
    };
}) ()

pokemonRepository.getAll().forEach(function (pokemon) {
    console.log(pokemon.name + ' is ' + pokemon.height + ' meters tall and is a ' + pokemon.type + ' type');
});