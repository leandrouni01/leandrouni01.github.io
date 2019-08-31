let formulario = document.querySelector("#form");
formulario.onsubmit = function (e) {
    e.preventDefault();
    let nombre = document.querySelector("#nombre").value;
    let apellido = document.querySelector("#apellido").value;
    let sexo= document.querySelector("input[type='radio'][name='genero']:checked").value;
    let telefono = document.querySelector("#telefono").value;
    let fechaNac = document.querySelector("#fechaNacimiento").value;
    let eMail = document.querySelector("#e-mail").value;
    let fila = document.createElement("tr");
    fila.innerHTML = `
    <td>${nombre}</td>
    <td>${apellido}</td>
    <td>${sexo}</td>
    <td>${fechaNac}</td>
    <td>${telefono}</td>
    <td>${eMail}</td>
    <td>
        <button type="button" class="btn btn-danger">Borrar</button>
    </td>
    `;
    fila.querySelector(".btn-danger").addEventListener("click", function () {
        let fila = this.parentNode.parentNode;
        fila.parentNode.removeChild(fila);
    });
    document.querySelector("#cuerpoTabla").appendChild(fila);
};

var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,',
      template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64 = function(s) {
        return window.btoa(unescape(encodeURIComponent(s)))
      },
      format = function(s, c) {
        return s.replace(/{(\w+)}/g, function(m, p) {
          return c[p];
        })
      }
    return function(table, name) {
      if (!table.nodeType) {
        table = document.getElementById(table)
        var tableSize= table.tBodies[0].rows.length;
      }
      if(tableSize>=1){
        var ctx = {
          worksheet: name || 'Worksheet',
          table: table.innerHTML
        }
        window.location.href = uri + base64(format(template, ctx))
      }else{
        document.getElementById("alerta").innerHTML= `
        <div class="alert alert-success alert-dismissable">
				 
				<button type="button" class="close" data-dismiss="alert" aria-hidden="true">
					×
				</button>
				<h4>
					Alerta!
        </h4>
        Estas intentando transformar una tabla vacia
			</div>
        `; 
      }

    }
  })()
