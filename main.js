let synthesisType=""

// amount of glucose produced when synthesing
let synthesisGlucoseOutput=0

let makeAtpFromSynthesis=false

// amount of energy a cell will use to keep its salinity balanced
let atpUsage=0

let onMenu=true

let glucose=100
let atp=100
let health=100
let salinity=100


let play=document.getElementById("play")
let photo=document.getElementById("photosynthetic")
let thermo=document.getElementById("thermosynthetic")
let menu=document.getElementById("menu")
let game=document.getElementById("game")




let board = {
  width: 415,
  height: 500
}

let player = {
  x_pos: 300,
  y_pos: 400,
  width: 50,
  height: 50
}

photo.onclick=()=>{
  synthesisType="photo"
  synthesisGlucoseOutput=15
  atpUsage=0.1
}

thermo.onclick=()=>{
  synthesisType="thermo"
  synthesisGlucoseOutput=0.05
  atpUsage=0.1
  makeAtpFromSynthesis=true
}



play.onclick=()=>{
  if (synthesisType!="") {
  onMenu = false
  menu.classList.remove("shown")
  menu.classList.add("hidden")
  game.classList.remove("hidden")
  game.classList.add("shown")
  if (synthesisType=="photo") {
    document.getElementById("player").classList.add("photo-cube")
  } else {
    document.getElementById("player").classList.add("thermo-cube")
  }
  }
}

let regenGlucose=(amount)=>{
  if (glucose+amount<100) {
    glucose=glucose+amount
  } else {
    glucose=100
  }
  document.getElementById("glucoseBar").value=glucose
}
let regenATP=(amount,glucoseCost)=>{
  if (glucose>=glucoseCost) {
    if (atp<100) {
      atp=atp+amount
      glucose=glucose-glucoseCost
    }
  }
  document.getElementById("atpBar").value=atp
  document.getElementById("glucoseBar").value=glucose
}
let regenHealth=(amount,atpCost)=>{
  if (atp>atpCost+20) {
    if (health<100) {
      health=health+amount
      atp=atp-atpCost
    }
  }
  document.getElementById("atpBar").value=atp
  document.getElementById("healthBar").value=health
}

let regenSalinity=(amount, atpCost) => {
  if (atp >= atpCost) {
    if (salinity<100) {
      salinity=salinity+amount
      atp=atp-atpCost
    }
  }
  document.getElementById("atpBar").value=atp
  document.getElementById("salinityBar").value=salinity
}

let walls = [
  { x_pos:0, y_pos:0, width:250, height:50, type:"snow" },
  { x_pos:100, y_pos:100, width:100, height:200, type:"snow" },
  { x_pos:200, y_pos:200, width:100, height:100, type:"sand" },
]

let boardDiv=document.getElementById("board")
let playerDiv=document.getElementById("player")



boardDiv.style.width=board.width + "px";
boardDiv.style.height=board.height + "px";

playerDiv.style.left=player.x_pos + "px";
playerDiv.style.top=player.y_pos + "px";
playerDiv.style.width=player.width + "px";
playerDiv.style.height=player.height + "px";

walls.forEach(item=>{
  let newDiv=document.createElement("div")
  newDiv.style.width = item.width + "px";
  newDiv.style.height = item.height + "px";
  newDiv.style.left=item.x_pos + "px";
  newDiv.style.top=item.y_pos + "px";
  newDiv.style.position="absolute";
  if (item.type=="snow") {
    newDiv.style.backgroundColor="#D8D8D8"
  } else if (item.type=="sand") {
    newDiv.style.backgroundColor="#FFCE93"
  } else {
    newDiv.style.backgroundColor="#000000"
  }
  
  boardDiv.appendChild(newDiv)
})

let checkMove=()=>{
  let i, len = walls.length, result;
  
  for (i=0;i<len;i++) {
    if (!checkCollision(player,walls[i])) {
      result=false;
      break;
    } else {
      result=true;
    }
  }
  return result;
}

let checkCollision=(a,b)=>{
  return (
    (a.y_pos + a.width) <= (b.y_pos) ||
    (a.y_pos) >= (b.y_pos + b.height) ||
    (a.x_pos + a.width) <= (b.y_pos) ||
    (a.x_pos) >= (b.y_pos + b.width)
  )
}

let Top=document.getElementById("top")
let Down=document.getElementById("down")
let O=document.getElementById("o")
let R=document.getElementById("r")

O.onclick=()=>{
  if (atp>=2.5) {
  if (player.x_pos < (board.width - player.width)) {
    player.x_pos+=50
    if (checkMove()) {
      playerDiv.style.left = player.x_pos + "px"
      document.getElementById("atpBar").value = atp
      atp -= 2.5
    } else {
      player.x_pos-=50
    }
  }
  }
}

R.onclick=()=>{
  if (atp>=2.5) {
  if (player.x_pos > 0)  {
    player.x_pos-=50
    if (checkMove()) {
      playerDiv.style.left = player.x_pos + "px"
      document.getElementById("atpBar").value = atp
      atp -= 2.5
    } else {
      player.x_pos+=50
    }
  }
  }
}

Top.onclick=()=>{
  if (atp>=2.5) {
  if (player.y_pos > 0) {
    player.y_pos-=50
    if (checkMove()) {
      playerDiv.style.top = player.y_pos + "px"
      document.getElementById("atpBar").value = atp
      atp -= 2.5
    } else {
      player.y_pos+=50
    }
  }
  }
}



Down.onclick=()=>{
  if (atp>=2.5) {
    if (player.y_pos < (board.height - player.height)) {
      player.y_pos+=50
      if (checkMove()) {
        playerDiv.style.top = player.y_pos + "px"
        document.getElementById("atpBar").value = atp
        atp -= 2.5
      } else {
        player.y_pos-=50
      }
    }
  }
}


setInterval(()=>{
  regenHealth(2.5,5)
  
  
  
  if (synthesisType=="thermo") {
    atp=atp-atpUsage/2.5
  } else {
    atp=atp-atpUsage
  }
  
  if (salinity+5>100) {
    if (atp>atpUsage) {
      salinity=100
      document.getElementById("salinityBar").value=salinity
    }
  } else {
    if (atp>atpUsage) {
      salinity=salinity+5
      document.getElementById("atpBar").value=atp
    }
  }
  
  
  regenATP(0.5,0.25)
  regenHealth(2.5,5)
  
  if (atp<atpUsage) {
    salinity=salinity-15
  }
  
  if (salinity<=0) {
    health=health-2.5
    salinity=0
  }
  
  document.getElementById("salinityBar").value=salinity
  
  
  
  if (health==0) {
    glucose=-9999999
    atp=-9999999
    salinity=-9999999
  }
  document.getElementById("salinityBar").value=salinity
  document.getElementById("atpBar").value=atp
  document.getElementById("glucoseBar").value=glucose
  regenHealth(2.5,5)
  if (onMenu==true) {
    glucose=100
    salinity=100
    atp=100
    health=100
    document.getElementById("salinityBar").value=salinity
    document.getElementById("atpBar").value=atp
    document.getElementById("glucoseBar").value=glucose
    document.getElementById("healthBar").value=health
  }
  
  regenGlucose(synthesisGlucoseOutput)
  if(makeAtpFromSynthesis==true) {
    regenATP(0.1,0)
  }
  
  
},100)
