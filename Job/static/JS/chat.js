function loadchat(Username) {
    var w = window.innerWidth;
    if (w > 768) {

    } else {
        clear();
        contact(0,0);
    }
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