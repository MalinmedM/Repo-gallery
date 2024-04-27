//Div where my profile info will appear
const overview = document.querySelector(".overview");
//My github username
const username = "MalinmedM";

const fetchMyInfo = async function(){
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();
    console.log(data);
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
};