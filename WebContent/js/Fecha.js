/**
*   @author  Luis Alberto Curiel
*   
*   Clase Fecha Esta clase contruye una fecha de la que se pueden extraer
*  				 sus parametros para usarlos con otras funciones
*/ 

var meses = new Array ('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
var diasSemana = new Array('Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo');
var diasMes = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var fecha;
var hoy = new Date();
var dia = hoy.getDate();
var mes = hoy.getMonth();
var anyo = hoy.getFullYear();
var seleccionados = [];
var elemento = undefined;
//var id;

/**
 * Constructor de la clase
 * 
 * @param a: Este parámetro es el del año de la fecha
 * @param m: Este parámetro es el del mes de la fecha
 * @param d: Este parámetro es el del día de la fecha
 * 
 * @description: Si no se le pasan parámetros creara una fecha con el dia actual.
 * Si se le pasan los parámetros se creará una fecha con los parámetros que le hemos pasado
 */
/*function Fecha(a,m,d){
	this.dia = d || hoy.getDate();
	this.mes = m || hoy.getMonth();
	this.ano = a || hoy.getFullYear();
	fecha = new Date(this.ano,this.mes,this.dia);
}*/

/**
 * Funcion restarMes
 * 
 * @description: Esta función resta un mes a la fecha actual y actualiza el calendario a la nueva fecha
 */
function restarMes(){ //ok
	if (mes > 0){
		mes--;
		captionMesAno();
		var list = document.getElementById("tabla");
		while (list.hasChildNodes()) {   
		    list.removeChild(list.firstChild);
		}
	} else {
		mes = 11;
		anyo--;
		captionMesAno();
		var list = document.getElementById("tabla");
		while (list.hasChildNodes()) {   
		    list.removeChild(list.firstChild);
		}
	}
	generarDias();
}

/**
 * Funcion aumentarMes
 * 
 * @description: Esta función aumenta un mes a la fecha actual y actualiza el calendario a la nueva fecha
 */
function aumentarMes(){
	if (mes < 11){
		this.mes++;
		captionMesAno();
		var list = document.getElementById("tabla");
		while (list.hasChildNodes()) {   
		    list.removeChild(list.firstChild);
		}
	} else {
		mes = 0;
		anyo++;
		captionMesAno();
		var list = document.getElementById("tabla");
		while (list.hasChildNodes()) {   
		    list.removeChild(list.firstChild);
		}
	}
	generarDias();
	
}

/**
 * Función para ponerle el título al calendario
 * 
 * @description: 
 */
function captionMesAno(){
	document.getElementById("caption").innerHTML = meses[mes] + ' ' + anyo;
}

function getMaxAnt(mes){
	var diaMaximo;
	if (mes == 1 && (((getAno() % 4 == 0) && (getAno() % 100 != 0)) || (getAno() % 400 == 0)))
		diaMaximo = 29;
	else 
		diaMaximo = this.diasMes[mes];
	
	return diaMaximo;
}

function getDia(){
	return dia;
}

function getAno(){
	return anyo;
}

function getMes(){
	return mes;
}

/*Fecha.prototype.getInicioMes = function(){
	return this.fecha.getUTCDay();
}

Fecha.prototype.getMesAnt = function(){
	return this.mesAnt = this.mes - 1;
}*/

function getMesAnt(){
	var mesAnt;
	mesAnt = mes - 1;
	if (mes == 0){
		mesAnt = 11;
	}
	return mesAnt;
}

function inicioMesAnt(){
	var inicioMes = new Date(anyo,mes, 1);
	var fin = ((getMaxAnt(getMesAnt())) - (inicioMes.getUTCDay() - 1));
	//console.log(inicioMes.getUTCDay());
	return fin;
}

//------------------------------

function inicioMesAntBis(){
	var inicioMes = new Date(anyo,mes, 1);
	var fin = ((getMaxAnt(getMesAnt())) - (inicioMes.getUTCDay() - 1));
	//console.log(inicioMes.getUTCDay());
	return inicioMes.getUTCDay();
}

//----------------------------------
function generarDias(){
	var total = 42;
	var diasAnt = inicioMesAntBis();
	var contTr = 1;
	var contTd = 1;
	var element2 = document.getElementById("tabla");
	var texto;
	while (total > 0){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "tr" + contTr);
		element2.appendChild(tr);
		contTr++;
		console.log(diasAnt);
		if (diasAnt > 0){
			var td = document.createElement("td");
			tr.appendChild(td);
			diasAnt--;
		} else {
			var td = document.createElement("td");
			td.setAttribute("id", "td" + contTd);
			var id = td.getAttribute("id");
			tr.appendChild(td);	
			var d = new Date(anyo,mes,contTd);
			texto = document.createTextNode(contTd); // pone el dia en el td
			//if (compara(d))td.setAttribute("class", "btn-info");
			td.setAttribute("onClick", "seleccionar(" + parseInt(texto.data) + ", " +  id + ")");
			//td.appendChild(texto);
			if (z < mesCurso.length){
				td.appendChild(texto);
				z++;
			}
			contTd++;
		}
		total--;
	}
	
	var x = 0;
	var mesAnt = [];
	var mesCurso = [];
	var mesSig = [];
	var dias = [];
	for (i = inicioMesAnt(); i <= getMaxAnt(getMesAnt()); i++){
		//mesAnt[x] = i;
		x++;
	}
	for (i = 0 ; i < getMaxAnt(mes); i++){
		mesCurso[i] = i+1;
		dias = mesAnt.concat(mesCurso);
	}
	var resto = 42 - (mesAnt.length + mesCurso.length);
	for (i = 0; i < resto; i++){
		mesSig[i] = i+1;
	}
		
	dias = dias.concat(mesSig);
	var filas = 6;
	var z = 0;
	var element = document.getElementById("tabla");
	var esteMes = false;
	var text;
	for (i = 0; i < filas; i++){
	/*var cont = mesCurso.length;
	while (cont >= 0){*/
		var tr = document.createElement("tr");
		tr.setAttribute("id", "tr" + i);
		element.appendChild(tr);
		//cont--;
		for (j = 0; j <= mesCurso.length; j++){
			if (j <= filas){
				if(x > 0 || z >= mesCurso.length){
					var td = document.createElement("td");
					tr.appendChild(td);
					x--;
				}else{
					var td = document.createElement("td");
					td.setAttribute("id", "td" + z);
					var id = td.getAttribute("id");
					tr.appendChild(td);	
					var d = new Date(anyo,mes,mesCurso[z]);
					text = document.createTextNode(mesCurso[z]); // pone el dia en el td
					if (compara(d))td.setAttribute("class", "btn-info");
					td.setAttribute("onClick", "seleccionar(" + parseInt(text.data) + ", " +  id + ")");
					if (z < mesCurso.length){
						td.appendChild(text);
						z++;
					}
				}
			}
		}
		
	}
}

function seleccionar(dia, i){
	f = new Date(anyo,mes, dia);
	var id = ("td" + (parseInt(i.innerText)-1));
	
	if (seleccionados[0] === undefined){
		seleccionados.push(f);
		document.getElementById("" + id + "").setAttribute("class", "btn-info");
	} else{
		var existe = compara(f);
		if (!existe){
			document.getElementById("" + id + "").setAttribute("class", "btn-info");
			seleccionados.push(f);
		} else{
			document.getElementById("" + id + "").setAttribute("class", "none");
			seleccionados.splice(elemento,1);
		}
	}
}

function compara(f){
	for(i in seleccionados){
		if (String(seleccionados[i]) === String(f)){
			elemento = i;
			return true;
		}
	}
	return false;
}











