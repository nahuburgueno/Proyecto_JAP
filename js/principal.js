document.addEventListener("DOMContentLoaded", function(){
    let nombreUsuario = document.getElementById("nombreUsuario");
 nombreUsuario.innerHTML = localStorage.getItem("usuario");

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});


/* Dark Mode */

let darkToggle = document.querySelector('#darkToggle');
darkToggle.addEventListener('change', ()=> {
    document.body.classList.toggle('dark');
});




