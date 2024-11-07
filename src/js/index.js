const chaveDeApi = 'c2df715d51f44e8db2810438240711';
const botaoDeBusca = document.querySelector('.btn-busca');

botaoDeBusca.addEventListener('click', async () => {
    const cidadeDigitada = document.getElementById('input-busca').value

    if (!cidadeDigitada) return

    const dados = await buscarDadosDeClima(cidadeDigitada)

    preencherDadosNaTela(dados)
})


async function buscarDadosDeClima(cidadeDigitada) {
    const urlApi = `https://api.weatherapi.com/v1/current.json?key=${chaveDeApi}&q=${cidadeDigitada}&aqi=no&lang=pt`;
    const resposta = await fetch(urlApi)

    if (resposta.status != 200) return;

    const objetoCidade = await resposta.json()
    return objetoCidade;
}

function preencherDadosNaTela(objetoCidade) {
    const nomeCidade = objetoCidade.location.name
    const temperaturaCidade = Math.round(objetoCidade.current.temp_c)
    const umidade = objetoCidade.current.humidity
    const condicaoCidade = objetoCidade.current.condition.text
    const velocidadeVento = objetoCidade.current.wind_kph
    const iconeClima = objetoCidade.current.condition.icon

    const divNomeCidade = document.getElementById('cidade')
    const divTemperatura = document.getElementById('temperatura')
    const divUmidade = document.getElementById('umidade')
    const divCondicao = document.getElementById('condicao')
    const divVento = document.getElementById('velocidade-do-vento')
    const divIconeClima = document.getElementById('icone-condicao')

    divNomeCidade.innerHTML = nomeCidade
    divTemperatura.innerHTML = `${temperaturaCidade} ºC`
    divUmidade.innerHTML = `${umidade}%`
    divCondicao.innerHTML = condicaoCidade
    divVento.innerHTML = `${velocidadeVento} km/h`
    divIconeClima.setAttribute("src", iconeClima)
}