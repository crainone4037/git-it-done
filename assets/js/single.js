
var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {

    var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc"; 

    
    fetch(apiURL); 


}

getRepoIssues("facebook/react");


// fetch will grab the URL, then will give us a response which will be considered a promise. We cant do much with the data 
// so we convert it to JSON(javascript object notation)we would need another "then" method to basically display the data that 
//was fetched. 

fetch(apiURL).then(function(response){
    if (response.ok){ 
        response.json().then(function(data){
            displayIssues(data);
        });
    }
    else{ 

        alert("there was a problem with your request");

    }
});

var displayIssues = function(issues){ 

    if(issues.length === 0){
        issueContainerEl.textContent = "this repo has no open issues!";
        return;
        
    }

    for(var i = 0; i < issues.length; i++){

        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href" , issues[i].html_url); 

        //openign the link in a new tab
        issueEl.setAttribute("target", "_blank"); 

        var titleEl = document.createElement("span"); 
        titleEl.textContent = issues[i].title;

        issueEl.appendChild(titleEl); 

        var typeEl = document.createElement("span"); 

        if ( issues[i].pull_request) {
            typeEl.textContent = "(pull request)";

        }else { 
            typeEl.textContent = "(issue)";

        }

        issueEl.appendChild(typeEl);



        
    }
    issueContainerEl.appendChild(issueEl);


};




    


