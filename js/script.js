//Div where my profile info will appear
const overview = document.querySelector(".overview");
//My github username
const username = "MalinmedM";
//Unordered list to display the repos list
const reposList = document.querySelector(".repo-list")
//Where all my repos appear
const repoSection = document.querySelector(".repos");
//Where the individual repo data will appear
const uniqueRepoData = document.querySelector(".repo-data");
//Back to Repo Gallery-button
const viewReposButton = document.querySelector(".view-repos");
//Selects innput with Search By Name placeholder
const filterInput = document.querySelector(".filter-repos");

const fetchMyInfo = async function(){
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();
    //console.log(data);
    showMyInfo(data);
};

fetchMyInfo();

//Function to display user data
const showMyInfo = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
        `;
        overview.append(div);
        fetchRepos();
};

//fetching repos
const fetchRepos = async function() {
    //Found here: https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
    const repos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repodata = await repos.json();
    //console.log(repodata);
    displayRepoInfo(repodata);
};

//Display info about my repos
const displayRepoInfo = function(repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        reposList.append(repoItem);
    }
};
//Event listener for clicking each repo-button
reposList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);
    }
});

//Function to get specific Repo Info
const specificRepoInfo = async function(repoName) {
    const specificInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificInfo.json();
    console.log(repoInfo);
    //Grab languages
    const fetchLanguages = await fetch(`repoInfo.languages_url`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    //Putting languages in array
    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    }
    displaySpecificInfo(repoInfo, languages);
};

//Function to display specific repo info
const displaySpecificInfo = function(repoInfo, languages) {
    uniqueRepoData.innerHTML = "";
    let div = document.createElement("div");

    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    uniqueRepoData.append(div);
    uniqueRepoData.classList.remove("hide");
    repoSection.classList.add("hide");
    viewReposButton.classList.remove("hide");
};

viewReposButton.addEventListener("click", function() {
    repoSection.classList.remove("hide");
    uniqueRepoData.classList.add("hide");
    viewReposButton.classList.add("hide");
})