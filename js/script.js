//Div where my profile info will appear
const overview = document.querySelector(".overview");
//My github username
const username = "MalinmedM";

const fetchMyInfo = async function(){
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();
    console.log(data);
};


fetchMyInfo();