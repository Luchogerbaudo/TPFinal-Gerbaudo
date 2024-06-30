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

// Función para borrar un producto
function Borrar(idcod) {
    if (confirm(`¿Estás seguro de que deseas borrar el producto con ID ${idcod}?`)) {
      fetch(`${urlBase}/${idcod}`, {
          method: 'DELETE'
      })
      .then(response => response.text())
      .then(function(texto) {
          if (texto.trim() === "OK") {
              alert(`Producto con ID ${idcod} borrado correctamente.`);
              ObtenerProductos(); // Actualizar la lista de productos después del borrado
          } else {
              alert(texto);
          }
      })
      .catch(error => console.error('Error al borrar:', error));
    } else {
      // Cancelar el borrado
      console.log('Borrado cancelado.');
    }
  }
  
  // Función para mostrar un div y ocultar los demás
  var ids = ['lista', 'nuevo-producto'];
  function Mostrar(_div) {
    for (let i = 0; i < ids.length; i++) {
      document.getElementById(ids[i]).style.display = 'none';
    }
    document.getElementById(_div).style.display = 'block';
  }a