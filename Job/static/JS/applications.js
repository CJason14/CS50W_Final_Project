document.addEventListener('DOMContentLoaded', function () {
    loadapplications()
});

function loadapplications() {
    fetch('/applications', {
        method: 'PUT'
    })
    .then(response => response.json())
    .then(applications => {
        if (applications == "") {
            const main = document.getElementById("Applications");

            const div = document.createElement("div");
            div.classList.add("center");
            const h4 = document.createElement("h4");
            const h4_content = document.createTextNode("No new applications!");
            h4.appendChild(h4_content);
            div.appendChild(h4);

            main.appendChild(div);
        }
        for (const application in applications) {
            if (applications[application].visible){
                const main = document.getElementById("Applications");

                const div = document.createElement("div");
                div.addEventListener("click", function () {
                    clear();
                    profile(applications[application].username, applications[application].id);
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
        }
    })
}

function clear() {
    const app = document.getElementById("Full_Application");
    app.innerHTML = "";
}

function profile(username_user, id) {
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

    const name_div = document.createElement("div");
    fetch('/getuserdata', {
        method: 'POST',
        body: JSON.stringify({
            username: username_user
        })
    })
    .then(response => response.json())
    .then(userdata =>{
        console.log(userdata)
        name_div.classList.add("center");
        const username = document.createElement("h4");
        const username_content = document.createTextNode(userdata.first_name + " " + userdata.last_name);
        username.appendChild(username_content);
        name_div.appendChild(username);
        name_div.appendChild(document.createElement("br"));

        const contact = document.createElement("h4");
        const contact_content = document.createTextNode("Contact:");
        contact.appendChild(contact_content);
        name_div.appendChild(contact);
        
        const email = document.createElement("h5");
        const email_content = document.createTextNode("Email:");
        email.appendChild(email_content);
        name_div.appendChild(email);
        const email_user = document.createElement("p");
        const email_user_content = document.createTextNode(userdata.email);
        email_user.appendChild(email_user_content);
        name_div.appendChild(email_user)

        const phone = document.createElement("h5");
        const phone_content = document.createTextNode("Phone Number:");
        phone.appendChild(phone_content);
        name_div.appendChild(phone);
        const phone_user = document.createElement("p");
        const phone_user_content = document.createTextNode(userdata.phone_number);
        phone_user.appendChild(phone_user_content);
        name_div.appendChild(phone_user)

        name_div.appendChild(document.createElement("br"));

        const a = document.createElement("a");
        const a_content = document.createTextNode("Download CV!")
        a.appendChild(a_content);
        a.href = "media/CV/" + userdata.cv;
        a.download = "CV_" + userdata.first_name;

        name_div.appendChild(a);

    })
    main.appendChild(name_div);

    main.appendChild(document.createElement("br"));

    const big_button_div = document.createElement("div");
    big_button_div.classList.add("big_button_outer");
    const big_button_accept = document.createElement("div");
    big_button_accept.classList.add("big_button");
    const accept = document.createTextNode("Accept");
    big_button_accept.style.color = "Green";
    big_button_accept.addEventListener("click", function () {
        fetch('/application_answer', {
            method: 'POST',
            body: JSON.stringify({
                username: username_user,
                id: id,
                accepted: true
            })
        })
        .then(response => response.json())
        .then(url =>{
           window.location.reload()
        })
    })
    big_button_accept.appendChild(accept);
    big_button_div.appendChild(big_button_accept)

    const big_button_decline = document.createElement("div");
    big_button_decline.classList.add("big_button");
    const decline = document.createTextNode("Decline");
    big_button_decline.style.color = "Red";
    big_button_decline.addEventListener("click", function () {
        fetch('/application_answer', {
            method: 'POST',
            body: JSON.stringify({
                username: username_user,
                id: id,
                accepted: false
            })
        })
        .then(response => response.json())
        .then(url =>{
           window.location.reload()
        })
    })
    big_button_decline.appendChild(decline);
    big_button_div.appendChild(big_button_decline);

    main.appendChild(big_button_div);
}