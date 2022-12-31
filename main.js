let synthesisType="photo"

// amount of glucose produced when synthesing
let synthesisGlucoseOutput=0

let makeEnergyOnSynthesis=false

let cooldownOnSynthesis=0

// amount of energy a cell will use to keep its salinity balanced
let energyUsage=0

let onMenu=true

let synthesisCooldown=0
let glucose=100
let energy=100
let health=100
let salinity=100


let synthesis=document.getElementById("synthesis")
let syn=document.getElementById("syn")
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
  cooldownOnSynthesis=5
  energyUsage=0.1
}

thermo.onclick=()=>{
  synthesisType="thermo"
  synthesisGlucoseOutput=7.5
  cooldownOnSynthesis=3
  energyUsage=0.125
  makeEnergyOnSynthesis=true
}



play.onclick=()=>{
  onMenu = false
  menu.classList.remove("shown")
  menu.classList.add("hidden")
  game.classList.remove("hidden")
  game.classList.add("shown")
  if (synthesisType=="photo") {
    document.getElementById("player").classList.add("photo-cube")
  } else {
    document.getElementById("player").classList.add("thermo-cube")
    syn.innerText="Produces 7.5 glucose from thermal heat, also produces 5 energy. Cooldown: 3 seconds"
    synthesis.innerText="Thermosynthesis"
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
let regenEnergy=(amount,glucoseCost)=>{
  if (glucose>=glucoseCost) {
    if (energy<100) {
      energy=energy+amount
      glucose=glucose-glucoseCost
    }
  }
  document.getElementById("energyBar").value=energy
  document.getElementById("glucoseBar").value=glucose
}
let regenHealth=(amount,energyCost)=>{
  if (energy>energyCost+20) {
    if (health<100) {
      health=health+amount
      energy=energy-energyCost
    }
  }
  document.getElementById("energyBar").value=energy
  document.getElementById("healthBar").value=health
}

let regenSalinity=(amount, energyCost) => {
  if (energy >= energyCost) {
    if (salinity<100) {
      salinity=salinity+amount
      energy=energy-energyCost
    }
  }
  document.getElementById("energyBar").value=energy
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
  if (energy>=2.5) {
  if (player.x_pos < (board.width - player.width)) {
    player.x_pos+=50
    if (checkMove()) {
      playerDiv.style.left = player.x_pos + "px"
      document.getElementById("energyBar").value = energy
      energy -= 2.5
    } else {
      player.x_pos-=50
    }
  }
  }
}

R.onclick=()=>{
  if (energy>=2.5) {
  if (player.x_pos > 0)  {
    player.x_pos-=50
    if (checkMove()) {
      playerDiv.style.left = player.x_pos + "px"
      document.getElementById("energyBar").value = energy
      energy -= 2.5
    } else {
      player.x_pos+=50
    }
  }
  }
}

Top.onclick=()=>{
  if (energy>=2.5) {
  if (player.y_pos > 0) {
    player.y_pos-=50
    if (checkMove()) {
      playerDiv.style.top = player.y_pos + "px"
      document.getElementById("energyBar").value = energy
      energy -= 2.5
    } else {
      player.y_pos+=50
    }
  }
  }
}



Down.onclick=()=>{
  if (energy>=2.5) {
    if (player.y_pos < (board.height - player.height)) {
      player.y_pos+=50
      if (checkMove()) {
        playerDiv.style.top = player.y_pos + "px"
        document.getElementById("energyBar").value = energy
        energy -= 2.5
      } else {
        player.y_pos-=50
      }
    }
  }
}

synthesis.onclick=()=>{
  if (synthesisCooldown==0) {
    regenGlucose(synthesisGlucoseOutput)
    synthesisCooldown=cooldownOnSynthesis
    if (makeEnergyOnSynthesis==true) {
      regenEnergy(5,0)
    }
  }
  document.getElementById("glucoseBar").value=glucose
  document.getElementById("energyBar").value=energy
}



setInterval(()=>{
  if (synthesisCooldown>0) {
    synthesisCooldown=synthesisCooldown-0.1
    if (Math.floor(synthesisCooldown)!=0) {
      syn.innerText=Math.floor(synthesisCooldown)
    } else {
      synthesisCooldown=0
      syn.innerText=""
    }
  }
  regenHealth(2.5,5)
  
  
  energy=energy-energyUsage
  
  if (salinity+5>100) {
    if (energy>energyUsage) {
      salinity=100
      document.getElementById("salinityBar").value=salinity
    }
  } else {
    if (energy>energyUsage) {
      salinity=salinity+5
      document.getElementById("energyBar").value=energy
    }
  }
  
  
  regenEnergy(0.5,0.25)
  regenHealth(2.5,5)
  
  if (energy<energyUsage) {
    salinity=salinity-15
  }
  
  if (salinity<=0) {
    health=health-2.5
    salinity=0
  }
  
  document.getElementById("salinityBar").value=salinity
  
  
  
  if (health==0) {
    glucose=-9999999
    energy=-9999999
    salinity=-9999999
  }
  document.getElementById("salinityBar").value=salinity
  document.getElementById("energyBar").value=energy
  document.getElementById("glucoseBar").value=glucose
  regenHealth(2.5,5)
  if (onMenu==true) {
    glucose=100
    salinity=100
    energy=100
    health=100
    document.getElementById("salinityBar").value=salinity
    document.getElementById("energyBar").value=energy
    document.getElementById("glucoseBar").value=glucose
    document.getElementById("healthBar").value=health
  }
  
  
  
},100)