class Interfaz {

    // se manda a llamar la funcion construirSelect desde el constructor
    // crea un metedo aparte para no tener un constructor tan cargado.
    constructor() {
        this.init();
    }
    init() {
        this.construirSelect();
    }


   //va a construir todos los select
    construirSelect() {
       cotizador.obtenerMonedasAPI()
            .then(monedas => {
                
                //crear un select de opciones
                const select = document.querySelector('#criptomoneda')
                
                /* Object.entries,toma la llave del objeto y los valores y los ubica como arrays*/ 
                // en conclusion convierte en arreglos los objetos
                for( const [key, value] of Object.entries(monedas.monedas.Data)) {
                   
                //Añadir el simbol y el nombre cono opciones
                const opcion = document.createElement('option');
                opcion.value = value.Symbol;
                opcion.appendChild(document.createTextNode(value.CoinName));
                select.appendChild(opcion);
              } 
              
            })
    }

    mostrarMensaje(mensaje, clase) {
        const div = document.createElement('div');
        //className es en el html class=""
        div.className = clase;
        div.appendChild(document.createTextNode(mensaje));

        //Seleccionar mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        //Mostrar contenido 
        setTimeout(()=> {
            document.querySelector('.mensajes div').remove()
        },3000);
    }

    //Imprime el resultado de la cotizacion
    mostrarResultado(resultado, moneda, crypto) {

        // En caso de un resultado anterior, ocultarlo 
        const resultadoAnterior = document.querySelector('#resultado > div');
        if(resultadoAnterior) {
            resultadoAnterior.remove();
        }

        console.log(resultado);
        const datosMoneda = resultado[crypto][moneda];

        
        //Recortar digitos de precio
        let precio = datosMoneda.PRICE.toFixed(2);
        let porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2);

        // Convertir a una fecha la actualizacion
        // toLocaleDateString traduce la fecha a la locacion donde se encuentra.
        let actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX');

        // Construir el template
        let templateHTML =  `
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado:</h2>
                    <p>El Precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $ ${precio}</p>
                    <p>Variacion último día: % ${porcentaje}</p>
                    <p>Ultima Actualización: ${actualizado}</p>
            </div>
        `;

        //llamar funcion del spinner
        this.mostrarOcultarSpinner('block');

        //Mostrar el Resultado despues de 3 seg

        setTimeout(() => {
            //Insertar el resultado en el HTML 
            document.querySelector('#resultado').innerHTML = templateHTML;

            //Ocultar el spinner
            this.mostrarOcultarSpinner('none');
        },2000);
    }

    //Mostrar Un Spinner de carga
    mostrarOcultarSpinner(vista) {
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;
    }
}