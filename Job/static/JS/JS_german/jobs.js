document.addEventListener('DOMContentLoaded', function () {
    loadjobs()
});

function loadjobs() {
    fetch('/jobs', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(jobs => {
            count = 0;
            for (const job in jobs) {
                const job_div = document.createElement("div");
                job_div.classList.add('job');
                let clicked = 0;

                const title = document.createElement("h3");
                const title_content = document.createTextNode(jobs[count].title);
                title.appendChild(title_content);
                job_div.appendChild(title);

                const salary = document.createElement("h6");
                const salary_content = document.createTextNode("Gehalt: " + jobs[count].salary + "$");
                salary.appendChild(salary_content);
                job_div.appendChild(salary);

                const category = document.createElement("h6");
                const category_content = document.createTextNode("Kategorie: " + jobs[count].category);
                category.appendChild(category_content);
                job_div.appendChild(category);

                const company = document.createElement("h6");
                const company_content = document.createTextNode("Unternehmen: ");
                company.appendChild(company_content);
                job_div.appendChild(company);

                job_div.appendChild(document.createElement("hr"));

                const description = document.createElement("p");
                const description_content = document.createTextNode(jobs[count].description);
                description.appendChild(description_content);
                job_div.appendChild(description);

                const apply_div = document.createElement("div");
                apply_div.classList.add("right");
                const apply = document.createElement("button");
                const content = document.createTextNode("Bewerben");
                apply.appendChild(content);
                apply.classList.add("button");
                apply.classList.add("light");
                apply_div.appendChild(apply);
                job_div.appendChild(apply_div)

                document.getElementById('Jobs').appendChild(job_div);
                count += 1;
            }
        })

}