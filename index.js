
const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const pokedex = [
    {
        numero: 1,
        nome: "Charmander ",
        tipo: "fogo",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
        descricao:
            "Tem preferência por coisas quentes. Quando chove, diz-se que o vapor jorra da ponta de sua cauda.",
        altura: "0,6 m",
        peso: "8,5kg",
        categoria: "Lagarto",
        habilidade: "Chama"
    },
    {
        numero: 2,
        nome: "Charmeleon",
        tipo: "fogo",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png",
        descricao:
            "Tem uma natureza bárbara. Na batalha, ele chicoteia sua cauda de fogo e corta com garras afiadas.",
        altura: "1,1 m",
        peso: "19.0 kg",
        categoria: "Chama",
        habilidade: "Blaze"
    },
    {
        numero: 3,
        nome: "Charizard",
        tipo: "fogo/voador",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
        descricao:
            "Ele cospe fogo que é quente o suficiente para derreter pedregulhos. Pode causar incêndios florestais soprando chamas.",
        altura: "1,7 m",
        peso: "90,5kg",
        categoria: "Chama",
        habilidade: "blaze"
    }
];
let message = "";

let pokemon = undefined;


app.get("/", (req, res) => {
    ; setTimeout(() => {
        message = "";
    }, 1000);
    res.render("index", { pokedex, pokemon, message });
});

app.post("/create", (req, res) => {
    const pokemon = req.body;
    pokemon.numero = pokedex.length + 1;
    pokedex.push(pokemon);
    message = `pokemon cadastrado com sucesso!!`;
    res.redirect("/#cards");
});

app.get("/detalhes/:numero", (req, res) => {
    let numero = +req.params.numero;
    pokemon = pokedex.find((pokemon) => pokemon.numero === numero);
    res.redirect("/#cadastro");
});

app.post("/update/:numero", (req, res) => {
    let numero = +req.params.numero - 1;
    const newPokemon = req.body;
    newPokemon.numero = numero + 1;
    pokedex[numero] = newPokemon;
    pokemon = undefined;
    message = `pokemon atualizado com sucesso!!`;
    res.redirect("/#cards");
});

app.get("/delete/:numero", (req, res) => {
    let numero = +req.params.numero - 1;
    delete pokedex[numero];
    message = `pokemon apagado com sucesso!!`;
    res.redirect("/#cards");
});

app.listen(port, () =>
    console.log(`Servidor rodando em http://localhost:${port}`)
);
