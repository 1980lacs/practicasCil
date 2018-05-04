/**
*   @author  Luis Alberto Curiel
*   
*   Clase Fecha Esta clase contruye una fecha de la que se pueden extraer
*  				 sus parametros para usarlos con otras funciones
*/ 

var meses = new Array ('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
var diasSemana = new Array('Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo');
var diasMes = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

function Fecha(ano,mes,dia){
	this.hoy = new Date();
	this.dia = dia || this.hoy.getDate();
	this.mes = mes || this.hoy.getMonth();
	this.ano = ano || this.hoy.getFullYear();
	this.fecha = new Date(this.ano,this.mes,this.dia);
}

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

function captionMesAno(){
	document.getElementById("caption").innerHTML = this.meses[this.mes] + ' ' + this.ano;
}

function getMaxAnt(mes){
	var diaMaximo;
	if (mes == 1 && (((getAno() % 4 == 0) && (getAno() % 100 != 0)) && (getAno() % 400 == 0)))
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
	var dias = [];
	for (i = this.inicioMesAnt(); i <= getMaxAnt(getMesAnt()); i++){
		dias[x] = i;
		x++;
	}
	for (i = 1 ; i <= getMaxAnt(this.mes); i++){
		dias[x] = i;
		x++;
	}
	var resto = 42 - dias.length;
	for (i = 1; i <= resto; i++){
		dias[x]  = i;
		x++;
	}
	
	var filas = 6;
	var z = 0;
	var element = document.getElementById("tabla");
	for (i = 0; i < filas; i++){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "tr" + i);
		element.appendChild(tr);
		for (j = 0; j <= dias.length; j++){
			if (j <= 6){
				var td = document.createElement("td");
				tr.appendChild(td);
				var text = document.createTextNode(dias[z]);
				if (z <= dias.length){
					td.appendChild(text);
					z++;
				}
			}
		}
	}
}