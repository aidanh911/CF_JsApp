let pokemonList = [
    {name: 'Bulbasaur', type: 'Grass', height: '.7'},
    {name: 'Charmander', type: 'Fire', height: '.6'},
    {name: 'Caterpie', type: 'Bug', height: '.3'}
];

for (let i= 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height >= .7) {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!<br>");
    } else {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")<br>");
    }
};
