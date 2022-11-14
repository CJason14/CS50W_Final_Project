function Darkmode() {
    fetch("/settings", {
            method: 'PUT',
            body: JSON.stringify({
                Darkmode: "0",
                Language: "1"
            })
        })
        .then(response => response.json())
        .then(result => {
            window.location.reload();
        });
}

function Language() {
    var e = document.getElementById("Language_List");
    var value = e.value;
    var text = e.options[e.selectedIndex].text;
    fetch("/settings", {
        method: 'PUT',
        body: JSON.stringify({
            Language: text,
            Darkmode: "1"
        })
    })
    .then(response => response.json())
    .then(result => {
        window.location.reload();
    });
}