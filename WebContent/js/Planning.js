/**
 * 
 */ 

var id = 0;			// int autoincremental. Le asigna un id a la instancia para localizarlo m´s facilmente
var proceso;		// String que identifica al proceso seleccionado
var tipo;			// Tipo de planificacion (Ciclica, Puntual, Siempre)
var mailOk;			// Array de strings de mails al los que se enviará en el caso de que se ejecute con exito (si está vacio no se enviará nada)
var mailFail;		// Array de strings de mails al los que se enviará en el caso de que se ejecute sin exito (si esta vacio no se enviará nada)
var activo;			// Boolean que indica el estado del proceso
var dia = [];		// Array int que indican los dias en los que se ejecutará el proceso
var mess = [];		// Array int que indican los meses en los que se ejecutará el proceso
var anyo = [];		// Array int que indican los años en los que se ejecutará el proceso
var hora = [];		// Array int que indican las horas en las que se ejecutará el proceso
var minuto = [];	// Array int que indican los minutos en los que se ejecutará el proceso

/**
 *  Al final el objeto tiene que tener un id, un nombre de proceso, un tipo de ejecución, mails de avisos,
 *  si está activo y fechas en las que se ejecutará
 */

function Planning(/*proceso, tipo, mailOk, mailFail, activo, fecha*/){
	this.id = asignarId();
	this.proceso = asignarNombre();
	this.dia = asignarDias();
	this.mes = asignarMeses();
	this.hora = asignarHoras();
	this.minuto = asignarMinutos();
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
 * Función que recoge todos los dias de las fechas seleccionadas y los almacena en el array dia
 * @returns {Array}dia
 */
function asignarDias(){
	for (i in seleccionados){
		dia.push(seleccionados[i].getDate());
	}	
	return dia;
}

/**
 * Función que recoge todos los meses de las fechas seleccionadas y los almacena en el array mes
 * @returns {Array}mes
 */

function asignarMeses(){
	for (i in seleccionados){
		if (mess.indexOf(seleccionados[i].getMonth()+1) === -1)
		mess.push(seleccionados[i].getMonth() + 1);
	}
	
	return mess;
}

/**
 * Función que recoge todas las horas de las fechas seleccionadas y los almacena en el array hora
 * @returns {Array}hora
 */
function asignarHoras(){
	for (i in seleccionados){
		if (hora.indexOf(seleccionados[i].getHours()) === -1)
		hora.push(seleccionados[i].getHours());
	}	
	return hora;
}

/**
 * Función que recoge todos los minutos de las fechas seleccionadas y los almacena en el array minuto
 * @returns {Array}minuto
 */
function asignarMinutos(){
	for (i in seleccionados){
		if (minuto.indexOf(seleccionados[i].getMinutes()) === -1)
		minuto.push(seleccionados[i].getMinutes());
	}	
	return minuto;
}

/**
 *  Esta función inserta un planificador en la tabla y despues limpia las selecciones
 */

function insertar(){
	var planning = new Planning();
	var tabla = document.getElementById("planning");
	var tr = document.createElement("tr");
	var tbody = document.createElement("tbody");
	
	tr.setAttribute("id", "planning" + planning.id);
	var text;
	for (i in planning){
		var td = document.createElement("td");
		text = document.createTextNode(planning[i]);
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
	dia.splice(0, dia.length);
	mess.splice(0, mess.length);
	hora.splice(0, hora.length);
	minuto.splice(0, minuto.length);
	generarDias();
	comprobarSel();
	var radio = document.getElementsByName("optradio");
	for (i in radio){
		if (radio[i].checked){
			radio[i].checked = false;
		}
	}
}

function crearPlanning(){
	insertar();
}

function borrarSelec(){
	dia.splice(0, dia.length);
	mess.splice(0, mess.length);
	hora.splice(0, hora.length);
	minuto.splice(0, minuto.length);
	seleccionados.splice(0, seleccionados.length);
	var list = document.getElementById("tabla");
	while (list.hasChildNodes()) {   
	    list.removeChild(list.firstChild);
	}
	generarDias();
	comprobarSel();
}














