function Darkmode() {
    fetch("/settings", {
            method: 'PUT',
            body: JSON.stringify({
                Darkmode: "0"
            })
        })
        .then(response => response.json())
        .then(result => {
            console.log("Test");
            window.location.reload();
        });
}