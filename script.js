var urlBase = 'https://api.yumserver.com/16748/products';

// Obtener todos los productos
function ObtenerProductos() {
  fetch(urlBase)
    .then(response => response.json())
    .then(MostrarProductos)
    .catch(error => console.error('Error:', error));
}

// Mostrar todos los productos
function MostrarProductos(productos) {
  let html = '';
  for (let i = 0; i < productos.length; i++) {
    console.log(productos[i].titulo)
    html += `
      <tr>
        <td><b>${productos[i].idcod}</b></td>
        <td><b>${productos[i].titulo}</b></td>
        <td>${productos[i].precioPeso}</td>
        <td>${productos[i].precioDolar}</td>
        <td>${productos[i].fecha}</td>
        <td><button onclick="Borrar('${productos[i].idcod}')">Borrar</button></td>
      </tr>
    `;
  }
  document.getElementById('resultados').innerHTML = html;
}

// borrar

var ids  = ['lista', 'nuevo-producto'];
function Mostrar(_div){
  for (let i = 0; i < ids.length; i++){
    document.getElementById(ids[i]).setAttribute('style', 'display:none');
  }
  document.getElementById(_div).removeAttribute('style');
}
