let pokemonList = [
    {name: 'Bulbasaur', type: 'Grass', height: '7'},
    {name: 'Charmander', type: 'Fire', height: '6'},
    {name: 'Caterpie', type: 'Bug', height: '3'}
];

for (let i= 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + pokemonList[i].height);
};
