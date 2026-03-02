//Minimum playerCount value (1 court)
var playerCount = 4;
var finalList = [];

var button = document.createElement('button');
button.id = "playersListButton";
button.type = "button";
button.onclick = displayPlayers; //displays player list when button is clicked (function)
button.textContent = "Generate Teams";

//display the minimum number of players form (4)
displayNameForm();

//function will add another label and input in form when button is clicked
function increasePlayerCount(){
  if(playerCount != 50){
    playerCount += 1;
    addPlayer(playerCount-1);
  }
}

//function will remove the last label and input in form when button is clicked
function decreasePlayerCount(){
  if(playerCount != 4){
    playerCount -= 1;
    removesPlayer(playerCount);
  }
}

/*Function displays HTML form for user to fill out to collect player names*/
function displayNameForm(){

  for(let i=0; i<playerCount; i++){
    addPlayer(i);
  }
  document.getElementById("teamButton").appendChild(button);
}

function addPlayer(id){
  let form = document.createElement('div');
  let button = document.getElementById('playersListButton');
  form.innerHTML = `
    <label id="label${id}"for="${id}">Player ${id+1}</label>
    <input type="text" id="${id}" name="playerName" maxlength="15" placeholder="Name">
  `;
  document.getElementById("playersForm").appendChild(form);
}

function removesPlayer(id){
  let player = document.getElementById(id);
  let playerLabel = document.getElementById("label"+id);
  player.remove();
  playerLabel.remove();
}

/*Function displays player list from Form*/
function displayPlayers(){
    let playerList = [];

    //resets games before generating new games
    let teamDiv = document.getElementById("teams");
    teamDiv.innerHTML='';

    //generates player list
    var div = document.getElementById('players');

  for(let i=0; i<playerCount; i++){
      if(document.getElementById(i).value != ""){
        playerList.push(document.getElementById(i).value);
      }
      else{
        playerList.push("Player " + (i+1));
      }
  }
  div.innerHTML = `
    <h3>Player List:</h3>
    <p id="playerList"></p>
  `;
  var paragraph = document.getElementById('playerList');
  var text = document.createTextNode(formatList(playerList));
  paragraph.appendChild(text);

//generates games
var games = getNumGames();

//build sequence in multiple games
for (var j=0; j<games; j++){
  for(var i=0; i<playerCount; i++){
      var randomNum = Math.floor(Math.random()*playerCount);
      if(!checkArray(finalList, randomNum)) {
        finalList.push(randomNum);
      }
      //redo the last index
      else{
        i--;
      }
  }
  var teams = document.getElementById('teams');
  var header = document.createElement('h3');
  header.innerHTML = `
    Game #${j+1}:
    `;
  teams.appendChild(header);
  var paragraph = document.createElement('paragraph');
  //var text = document.createTextNode(displayTeams(finalList, playerList));
  //paragraph.appendChild(text);
  paragraph.innerHTML= `${displayTeams(finalList, playerList)}`;
  teams.appendChild(paragraph);
  teams.appendChild(document.createElement('br'));


  console.log(finalList);
  //reset array after each 'game'
  finalList = [];
  }
}

//checks if random number is in array
function checkArray(array, rand){
  for(var i=0 ; i<array.length ;i++){
    if(array[i] == rand)
      return true;
  }
  return false;
}

//displays Team List on webpage
function displayTeams(array,players){
  let teamList = [];
  let teamString = "";

  for(var i=0; i<playerCount; i++){
    teamList[i] = players[array[i]]; //appendChild to text adding 'VS'

  }
  let courts = playerCount/4|0;
  let extras = playerCount%4;
  let counter = 0;
  for(var i=0; i<courts; i++){
    teamString +=  teamList[counter] + ", " + teamList[counter+1] + " VS " + teamList[counter+2] + ", " + teamList[counter+3] + "<br>";
    counter += 4;
  }
  if(extras != 0){
    teamString += "Extra: ";
    for(var i=0; i<extras; i++){
      teamString += teamList[(teamList.length-1)-i];
      if(i != extras-1){
        teamString += ", ";
      }
    }
    teamString += "<br>";
  }
  return teamString;

}

function formatList(list){
  var formattedList = "";
  for(var i=0; i<list.length; i++){
    formattedList +=list[i];
    if(i != list.length-1){
      formattedList += ", ";
    }
  }
  return formattedList;
}

function getNumGames(){
  var games = document.getElementById('gameCount').value;
  if(games < 1 || games >= 50){
    alert("Games must be between 1-50");
  }
  else
    return games;
}

//Function that chooses teams randomly
function randomTeams(){
  return Math.floor(Math.random()*list.length);
}
