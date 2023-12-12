const canvas = document.querySelector("canvas")

let mouse = {
    x: undefined,
    y : undefined,
}

const maxRadius = 40;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener('mousemove', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
})

// responsive canvas
window.addEventListener("resize", ()=>{
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    init() // initilizing circles every time we resize the window size
})


let brush = canvas.getContext('2d')
let colorArray = ["#D7D7D9", "#63A69F", "#F2E1AC", "#F2836B", "#F2594B", "#CD2C24"]

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.orginalRadius = radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = () => {
        brush.beginPath()
        brush.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        brush.fillStyle = this.color
        brush.fill()
    }

    this.update = () => {
        // x_cord + radius > canvas width or x_cord - radius then rever the velocity
        if(this.x + this.radius >= innerWidth || this.x - this.radius <= 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius >= innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //mouse intraction
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < maxRadius)
                this.radius += 5
        }
        else if(this.radius > this.orginalRadius ){
            this.radius -= 1;
        }
        this.draw()
    }
}


let circleArray = []
function init(){
    circleArray = [] // every time reset circle arr so that only 800 item can be present
    for(let i = 0; i < 800; i++){
        //( [0-1) + 1 to avoid 0
        let radius = Math.random() * 5 + 1 
        let x_cord = Math.random() * (innerWidth - radius*2) + radius;
        let y_cord = Math.random() * (innerHeight - radius*2) + radius;
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x_cord, y_cord, dx, dy, radius))
    }
}


function animate(){
    brush.clearRect(0,0, innerWidth, innerHeight)
    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].update()
    }
    requestAnimationFrame(animate)
}

init()
animate()

