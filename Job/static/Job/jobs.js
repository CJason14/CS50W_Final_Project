document.addEventListener('DOMContentLoaded', function () {
    loadjobs()
});

function loadjobs() {
    fetch('/jobs', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(jobs => {
            console.log(jobs)
            count = 0
            for (const job in jobs) {
                const job_div = document.createElement("div");
                job_div.classList.add('job');

                const title = document.createElement("h3");
                const title_content = document.createTextNode(jobs[count].title);
                title.appendChild(title_content);
                job_div.appendChild(title)

                job_div.appendChild(document.createElement("hr"));

                document.getElementById('Jobs').appendChild(job_div);
                count += 1
            }
        })

}