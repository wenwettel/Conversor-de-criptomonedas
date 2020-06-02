//se importan las clases para que este disponible en toda la app
const cotizador = new API('4bca5bd5c0ecad432ad0962989a4ad9d8150ea54668c13183ae0554d1a678a80');
const ui = new Interfaz();


//Todo lo de la interfaz


//leer el Formulario 
const formulario = document.querySelector('#formulario');

//event Listener
formulario. addEventListener('submit', (e) => {
    e.preventDefault();

    //Leer la moneda Selecciona
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

    //Leer la criptomoneda Selecciona
    const criptoMonedaSelect = document.querySelector('#criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

    //comprobar que ambos campos tengan algo seleccionado
    if(monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
        //arrojar un alerta de error
        ui.mostrarMensaje('Ambos Campos son obligarŧorios', 'alert bg-danger text-center');
    }else { 
        // Todo bien, consultar la API
        cotizador.obtenervalores(monedaSeleccionada, criptoMonedaSeleccionada)
        .then(data => {
            ui.mostrarResultado(data.resultado.RAW,monedaSeleccionada,criptoMonedaSeleccionada);
        })
        
    }

})