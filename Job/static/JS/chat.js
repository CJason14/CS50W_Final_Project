document.addEventListener('DOMContentLoaded', function () {
    loadcontacts()
});

let small = 0;
let recipient = "";

addEventListener('resize', (event) => {
    var w = window.innerWidth;
    if (w > 768 && small == 1){
        window.location.reload();
    }
});

function loadcontacts() {
    fetch('/contacts', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(contacts => {
        for (const contact in contacts) {
            const contact_div = document.getElementById("Contacts");
            const div = document.createElement("div");
            div.addEventListener("click", function () {
                loadchat(contacts[contact].company);
            });
            div.classList.add("Chat_User");

            const profile_pic = document.createElement("div");
            profile_pic.classList.add("Chat_picture");
            const profile_image = document.createElement("img");
            fetch('/profile_picture', {
                method: 'POST',
                body: JSON.stringify({
                    username: contacts[contact].company
                })
            })
            .then(response => response.json())
            .then(url =>{
                profile_image.src = url.image_url
            })
            profile_image.classList.add("Chat_image");
            profile_pic.appendChild(profile_image);
            div.appendChild(profile_pic);

            const username = document.createElement("h3");
            const username_content = document.createTextNode(contacts[contact].company);
            username.appendChild(username_content);
            div.appendChild(username);

            contact_div.appendChild(div);
            contact_div.appendChild(document.createElement("hr"));
        }
    })
}


function loadchat(Username) {
    recipient = Username;
    var w = window.innerWidth;
    if (w > 768) {
        const div = document.getElementById('Chat');
        div.innerHTML = "";
        fetch('/profile_picture', {
            method: 'POST',
            body: JSON.stringify({
                username: Username
            })
        })
        .then(response => response.json())
        .then(url =>{
            contact(url.image_url, Username)
        })
        loadmessages(Username)
        .then(Username =>{
            scroll()
        }
        )

    } else {
        small = 1;
        clear();
        fetch('/profile_picture', {
            method: 'POST',
            body: JSON.stringify({
                username: Username
            })
        })
        .then(response => response.json())
        .then(url =>{
            contact_mobile(url.image_url, Username);
        })
        loadmessages(Username)
        .then(Username =>{
            scroll()
        }
        )
    }   
}

function loadmessages(Username) {
    const chat = document.getElementById("Chat");
    fetch('/messages', {
            method: 'POST',
            body: JSON.stringify({
                recipient: Username
            })
        })
        .then(response => response.json())
        .then(messages => {
            for (const message in messages) {
                const message_div = document.createElement("div");
                const context_p = document.createElement("p");
                const context = document.createTextNode(messages[message].context);
                context_p.appendChild(context);
                message_div.appendChild(context_p);
                if (messages[message].user == true) {
                    message_div.classList.add("writer");
                } else {
                    message_div.classList.add("recipient");
                }
                chat.appendChild(message_div)
            }
        })
    return Promise.resolve(Username);
}

function scroll(){
    let div = document.getElementById('Chat');
    setTimeout(() => div.lastElementChild.scrollIntoView({}), 10);
}

function contact(url, name) {
    const username = document.getElementById("Chat_Username_Contact");
    username.innerText = name;
    const image = document.getElementById("Profile_Picture_Contact");
    image.src = url;
}

function contact_mobile(url, name) {
    const contact_div = document.createElement("div");
    contact_div.classList.add("Chat_Contact_Small");
    contact_div.classList.add("dark");

    const burger_menu = document.createElement("div");
    burger_menu.classList.add("burger-menu");
    burger_menu.addEventListener("click", function () {
        window.location.reload();
    })
    contact_div.appendChild(burger_menu);

    const profile_div = document.createElement("div");
    profile_div.classList.add("Chat_picture")
    const profile_image = document.createElement("img");
    if (url == "0") {
        url = "/static/images/profile_picture.jpg"
    }
    profile_image.src = url;
    profile_image.classList.add("Chat_image");
    profile_div.appendChild(profile_image);
    contact_div.appendChild(profile_div);

    const contact_name = document.createElement("h3");
    if (name == "0") {
        name = "Username"
    }
    contact_name.appendChild(document.createTextNode(name));
    contact_div.appendChild(contact_name);

    document.getElementById('C_Chat').appendChild(contact_div);
}

function clear() {
    const chat = document.getElementById("C_Chat");
    chat.innerHTML = "";
    const Chat = document.createElement("div");
    Chat.id = "Chat";
    const outerChat = document.createElement("div");
    outerChat.appendChild(Chat);
    outerChat.classList.add("Chat_Messages");
    chat.appendChild(outerChat);
}

function sendmessage() {
    const Input = document.getElementById("Input");
    fetch("/messages", {
        method: 'PUT',
        body: JSON.stringify({
            message: Input.value,
            recipient: recipient
        })
    })
    .then(response => response.json())
    .then(result => {
        const chat = document.getElementById("Chat");
        const message_div = document.createElement("div");
        const context_p = document.createElement("p");
        const context = document.createTextNode(Input.value);
        context_p.appendChild(context);
        message_div.appendChild(context_p);
        message_div.classList.add("writer");
        chat.appendChild(message_div)
        Input.value = null;
        scroll();
    });
}