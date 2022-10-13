document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
           carritoInfo = resultObj.data;
           mostrarInfoCart (carritoInfo);
         
        }
    });
    });
   
    let cantidad = document.getElementById("cantProduct")
cantidad.addEventListener("click", function(e){
        let valor = carritoInfo.articles[0].unitCost;
        let currency = carritoInfo.articles[0].currency;
        let coste = document.getElementById("subtotal");
        let cantidad = document.getElementById("cantProduct").value;
        if(cantidad > 0 ){
            coste.innerHTML = currency + " " + cantidad * valor;
        }else{
            Swal.fire({
                title: "Informacion incorrecta",
                text: "Debe ingresar una cantidad mayor a 0",
                icon: "error",
                backdrop: true,
                timer: 4000,
                allowOutsideClick: true,
                allowEscapeKey: true,
                allowEnterKey: true,
                showConfirmButton: false
            });
          
        }
       

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
total.innerHTML= currency + " " + unitCost;
   }