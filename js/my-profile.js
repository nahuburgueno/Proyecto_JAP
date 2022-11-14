let imagenPerfil = document.getElementById("imagenPerfil");
let inputImagenPerfil = document.getElementById("inputImagenPerfil");
let primerNombre = document.getElementById("nombrePerfil");
let segundoNombre = document.getElementById("sNombrePerfil");
let primerApellido = document.getElementById("pApellidoPerfil");
let segundoApellido = document.getElementById("sApellidoPerfil");
let emailPerfil = document.getElementById("emailPerfil");
let telefonoPerfil = document.getElementById("telefonoPerfil");

/* Desafiate 7 */
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

                                  /* Validacion */
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          guardarPerfil()
          form.classList.add('was-validated')
        }, false)
      })
  })()