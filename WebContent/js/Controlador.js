/**
 * 
 */

function desactivarCalen(){
	var calen = document.getElementById("btn_calen");
	calen.setAttribute("class", "glyphicon glyphicon-calendar btn btn-disabled disabled");
	calen.disabled=true;
}

function activarCalen(){
	var calen = document.getElementById("btn_calen");
	calen.setAttribute("class", "glyphicon glyphicon-calendar btn btn-info");
	calen.disabled=false;
}

function desactivarLanzar(){
	var calen = document.getElementById("btn_lanzar");
	calen.setAttribute("class", "btn btn-disabled disabled");
	calen.disabled=true;
}

function activarLanzar(){
	var calen = document.getElementById("btn_lanzar");
	calen.setAttribute("class", "btn btn-success");
	calen.disabled=false;
}

function comprobarSel(){
	var resultado;
	var radio = document.getElementsByName("optradio");
	for (i in radio){
		if (radio[i].checked){
			resultado = radio[i].value;
		}
	}
	if (seleccionados[0] === undefined){
		desactivarLanzar();
	} else if (seleccionados.length === 1 && resultado === "Puntual"){
		activarLanzar();
	} else if (seleccionados.length >= 1  && resultado === "Ciclico"){
		activarLanzar();
	} else if (seleccionados.length > 1 && resultado === "Puntual"){
		desactivarLanzar();
	}
	
	/*var str = document.getElementById("hora").value;
	var hora = str.slice(0,2);
	var minuto = str.slice(3,5);
	console.log(hora + " -- " + minuto + " str = " + str);*/
}