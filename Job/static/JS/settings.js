function Darkmode() {
    checkBox = document.getElementById("Darkmode");
    navbar = document.getElementById("Navbar");
    if (checkBox.checked == true) {
        document.body.style.cssText = "color:white !important; background-color:grey !important";
        document.cookie = "Darkmode=True";
        navbar.style.cssText = "background-color:#616262 !important";
    } else {
        document.body.style.backgroundColor = "white";
        document.cookie = "Darkmode" + '=; Max-Age=-99999999;';
        document.body.style.color = "black";
        navbar.style.cssText = "background-color:white !important";

    }

}