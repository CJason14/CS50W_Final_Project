document.addEventListener('DOMContentLoaded', function () {
    loadapplications()
});

function loadapplications() {
    fetch('/applications', {
        method: 'PUT'
    })
    .then(response => response.json())
    .then(applications => {
        for (const application in applications) {
            const main = document.getElementById("Applications");

            const div = document.createElement("div");
            div.addEventListener("click", function () {
                clear();
                profile(applications[application].username);
            });
            div.classList.add("application_design");

            const img_div = document.createElement("div");
            img_div.classList.add("application_picture");
            const img = document.createElement("img");
            img.classList.add("Chat_image");
            fetch('/profile_picture', {
                method: 'POST',
                body: JSON.stringify({
                    username: applications[application].username
                })
            })
            .then(response => response.json())
            .then(url =>{
                img.src = url.image_url
            })
            img_div.appendChild(img);
            div.appendChild(img_div);

            const div_user = document.createElement("div");
            div_user.classList.add("application_name");
            const user = document.createElement("h3");
            const username = document.createTextNode(applications[application].username);
            user.appendChild(username);
            div_user.appendChild(user);
            div.appendChild(div_user);

            main.appendChild(div);

        }
    })
}

function clear() {
    const app = document.getElementById("Full_Application");
    app.innerHTML = "";
}

function profile(username_user) {
    const main = document.getElementById("Full_Application");

    const username = document.createElement("h2");
    const username_c = document.createTextNode(username_user);
    username.appendChild(username_c);
    main.appendChild(username);
    
    main.appendChild(document.createElement("br"));

    const img_div = document.createElement("div");
    img_div.classList.add("profile_picture");
    const img = document.createElement("img");
    img.classList.add("profile_image");
    fetch('/profile_picture', {
        method: 'POST',
        body: JSON.stringify({
            username: username_user
        })
    })
    .then(response => response.json())
    .then(url =>{
        img.src = url.image_url
    })
    img_div.appendChild(img);
    main.appendChild(img_div);

    main.appendChild(document.createElement("br"));



    main.appendChild(document.createElement("br"));

    const big_button_div = document.createElement("div");
    big_button_div.classList.add("big_button_outer");
    const big_button_accept = document.createElement("div");
    big_button_accept.classList.add("big_button");
    const accept = document.createTextNode("Accept");
    big_button_accept.style.color = "Green";
    big_button_accept.appendChild(accept);
    big_button_div.appendChild(big_button_accept)

    const big_button_decline = document.createElement("div");
    big_button_decline.classList.add("big_button");
    const decline = document.createTextNode("Decline");
    big_button_decline.style.color = "Red";
    big_button_decline.appendChild(decline);
    big_button_div.appendChild(big_button_decline);

    main.appendChild(big_button_div);
}