const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let categoryName;
function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function guardarIdProducto(id){
    localStorage.setItem('prodID', id)
    console.log(localStorage.getItem("prodID",id))
    location.href = "product-info.html"
}


//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList() {
  let htmlContentToAppend = "";
  let htmlContentToAppend2 = "";
  htmlContentToAppend2 += `
  <p>Veras aqui todos los productos de la categoria: ` + categoryName + `</p>    `
  document.getElementById("cat_name").innerHTML = htmlContentToAppend2;
  
  for(let i = 0; i < currentCategoriesArray.length; i++){
    let category = currentCategoriesArray[i];
    
    if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){
    
              htmlContentToAppend +=
      `
        <div onclick="guardarIdProducto(`+category.id+`)" class="list-group-item list-group-item-action">
        
        <div class="row">

                <div class="col-3">
                    <img src=  "` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` +category.name + " - " + category.currency + " " + category.cost + `</h4> 
                        <p> ` + category.description +`</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount +  ` vendidos</small> 
                    </div>
                </div>
            </div>
        </div>
        `;
      }
    document.getElementById("listado_productos").innerHTML = htmlContentToAppend;
  }
}
 function sortAndShowCategories(sortCriteria, categoriesArray){
  currentSortCriteria = sortCriteria;

  if(categoriesArray != undefined){
      currentCategoriesArray = categoriesArray;
  }

  currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

  //Muestro las categorías ordenadas
  showCategoriesList();
}
 
/* EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.*/

document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(PRODUCTS_URL).then(function(resultObj){
      if (resultObj.status === "ok"){
          currentCategoriesArray = resultObj.data.products;
          categoryName = resultObj.data.catName;
          showCategoriesList()
        
      }
  });

  document.getElementById("sortAsc").addEventListener("click", function(){
      sortAndShowCategories(ORDER_ASC_BY_NAME);
  });

  document.getElementById("sortDesc").addEventListener("click", function(){
      sortAndShowCategories(ORDER_DESC_BY_NAME);
  });

  document.getElementById("sortByCount").addEventListener("click", function(){
      sortAndShowCategories(ORDER_BY_PROD_COUNT);
  });

  document.getElementById("clearRangeFilter").addEventListener("click", function(){
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showCategoriesList();
  });

document.getElementById("rangeFilterCount").addEventListener("click", function(){
  //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
  //de productos por categoría.
  minCount = document.getElementById("rangeFilterCountMin").value;
  maxCount = document.getElementById("rangeFilterCountMax").value;

  if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
      minCount = parseInt(minCount);
  }
  else{
      minCount = undefined;
  }

  if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
      maxCount = parseInt(maxCount);
  }
  else{
      maxCount = undefined;
  }

  showCategoriesList();
});
});
