function myFunction() {
  var moreText = document.getElementById("powerText");
  var btnText = document.getElementById("myBtn");

  if (moreText.style.display === "none") {
    moreText.style.display = "inline";
    btnText.innerHTML = "Read less"; 
  } else {
    moreText.style.display = "none";
    btnText.innerHTML = "Read more";
  }
}