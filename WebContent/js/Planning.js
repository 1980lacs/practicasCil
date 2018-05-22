/**
 * 
 */ 

var id = 0;		// int autoincremental. Le asigna un id a la instancia para localizarlo m´s facilmente
var proceso;	// String que identifica al proceso seleccionado
var tipo;		// Tipo de planificacion (Ciclica, Puntual, Siempre)
var mailOk;		// Array de strings de mails al los que se enviará en el caso de que se ejecute con exito (si está vacio no se enviará nada)
var mailFail;	// Array de strings de mails al los que se enviará en el caso de que se ejecute sin exito (si esta vacio no se enviará nada)
var activo;		// Boolean que indica el estado del proceso
var dia;		// Array int que indican los dias en los que se ejecutará el proceso
var mes;		// Array int que indican los meses en los que se ejecutará el proceso
var anyo;		// Array int que indican los años en los que se ejecutará el proceso
var hora;		// Array int que indican las horas en las que se ejecutará el proceso
var minuto;		// Array int que indican los minutos en los que se ejecutará el proceso
var fecha;		// Array de fechas compuestas por los arrays anteriores

/**
 *  Al final el objeto tiene que tener un id, un nombre de proceso, un tipo de ejecución, mails de avisos,
 *  si está activo y fechas en las que se ejecutará
 */

function Planning(/*proceso, tipo, mailOk, mailFail, activo, fecha*/){
	this.id = asignarId();
	this.proceso = asignarNombre();
	this.fecha = agregarFechas();
	this.tipo = asignarTipo();
	this.activo = true;
}

/**
 * Primero se implementa la función para asignarle un id 
 */

function asignarId(){
	id++;
	return id;
}

/**
 *  Ahora se le asigna el nombre que se selecciona en la página del planificador
 */

function asignarNombre(){
	proceso = document.getElementById("sel_proceso").value;
	return proceso;
}

/**
 *  Agregar las fechas seleccionadas
 */

function agregarFechas(){
	return seleccionados;
}

/**
 *  Se le asigna el tipo de ejecución seleccionado
 */

function asignarTipo(){
	var resultado;
	var radio = document.getElementsByName("optradio");
	for (i in radio){
		if (radio[i].checked){
			resultado = radio[i].value;
		}
	}
	
	return resultado;
}

/**
 *  Esta función inserta un planificador en la tabla y despues limpia las selecciones
 */

function insertar(){
	var planning = new Planning();
	var tabla = document.getElementById("planning");
	var tr = document.createElement("tr");
	var br; //= document.createElement("br");
	var tbody = document.createElement("tbody");
	tr.setAttribute("id", "planning" + planning.id);
	var text;
	for (i in planning){
		var td = document.createElement("td");
		if (i === "fecha"){
			if (planning.fecha[0] === undefined){
				text = document.createTextNode("");
			} else{
				for (j in planning[i]){	
					text = document.createTextNode(planning.fecha[j].getDate() + "/" + planning.fecha[j].getMonth() + "/" + planning.fecha[j].getFullYear());
					td.appendChild(text);
					td.appendChild(document.createElement("p"));
				}
			}	
		} else text = document.createTextNode(planning[i]);
		td.appendChild(text);
		tr.appendChild(td);
		tbody.appendChild(tr);
	}
	tabla.appendChild(tbody);
	seleccionados.splice(0, seleccionados.length);
	var list = document.getElementById("tabla");
	while (list.hasChildNodes()) {   
	    list.removeChild(list.firstChild);
	}
	generarDias();
}

function crearPlanning(){
	insertar();
}














