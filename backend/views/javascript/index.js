const loaderContainer = document.getElementsByClassName("loader")[0];
const overlayPanel = document.getElementsByClassName("overlay")[0];
const spinner = document.getElementsByClassName("spinner")[0];
const jobPanel = document.getElementsByClassName("createJob")[0];
const submitButton = document.getElementById('submitButton');

// Filter divs
const mainFilter = document.getElementById('mainFilter');
const filterButtons = document.getElementsByClassName('filter-buttons');
const salaryFilter = document.getElementById('salaryFilter');
const dateFilter = document.getElementById('dateFilter');
const categoryFilter = document.getElementById('categoryFilter');

const jobDescription = document.getElementById('jobdetailsDescription');
const mainPage = document.getElementById('content_body');

//spinner.style.display = 'block';

const toggleFilter = (filterElement) => {
    const filters = [salaryFilter, dateFilter, categoryFilter, mainFilter];
        filters.forEach((filter) => {
            filter.style.display = filter === filterElement && window.getComputedStyle(filter).display !== "block"
            ? "block": "none";
        });
    };

const toggleJobDescription = () => {
    if (window.getComputedStyle(jobDescription).display === "block") {
        jobDescription.style.display = "none";
        mainPage.style.display = "block";
    } else {
        jobDescription.style.display = "block";
        mainPage.style.display = "none";
    }
    spinner.style.display = "none";
};

const toggleJobPanel = () => {
    if (window.getComputedStyle(jobPanel).display === "block") {
        jobPanel.style.display = "none";
        overlayPanel.style.display = "none";
    } else {
        jobPanel.style.display = "block";
        overlayPanel.style.display = "block";
    }
};

async function fetchAndDisplayJobs() {
    spinner.style.display = "block";
        try {
            const response = await fetch('/api/jobs/fetchJobs')
            if (response.ok) {
                const responseData = await response.json();
                const jobs = responseData.job;
                const jobListContainer = document.getElementById('jobList');

                // Create a job div for each job and populate it
                jobs.forEach((job) => {
                const jobDiv = document.createElement('div');
                jobDiv.classList.add('job-div');

                const categoryHeader = document.createElement('h3');
                categoryHeader.classList.add('category-name');

                const categoryId = job.category_id;
                if(categoryId == 1){
                    categoryHeader.textContent = "Skilled Laborour";
                }else if(categoryId == 2){
                    categoryHeader.textContent = "Professional services";
                }else if(categoryId == 3){
                    categoryHeader.textContent = "Manual Work";
                }

                const titleHeader = document.createElement('h2');
                titleHeader.classList.add('job-title');
                titleHeader.textContent = job.job_title;

                const salaryPara = document.createElement('p');
                salaryPara.classList.add('salary-range');
                salaryPara.textContent = `kes ${job.salary_range}`;

                const descriptionPara = document.createElement('p');
                descriptionPara.classList.add('jobDescription');
                descriptionPara.textContent = job.job_description;

                const locationPara = document.createElement('p');
                locationPara.classList.add('job-location');
                locationPara.textContent = `${job.job_location}`;

                const postedDatePara = document.createElement('div');
                postedDatePara.classList.add('job-posted-date');
                postedDatePara.textContent = `Posted Date: ${job.posted_date}`;

                // Add an onclick event to show job details when clicked
                jobDiv.onclick = function() {
                    displayJobDetails(jobDiv.id);
                };

                jobDiv.appendChild(categoryHeader);
                jobDiv.appendChild(salaryPara);
                jobDiv.appendChild(titleHeader);
                jobDiv.appendChild(descriptionPara);
                jobDiv.appendChild(locationPara);
                jobDiv.appendChild(postedDatePara);
                jobDiv.id = `${job.job_id}`;
                jobListContainer.appendChild(jobDiv);
            });
        } else {
            console.error('Failed to fetch job data');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
    spinner.style.display = "none";
}

    // Submitting the jobs
document.getElementById('uploadJobForm').addEventListener('submit', async function(event){
    event.preventDefault();

    const successDiv = document.getElementById('successDiv');
    const failDiv = document.getElementById('failDiv');

    const userCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('user_Id='));

    const formData = new FormData(this);

    const job_title = formData.get('job_title');
    const job_description = formData.get('job_description');
    const job_location = formData.get('job_location');
    const job_requirements = formData.get('job_requirements');
    const salary_range = formData.get('job-salary-range');
    const category_id = formData.get('job_category');
    const employer_id = userCookie ? userCookie.split('=')[1] : null;

    if(!job_title || !job_description || !job_requirements || !salary_range || !category_id){
        submitButton.classList.add('disabledButton');
        submitButton.innerText = ('disabled');
    }else{
        submitButton.classList.add('enabledButton');
        submitButton.innerText = ('enabled');
        try {
            const response = await fetch('/api/jobs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ job_title, job_description ,job_location, job_requirements, salary_range, category_id, employer_id })
            });

            if (response.ok) {
                successDiv.innerText = "Job Successfully Created";
                toggleJobPanel();
            } else {
                failDiv.innerText = "Job creation failed, please try again";
            }
        } catch (error) {
            console.log("An error occurred: ", error);
        }
    }
});

function logoutUser() {
    document.getElementById('logoutLink').addEventListener('click', async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                window.location.href = '/';
            } else {
                console.error('Please try again');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
                
    });
}

document.getElementById('searchForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    const searchBtn = document.getElementById('searchBtn');
    const keyword = formData.get('keyword');
    spinner.style.display = "block";
    try {
        let url = `/api/jobs/search/${encodeURIComponent(keyword)}`;

        const response = await fetch(url);

        if (response.ok) {
            const responseData = await response.json();
            const jobs = responseData.jobs;

            const jobListContainer = document.getElementById('jobList');
            jobListContainer.innerHTML = '';

            if (jobs.length === 0) {
                const noResultsPara = document.createElement('p');
                noResultsPara.textContent = 'No jobs found matching the search criteria.';
                jobListContainer.appendChild(noResultsPara);
            } else {
                jobs.forEach((job) => {
                    const jobDiv = document.createElement('div');
                    jobDiv.classList.add('job-div');
                    jobDiv.onclick = function() {toggleJobDescription()};

                    const categoryHeader = document.createElement('h3');
                    categoryHeader.classList.add('category-name');
                    const category_id = job.category_id;
                    if (category_id === 1) {
                        categoryHeader.textContent = "Skilled Laborer";
                    } else if (category_id === 2) {
                        categoryHeader.textContent = "Professional Services";
                    } else if (category_id === 3) {
                         categoryHeader.textContent = "Manual Work";
                    }

                    const titleHeader = document.createElement('h2');
                    titleHeader.classList.add('job-title');
                    titleHeader.textContent = job.job_title;

                    const salaryPara = document.createElement('p');
                    salaryPara.classList.add('salary-range');
                    salaryPara.textContent = `kes ${job.salary_range}`;

                    const descriptionPara = document.createElement('p');
                    descriptionPara.classList.add('job-description');
                    descriptionPara.textContent = job.job_description;

                    const locationPara = document.createElement('p');
                    locationPara.classList.add('job-location');
                    locationPara.textContent = `Location: ${job.job_location}`;

                    const postedDatePara = document.createElement('p');
                    postedDatePara.classList.add('job-posted-date');
                    postedDatePara.textContent = `Posted Date: ${job.posted_date}`;

                    jobDiv.appendChild(categoryHeader);
                    jobDiv.appendChild(titleHeader);
                    jobDiv.appendChild(salaryPara);
                    jobDiv.appendChild(descriptionPara);
                    jobDiv.appendChild(locationPara);
                    jobDiv.appendChild(postedDatePara);

                    jobListContainer.appendChild(jobDiv);
                });
            }
        } else {
            console.error('Failed to fetch search results');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    } finally {
        spinner.style.display = "none";
    }
});

async function displayJobDetails(jobId) {
    spinner.style.display = "block";
    try{          
        const response = await fetch(`/api/jobs/${jobId}/details`);
        if(response.ok){
            const jobDetailsContainer = document.getElementById('jobDescriptionDetails');
            jobDetailsContainer.innerHTML = '';
            const resData = await response.json();
            const jobs = resData.job;
            const emp_id = jobs.employer_id;

            const jobDiv = document.createElement('div');
            jobDiv.classList.add('jobdet-div');

            const categoryHeader = document.createElement('h3');
            categoryHeader.classList.add('jobdet-cat');
            const category_id = jobs.category_id;
                if(category_id == 1){
                    categoryHeader.textContent = "Skilled Laborour";
                }else if(category_id == 2){
                    categoryHeader.textContent = "Professional services";
                }else if(category_id == 3){
                    categoryHeader.textContent = "Manual Work";
                }

            const titleHeader = document.createElement('h2');
            titleHeader.classList.add('jobdet-title');
            titleHeader.textContent = jobs.job_title;

            const salary_range = document.createElement('p');
            salary_range.classList.add('jobdet-salary');
            salary_range.textContent = jobs.salary_range;

            const descriptionPara = document.createElement('p');
            descriptionPara.classList.add('jobdet-description');
            descriptionPara.textContent = jobs.job_description;

            const locationPara = document.createElement('p');
            locationPara.classList.add('jobdet-location');
            locationPara.textContent = jobs.job_location;

            const postedDatePara = document.createElement('div');
            postedDatePara.classList.add('jobdet-posdate');
            postedDatePara.textContent = jobs.posted_date;

            const empDetails = document.createElement('div');
            empDetails.classList.add('jobdet-emp')

            async function fetchEmployer(employerId){
                try{ 
                    const employer = await fetch(`/api/users/${employerId}/profile`);
                    const employer_details = document.getElementById('employer_details');

                    if(employer.ok){
                        const _employer = await employer.json();
                                
                        const empDetails = document.createElement('div');
                        empDetails.classList.add('emp-Details');

                        const empName = document.createElement('p');
                        empName.classList.add('jobdet_empname');
                        empName.textContent = _employer.first_name;

                        const empuName = document.createElement('p');
                        empuName.classList.add('jobdet_empUname');
                        empuName.textContent = _employer.username;

                        empDetails.appendChild(empName);
                        empDetails.appendChild(empuName);

                        employer_details.appendChild(empDetails);

                    }else{
                        console.log('error ocurred while fetching employees details');
                    } 
                              
                } catch (error) {
                    console.log('an error ocurred while fetching employer\'s details', error);
                }
            }

            jobDiv.appendChild(titleHeader);
            jobDiv.appendChild(salary_range);
            jobDiv.appendChild(descriptionPara);
            jobDiv.appendChild(locationPara);
            jobDiv.appendChild(postedDatePara);
            jobDiv.appendChild(empDetails);
            empDetails.id = 'employer_details';

            jobDetailsContainer.appendChild(jobDiv);
                    
        }
    }catch(error){
        console.error("an error ocurred while fetching job details", error);
    }
    toggleJobDescription();
}


document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayJobs();
    logoutUser();
});