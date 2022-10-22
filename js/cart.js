document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
           carritoInfo = resultObj.data;
           mostrarInfoCart (carritoInfo);
           agregarNewObj();
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
    let unitCost= carritoInfo.articles[0].unitCost;
imagen.src = carritoInfo.articles[0].image;
name.innerText = carritoInfo.articles[0].name;
precio.innerText = currency + " " + unitCost;
total.innerHTML = "<b>"+currency+" "+unitCost+"</b>";
   }

// Agregar nuevo objeto al carrito

function agregarNewObj(){
    let productCart = "";
    let productInfo = JSON.parse(localStorage.getItem("nuevoObj"));
    productCart += `
    <div class="row">
  
    <img src="`+productInfo.images[0]+`" style="width: 90px; height: 40px;">
    
    <div class="col-md-1" style="width: 120px;" >
    `+productInfo.name+`
    </div>
    
    <div class="col-md-1">
    `+productInfo.currency+ " " +productInfo.cost+ `
    </div>
    
    <div class="col-md-1">
      
      <input onclick="calcularValor()" type="number" class="form-control"  id="btnCantidad" value="1" min="1" style="width: 60px; height: 40px;">
      
    </div>
    
    <div class="col-md-1" id="precioTotal">
  <b>  ` +productInfo.currency+ " " +productInfo.cost+ `</b>
    </div>
  
</div>
    `
    document.getElementById("articulosCarrito").innerHTML += productCart;
}


function calcularValor() {
    let producto = JSON.parse(localStorage.getItem("nuevoObj"));
    let cantidadArticulo = document.getElementById("btnCantidad").value;
    let precioTotal = document.getElementById("precioTotal");
    precioTotal.innerHTML = `<b>`+ producto.currency+" "+ producto.cost * cantidadArticulo+ `</b>`
}