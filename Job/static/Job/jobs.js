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
                job_div.appendChild(title);

                const salary = document.createElement("h6");
                const salary_content = document.createTextNode("Salary: " + jobs[count].salary + "$");
                salary.appendChild(salary_content);
                job_div.appendChild(salary);

                const category = document.createElement("h6");
                const category_content = document.createTextNode("Category: " + jobs[count].category);
                category.appendChild(category_content);
                job_div.appendChild(category);

                job_div.appendChild(document.createElement("hr"));

                const description = document.createElement("p");
                const description_content = document.createTextNode(jobs[count].description);
                description.appendChild(description_content);
                job_div.appendChild(description);

                document.getElementById('Jobs').appendChild(job_div);
                count += 1
            }
        })

}