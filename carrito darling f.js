
/* =====================================
   CARRITO DE COMPRAS - CONS TRUCOLOR
   ===================================== */

// Lista que almacena los productos seleccionados.
const carrito = [];

// Elementos del HTML.
const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");
const mensajeCarrito = document.getElementById("mensaje-carrito");
const mensajePago = document.getElementById("mensaje-pago");


// Convierte los números al formato de pesos dominicanos.
function formatoPesos(cantidad) {
    return "RD$ " + cantidad.toLocaleString("es-DO");
}


// Calcula la suma de los productos.
function calcularTotal() {
    let suma = 0;

    carrito.forEach(function(producto) {
        suma += producto.precio * producto.cantidad;
    });

    return suma;
}


// Muestra los productos y actualiza el total.
function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach(function(producto, indice) {

        const subtotal = producto.precio * producto.cantidad;

        const fila = document.createElement("tr");

        const columnaNombre = document.createElement("td");
        columnaNombre.textContent = producto.nombre;

        const columnaPrecio = document.createElement("td");
        columnaPrecio.textContent = formatoPesos(producto.precio);

        const columnaCantidad = document.createElement("td");
        columnaCantidad.textContent = producto.cantidad;

        const columnaSubtotal = document.createElement("td");
        columnaSubtotal.textContent = formatoPesos(subtotal);

        const columnaAccion = document.createElement("td");

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.type = "button";
        botonEliminar.className = "btn-eliminar";

        botonEliminar.addEventListener("click", function() {
            carrito.splice(indice, 1);
            mensajePago.textContent = "";
            mostrarCarrito();
        });

        columnaAccion.appendChild(botonEliminar);

        fila.appendChild(columnaNombre);
        fila.appendChild(columnaPrecio);
        fila.appendChild(columnaCantidad);
        fila.appendChild(columnaSubtotal);
        fila.appendChild(columnaAccion);

        listaCarrito.appendChild(fila);
    });

    // Actualizar el total general.
    totalElemento.textContent = formatoPesos(calcularTotal());

    // Mostrar un mensaje según el estado del carrito.
    if (carrito.length === 0) {
        mensajeCarrito.textContent =
            "Todavía no has agregado productos.";
    } else {
        mensajeCarrito.textContent =
            "Productos diferentes en el carrito: " + carrito.length;
    }

    // Desactivar botones cuando el carrito está vacío.
    document.getElementById("btn-vaciar").disabled =
        carrito.length === 0;

    document.getElementById("btn-completar").disabled =
        carrito.length === 0;
}


// AGREGAR PRODUCTOS AL CARRITO.

const botonesAgregar = document.querySelectorAll(".btn-agregar");

botonesAgregar.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);

        // Comprobar si el producto ya existe.
        const productoExistente = carrito.find(function(producto) {
            return producto.nombre === nombre;
        });

        if (productoExistente) {

            // Aumentar la cantidad si ya está agregado.
            productoExistente.cantidad++;

        } else {

            // Agregar un producto nuevo.
            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });
        }

        mensajePago.textContent = "";
        mostrarCarrito();
    });
});


// BOTÓN PAGAR.

document.getElementById("btn-pagar").addEventListener("click", function() {

    document.getElementById("carrito").scrollIntoView({
        behavior: "smooth"
    });

    if (carrito.length === 0) {

        mensajePago.style.color = "#c62828";
        mensajePago.textContent =
            "Agrega productos al carrito antes de pagar.";

        return;
    }

    const total = calcularTotal();

    mensajePago.style.color = "#2e7d32";
    mensajePago.textContent =
        "Tu pedido está listo. Total a pagar: " +
        formatoPesos(total);
});


// BOTÓN VACIAR CARRITO.

document.getElementById("btn-vaciar").addEventListener("click", function() {

    // Eliminar todos los productos.
    carrito.length = 0;

    mensajePago.style.color = "#c62828";
    mensajePago.textContent = "El carrito ha sido vaciado.";

    mostrarCarrito();
});


// BOTÓN COMPLETAR PAGO.

document.getElementById("btn-completar").addEventListener("click", function() {

    if (carrito.length === 0) {

        mensajePago.style.color = "#c62828";
        mensajePago.textContent =
            "Debes agregar productos antes de continuar.";

        return;
    }

    // Calcular el total del pedido.
    const total = calcularTotal();

    // Preparar los datos del pedido.
    const pedido = {
        productos: carrito,
        total: total
    };

    // Guardar el pedido durante la sesión del navegador.
    sessionStorage.setItem(
        "pedidoConsTrucolor",
        JSON.stringify(pedido)
    );

    // Abrir el formulario de pago.
    window.location.href = "formulario de pago con css .html";
});


// Mostrar el carrito vacío al entrar por primera vez.
mostrarCarrito();
