function loadchat(Username) {
    var w = window.innerWidth;
    if (w > 768) {

    } else {
        clear();
        contact(0, Username);
    }
}

function loadmessages(Username) {
    fetch('/messages', {
            method: 'POST',
            body: JSON.stringify({
                recipient: Username
            })
        })
        .then(response => response.json())
        .then(messages => {
            console.log(messages);
            for (const message in messages) {
                console.log(messages[message].recipient)
                const chat = document.getElementById("Chat");
                const message_div = document.createElement("div");
                if (messages[message].recipient == Username) {
                    message_div.classList.add("writer");
                } else {
                    message_div.classList.add("recipient");
                }
                chat.appendChild(message_div)
            }
        })
}


function contact(url, name) {
    const contact_div = document.createElement("div");
    contact_div.classList.add("Chat_Contact_Small");
    contact_div.classList.add("dark");

    const burger_menu = document.createElement("div");
    burger_menu.classList.add("burger-menu")
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
    chat = document.getElementById("C_Chat");
    chat.innerHTML = "";
    const Chat = document.createElement("div");
    Chat.id = "Chat";
    Chat.classList.add("Chat_Messages");
    chat.appendChild(Chat)
}