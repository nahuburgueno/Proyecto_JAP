let imagenPerfil = document.getElementById("imagenPerfil");
let inputImagenPerfil = document.getElementById("inputImagenPerfil");
let primerNombre = document.getElementById("nombrePerfil");
let segundoNombre = document.getElementById("sNombrePerfil");
let primerApellido = document.getElementById("pApellidoPerfil");
let segundoApellido = document.getElementById("sApellidoPerfil");
let emailPerfil = document.getElementById("emailPerfil");
let telefonoPerfil = document.getElementById("telefonoPerfil");

inputImagenPerfil.addEventListener("change", (event) => {
    url = URL.createObjectURL(event.target.files[0]);
    imagenPerfil.src = url
    localStorage.setItem("imagenPerfil", imagenPerfil.src);

});

document.addEventListener("DOMContentLoaded", function (e){

    imagenPerfil.src = localStorage.getItem("imagenPerfil");
  emailPerfil.value = localStorage.getItem("usuario");
  
  if(localStorage.getItem("perfil")){
         perfil = JSON.parse(localStorage.getItem("perfil"))
         primerNombre.value = perfil.primerNombre
         segundoNombre.value = perfil.segundoNombre
         primerApellido.value = perfil.primerApellido
         segundoApellido.value = perfil.segundoApellido
        telefonoPerfil.value = perfil.telefonoPerfil
  }
  guardarPerfil();
});


function guardarPerfil (){
    let miPerfil= {}; 
    let primerNombre = document.getElementById("nombrePerfil").value;
    let segundoNombre = document.getElementById("sNombrePerfil").value;
    let primerApellido = document.getElementById("pApellidoPerfil").value;
    let segundoApellido = document.getElementById("sApellidoPerfil").value;
    let emailPerfil = document.getElementById("emailPerfil").value;
    let telefonoPerfil = document.getElementById("telefonoPerfil").value;

    if (primerNombre && segundoNombre && primerApellido && segundoApellido && telefonoPerfil !== "" ){
     miPerfil = { primerNombre,segundoNombre,primerApellido,segundoApellido,emailPerfil,telefonoPerfil}

     localStorage.setItem("perfil", JSON.stringify(miPerfil));
    }
    
}
let guardarCambiosPerfil = document.getElementById("guardarCambiosPerfil");
guardarCambiosPerfil.addEventListener("click", function(){
    guardarPerfil();
})