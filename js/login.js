/* Alerta de errar al no llenar los campos */
function showAlertError() {
  document.getElementById("alert-danger").classList.add("show");
}

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const data_pass = new FormData(formulario);

    let password = data_pass.get("password");

    const inputs = formulario.querySelectorAll("input");

    let vacio = false;

    inputs.forEach((input) => {
      if (input.value.trim() == "") {
        vacio = true;
      }
    });
    if (vacio) {
      showAlertError();
    } else {
      location.href = "principal.html";
    }
  });
});

/* Iniciar Sesion con Google */
function onSuccess(googleUser) {

    location.href = "principal.html";
}
function onFailure(error) {
  showAlertError();
}
function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 210,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure,
  });
}





