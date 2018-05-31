/**
 * 
 */

function desactivarCalen() {
	var calen = document.getElementById("btn_calen");
	calen.setAttribute("class",
			"glyphicon glyphicon-calendar btn btn-disabled disabled");
	calen.disabled = true;
}

function activarCalen() {
	var calen = document.getElementById("btn_calen");
	calen.setAttribute("class", "glyphicon glyphicon-calendar btn btn-info");
	calen.disabled = false;
}

function desactivarLanzar() {
	var calen = document.getElementById("btn_lanzar");
	calen.setAttribute("class", "btn btn-disabled disabled");
	calen.disabled = true;
}

function activarLanzar() {
	var calen = document.getElementById("btn_lanzar");
	calen.setAttribute("class", "btn btn-success");
	calen.disabled = false;
}

function desactivarLimpiar() {
	var calen = document.getElementById("btn_limpiar");
	calen.setAttribute("class", "btn btn-disabled disabled");
	calen.disabled = true;
}

function activarLimpiar() {
	var calen = document.getElementById("btn_limpiar");
	calen.setAttribute("class", "btn btn-danger");
	calen.disabled = false;
}

function list_radio(id) {
	var fechaActual = new Date();
	var mes = fechaActual.getMonth();
	var ano = fechaActual.getFullYear();
	$(document).ready(function() {
		$('#' + id + ' input[type=radio]').click(function() {
			switch (this.value) {
			case "Ciclico":
				activarCalen();
				comprobarSel();
				break;
			case "Puntual":
				activarCalen();
				comprobarSel();
				break;
			case "Siempre":
				desactivarCalen();
				activarLanzar();
				break;
			}
		});
	});
}

function check_dias() {
	var grupo = document.getElementsByClassName("check1");
	var marcados = false;
	$(document).ready(function() {
		$('#check_dias input[type=checkbox]').click(function() {
			if (this.value === "TODOS") {
				if (!marcados){
					for (i in grupo) {
						grupo[i].checked = true;
					}
					marcados = true;
				} else {
					for (i in grupo) {
						grupo[i].checked = false;
					}
					marcados = false;
				}
			}
		});
	});
}

function check_meses() {
	var grupo = document.getElementsByClassName("check2");
	var marcados = false;
	$(document).ready(function() {
		$('#check_meses input[type=checkbox]').click(function() {
			if (this.value === "TODOS") {
				if (!marcados){
					for (i in grupo) {
						grupo[i].checked = true;
					}
					marcados = true;
				} else {
					for (i in grupo) {
						grupo[i].checked = false;
					}
					marcados = false;
				}
			}
		});
	});
}

function comprobarSel() {
	var resultado;
	var radio = document.getElementsByName("optradio");
	var modal = document.getElementById("btn_calen");
	for (i in radio) {
		if (radio[i].checked) {
			resultado = radio[i].value;
		}
	}

	var str = document.getElementById("hora").value;
	var hora = parseInt(str.slice(0, 2));
	var minuto = parseInt(str.slice(3, 5));

	for (i in marcados) {
		f = new Date(marcados[i].getFullYear(), marcados[i].getMonth(),
				marcados[i].getDate(), hora, minuto);
		seleccionados.push(f);
	}
	marcados.splice(0, marcados.length);

	if (seleccionados[0] === undefined) {
		desactivarLanzar();
		desactivarLimpiar();
	} else if (seleccionados.length === 1 && resultado === "Puntual") {
		activarLimpiar();
		activarLanzar();
	} else if (seleccionados.length >= 1 && resultado === "Ciclico") {
		activarLanzar();
		activarLimpiar();
	} else if (seleccionados.length > 1 && resultado === "Puntual") {
		desactivarLanzar();
		activarLimpiar();
	}

	if (resultado === "Puntual") {
		modal.setAttribute("data-target", "#modal_calen");
	} else if (resultado === "Ciclico") {
		modal.setAttribute("data-target", "#modal_select");
	}

}