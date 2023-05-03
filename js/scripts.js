let pokemonRepository = (function () {
        let pokemonList = [];
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';


        function add(pokemon) {
            if (
                typeof pokemon === "object"
            ) {
                pokemonList.push(pokemon)
            } else {
                console.log("pokemon is not correct")
            }
        }

        function getAll() {
            return pokemonList;
        }

        function addListItem(pokemon) {
            let pokemonList = document.querySelector(".pokemon-list");
            let listPokemon = document.createElement("li");
            let button = document.createElement("button");
            button.innerText = pokemon.name;
            button.classList.add("button-class");
            listPokemon.appendChild(button);
            pokemonList.appendChild(listPokemon);

            button.addEventListener("click", function (event) {
                showDetails(pokemon)
            })
        }


        function loadList() {
            return fetch(apiUrl).then
            (function (response) {
                return response.json();
            })
                .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                    ;
                });
            }).catch(function (e) {
                console.error(e);
            })
        };


        function loadDetails(item) {
            let url = item.detailsUrl;
            return fetch(url).then(function (response) {
                return response.json();
            }).then(function (details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            })
        }

        function showDetails(item) {
            pokemonRepository.loadDetails(item).then(function() {
                showModal(item);
                console.log(item)
            });
        }

        let modalContainer = document.querySelector('#modal-container')

        function showModal(pokemon) {

            modalContainer.innerHTML = '';

            let modal = document.createElement('div');

            modal.classList.add('modal');

            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideModal)

            let titleElement = document.createElement('h1');
            titleElement.innerText = pokemon.name;

            let contentElement = document.createElement('p');
            contentElement.innerText = pokemon.height;

            let imageElement = document.createElement('img')
            imageElement.src = pokemon.detailsUrl;

            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentElement);
            modal.appendChild(imageElement)
            modalContainer.appendChild(modal);

            modalContainer.classList.add('is-visible');

            modalContainer.addEventListener('click', (e) => {
                let target = e.target;
                if (target === modalContainer) {
                    hideModal()
                }
            })
        }

        function hideModal() {
            modalContainer.classList.remove('is-visible')
        }

        window.addEventListener('keydown', (e) => {
            let modalContainer = document.querySelector('#modal-container');
            if (e.key === 'escape' && modalContainer.classList.contains('is-visible')) {
                hideModal()
            }
        })

        return {
            getAll: getAll,
            addListItem: addListItem,
            loadList: loadList,
            loadDetails: loadDetails
        };

    })();


pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


