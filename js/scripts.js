let pokemonRepository = (function () {
        let pokemonList = [];
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=200';


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
            let pokemonList = document.querySelector(".list-group");
            let listPokemon = document.createElement("li");
            let button = document.createElement("button");
            button.innerText = pokemon.name;
            listPokemon.classList.add("list-group-item");
            button.classList.add("btn", "btn-primary");
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#modal-container')

            listPokemon.appendChild(button);
            pokemonList.appendChild(listPokemon);

            button.addEventListener('click', function () {
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

                });
            }).catch(function (e) {
                console.error(e);
            })
        }


        function loadDetails(item) {
            let url = item.detailsUrl;
            return fetch(url).then(function (response) {
                return response.json();
            }).then(function (details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.weight = details.weight;
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
            let modalBody = $(".modal-body");
            let modalTitle = $(".modal-title");

            modalTitle.empty();
            modalBody.empty();

            let nameElement = $("<h1>" + pokemon.name + "</h1>");

            let imageElementFront = $('<img src= "" alt="" class="modal-img">');
            imageElementFront.attr("src", pokemon.imageUrl);

            let heightElement = $("<p>" + "height: " +
            pokemon.height + "</p>");

            let weightElement = $("<p>" + "weight: " + pokemon.weight + "</p>");


            modalTitle.append(nameElement);
            modalBody.append(imageElementFront);
            modalBody.append(heightElement);
            modalBody.append(weightElement);



        }
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal()
        }
    })

        function hideModal() {
            modalContainer.classList.remove('is-visible')
        }

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


