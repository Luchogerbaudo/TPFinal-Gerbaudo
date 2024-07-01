var urlBase = 'https://api.yumserver.com/16748/products';

// GET:
// Obtener todos los productos
function ObtenerProductos() {
  fetch(urlBase, {
    method: 'GET'
  })
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
        <td><button onclick="Modificar('${productos[i].idcod}')">Modificar</button></td>
      </tr>
    `;
  }
  document.getElementById('resultados').innerHTML = html;
}

// POST:
// Crear nuevo producto
function CrearNuevoProducto() {
  let producto = {
    titulo: document.getElementById('titulo').value,
    precioPeso: document.getElementById('precioPeso').value,
    precioDolar: document.getElementById('precioDolar').value,
    fecha: document.getElementById('fecha').value
  };
  fetch(urlBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  })
    .then(response => response.text())
    .then(
      function (texto) {
        if (texto.trim() == "OK") {
          alert('Se creo el producto con exito.');
          Mostrar('lista');
          ObtenerProductos();
        } else {
          alert(texto);
        }
      }
    )
    .catch(error => console.error('Error:', error));
}

// PATCH:
// Modificar un producto
function Modificar(idcod) {
  fetch(`${urlBase}/${idcod}`)
    .then(response => response.json())
    .then(producto => {
      document.getElementById('idModificar').value = producto.idcod;
      document.getElementById('tituloModificar').value = producto.titulo;
      document.getElementById('precioPesoModificar').value = producto.precioPeso;
      document.getElementById('precioDolarModificar').value = producto.precioDolar;
      document.getElementById('fechaModificar').value = producto.fecha;
      Mostrar('modificar-producto');
    })
    .catch(error => console.error('Error:', error));
}

function GuardarCambios() {
  let idModificar = document.getElementById('idModificar').value;
  let producto = {
    titulo: document.getElementById('tituloModificar').value,
    precioPeso: parseFloat(document.getElementById('precioPesoModificar').value),
    precioDolar: parseFloat(document.getElementById('precioDolarModificar').value),
    fecha: document.getElementById('fechaModificar').value
  };

  fetch(`${urlBase}/${idModificar}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  })
    .then(response => response.text())
    .then(texto => {
      if (texto.trim() === 'OK') {
        alert(`Producto con ID ${idModificar} modificado correctamente.`);
        ObtenerProductos(); // Actualizamos tabla
        Mostrar('lista'); // Mostramos la tabla
      } else {
        alert(texto);
      }
    })
    .catch(error => console.error('Error:', error));
}

// DELETE:
// Borrar un producto
function Borrar(idcod) {
  if (confirm(`¿Borrar el producto con ID: ${idcod}?`)) {
    fetch(`${urlBase}/${idcod}`, {
      method: 'DELETE'
    })
      .then(response => response.text())
      .then(function (texto) {
        if (texto.trim() === "OK") {
          alert(`ID ${idcod} borrado.`);
          ObtenerProductos(); // Actualizamos tabla
        } else {
          alert(texto);
        }
      })
      .catch(error => console.error('Error:', error));
  } else {
    // Cancelar el borrado
    console.log('Borrado cancelado.');
  }
}

// Mostrar un div y ocultar los otros
var ids = ['lista', 'nuevo-producto', 'modificar-producto'];
function Mostrar(_div) {
  for (let i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).style.display = 'none';
  }
  document.getElementById(_div).style.display = 'block';
}