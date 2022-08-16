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

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  if(profile.getId() != "" && profile.getName() != "" && profile.getImageUrl() != "" 
  && profile.getEmail() != ""){
    location.href = "principal.html";
  }
  } 


