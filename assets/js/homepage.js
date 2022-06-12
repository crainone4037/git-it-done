
var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      if(response.ok){
      response.json().then(function(data) {
        displayRepos(data,user);
       
      });
    }else{
      alert("error: Github user not found");
    }

    })
    .catch(function(error){
      alert("unable to connect to GitHub");
    });
  }
  var userFormEl = document.querySelector("#user-form");
  var nameInputEl = document.querySelector("#username"); 
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


  var formSubmitHandler = function(event){

    event.preventDefault();
    var username = nameInputEl.value.trim();
    if(username) {
      getUserRepos(username);
      nameInputEl.value ="";

    }else{
      alert("please enter a GitHub username");

    }
    console.log(event);

      
  };

  var displayRepos = function(repos,searchTerm){

    if (repos.length === 0){
      repoContainerEl.textContent = "No repositories found.";
      return;

    }
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for(var i = 0; i < repos.length; i++){
      var repoName =repos[i].owner.login + "/" + repos[i].name;

      var repoEl = document.createElement("div");
      repoEl.classList = "list-item flex-row justify-space-between align-center"; 

      var titleEl = document.createElement("span");
      titleEl.textContent = repoName; 



      repoEl.appendChild(titleEl);


      var statusEl = document.createElement("span")
      statusEl.classList = "flex-row align-center";
      if(repos[i].open_issues_count > 0){ 
        statusEl.innerHTML = "<i class = ' fas fa-times status-icon icon-danger'> </i>" + repos[i].open_issues_count + " issue(s)";

      }else { 
        statusEl.innerHTML = "<i class = 'fas fa-check-square status-icon icon-sucess'></i>" ;
      }

    }
      repoContainerEl.appendChild(repoEl);
      repoEl.appendChild(statusEl);

      

    }
    

   


  

  userFormEl.addEventListener("submit",formSubmitHandler);
