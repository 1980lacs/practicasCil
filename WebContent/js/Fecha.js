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
var seleccionados = [];
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
function Fecha(a,m,d){
	this.dia = d || hoy.getDate();
	this.mes = m || hoy.getMonth();
	this.ano = a || hoy.getFullYear();
	fecha = new Date(this.ano,this.mes,this.dia);
}

/**
 * Funcion restarMes
 * 
 * @description: Esta función resta un mes a la fecha actual y actualiza el calendario a la nueva fecha
 */
function restarMes(){
	if (mes > 0){
		this.mes--;
		captionMesAno();
		var list = document.getElementById("tabla");
		while (list.hasChildNodes()) {   
		    list.removeChild(list.firstChild);
		}
	} else {
		mes = 11;
		this.ano--;
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
		this.ano++;
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
	document.getElementById("caption").innerHTML = this.meses[this.mes] + ' ' + this.ano;
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
	return this.dia;
}

function getAno(){
	return this.ano;
}

function getMes(){
	return this.mes;
}

Fecha.prototype.getInicioMes = function(){
	return this.fecha.getUTCDay();
}

Fecha.prototype.getMesAnt = function(){
	return this.mesAnt = this.mes - 1;
}

function getMesAnt(){
	var mesAnt;
	mesAnt = this.mes - 1;
	if (this.mes == 0){
		mesAnt = 11;
	}
	return mesAnt;
}

function inicioMesAnt(){
	var inicioMes = new Date(this.ano,this.mes, 1);
	var fin = ((getMaxAnt(getMesAnt())) - (inicioMes.getUTCDay() - 1));
	return fin;
}

function generarDias(){
	var x = 0;
	var mesAnt = [];
	var mesCurso = [];
	var mesSig = [];
	var dias = [];
	for (i = this.inicioMesAnt(); i <= getMaxAnt(getMesAnt()); i++){
		mesAnt[x] = i;
		x++;
	}
	for (i = 0 ; i < getMaxAnt(this.mes); i++){
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
		var tr = document.createElement("tr");
		tr.setAttribute("id", "tr" + i);
		element.appendChild(tr);
		for (j = 0; j <= mesCurso.length; j++){
			if (j <= 6){
				if(x > 0 || z >= mesCurso.length){
					var td = document.createElement("td");
					tr.appendChild(td);
					x--;
				}else{
					var td = document.createElement("td");
					td.setAttribute("id", "td" + z);
					var id = td.getAttribute("id");
					tr.appendChild(td);	
					//console.log(seleccionados[z-1]);
					// aqui deberia comprobar si el dia, mes, y año esta en seleccionados
					// y si está cambiarle el estilo a seleccionado
					var d = new Fecha(this.ano,this.mes,mesCurso[z]);
					//console.log(d);
					//console.log(seleccionados.indexOf(d));
					/*var found = seleccionados.find(function(element) {
						  return element === f;
						});
					console.log(found);*/
					text = document.createTextNode(mesCurso[z]); // pone el dia en el td
					td.setAttribute("onClick", "seleccionar(" + parseInt(text.data) + ", " +  id + ")");
					//td.setAttribute("onClick", "updateSeleccionados(" + seleccionados, d)+ ");/*"updateSeleccionados(" + seleccionados + ", " +  d + ")");*/
					if (z < mesCurso.length){
						td.appendChild(text);
						z++;
					}
				}
			}
		}
	}
}

/*function updateSeleccionados (seleccionados, fecha) {
    if (seleccionados.indexOf(fecha) === -1) {
        seleccionados.push(fecha);
        console.log('Nueva fecha : ' + fecha);
    } else if (seleccionados.indexOf(fecha) > -1) {
        console.log(fecha + ' ya existe en coleccionados.');
    }
}*/

function seleccionar(dia, i){
	fecha = new Fecha(this.ano,this.mes, dia);
	var id = ("td" + (parseInt(i.innerText)-1));
	document.getElementById("" + id + "").setAttribute("class", "btn-info");
	console.log(seleccionados.includes(fecha));
	console.log(seleccionados);
	seleccionados.push(fecha);
	
}

function marcarDias(fecha){
	
}











