const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";
const symbols = "!@#$%&";
const chars = (letters + digits + symbols).split("");

var ticks = 0;

function clear() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function randint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randchoice(arr) {
  return arr[randint(0, arr.length - 1)];
}

class Symbol{
  constructor(xpos, ypos, vel, delay, ishead){
    this.xpos = xpos;
    this.ypos = ypos;
    this.vel = vel;
    this.delay = delay;
    this.ishead = ishead;
    this.sy = "";
  }
  set(){
    // this.sy = randchoice(chars)
    this.sy = String.fromCharCode(randint(12352, 12543))
  }
  render(){
    if(this.ishead){
      ctx.fillStyle = "#ffffff";
    } else {
      ctx.fillStyle = "#00ff00";
    }
    ctx.fillText(this.sy, this.xpos, this.ypos)
    if(ticks % this.delay == 0){
      this.set();
    }
  }
  rain(){
    if(this.ypos > canvas.height + fontsize){
      this.ypos = -500;
    }
    this.ypos += this.vel;
  }
}

class Stream{
  constructor(xpos, ypos, vel, size){
    this.xpos = xpos;
    this.ypos = ypos;
    this.vel = vel;
    this.size = size;
    this.arr = []
    this.build()
  }
  build(){
    let sum = 0;
    for(let i = this.ypos; i < this.ypos + this.size; i++){
        if(i == this.ypos + this.size - 1){
          this.arr.push(new Symbol(this.xpos, i + sum, this.vel, randint(5, 20), 1))
        } else {
          this.arr.push(new Symbol(this.xpos, i + sum, this.vel, randint(5, 20), 0))
        }
        sum += fontsize;
    }
  }
  render(){
    for(let i = 0; i < this.size; i++){
      this.arr[i].render();
      this.arr[i].rain()
    }
  }
}

const fontsize = 20
ctx.font = `${fontsize}px Arial`;
let streams = []

for(let i = 0; i < canvas.width; i += fontsize){
  let size = randint(10, 30)
  let vel = randint(5, 10)
  let xpos = i;
  let ypos = randint(-2000, -1000);
  let stream = new Stream(xpos, ypos, vel, size)
  streams.push(stream)
}


gameloop = setInterval(() => {
  clear()

  streams.forEach((st) => {
    st.render()

  })
  
 
  ticks++;
}, 1000 / 60);
