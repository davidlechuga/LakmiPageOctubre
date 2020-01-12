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
  
var con = firebase.database().ref('users');

document.getElementById("Form").addEventListener("submit", (e) => {
    e.preventDefault();


    var userInfo = con.push();
    userInfo.set({
        name: getId("name"),
        email: getId("email"),
        cel: getId("cel"),
        company: getId("company"),
        message: getId("message")
    });
    alert("sent");
    console.log("sent");
    
    document.getElementById("Form").reset()
});

function getId(id) {
    return document.getElementById(id).value;
}
