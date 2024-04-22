(function($){
  $.fn.backgroundMove=function(options){
          var defaults={
          movementStrength:'50'
      },
      options=$.extend(defaults,options);

       var $this = $(this);

         var movementStrength = options.movementStrength;
          var height = movementStrength / $(window).height();
          var width = movementStrength / $(window).width();
          $this.mousemove(function(e){
                    var pageX = e.pageX - ($(window).width() / 2);
                    var pageY = e.pageY - ($(window).height() / 2);
                    var newvalueX = width * pageX * -1 - 25;
                    var newvalueY = height * pageY * -1 - 50;
                    $this.css("background-position", newvalueX+"px     "+newvalueY+"px");
          });

      }
})(jQuery);

$('.box').backgroundMove({
  movementStrength:'50'
});

let productos = [
  {
    id: 1,
    nombre: "Big mac",
    precio: 5,
    imagen: "./img/choccolate_cake.jpg",
  },
  {
    id: 2,
    nombre: "Coca-cola pack",
    precio: 6,
    imagen: "./img/coca.jpg",
  },
  {
    id: 3,
    nombre: "Console game",
    precio: 50,
    imagen: "./img/ps4.png",
  },
  {
    id: 4,
    nombre: "Apple Airpods",
    precio: 190,
    imagen: "./img/airpods.jpg",
  },
  {
    id: 5,
    nombre: "Playstation 4",
    precio: 290,
    imagen: "./img/gaming-console.jpg",
  },
  {
    id: 6,
    nombre: "Iphone x",
    precio: 699,
    imagen: "./img/iphone.png",
  },
  {
    id: 7,
    nombre: "Air jordan travis",
    precio: 1500,
    imagen: "./img/travias.png",
  },
  {
    id: 8,
    nombre: "Horse",
    precio: 2500,
    imagen: "./img/horse.jpg",
  },
  {
    id: 9,
    nombre: "Designer handbag",
    precio: 3400,
    imagen: "./img/designer-handbag.jpg",
  },
  {
    id: 10,
    nombre: "Luxury wine",
    precio: 6000,
    imagen: "./img/luxury-wine.jpg",
  },
  {
    id: 11,
    nombre: "Diamond ring",
    precio: 10500,
    imagen: "./img/diamond-ring.jpg",
  },
  {
    id: 12,
    nombre: "Jet ski",
    precio: 12000,
    imagen: "./img/jet-ski.jpg",
  },
  {
    id: 13,
    nombre: "Rolex",
    precio: 15500,
    imagen: "./img/rolex.jpg",
  },
  {
    id: 14,
    nombre: "Ford f 150",
    precio: 30500,
    imagen: "./img/ford-f-150.jpg",
  },
  {
    id: 15,
    nombre: "Tesla",
    precio: 73000,
    imagen: "./img/png-clipart-tesla-tesla.png",
  },
  {
    id: 16,
    nombre: "Ferrari",
    precio: 230000,
    imagen: "./img/png-clipart-ferrari-ferrari.png",
  },
  {
    id: 17,
    nombre: "Single family home",
    precio: 300500,
    imagen: "./img/single-family-home.jpg",
  },
  {
    id: 18,
    nombre: "Gold bar",
    precio: 725000,
    imagen: "./img/gold-bar.jpg",
  },
  {
    id: 19,
    nombre: "Mcdonalds",
    precio: 1500300,
    imagen: "./img/mcdonalds-franchise.jpg",
  },
  {
    id: 20,
    nombre: "Yatch",
    precio: 7500300,
    imagen: "./img/ship_PNG5414.png",
  },
  {
    id: 21,
    nombre: "Mansion",
    precio: 45000400,
    imagen: "./img/mansion.jpg",
  },
  {
    id: 22,
    nombre: "Boeing 747",
    precio: 148000000,
    imagen: "./img/boeing-747.jpg",
  },
  {
    id: 23,
    nombre: "Mona Lisa",
    precio: 780985000,
    imagen: "./img/mona-lisa.jpg",
  },
  {
    id: 24,
    nombre: "NBA Team",
    precio: 2044000900,
    imagen: "./img/nba-team.jpg",
  },
];

const contenedor = document.getElementById("container");
contenedor.innerHTML = "";

productos.forEach((producto, indice) => {
  let card = document.createElement("div");
  card.classList.add("card", "col-sm-12", "col-lg-3");
  let html = `
    <img src="${producto.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">$${producto.precio}</p>
      <button class="btn btn-primary" onClick="abrirCarrito(${indice})">Añadir al carrito</button>
    </div>
      `;
  card.innerHTML = html;
  contenedor.appendChild(card);
});

const cart = [];

const abrirCarrito = (indiceDelArrayProducto) => {
  //findIndex devuelve el indice del elemento encontrado
  // si no encuentra nada devuelve menos 1 (-1)
  const indiceEncontradoCarrito = cart.findIndex((elemento) => {
    return elemento.id === productos[indiceDelArrayProducto].id;
  });
  if (indiceEncontradoCarrito === -1) {
    //agrego el producto
    const productoAgregar = productos[indiceDelArrayProducto];
    productoAgregar.cantidad = 1;
    cart.push(productoAgregar);
    actualizarCarrito();
  } else {
    //incremento cantidad
    cart[indiceEncontradoCarrito].cantidad += 1;
    actualizarCarrito();
  }
};

let modalCarrito = document.getElementById("cart");

const actualizarCarrito = () => {
  let total = 177000000000;
  modalCarrito.className = "cart";
  modalCarrito.innerHTML = "";
  if (cart.length > 0) {
    cart.forEach((producto, indice) => {
      total = total - producto.precio * producto.cantidad;
      const carritoContainer = document.createElement("div");
      carritoContainer.className = "producto-carrito";
      carritoContainer.innerHTML = `
        <img class="car-img" src="${producto.imagen}"/>
        <div class="product-details">
          ${producto.nombre}
        </div>
        <div class="product-details" > Cantidad: ${producto.cantidad}</div>
        <div class="product-details"> Precio: $ ${producto.precio}</div>
        <div class="product-details"> Subtotal: $ ${
          producto.precio * producto.cantidad
        }</div>
        <button class="btn btn-danger"  id="remove-product" onClick="removeProduct(${indice})">Remover</button>
         `;
      modalCarrito.appendChild(carritoContainer);
    });
    // Dibujo el total y lo appendeo en el div capturado y guardado en la variable modalCarrito
    const totalContainer = document.createElement("div");
    totalContainer.className = "total-carrito";
    totalContainer.innerHTML = `<div class= "total">Jeff money $ ${total}</div>
    <button class= "btn btn-danger finalizar" id="finalizar" onClick="finalizarCompra()"> COMPRAR </button>`;
    modalCarrito.appendChild(totalContainer);
  } else {
    modalCarrito.classList.remove("cart");
  }
};

const removeProduct = (indice) => {
  cart.splice(indice, 1);
  actualizarCarrito();
};
const finalizarCompra = () => {
  const total = document.getElementsByClassName("total")[0].innerHTML;
  modalCarrito.innerHTML = "";
  const compraFinalizada = `<div class="compra-finalizada"><p class="compra-parrafo"> Dinero restante:  ${total}</p></div>
  <div class="datos-cliente">
  <button class= "btn btn-danger formulario" id="formulario" onClick="dibujarFormu()"> PAGAR </button>
  </div>`;
  modalCarrito.innerHTML = compraFinalizada;
};
const dibujarFormu = () => {
  modalCarrito.innerHTML = "";
  const formulario = `  
  <h2> DATOS PARA EL ENVÍO </h2> 
  <div class="contact__secction-container">
   <div class="row">
     <div class="contact__secction__item">
       <label>Nombre</label>
       <input type="text" id="nombre" placeholder="Nombre"  />
     </div>
     <div class="contact__secction__item">
       <label>E-mail</label>
       <input type="text" id="mail" placeholder="E-mail" />
     </div>
     <div class="contact__secction__item">
       <label>Domicilio</label>
       <input type="text" id="domicilio" placeholder="Domicilio" />
     </div>
     <div class="contact-button">
       <button type="button" class="btn btn-danger envio" onClick="mostrarMensaje()" >Confirmar</button>
     </div>
   </div>
 </div>`;
  modalCarrito.innerHTML = formulario;
};

const mostrarMensaje = () => {
  const nombreCliente = document.getElementById("nombre").value;
  modalCarrito.innerHTML = "";
  let mensaje = `<div class="mensaje-final bg-success">Gracias ${nombreCliente} por su compra!. Dejaste pobre a Jeff Bezos :(</div>`;
  modalCarrito.innerHTML = mensaje;
};

$(document).ready(() => {
  $('#personas').hide();

  $('#importarJson').click(function() {
      $.ajax({
          type: 'GET',
          url: 'listabillon.json',
          dataType: 'json'
      }).done((data) => {
          $.each(data, function(indice, persona) {
              let fila = $('<tr>');
              fila.append($(`<td>${persona.id}</td>`));
              fila.append($(`<td>${persona.nombre}</td>`));
              fila.append($(`<td>${persona.plata}</td>`));
              fila.append($(`<td>${persona.edad}</td>`));

              $('#personas tbody').append(fila);
          });

          $('#personas').show();
      });
  });
});