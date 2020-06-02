class API {
    constructor(apikey) {
        this.apikey = apikey;
    }

    //Obtener todas las monedas
    async obtenerMonedasAPI() {
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`;

        //fetch a la api
        const urlObtenerMonedas = await fetch(url);

        //respuesta en Json
        const monedas = await urlObtenerMonedas.json();
        return{
            monedas
        }
    }

    async obtenervalores(moneda, criptomonedas){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomonedas}&tsyms=${moneda}&api_key=${this.apikey}`;

        //consultar en rest api 
        const urlConvertir = await fetch(url);
        const resultado = await urlConvertir.json();

        return {
            resultado
        }
    }
}