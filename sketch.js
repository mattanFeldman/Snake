let links = []
let apple
let score
let keys = []

function setup() {
  c1 = '#A2D149'
  c2 = '#AAD751'
  keys = []
  x = 400
  y = 400
  length = 6
  n = 17
  d_x = 0
  d_y = 0
  createCanvas(x, y)
  background(220)
  frameRate(12)
  game_state = 0
  restart()
  //  print(links.length)

}

function restart() {
  game_state = 0
  score = links.length - length
  links = []
  d_x = 0
  d_y = 0

  apple = new Apple(width / n, height / n, floor(random(0, n)), floor(random(0, n)))
  for (i = 0; i < length; i++) {
    links.push(new Link(width / n, height / n, 5 - i, 8))

  }
  appleNotFree = false
  appleLocation()
  //  links.push(new Tail(width/n, height/n,5-length,8))
  // print("restart")
}


function keyPressed() {
  if (keys.length == 2) {
    return
  } else if (keys.length == 1) {
    if (keyCode === LEFT_ARROW || keyCode === 65) {
      if (keys[0] != "RIGHT") {
        keys.push("LEFT")
      }

    } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
      game_state = 1
      if (keys[0] != "LEFT") {
        keys.push("RIGHT")
      }

    } else if (keyCode === UP_ARROW || keyCode === 87) {
      game_state = 1
      if (keys[0] != "DOWN") {
        keys.push("UP")
      }

    } else if (keyCode === DOWN_ARROW || keyCode === 83) {
      game_state = 1
      if (keys[0] != "UP") {
        keys.push("DOWN")
      }
    }
  } else {
    if (keyCode === LEFT_ARROW || keyCode === 65) {
      if (d_x != 1) {
        keys.push("LEFT")
      }

    } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
      if (d_x != -1) {
        keys.push("RIGHT")
      }

    } else if (keyCode === UP_ARROW || keyCode === 87) {
      if (d_y != 1) {
        keys.push("UP")
      }

    } else if (keyCode === DOWN_ARROW || keyCode === 83) {
      if (d_y != -1) {
        keys.push("DOWN")
      }
    }
  }

  
}


function draw() {
  if (game_state == 1) {
    drawGrid()
    direction()
    snakeMove()
    wallCollide()
    snakeCollide()
    appleCollide()
    apple.show()
  } else {
    textSize(x/15)
    fill(0)
    strokeWeight(0)
    text('your score was:' + score, x/2.5, y/1.5)
    textSize(x/30)
    text('press arrow keys/WASD to start', x/2.5, y/1.5+y/30)
    strokeWeight(1)
  }
}

function direction() {
  
  if (keys[0] == "LEFT") {
    d_x = -1
    d_y = 0
  }
  
  if (keys[0] == "RIGHT") {
    d_x = 1
    d_y = 0
  }
  
  if (keys[0] == "UP") {
    d_x = 0
    d_y = -1
  }
  
  if (keys[0] == "DOWN") {
    d_x = 0
    d_y = 1
  }
  keys.shift()

}

function snakeMove() {
  if (game_state != 0) {
    links[0].move(links[0].x + d_x, links[0].y + d_y)
    for (i = 1; i < links.length; i++) {
      links[i].move(links[i - 1].l_x, links[i - 1].l_y)
    }
  } else {
    for (i = 0; i < links.length; i++) {
      links[i].show()

    }
  }
}

function addLink() {
  links.push(new Link(width / n, height / n, links[links.length - 1].l_x, links[links.length - 1].l_y))
}

function appleLocation() {
  do {
    for (i = 0; i < links.length; i++) {
      if (apple.x == links[i].x && apple.y == links[i].y) {
        apple.x = floor(random(0, n))
        apple.y = floor(random(0, n))
        appleNotFree = true
      } else {
        appleNotFree = false
      }
    }
  }
  while (appleNotFree == true)
}

function appleCollide() {
  appleNotFree = false
  if (apple.x == links[0].x && apple.y == links[0].y) {
      appleLocation()

    addLink()
    print("your score is: " + (links.length - length))
  }

}

function wallCollide() {
  if (links[0].x < 0 || links[0].x > n - 1 || links[0].y < 0 || links[0].y > n - 1) {
    restart()
  }
}

function snakeCollide() {
  for (i = 1; i < links.length; i++) {
    if (links[0].x == links[i].x && links[0].y == links[i].y) {
      restart()
    }
  }
}

function scoreCalculate() {
  score = (links.length - length)
}

function drawGrid() {
  for (i = 0; i < n; i++) {
    if (i % 2 == 0) {
      A = 1
    } else {
      A = -1
    }
    for (j = 0; j < n; j++) {
      if (j % 2 == 0) {
        B = 1
      } else {
        B = -1
      }
      if ((A * B) == -1) {
        fill(c1)
        stroke(c1)
      } else {
        fill(c2)
        stroke(c2)
      }
      rect(x * (i / n), y * (j / n), x / n, y / n)

    }
  }
}

class Link {
  constructor(width, height, x, y) {
    this.l_x = null
    this.l_y = null
    this.x = x
    this.y = y
    this.w = width
    this.h = height
  }
  show() {
    stroke('#5076F9')
    fill('#5076F9')
    rect(this.w * (this.x), this.h * (this.y), this.w, this.h)
  }
  move(x, y) {
    this.l_x = this.x
    this.l_y = this.y
    this.x = x
    this.y = y
    this.show()
  }
}

// class Tail extends Link {
//   constructor(width,height,x,y){
//     super(width,height,x,y)
//   }
//   show(){
//     stroke('#5076F9')
//     fill('#5076F9')
//     rect(this.w * (this.x), this.h * (this.y), this.w, this.h)
//     ellipse(this.w*this.x, this.h * this.y+17.5, this.w, this.h)
//   }
// }

class Apple {
  constructor(width, height, x, y) {
    this.x = x
    this.y = y
    this.w = width
    this.h = height
  }
  show() {
    fill(180, 75, 0)
    stroke(180, 75, 0)
    rect(this.w * (this.x) + 15, this.h * (this.y) + 2, this.w - 30, this.h - 8)
    stroke(240, 0, 0)
    fill(240, 0, 0)
    rect(this.w * (this.x) + 6, this.h * (this.y) + 6, this.w - 12, this.h - 12)
  }
}