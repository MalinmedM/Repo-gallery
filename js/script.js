//Div where my profile info will appear
const overview = document.querySelector(".overview");
//My github username
const username = "MalinmedM";
//Unordered list to display the repos list
const reposList = document.querySelector(".repo-list")
//Where all my repo information appears
const repoSection = document.querySelector(".repos");
//Where the individual repo data will appear
const uniqueRepoData = document.querySelector(".repo-data");

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
    repoInfo(repodata);
};

//Display info about my repos
const repoInfo = function(repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        reposList.append(repoItem);
    }
};