//array donde se cargarán los datos recibidos:
let categoriesArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array) {
  let htmlContentToAppend = "";

  
  let htmlContentToAppend2 = "";
  htmlContentToAppend2 += `
  <p>Veras aqui todos los productos de la categoria: ` + array.catName + `</p>    
`
  document.getElementById("cat_name").innerHTML = htmlContentToAppend2;
  
  for (let i = 0; i < array.products.length; i++) {
    let category = array.products[i];
    htmlContentToAppend +=
      `
        <div class="list-group-item list-group-item-action">
        
        <div class="row">

                <div class="col-3">
                    <img src=  "` +
      category.image +
      `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` +category.name + " - " + category.currency + " " + category.cost +
      `</h4> 
                        <p> ` +
      category.description +
      `</p> 
                        </div>
                        <small class="text-muted">` +
      category.soldCount +
      ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `;
    document.getElementById("listado_productos").innerHTML =
      htmlContentToAppend;
  }
}

/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.

*/

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(LIST_AUTO).then(function (resultObj) {
    if (resultObj.status === "ok") {
      categoriesArray = resultObj.data;
      showCategoriesList(categoriesArray);
    }
  });
});
