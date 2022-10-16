let productInfo = [];
let comentariosProd = [];
let products = [];
let comments = "";
let estrellas = 0;
let d = new Date();
let date = d.getDate();
let month = d.getMonth()+1;
let year = d.getFullYear();
let hour = (d.getHours()<10?'0':"") + d.getHours();
let min = (d.getMinutes()<10?'0':"") + d.getMinutes();
let sec = d.getSeconds();
let dateStr = year +"-"+month+"-"+date+" "+hour+":"+min+":"+sec;
let productsRelativos = "";

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productInfo = resultObj.data;
        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            products = resultObj.data;
            
          
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
           
            comentariosProd = resultObj.data;
            showProductInfo(productInfo,products,comentariosProd);
        }
    });
});


// Funcion para redirigirnos a su id
function guardarIdProducto(id){
    localStorage.setItem('prodID', id)
    console.log(localStorage.getItem("prodID",id))
    location.href = "product-info.html"
}


function showProductInfo(productInfo,products,comentariosProd){
        let name = document.getElementById("productName");
        let desc = document.getElementById("productDesc");
        let cost = document.getElementById("productCost");
        let count = document.getElementById("productCount");
        let categoria = document.getElementById("productCat");
        let imgs = "";
name.innerHTML = productInfo.name;
desc.innerHTML = productInfo.description;
cost.innerHTML = productInfo.currency+" "+productInfo.cost;
count.innerHTML = productInfo.soldCount;
categoria.innerHTML = products.catName;

for (let i = 0; i < productInfo.images.length; i++) {
   imgs += `
   <img class="img" src="`+productInfo.images[i] +`"width="240px" height="190px" 
   Style="padding: 10px; border-radius:20px;">
   
   `
   document.getElementById("imagenesIlus").innerHTML = imgs;
    
};

for (let comment in comentariosProd){
    comments +=`<div class="card">
    <div class="card-body">
    <p small mb-0 ms-2><b>`+comentariosProd[comment].user+`</b> - `+comentariosProd[comment].dateTime+` -
    `
switch(comentariosProd[comment].score){
    case 1:
        comments += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        </p>
        <p>`+comentariosProd[comment].description+`</p>
        </div>
        </div>
        `
        document.getElementById("seccionComentarios").innerHTML = comments;
        break;

        case 2:
            comments += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        </p>
        <p>`+comentariosProd[comment].description+`</p>
        </div>
        </div>
        `
        document.getElementById("seccionComentarios").innerHTML = comments;
        break;
        
        case 3:
            comments += ` <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        </p>
        <p>`+comentariosProd[comment].description+`</p>
            </div>
        </div>         
          `
        
        document.getElementById('seccionComentarios').innerHTML = comments;
            break;

        case 4:
            comments += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        </p>
        <p>`+comentariosProd[comment].description+`</p>
        </div>
        </div>
        `
        document.getElementById("seccionComentarios").innerHTML = comments;
        break;
           
        case 5:
            comments += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        </p>
        <p>`+comentariosProd[comment].description+`</p>
        </div>
        </div>
        `
        document.getElementById("seccionComentarios").innerHTML = comments;
        break;
        
        default:
            comments += `<span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        </p>
        <p>`+comentariosProd[comment].description+`</p>
        </div>
        </div>
        `
        document.getElementById("seccionComentarios").innerHTML = comments;
        break;

    }
}
// Productos relacionados, entrega 4
for (let productsRelated of productInfo.relatedProducts){
        productsRelativos+=`
        <div onclick="guardarIdProducto(`+productsRelated.id+`)" class="row" style="display:inline-block;">
            <div  class="col-md-2">
                <div class="card text-left m-4" style="width:260px; cursor:pointer;">
                    <img src="`+productsRelated.image+`" class="card-img-top">
                        <div class="card-body">
                                <h5>`+productsRelated.name+`</h5>
                         </div>
                </div>
            </div>
        </div>
        `
       }
       document.getElementById("productosRelacionados").innerHTML= productsRelativos;
    }      


//Agregar comentarios, y puntuacion.
let btnComentario = document.getElementById("btnComentar");
btnComentario.addEventListener("click", function(e){
let comentario = document.getElementById("opinion").value;
let usuario = localStorage.getItem("usuario");

if (estrellas > 0) {
    comments +=`<div class="card"><div class="card-body"> <p small mb-0 ms-2><b>`+usuario+`</b> - `+dateStr+` - `;

}else{
      comments += "";
}

switch(estrellas){
    case 1:
        comments += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        </p>
        <p>`+comentario+`</p>
        </div>
        </div>
        `
        document.getElementById("seccionComentarios").innerHTML = comments;
        estrellas=0;
        break;

        case 2:
            comments += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        </p>
        <p>`+comentario+`</p>
        </div>
        </div>
        `
        document.getElementById("seccionComentarios").innerHTML = comments;
        estrellas=0;
        break;
        
        case 3:
            comments += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        </p>
        <p>`+comentario+`</p>
        </div>
        </div>
        `
        document.getElementById("seccionComentarios").innerHTML = comments;
        estrellas=0;
        break;

        case 4:
            comments += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        </p>
        <p>`+comentario+`</p>
        </div>
        </div>
        `
        document.getElementById("seccionComentarios").innerHTML = comments;
        estrellas=0;
        break;
           
        case 5:
            comments += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        </p>
        <p>`+comentario+`</p>
        </div>
        </div>
        `
        document.getElementById("seccionComentarios").innerHTML = comments;
        estrellas=0;
        break;
        
        default:    
        Swal.fire({
                title: "Informacion incorrecta",
                text: "Escoja una puntuacion y/o escriba su comentario",
                icon: "error",
                backdrop: true,
                timer: 4000,
                allowOutsideClick: true,
                allowEscapeKey: true,
                allowEnterKey: true,
                showConfirmButton: false
            });
        break;
    }
});
// Estrellas para puntuar un nuevo comentario.
document.getElementById('1star').addEventListener('click', () => {
    estrellas = 1;
});
document.getElementById('2star').addEventListener('click', () => {
    estrellas = 2;
});
document.getElementById('3star').addEventListener('click', () => {
    estrellas = 3;
});
document.getElementById('4star').addEventListener('click', () => {
    estrellas = 4;
});
document.getElementById('5star').addEventListener('click', () => {
    estrellas = 5;
});


