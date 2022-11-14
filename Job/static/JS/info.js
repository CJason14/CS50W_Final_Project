document.addEventListener('DOMContentLoaded', function () {
    checkjobs();
});

function checkjobs() {
    fetch('/applications', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(jobs => {
        if (jobs.NoResponse != 1) {
            console.log(jobs)
            const main = document.getElementById("app");

            const outer_div = document.createElement("div");
            const div = document.createElement("div");
            div.classList.add("popup")
            const innerdiv = document.createElement("div");
            innerdiv.classList.add("inner_popup");

            const h = document.createElement("h2");
            const h_content = document.createTextNode(jobs.username);
            h.appendChild(h_content);
            const h_div = document.createElement("div");
            h_div.classList.add("center");
            h_div.appendChild(h);
            innerdiv.appendChild(h_div);

            const text_div = document.createElement("div");
            text_div.classList.add("center");
            text_div.classList.add("popup_space");
            const text = document.createElement("h4");
            if (jobs.accepted == true){
                const accepted = document.createTextNode("You got accepted!");
                text.appendChild(accepted);
                text.style.setProperty('color', 'Green', 'important');
            }
            else{
                const declined = document.createTextNode("You got declined!");
                text.appendChild(declined);
                text.style.setProperty('color', 'Red', 'important');
            }
            text_div.appendChild(text);
            innerdiv.appendChild(text_div);

            

            const button_div = document.createElement("div");
            button_div.classList.add("right");
            const button = document.createElement("button");
            button.classList.add("button");
            button.classList.add("light");
            button.textContent = "Close";
            button.addEventListener("click", function () {
                fetch('/applications', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: jobs.id
                    })
                })
                .then(response => response.json())
                .then(url =>{
                    console.log(url)
                    outer_div.innerHTML = "";
                })
            })
            button_div.appendChild(button);
            innerdiv.appendChild(button_div);

            div.appendChild(innerdiv);
            outer_div.appendChild(div);
            main.appendChild(outer_div);
        }

    })
}