document.addEventListener('DOMContentLoaded', function () {
    loadjobs()
});

function loadjobs() {
    fetch('/jobs', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(jobs => {
            console.log(jobs);
            count = 0;
            for (const job in jobs) {
                const job_div = document.createElement("div");
                job_div.classList.add('job');
                let clicked = 0;
                job_div.addEventListener("click", function () {
                    if (clicked == 0){
                        job_div.classList.add('job_zoom');
                        clicked = 1;
                    }
                    else{
                        job_div.classList.remove('job_zoom');
                        clicked = 0;
                    }

                })

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

                const company = document.createElement("h6");
                const company_content = document.createTextNode("Company: ");
                company.appendChild(company_content);
                job_div.appendChild(company);

                job_div.appendChild(document.createElement("hr"));

                const description = document.createElement("p");
                const description_content = document.createTextNode(jobs[count].description);
                description.appendChild(description_content);
                job_div.appendChild(description);

                document.getElementById('Jobs').appendChild(job_div);
                count += 1;
            }
        })

}