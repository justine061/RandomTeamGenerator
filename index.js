//Minimum playerCount value (1 court)
var playerCount = 4;
var finalList = [];
var gameList = [];

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

//function clears all fields from player form
function clearPlayers(){
  for(var i=0; i<playerCount; i++){
    var player = document.getElementById(i);
    player.value = "";
  }
}
/*Function displays HTML form for user to fill out to collect player names*/
function displayNameForm(){
  for(let i=0; i<playerCount; i++){
    addPlayer(i);
  }
}

/*Function adds a player to the playersForm*/
function addPlayer(id){
  let form = document.createElement('div');
  form.innerHTML = `
    <label id="label${id}"for="${id}">Player ${id+1}</label>
    <input type="text" id="${id}" name="playerName" maxlength="15" placeholder="Name">
  `;
  document.getElementById("playersForm").appendChild(form);
}

/*Function removes a player from the playersForm*/
function removesPlayer(id){
  var player = document.getElementById(id);
  player.parentElement.remove();
}

/*Function displays player list from Form*/
function displayPlayers(){
    let playerList = [];
    var button = document.getElementById('print');
    button.style.display = "block";
    button.style.textAlign = "right";
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
  paragraph.innerHTML=`
  ${formatList(playerList)}
  `;

//generates games
var games = getNumGames();

//build sequence in multiple games
for (var j=0; j<games; j++){
  var attempts =0;
  for(var i=0; i<playerCount; i++){
      var randomNum = Math.floor(Math.random()*playerCount);
      if(attempts < 100){
        if(!checkArray(finalList, randomNum) && !checkTeams(gameList, finalList, randomNum)) {
          finalList.push(randomNum);
        }
        //redo the last index
        else{
          i--;
          attempts++;
        }
      }
      else{
        if(!checkArray(finalList, randomNum)){
          finalList.push(randomNum);
        }
        else{
          i--;
        }
      }
    }
  var teams = document.getElementById('teams');
  var header = document.createElement('h3');
  header.innerHTML = `
    Game #${j+1}:
    `;
  teams.appendChild(header);
  var paragraph = document.createElement('p');
  paragraph.innerHTML= `${displayTeams(finalList, playerList)}`;
  teams.appendChild(paragraph);

  //adds list of players from game before clearing finalList
  for(var i=0; i<finalList.length; i++){
    gameList.push(finalList[i]);
  }
  //add blankspaces to keep list consistent
  var blankspaces;
  if(playerCount%4 != 0){
    blankspaces = Math.abs((playerCount%4)-4);
  }
  else {
    blankspaces = 0;
  }
  for(var i=0; i<blankspaces; i++){
    gameList.push("X");
  }
  //reset array after each 'game'
  finalList = [];
  }
  console.log(gameList);
  gameList = [];
}

//checks if random number is in array
function checkArray(array, rand){
  for(var i=0 ; i<array.length ;i++){
    if(array[i] == rand)
      return true;
  }
  return false;
}

//checks if random number is being paired with same teammate
function checkTeams(array, currentArray, rand){
  var checker = false;
  var arrayIndex;
  var currentArrayIndex = (currentArray.length)-1;
  //debugger;
  if(possibilitiesCheck(array)){
  if(currentArrayIndex%2 == 0){
    for(var i=0; i<array.length; i++){
      //save index of random number in game array
      if(rand == array[i]){
        arrayIndex = i;
        if(arrayIndex%2 == 0){
          //check index+1
          if(array[arrayIndex+1] == currentArray[currentArrayIndex]){
            checker = true;
            break;
          }
        }
        else{
          //check index-1
          if(array[arrayIndex-1] == currentArray[currentArrayIndex]){
            checker = true;
            break;
          }
        }
      }
    }
  }
  else{
    checker = false;
  }
}
  return checker;
}

//function checks if we exhausted all possibilities of team combinations
function possibilitiesCheck(array){
  var possibilities = (playerCount*(playerCount-1))/2;
  var blankspaces;
  var currentTeamList = [];
  for(var i=0; i<array.length; i++){
    if(array[i] != 'X'){
      currentTeamList.push(array[i]);
    }
  }
  var currentTeamLength = currentTeamList.length;
  if((currentTeamLength)/2 >= possibilities){
    // for(var i=0; i<(currentTeamLength)-(playerCount); i++){
    //   gameList.shift();
    // }
    gameList = [];
    return false;
  }
  else{
    return true;
  }
}

//function displays Team List on webpage
function displayTeams(array,players){
  let teamList = [];
  let teamString = "";

  for(var i=0; i<playerCount; i++){
    teamList[i] = players[array[i]];
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

//formats List by adding spaces between players
function formatList(list){
  var formattedList = "";
  for(var i=0; i<list.length; i++){
    formattedList +=list[i];
    formattedList +="<br>";
    // if(i != list.length-1){
    //   formattedList += ", ";
    // }
  }
  return formattedList;
}

//function controls the amount of games generated
function getNumGames(){
  var games = document.getElementById('gameCount').value;
  if(games < 1 || games > 50){
    alert("Games must be between 1-50");
  }
  else
    return games;
}

//function prints certain elements
function printContent(){
  var playerElement = document.getElementById(playerList).innerHTML;
  var gameElement = document.getElementById(teams);
  console.log(playerElement);
  w=window.open();
  w.document.write(playerElement);
  w.print();
  w.close();
}

//Function chooses teams randomly
function randomTeams(){
  return Math.floor(Math.random()*list.length);
}
