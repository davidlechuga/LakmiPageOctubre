    
var firebaseConfig = {
    apiKey: "AIzaSyDK6f9anyzAmETNm7--K-m6eAGA5144h6Y",
    authDomain: "lakimi-d3f57.firebaseapp.com",
    databaseURL: "https://lakimi-d3f57.firebaseio.com",
    projectId: "lakimi-d3f57",
    storageBucket: "lakimi-d3f57.appspot.com",
    messagingSenderId: "440806976241",
    appId: "1:440806976241:web:8fa5abc9fdee0852a09750"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
const con  = firebase.database().ref('users');

document
    .getElementById("Form")
    .addEventListener("submit", formSubmit)
  
function formSubmit(e) {
    e.preventDefault();

    //Get value from de DOM
    let name = document.querySelector('#name').value
    let email = document.querySelector('#email').value
    let cel = document.querySelector('#cel').value
    let company = document.querySelector('#company').value
    let message = document.querySelector('#message').value

    // senden mesajes values
    sendMessage(name, email, cel, company, message);

    //msm all are ok
    function alarma() {
        alert('Tu mensage se ha enviado.')
    }
    
    alarma();
    document.getElementById("Form").reset()
};

//Send Message to Firebase(4)

function sendMessage(name, email, cel, company, message) {
  let newFormMessage = con.push();
    newFormMessage.set({
        name: name,
        email: email,
        cel: cel,
        company: company,
        message:message   
  });
}