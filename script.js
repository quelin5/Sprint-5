
var newJoke = '';
consultarAPIClima();
function alternarAPI() {
    var random = Math.trunc((Math.random() * (20 - 1) + 1));
    if (random % 2) {
        getAcudit();
    }
    else {
        chuckNorrisAPI();
    }
}

//Get Joke from API.:
function getAcudit() {
    var dataAPI = fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        mostrarHTML(data);
    });
}

//Chuck Norris API
function chuckNorrisAPI() {
    var dataAPI = fetch('https://api.chucknorris.io/jokes/random')
        .then(function (reply) { return reply.json(); })
        .then(function (data) {
        var chiste = { joke: data.value };
        mostrarHTML(chiste);
    });
}

var joke = '';
//Displays Joke on Screen.:
function mostrarHTML(data) {
    joke = data.joke;
    var contenido;
    contenido = document.querySelector('.contenido');
    if (contenido) {
        contenido.innerHTML = joke;
    }

    return joke;
}

//Array de objetos. Cada chiste es un objeto con tres informationes.
var reportAcudits;
reportAcudits = [];
//Crea Nuevo Objeto c/cada New Joke.:
//function infoAcudit(puntuacioAcudit){
function infoAcudit(num) {
    //Crear objeto CHISTE
    var acudit = {
        acudit: joke,
        score: num,
        date: new Date,
    };
    reportAcudits.push(acudit);
    console.log(reportAcudits);
}

//API Clima.:
function consultarAPIClima() {
    var appID = 'f1466b25ddf3a03b14fdb33a925eb378';
    var ciudad = 'Barcelona';
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "&appid=" + appID;
    fetch(url)
        .then(function (respuesta) { return respuesta.json(); }) //toma los datos en JSON (normalmente todas las APIS estan el JSON)
        .then(function (datosClima) {
        mostrarClima(datosClima);
    });
}

function mostrarClima(datosClima) {
    var divClima = document.querySelector('.container-clima');
    var temp = datosClima.main.temp;
    var centigrados = (temp - 273.15).toFixed(0);
    var actual = document.createElement('p');
    actual.innerHTML = "Barcelona, España: " + centigrados + " &#8451;";
    actual.classList.add('font-bold', 'text-6xl');
    var resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(actual);
    if (divClima) {
        divClima.appendChild(resultadoDiv);
    }
}
