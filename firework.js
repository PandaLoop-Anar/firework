const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let w, h;
let fireworks = [];
let particles =[];
let fMax=6;//srolata maaximaluri raodenoba
let fChance=0.1;
let hue=0;

function init(){
resizeReset();
animation();
}

function resizeReset(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  ctx.fillStyle= "#151B26";
  ctx.fillRect(0, 0, w, h);
}
function randomInt(min, max){
  return Math.round(Math.random() * (max-min))+ min;
}
function easeOutQ(x){
  return 1-Math.pow(1-x, 2.5);//aq xarisxis shecvlit shegvidzlia srolis gamosaxulebis shecvla
}

class Firework{
  constructor(){
    this.x =randomInt(w *0.2, w*0.8) ;
    this.y = h;
    this.mizaniY=randomInt(h * 0.2, h *0.4);
    this.hue=hue;
    this.alpha=1;
    this.tick=0;
    this.ttl =randomInt(120, 180);
  }
  draw(){
    if(this.tick<+ this.ttl){
     ctx.beginPath();
  ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
  ctx.fillStyle= `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
  ctx.fill();
  ctx.closePath(); 
    }
  
  }
  update(){
    let progresi = 1-(this.ttl -this.tick)/this.ttl;
  this.y= h -(h -this.mizaniY)*easeOutQ(progresi);
  this.alpha=1-easeOutQ(progresi);
  this.tick++;
  }
}


class Particle{
  constructor(x, y, hue, i){
    this.x = x;
    this.y = y;
    this.hue=hue;
    this.size=randomInt(2, 3);
    this.speed=randomInt(30, 40)/10;
    this.angle =randomInt(0, 90) + i*90;
  }
  draw(){
    if(this.size>0){
     ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle= `hsla(${this.hue}, 100%, 50%, 1)`;
    ctx.fill();
    ctx.closePath();  
    }    
  }
  update(){
  this.radian = (Math.PI / 180) *this.angle;
  this.x += this.speed *Math.sin(this.radian);
  this.y += this.speed *Math.cos(this.radian);
  this.size-=0.05;
  }
}


function drawScene(){
  fireworks.map((firework) =>{
    firework.update();
    firework.draw();
  })
  particles.map((Particle) =>{
    Particle.update();
    Particle.draw();
  })
};

function cleanArray(){
  let d1=[];
  let d2=[];
  fireworks.map((firework)=>{
    if(firework.alpha>0){
      d1.push(firework);
    }else{
      createFireworks(firework.x, firework.y, firework.hue);
    }
  })
  fireworks = d1;

  particles.map((Particle)=>{
    if(Particle.size>0){
      d2.push(Particle);
    }
  })
  particles = d2;
};

function createFireworks(x, y, hue){
  for(let i=0; i<40; i++){
    if(i%3 ==0){
      hue+=70;
    }else if(i%3 ==1){
      hue-=60
    }else if(i%3 ==2){
      hue-=10
    }
    particles.push(new Particle(x, y, hue, i));
  }
}

function animation(){
  if (fireworks.length< fMax && Math.random()<fChance){
    fireworks.push(new Firework());
    hue+=10;
  }
ctx.globalCompositionOperation = "source-over";
ctx.fillStyle="rgba(21, 27, 38, 0.24)"
ctx.fillRect(0, 0, w, h);
ctx.globalCompositionOperation ="lighter"

  drawScene();
  cleanArray();
  requestAnimationFrame(animation);
}


window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);