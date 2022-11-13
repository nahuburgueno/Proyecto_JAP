document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
           carritoInfo = resultObj.data;
           mostrarInfoCart (carritoInfo);
           if (localStorage.getItem("nuevoObj")) {
          agregarNewObj();
        }
           precioCarrito();
         cantidad = document.getElementById("cantProduct")
        cantidad.addEventListener("click", function(e){
        let valor = carritoInfo.articles[0].unitCost;
        let currency = carritoInfo.articles[0].currency;
        let coste = document.getElementById("subTotal");
        coste.innerHTML = "<b>" + currency + " " + cantidad.value * valor + "</b>";
        });
        }
    });
    });
   

    function mostrarInfoCart (carritoInfo){
    let precio = document.getElementById("costProduct");
    let imagen = document.getElementById("img");
    let name = document.getElementById("nombre");
    let total = document.getElementById("subTotal");
    let currency = carritoInfo.articles[0].currency;
    let unitCost = carritoInfo.articles[0].unitCost;
imagen.src = carritoInfo.articles[0].image;
name.innerText = carritoInfo.articles[0].name;
precio.innerText = currency + " " + unitCost;
total.innerHTML = "<b>"+currency+" "+unitCost+"</b>";
   }

// Agregar nuevo objeto al carrito 

function agregarNewObj(){
    let productCart = "";
    let productInfo = JSON.parse(localStorage.getItem("nuevoObj"));
    if (productInfo.id == carritoInfo.articles[0].id){
        document.getElementById("cantProduct").value = 2;
        document.getElementById("subTotal").innerHTML = "<b>" + carritoInfo.articles[0].currency + " " + carritoInfo.articles[0].unitCost*2 + "</b>"
    }else {
      productCart += `
      <div class="row" id="divNuevoProducto">
    
      <img src="`+productInfo.images[0]+`" style="width: 90px; height: 40px;">
      
      <div class="col-md-1" style="width: 120px;" >
      `+productInfo.name+`
      </div>
      
      <div class="col-md-1">
      `+productInfo.currency+ " " +productInfo.cost+ `
      </div>
      
      <div class="col-md-1">
        
        <input onclick="carritoCalculos()" type="number" class="form-control"  id="btnCantidad" value="1" min="1" style="width: 60px; height: 40px;">
        
      </div>
      
      <div class="col-md-2" id="precioTotal" style="margin-left: 1rem;" >
    <b>  ` +productInfo.currency+ " " +productInfo.cost+ `</b>
      </div>
    <div class="col-md-2"> 
      <button type="button" class="btn btn-outline-danger fa fa-trash" onclick="eliminarProducto ()"></button> 
    </div>
    
  </div>
      `
      document.getElementById("articulosCarrito").innerHTML += productCart;
    }
    
}


// Multiplicacion de cantidad x precio
function calcularValor() {
  let producto = JSON.parse(localStorage.getItem("nuevoObj"));
  let cantidadArticulo = document.getElementById("btnCantidad").value;
  let precioTotal = document.getElementById("precioTotal");
  precioTotal.innerHTML = `<b>`+ producto.currency+" "+ producto.cost * cantidadArticulo+ `</b>`
}

// DESAFIATE ENTREGA 6
function eliminarProducto () {
  localStorage.removeItem("nuevoObj");
  document.getElementById("divNuevoProducto").innerHTML = "";
  precioCarrito();
}



/* ALERTAS DE COMPRA FINALIZADA Y ALERTA DE ERROR */

function showAlertSuccess() {

  Swal.fire({
    title: "Gracias por su compra.",
    text: "Compra realizada con exito.",
    icon: "success",
    backdrop: true,
    timer: 4000,
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    showConfirmButton: false
});
}

function showAlertError() {
document.getElementById("alert-danger").classList.add("show");
esconderAlert()
}

function esconderAlert(){

$('#alert-danger').delay(2500).hide(300);


}


function carritoCalculos() {
  calcularValor()
  precioCarrito()

}
// PASAR DE UYU A USD, Y HACER LA SUMA PARA MOSTRAR EN EL COSTO TOTAL
function precioCarrito(){
let producto = JSON.parse(localStorage.getItem("nuevoObj"));
let inputAutoPreCargado = document.getElementById("cantProduct").value
let premium = document.getElementById("flexRadioDefault1");
let express = document.getElementById("flexRadioDefault2");
let standar = document.getElementById("flexRadioDefault3");
let precioAutoPreCargado = carritoInfo.articles[0].unitCost * inputAutoPreCargado
let precio = "";
if (producto) {
  if(producto.id !== carritoInfo.articles[0].id){
    let cantidadProducto = document.getElementById("btnCantidad").value
    let precioProducto = producto.cost * cantidadProducto
      if ( producto.currency === "UYU" ){
        let productoEnDolares = producto.cost /= 42
        precioProducto = Math.trunc( productoEnDolares * cantidadProducto)
      }
      precio = precioAutoPreCargado + precioProducto;
        }else {
          precio = precioAutoPreCargado;
        }
          }else {
            precio = precioAutoPreCargado;
}

// AL SELECCIONAR UN TIPO DE ENVIO

let subtotalCarrito = document.getElementById("costoProdCarr");
let costeEnvioCarr = document.getElementById("costeEnvioCarr");
let totalCarrito = document.getElementById("totalCosteCarr");

if (premium.checked){
  envio = Math.trunc(precio * 0.15)
  costeEnvioCarr.innerHTML = "USD " + envio
  total = precio + envio
  totalCarrito.innerHTML = "USD " + total;
};
premium.addEventListener("click", function(e){
  envio = Math.trunc(precio * 0.15)
  costeEnvioCarr.innerHTML = "USD " + envio
  total = precio + envio
  totalCarrito.innerHTML = "USD " + total;
});

express.addEventListener("click", function(e){
  envio = Math.trunc(precio * 0.07)
  costeEnvioCarr.innerHTML = "USD " + envio
  total = precio + envio
  totalCarrito.innerHTML = "USD " + total;
});
standar.addEventListener("click", function(e){
  envio = Math.trunc(precio * 0.05)
  costeEnvioCarr.innerHTML = "USD " + envio
  total = precio + envio
  totalCarrito.innerHTML = "USD " + total;
});

let subtotalCarritoMostrar = "USD " + precio;

subtotalCarrito.innerHTML = subtotalCarritoMostrar;

}

// READ ONLY EN FORMA DE PAGO

let checkboxTarjeta = document.getElementById("chBoxTarjeta");
let checkboxTransferencia = document.getElementById("chBoxTransferencia");
 
function formaDePago() { 
  let error = document.getElementById("textoError")
  if (checkboxTransferencia.checked || checkboxTarjeta.checked){
    error.classList.add("d-none")
  }else{
    error.classList.remove("d-none")
    error.classList.add("text-danger")
  }

}

  checkboxTransferencia.addEventListener("click", function(e){
checkboxTarjeta.checked = false
    document.getElementById("NumTarjeta").readOnly = true;
    document.getElementById("CodSeguridad").readOnly = true;
    document.getElementById("VenTarjeta").readOnly = true;
    document.getElementById("NumCuenta").readOnly = false;
    document.getElementById("formaDePago").innerText = "Transferencia Bancaria";
    formaDePago()
  
  })


checkboxTarjeta.addEventListener("click", function(e){
  checkboxTransferencia.checked = false
  document.getElementById("NumTarjeta").readOnly = false;
  document.getElementById("CodSeguridad").readOnly = false;
  document.getElementById("VenTarjeta").readOnly = false;
  document.getElementById("NumCuenta").readOnly = true;
  document.getElementById("formaDePago").innerText = "Tarjeta de credito";
  formaDePago()
})





