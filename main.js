const toDebug = false
var initialLives = 1
var toSpawnBonus = true
var wallsInitial = true
var autoMove = true
var initialSnakeSpeed = 1
//minimum tileCount is 11 with walls and 10 without
var tileCount = 17
var language = "eng"
var showGrid = false
var gameTheme = "dark"
var uiTheme = "dark"
var checkeredGround = true
submitSettings("Default")
var enemySpawnLevel = 5
var checkedColor
var lightGroundColor = "#c4c4c4"
var darkGroundColor = "#1e1e1e"
var groundColor
var gridColor
var text = {
    points:"",
    lives:"",
    hs:"",
    death:["",""],
    restart:""
}
var lives = initialLives
var walls = wallsInitial
var points = 1
var highScore = 1
var hasStarted = false
var dead = false
var minCoord
var maxCoord
function defineExtremeCoords() {
    if (wallsInitial) {
        minCoord = 1
        maxCoord = tileCount - 2
    }
    else {
        minCoord = 0
        maxCoord = tileCount - 1
    }
}
defineExtremeCoords()
var snake = {
    x:Math.floor(tileCount / 2),
    y:Math.floor(tileCount / 2),
    tiles:[],
    color:"#1577ff",
    headColor:"#0048ff",
    name:"snake",
    speed:initialSnakeSpeed,
    direction:""
}
snake.tiles.push(snake.x + "," + snake.y)
var target = {
    x:random(minCoord,maxCoord),
    y:random(minCoord,maxCoord),
    color:"#ff2a4a",
    name:"target",
    speed:0.5,
    direction:""
}
var enemy = {
    x:"",
    y:"",
    color:"#812698",
    name:"enemy",
    speed:0.7,
    direction:""
}
var fruit = {
    x:"",
    y:"",
    tiles:[],
    color:"#23b70f",
    name:"fruit"
}
var speedBoost = {
    x:"",
    y:"",
    tiles:[],
    color:"#e0e314",
    name:"speedBoost"
}
let wall = {
    x:"", 
    y:"",
    tiles:[],
    color:"#717171",
    name:"wall"
}
var portal1 = {
    x:"",
    y:"",
    color: "#ff6803",
    name:"portal1"
}
var portal2 = {
    x:"",
    y:"",
    color: "#ff6803",
    name:"portal2"
}
var bonusLife = {
    x:"",
    y:"",
    color:"#08ffe6",
    name:"bonusLife"
}
var star = {
    x:"", 
    y:"", 
    color:"#ff05c9",
    name:"star"
}
var timerEnemy = null
function random(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    result = {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    }
    return "rgb(" + result.r + ", " + result.g + ", " + result.b + ")"
}
var sizeMeasurement
function checkScreenSize() {
    if (window.screen.width > window.screen.height) {
        console.log("pc screen")
        sizeMeasurement = "vh"
    }
    else {
        console.log("phone screen")
        sizeMeasurement = "vw"
    }
    console.log("width: " + window.screen.width + "\nheight: " + window.screen.height)
}
checkScreenSize()
var board
function createBoard(tiles) {
    board = document.createElement("table")
    board.style.width = "100" + sizeMeasurement
    board.style.height = "100" + sizeMeasurement
    board.style.backgroundColor = "#1e1e1e"
    board.style.fontSize = "0.1px"
    document.getElementById("boardContainer").appendChild(board)
    for (let y = 0; y < tiles; y++) {
        let row = document.createElement("tr")
        board.appendChild(row)
        for (let x = 0; x < tiles; x++) {
            var tile = document.createElement("td")
            tile.id = x + "," + y
            if (toDebug) {
                tile.textContent = tile.id
            }
            tile.className = "tiles"
            row.appendChild(tile)
        }
    }
}
createBoard(tileCount)
var hasRestarted = true
function updateScreen() {
    if (gameTheme === "dark") {
        groundColor = darkGroundColor
        checkedColor = "#282828"
        if (showGrid) {
            gridColor = lightGroundColor
        }
    }
    else {
        groundColor = lightGroundColor
        checkedColor = "#bdbdbd"
        if (showGrid) {
            gridColor = darkGroundColor
        }
    }
    if (uiTheme === "dark") {
        setUIDarkMode()
    }
    else {
        setUILightMode()
    }
    fillScreen(groundColor,checkedColor,checkeredGround)
    if (!showGrid) {
        board.cellSpacing = "0"
    }
    else {
        board.cellSpacing = "2"
        board.style.backgroundColor = gridColor
    }
    if (language === "eng") {
        english()
    }
    else {
        portuguese()
    }
    changeText()
    if (walls) {
        drawBorder(wall.color,0,tileCount - 1)
    }
    drawObject(target)
    if (points > enemySpawnLevel - 1 && enemy.x !== "") {
        drawObject(enemy)
    }
    if (star.x !== "") {
        drawObject(star)
    }
    if (bonusLife.x !== "") {
        drawObject(bonusLife)
    }
    if (portal1.x !== "") {
        drawObject(portal1)
        drawObject(portal2)
    }
    if (walls && wall.tiles.length !== 0) {
        for (let i = 0; i < wall.tiles.length; i++) {
            document.getElementById(wall.tiles[i]).style.backgroundColor = wall.color
        }
    }
    if (fruit.tiles.length !== 0) {
        for (let i = 0; i < fruit.tiles.length; i++) {
            document.getElementById(fruit.tiles[i]).style.backgroundColor = fruit.color
        }
    }
    if (speedBoost.tiles.length !== 0) {
        for (let i = 0; i < speedBoost.tiles.length; i++) {
            document.getElementById(speedBoost.tiles[i]).style.backgroundColor = speedBoost.color
        }
    }
    if (initialLives > 1 || toSpawnBonus) {
        document.getElementById("lives").innerHTML = text.lives + lives
    }
    drawObject(snake)
}
updateScreen()
function drawBorder(color,min,max) {
	for (let i = 0; i <= tileCount - 1; i++) {
		document.getElementById(i + "," + min).style.backgroundColor = color
		document.getElementById(i + "," + max).style.backgroundColor = color
		document.getElementById(min + "," + i).style.backgroundColor = color
		document.getElementById(max + "," + i).style.backgroundColor = color
	}
}
function isEven(number) {
    if (Math.floor(number / 2) === number / 2) {
        return true
    }
}
function toCheckGround(id) {
    let idArray = Array.from(id)
    let x = idArray.slice(idArray.indexOf(",") + 1)
    let y = idArray.slice(0, idArray.indexOf(","))
    if (isEven(x.join("")) && !isEven(y.join("")) || !isEven(x.join("")) && isEven(y.join(""))) {
        return true
    }
}
function fillScreen(defaultColor,checkColor,toCheck) {
    let tilesClass = document.getElementsByClassName("tiles")
    for (let i = 0; i < tilesClass.length; i++) {
        let color = defaultColor
        if (toCheck && toCheckGround(tilesClass[i].id)) {
            color = checkColor
        }
        tilesClass[i].style.backgroundColor = color
    }
}
var flashDuration = 700
var isFlashing = false
function screenFlash(color,flashes,duration) {
    isFlashing = true
    let colorArray = Array.from(color)
    let subtract = 1 / flashes
    let currentAlpha = 1
    function fade() {
        colorArray.push(currentAlpha - subtract)
        currentAlpha = currentAlpha - subtract
        colorArray.push(")")
        fillScreen(colorArray.join(""),"",false)
        colorArray.pop()
        colorArray.pop()
    }
    for (let i = 0, f = 0; i < flashes; i++, f = f + duration / flashes) {
        setTimeout(fade,f)
        flashDuration = flashDuration - duration / flashes
    }
    setTimeout(function () {
        updateScreen()
        flashDuration = 700
        isFlashing = false
    },duration)
}
function drawObject(object) {
    if (object === snake) {
        for (let i = 0; i < snake.tiles.length; i++) {
            document.getElementById(object.tiles[i]).style.backgroundColor = object.color
        }
        document.getElementById(snake.x + "," + snake.y).style.backgroundColor = object.headColor
    }
    else {
        document.getElementById(object.x + "," + object.y).style.backgroundColor = object.color
    }
}
function erase(object,type) {
    let id
    if (type === "object") {
	    id = object.x + "," + object.y    
    }
    else {
        id = object
    }
    let color = groundColor
    if (toCheckGround(id) && checkeredGround) {
        color = checkedColor
    }
    document.getElementById(id).style.backgroundColor = color
}
function toGrow() {
    if (!collision(snake,fruit)) {
        erase(snake.tiles.shift(),"id")
    }
    else {
        fruit.tiles.splice(fruit.tiles.indexOf(snake.x + "," + snake.y),1)
    }
}
function collision(object,colidingWith) {
    if (document.getElementById(object.x + "," + object.y).style.backgroundColor === hexToRgb(colidingWith.color)) {
        return true
    }
    if (colidingWith === snake) {
        if (document.getElementById(object.x + "," + object.y).style.backgroundColor === hexToRgb(snake.headColor)) {
            return true
        }
    }
}
function move(element) {
    if (element.direction === "r") {
        element.x++
    }
    if (element.direction === "l") {
        element.x--
    }
    if (element.direction === "u") {
        element.y--
    }
    if (element.direction === "d") {
        element.y++
    }
}
var prveviousSnakeY = snake.y
var prveviousSnakeX = snake.x
function moveSnake() {
    prveviousSnakeY = snake.y
    prveviousSnakeX = snake.x
    move(snake)
    screenWrap(snake)
    usePortal()
    if (lives !== 0) {
        toGrow()
    }
    if (collision(snake,enemy)) {
        isDead("y")
    }
    else {
        isDead()
    }
    snake.tiles.push(snake.x + "," + snake.y)
    if (collision(snake,speedBoost) && autoMove) {
        speedBoost.tiles.splice(speedBoost.tiles.indexOf(snake.x + "," + snake.y),1)
        snake.speed = snake.speed + 0.2
        clearInterval(timerSnake)
        timerSnake = setInterval(runSnake,500/snake.speed)
    }
    if (collision(snake,star)) {
        for (let i = 0; i < wall.tiles.length; i++) {
            erase(wall.tiles[i],"id")
        }
        if (!walls) {
            clearInterval(powerupTimer)
        }
        timeLeft = timeLeft + 10
        walls = false
        updateScreen()
        star.x = ""
        star.y = ""
        document.getElementById("timeleft").innerHTML = timeLeft
        powerupTimer = setInterval(starCountdown,1000)
    }
    if (collision(snake,bonusLife)) {
        lives++
        document.getElementById("lives").innerHTML = text.lives + lives
        bonusLife.x = ""
        bonusLife.y = ""
    }
    drawObject(snake)
}
function reset(type) {
    if (type === "hard") {
        if (!isBoardSmaller) {
            erase(target,"object")
            if (enemy.x !== "") {
                erase(enemy,"object")
            }
            for (let i = 0; i < snake.tiles.length; i++) {
                erase(snake.tiles[i],"id")
            }
        }
        snake.tiles = []
        snake.x = Math.floor(tileCount / 2)
        snake.y = Math.floor(tileCount / 2)
        snake.tiles.push(snake.x + "," + snake.y)
        points = 1
        snake.speed = initialSnakeSpeed
        snake.direction = ""
        target.speed = 0.5
        enemy.speed = 0.7
        hasStarted = false
        if (wallsInitial && timeLeft !== 0) {
            walls = wallsInitial
            clearInterval(powerupTimer)
            timeLeft = 0
            document.getElementById("timeleft").innerHTML = ""
        }
        if (star.x !== "" && !isBoardSmaller) {
            erase(star,"object")
        }
        star.x = ""
        star.y = ""
        if (bonusLife.x !== "" && !isBoardSmaller) {
            erase(bonusLife,"object")
        }
        bonusLife.x = ""
        bonusLife.x = ""
        dead = false
        for (let i = 0; i < fruit.tiles.length; i++) {
            if (!isBoardSmaller) {
                erase(fruit.tiles[i],"id")
            }
        }
        fruit.tiles = []
        for (let i = 0; i < speedBoost.tiles.length; i++) {
            if (!isBoardSmaller) {
                erase(speedBoost.tiles[i],"id")
            }
        }
        speedBoost.tiles = []
        for (let i = 0; i < wall.tiles.length; i++) {
            if (!isBoardSmaller) {
                erase(wall.tiles[i],"id")
            }
        }
        wall.tiles = []
        lives = initialLives
        if (initialLives > 1 || toSpawnBonus) {
            document.getElementById("lives").innerHTML = text.lives + lives
        }
        isPaused = false
        directionQueue = []
        directionsInOneTick = []
    }
    target.x = random(minCoord,maxCoord)
    target.y = random(minCoord,maxCoord)
    if (points > enemySpawnLevel - 1) {
        reRoll(enemy,snake,5)
    }
    if (type === "soft") {
        console.log("soft reset setting")
        timerTarget = setInterval(runTarget,500/target.speed)
        if (points > enemySpawnLevel - 1) {
            timerEnemy = setInterval(runEnemy,500/enemy.speed)
        }
    }
    if (portal1.x !== "" && !isBoardSmaller) {
        erase(portal1,"object")
        erase(portal2,"object")
    }
    portal1.x = ""
    portal1.y = ""
    portal2.x = ""
    portal2.y = ""
    updateScreen()
} 
function hasCollapsed() {
    let snakePlace = snake.x + "," + snake.y 
    if (snake.tiles.includes(snakePlace)) {
        return true
    }
}
function restart() {
    reset("hard")
    hasRestarted = true
    document.getElementById("restartContainer").removeChild(restartBtn)
    restartBtn.removeEventListener("click",restart)
}
var reSpawnImmunity = {
    toActivate:false,
    isActive:false,
    duration:5,
    timeLeft:5
}
function isDead(y) {
    if (hasCollapsed() || collision(snake,wall) && walls || y === "y") {
        if (!reSpawnImmunity.isActive) {
            lives--
            screenFlash("rgba(210, 3, 3, ",50,flashDuration)
            isPaused = true
            setTimeout(function () {
                isPaused = false
            },flashDuration)
            if (autoMove) {
                clearInterval(timerSnake)
            }
            console.log("is dead clear")
            clearInterval(timerTarget)
            clearInterval(timerEnemy)
            timerEnemy = null
            hasStarted = false
            if (initialLives > 1 || toSpawnBonus) {
                document.getElementById("lives").innerHTML = text.lives + lives
            }
            if (lives === 0) {
                dead = true
                setTimeout(function () {
                    if (confirm(text.death["0"] + snake.tiles.length + text.death["1"])) {
                        hasRestarted = true
                        reset("hard")
                    }
                    else {
                        document.getElementById("timeleft").innerHTML = ""
                        document.getElementById("restartContainer").appendChild(restartBtn)
                        hasRestarted = false
                        restartBtn.addEventListener("click",restart)
                    }
                },flashDuration)
            }
            else {
                if (y === "y") {
                    reSpawnImmunity.toActivate = true
                }
                else {
                    snake.x = prveviousSnakeX
                    snake.y = prveviousSnakeY
                }
                drawObject(snake)
            }
        }
        else {
            if (y !== "y") {
                snake.x = prveviousSnakeX
                snake.y = prveviousSnakeY
            }
            drawObject(snake)
        }
    }
}
var restartBtn = document.createElement("button")
restartBtn.id = "restartBtn"
restartBtn.style.background = fruit.color
restartBtn.style.width = "24" + sizeMeasurement
restartBtn.style.height = "15" + sizeMeasurement
restartBtn.innerHTML = text.restart
restartBtn.style.fontSize = "4" + sizeMeasurement
function hasWon(y) {
    if (snake.tiles.includes(target.x + "," + target.y ) || y === "y") {
        console.log("has won clear")
        clearInterval(timerTarget)
        erase(target,"object")
        points++
        if (timerEnemy === null && points > enemySpawnLevel - 1) {
            timerEnemy = setInterval(runEnemy,500/enemy.speed)
        }
        if (points > enemySpawnLevel - 1) {
            clearInterval(timerEnemy)
            timerEnemy = null
            reRoll(enemy,snake,5)
        }
        if (points > highScore) {
            highScore++
        }
        reset("soft")
        if (chance(0.5)) {
            spawnPortals()
        }
        lvlLock()
        spawnWall()
    }
}
function runSnake() {
    hasWon()
    if (chance(0.05)) {           
        spawnFruit()
    }
    if (chance(0.05) && autoMove) {           
        spawnSpeedBoost()
    }
    closestTile()
    if (chance(0.005) && wallsInitial) {
        spawnStar()
    }
    if (chance(0.005) && toSpawnBonus) {
        spawnBonusLife()
    }
    for (let i = 0; i < directionsInOneTick.length; i++) {
        directionQueue.push(directionsInOneTick[i])
    }
    if (directionQueue.length > 1) {
        if (hasStarted) {
            directionQueue.shift()
        }
    }
    snake.direction = directionQueue["0"]
    toAutoMove()
    directionsInOneTick = []
    moveSnake()
    if (portal1.x !== "") {
        drawObject(portal1)
        drawObject(portal2)
    }
}
function lvlLock() {
    if (points/3 === Math.floor(points / 3)) {
        target.speed = target.speed + 0.4 
    }
    if (points/5 === Math.floor(points / 5)) {
        snake.speed = snake.speed + 0.5
    }
    if (points/5 === Math.floor(points / 5)) {
        enemy.speed = enemy.speed + 0.6
    }
}
function spawnFruit() {
    fruit.x = random(minCoord,maxCoord)
    fruit.y = random(minCoord,maxCoord)
    let fruitPlace = fruit.x + "," + fruit.y
    let starPlace
    if (star.x !== "") {
        starPlace = star.x + "," + star.y
    }
    else {
        starPlace = 0
    }
    if (fruitPlace === starPlace || wall.tiles.includes(fruitPlace)) {
        spawnFruit()
    }
    else {
        drawObject(fruit)
        fruit.tiles.push(fruitPlace)
    }
}
function spawnSpeedBoost() {
    speedBoost.x = random(minCoord,maxCoord)
    speedBoost.y = random(minCoord,maxCoord)
    let speedBoostPlace = speedBoost.x + "," + speedBoost.y
    let starPlace = star.x + "," + star.y
    if (speedBoostPlace === starPlace || wall.tiles.includes(speedBoostPlace)) {
        spawnSpeedBoost()
    }
    else {
        drawObject(speedBoost)
        speedBoost.tiles.push(speedBoostPlace)
    }
}
function spawnWall() {
    wall.x = random(minCoord,maxCoord)
    wall.y = random(minCoord,maxCoord)
    if (isNear(wall,snake,3) || collision(wall,star)) {
        reRoll(wall,snake,3)
    }
    if (walls) {
        drawObject(wall)
    }
    wall.tiles.push(wall.x + "," + wall.y)
}
function spawnPortals() {
    portal1.x = random(minCoord,maxCoord)
    portal1.y = random(minCoord,maxCoord)
    portal2.x = random(minCoord,maxCoord)
    portal2.y = random(minCoord,maxCoord)
    if (isNear(portal1,portal2,Math.floor(tileCount / 2)) ||collision(portal1,star) || collision(portal2,star)) {
        reRoll(portal1,portal2,Math.floor(tileCount / 2))
        reRoll(portal2,portal1,Math.floor(tileCount / 2))
    }
    drawObject(portal1)
    drawObject(portal2)
}
function usePortal() {
    let snakePlace = snake.x + "," + snake.y
    let portal1Place = portal1.x + "," + portal1.y
    let portal2Place = portal2.x + "," + portal2.y
    if (snakePlace === portal1Place) {
        snake.x = portal2.x
        snake.y = portal2.y
        drawObject(portal2)
    }
    if (snakePlace === portal2Place) {
        snake.x = portal1.x
        snake.y = portal1.y
        drawObject(portal1)
    }
}
function spawnBonusLife() {
    if (bonusLife.x !== "") {
        erase(bonusLife,"object")
    }
    bonusLife.x = random(minCoord,maxCoord)
    bonusLife.y = random(minCoord,maxCoord)
    drawObject(bonusLife)
}
function spawnStar() {
    if (star.x !== "") {
        erase(star,"object")
    }
    star.x = random(minCoord,maxCoord)
    star.y = random(minCoord,maxCoord)
    drawObject(star)
}
var timeLeft = 0
function starCountdown() {
    timeLeft--
    document.getElementById("timeleft").innerHTML = timeLeft
    if (timeLeft === 0) {
        drawBorder(wall.color,0,tileCount - 1)
        for (let i = 0; i < wall.tiles.length; i++) {
            document.getElementById(wall.tiles[i]).style.backgroundColor = wall.color
        }
        document.getElementById("timeleft").innerHTML = ""
        clearInterval(powerupTimer)
        walls = true
    }
}
function screenWrap(object) {
    if (!walls) {
        if (object.y === tileCount && object.direction === "d") {
            object.y = 0
        }
        if (object.y === -1 && object.direction === "u") {
            object.y = tileCount - 1
        }
        if (object.x === tileCount && object.direction === "r") {
            object.x = 0
        }
        if (object.x === -1 && object.direction === "l") {
            object.x = tileCount - 1
        }
    }
}
function targetAI() {
    if (chance(0.5)) {
    	if (snake.y < target.y) {
            target.direction = "d"
        }
        else {
            target.direction = "u"
        }
    }
    else {
        if (snake.x < target.x) {
            target.direction = "l"
        }
        else {
            target.direction = "r"
        }
    }
}
var reCallTarget = "y"
function moveTarget() {
	let previousY = target.y
	let previousX = target.x 
	let directions = ["r","l","u","d"]
    erase(target,"object")
    if (reCallTarget === "y") {
        if (isNear(target,snake,5)) {
            targetAI()
        }
        else {
        	reCallTarget = "n"
        }
    }
    if (reCallTarget === "n") {
        target.direction = directions[random(0,3)]
        reCallTarget = "y"
    }
    move(target)
    screenWrap(target)
    if (collision(target,wall) || collision(target,star) || collision(target,portal1) || collision(target,bonusLife)) {
        target.x = previousX
        target.y = previousY
        reCallTarget = "n"
        moveTarget()
    }
}
function runTarget() {
    if (points > 1) {
        hasWon()
        screenWrap(target)
        moveTarget()
    }
    drawObject(target)            
}        
function chance(n) {
    return Math.random() < n;
}
function average(a,b) {
    let sum = a + b
    return sum / 2
}
var snakeTilesX = []
var snakeTilesY = []
var closestIndex
function closestTile() {
    snakeTilesX = []
    snakeTilesY = []
    var closestAverage = []
    for (let i = 0; i < snake.tiles.length; i++) {
        snakeTilesX.push(snake.tiles[i].slice(snake.tiles[i].indexOf(",")+1))
        snakeTilesY.push(snake.tiles[i].slice(0,snake.tiles[i].indexOf(",")))
        closestAverage.push(average(Math.abs(Number(snakeTilesX[i]) - enemy.y), Math.abs(Number(snakeTilesY[i]) - enemy.x)))
    }
    closestIndex = closestAverage.indexOf(Math.min(...closestAverage))
}
function enemyAI() {
    if (snakeTilesX[closestIndex] === enemy.y || snakeTilesY[closestIndex] === enemy.x) {
        if (snakeTilesX[closestIndex] !== enemy.y && snakeTilesY[closestIndex] === enemy.x) {
            if (enemy.y < snakeTilesX[closestIndex]) {
                enemy.direction = "d"
            }
            else {
                enemy.direction = "u"
            }
        }
        else {
            if (enemy.x < snakeTilesY[closestIndex]) {
                enemy.direction = "r"
            }
            else {
                enemy.direction = "l"
            }
        }
    }
    else {
        if (chance(0.5)) {
            if (enemy.x < snakeTilesY[closestIndex]) {
                enemy.direction = "r"
            }
            else {
                enemy.direction = "l"
            }
        }
        else {
            if (enemy.y < snakeTilesX[closestIndex]) {
                enemy.direction = "d"
            }
            else {
                enemy.direction = "u"
            }
        }
    }
}
function isNear(object,nearTo,distance) {
    if (Math.abs(object.x - nearTo.x) < distance && Math.abs(object.y - nearTo.y) < distance) {
        return true
    }
}
function reRoll(object,nearTo,distance) {
    if (object === enemy) {
        object.x = random(minCoord,maxCoord)
        object.y = random(minCoord,maxCoord)
    }
    if (isNear(object,nearTo,distance)) {
        object.x = random(minCoord,maxCoord)
        object.y = random(minCoord,maxCoord)
        reRoll(object,nearTo,distance)
    }
}
var reCallEnemy = true
function runEnemy() {
    if (points > enemySpawnLevel - 1  && enemy.x !== "") {
        let previousX = enemy.x
        let previousY = enemy.y
        let directions = ["r","l","u","d"]
        if (reCallEnemy) {
            enemyAI()
        } 
        else {
            enemy.direction = directions[random(0,3)]
            reCallEnemy = true
        }
        screenWrap(enemy)
        move(enemy)
        if (collision(enemy,snake)) {
            isDead("y")
        }
        if (collision(enemy,wall) || collision(enemy,star) || collision(enemy,bonusLife)) {
            enemy.x = previousX
            enemy.y = previousY
            reCallEnemy = false
            runEnemy()
        }
        erase(previousX + "," + previousY,"id")
        drawObject(enemy)
    }
}
var isPaused = false
function pause() {
    if (!dead && hasStarted && !areSettingsOpen) {
        if (autoMove) {
            clearInterval(timerSnake)
        }
        console.log("pause clear")
        clearInterval(timerTarget)
        if (points > enemySpawnLevel - 1) {
            clearInterval(timerEnemy)
            timerEnemy = null
        }
        if (!walls && wallsInitial) {
            clearInterval(powerupTimer)
        }
        if (reSpawnImmunity.isActive) {
            clearInterval(immunityTimer)
            clearTimeout(immunityTimeOut)
        }
        isPaused = true
        document.getElementById("pause").innerHTML = "️▶"
    }
}
function play() {
    if (!dead && hasStarted && !areSettingsOpen) {
        if (autoMove) {
            timerSnake = setInterval(runSnake, 500 / snake.speed)
        }
        console.log("play setting")
        timerTarget = setInterval(runTarget, 500 / target.speed)
        if (points > enemySpawnLevel - 1) {
            timerEnemy = setInterval(runEnemy, 500 / enemy.speed)
        }
        if (!walls && wallsInitial) {
            powerupTimer = setInterval(starCountdown, 1000)
        }
        if (reSpawnImmunity.isActive) {
            immunityTimer = setInterval(function () {
                reSpawnImmunity.timeLeft--
            },1000)
            immunityTimeOut = setTimeout(deactivateImmunity,reSpawnImmunity.timeLeft * 1000)
        }
        isPaused = false
        document.getElementById("pause").innerHTML = "️️||"
    }
}
function PausePlay() {
    if (!isPaused) {
        pause()
    }
    else {
        play()
    }
}
document.getElementById("pause").addEventListener("click",PausePlay)
var isHelpOpen = false
var helpPage = document.createElement("iframe")
helpPage.src = "help.html"
helpPage.width =  "100" + sizeMeasurement
helpPage.style.height =  "100" + sizeMeasurement
function openHelp() {
    settingsMenu.replaceWith(helpPage)
    isHelpOpen = true
}
function closeHelp() {
    if (isHelpOpen = true) {
        helpPage.replaceWith(settingsMenu)
    }
}
var areSettingsOpen = false
var settingsMenu = document.createElement("iframe")
settingsMenu.src = "settings.html"
settingsMenu.id = "settingsMenu"
settingsMenu.width =  "100" + sizeMeasurement
settingsMenu.style.height =  "100" + sizeMeasurement
function submitSettings(sufix) {
    if (sufix === "Color") {
        let colorKeys = [snake,target,enemy,fruit,speedBoost,wall,portal1,star,bonusLife]
        for (let i = 0; i < colorKeys.length; i++) {
            localStorage.setItem(colorKeys[i].name + "Color", colorKeys[i].color)
        }
    }
    let keys = ["wallsInitial","toSpawnBonus","autoMove","initialLives","initialSnakeSpeed","language","showGrid","gameTheme","uiTheme","checkeredGround","tileCount","isHelpOpen"]
    let values = [wallsInitial,toSpawnBonus,autoMove,initialLives,initialSnakeSpeed,language,showGrid,gameTheme,uiTheme,checkeredGround,tileCount,isHelpOpen]
    for (let i = 0; i < keys.length; i++) {
        localStorage.setItem(keys[i] + sufix,values[i])
    }
}
submitSettings("Color")
submitSettings("")
var isBoardSmaller = false
function applyGameSettings() {
    if (localStorage.getItem("apply") === "true") {
        localStorage.removeItem("apply")
        wallsInitial = (localStorage.getItem("wallsInitial") === "true")
        walls = wallsInitial
        autoMove = (localStorage.getItem("autoMove") === "true")
        toSpawnBonus = (localStorage.getItem("toSpawnBonus") === "true")
        initialLives = Number(localStorage.getItem("initialLives"))
        initialSnakeSpeed = Number(localStorage.getItem("initialSnakeSpeed"))
        snake.speed = initialSnakeSpeed
        if (tileCount > Number(localStorage.getItem("tileCount"))) {
            isBoardSmaller = true
        }
        tileCount = Number(localStorage.getItem("tileCount"))
        document.getElementById("boardContainer").removeChild(board)
        createBoard(tileCount)
        defineExtremeCoords()
        if (hasStarted) {
            console.log("applySettings clear")
            clearInterval(timerTarget)
            clearInterval(timerEnemy)
            timerEnemy = null
        }
        if (!hasRestarted) {
            restart()
        }
        else {
            reset("hard")
        }
        isBoardSmaller = false
    }
    else {
        if (hasStarted && document.getElementById("pause").innerHTML === "||") {
            hasStarted = false
        }
    }
}
function check(key,variable,value,functionT,functionF) {
    if (localStorage.getItem(key) !== variable) {
        if (localStorage.getItem(key) === value) {
            functionT()
        }
        else {
            functionF()
        }
    }
}
function applyVisualSettings() {
    check("showGrid",showGrid,"true",showGridTrue,showGridFalse)
    check("checkeredGround",checkeredGround,"true",checkeredGroundTrue,checkeredGroundFalse)
    check("gameTheme",gameTheme,"dark",setGameDarkMode,setGameLightMode)
}
function openSettings() {
    if (hasStarted) {
        if (autoMove) {
            clearInterval(timerSnake)
        }
        console.log("open settings clear")
        clearInterval(timerTarget)
        clearInterval(timerEnemy)
        timerEnemy = null
        if (!walls && wallsInitial) {
            clearInterval(powerupTimer)
        }
        isPaused = true
        if (reSpawnImmunity.isActive) {
            clearInterval(immunityTimer)
            clearTimeout(immunityTimeOut)
        }
    }
    board.replaceWith(settingsMenu)
    areSettingsOpen = true
    checkForChange = setInterval(function () {
        check("language",language,"eng",english,portuguese)
        changeText()    
        check("uiTheme",uiTheme,"dark",setUIDarkMode,setUILightMode)
        check("isHelpOpen",isHelpOpen,"true",openHelp,closeHelp)
    },125)
}
function closeSettings() {
    closeHelp()
    settingsMenu.replaceWith(board)
    areSettingsOpen = false
    isPaused = false
    applyGameSettings()
    applyVisualSettings()
    clearInterval(checkForChange)
}
function openCloseSettings() {
    if (!areSettingsOpen) {
        if (!isFlashing) {
            openSettings()
        }
        else {
            setTimeout(openSettings,flashDuration + 700)
        }
    }
    else {
        closeSettings()
    }
}
document.getElementById("settingsBtn").addEventListener("click",openCloseSettings)
function changeText() {
    document.getElementById("points").innerHTML = text.points + points
    document.getElementById("lives").innerHTML = text.lives + lives
    document.getElementById("hs").innerHTML = text.hs + highScore
    if (!hasRestarted) {
        document.getElementById("restartBtn").innerHTML = text.restart
    }
}
function english() {
    language = "eng"
    text.points = "Points: "
    text.lives = "Lives: "
    text.hs = "Max: "
    text.death["0"] = "You died. Your snake had "
    text.death["1"] = " square(s). Would you like to restart?"
    text.restart = "Restart"
}
function portuguese() {
    language = "pt"
    text.points = "Pontos: "
    text.lives = "Vidas: "
    text.hs = "Record: "
    text.death["0"] = "Você morreu. Sua cobra tinha "
    text.death["1"] = " quadrado(s). Gostaria de recomeçar?"
    text.restart = "Recomeçar"
}
function setUIDarkMode() {
    uiTheme = "dark"
    document.body.style.backgroundColor = darkGroundColor
    document.body.style.color = "#ffffff"
    document.body.style.outline = "6vw solid " + darkGroundColor
}
function setUILightMode() {
    uiTheme = "light"
    document.body.style.backgroundColor = lightGroundColor
    document.body.style.color = "#1e1e1e"
    document.body.style.outline = "6vw solid " + lightGroundColor
}
function setGameDarkMode() {
    gameTheme = "dark"
    updateScreen()
}
function setGameLightMode() {
    gameTheme = "light"
    updateScreen()
}
function showGridTrue() {
    showGrid = true
    updateScreen()
}
function showGridFalse() {
    showGrid = false
    updateScreen()
}
function checkeredGroundTrue() {
    checkeredGround = true
    updateScreen()

}
function checkeredGroundFalse() {
    checkeredGround = false
    updateScreen()
}
function deactivateImmunity() {
    snake.color = localStorage.getItem("snakeColor")
    snake.headColor = "#0048ff"
    reSpawnImmunity.isActive = false
    reSpawnImmunity.toActivate = false
    reSpawnImmunity.timeLeft = reSpawnImmunity.duration
    clearInterval(immunityTimer)
}
function toAutoMove() {
    if (!hasStarted && !isPaused) {
        console.log("toAutoMove setting")
        timerTarget = setInterval(runTarget, 500 / target.speed)
        if (points > enemySpawnLevel - 1) {
            timerEnemy = setInterval(runEnemy, 500 / enemy.speed)
        }
        if (timeLeft !== 0) {
            powerupTimer = setInterval(starCountdown, 1000)
        }
        if (reSpawnImmunity.toActivate) {
            snake.color = "#ffffff"
            snake.headColor = "#ffffff"
            reSpawnImmunity.isActive = true
            immunityTimer = setInterval(function () {
                reSpawnImmunity.timeLeft--
            },1000)
            immunityTimeOut = setTimeout(deactivateImmunity,reSpawnImmunity.timeLeft * 1000)
        }
    }
    if (!isPaused) {
        if (autoMove) {
            if (!hasStarted) {
                timerSnake = setInterval(runSnake,500/snake.speed)
                hasStarted = true
            }
        }
        else {
            runSnake()
        }
        hasStarted = true
    }
}
var directionsInOneTick = []
var directionQueue = []
function changeDirection(direction) {
    if (!dead) {
        let directions = ["r","l","u","d"]
        let opposites = ["l","r","d","u"]
        let opposite = opposites[directions.indexOf(direction)] 
        if (directionQueue[directionQueue.length - 1] !== direction) {
            if (snake.tiles.length > 1) {
                if (directionsInOneTick.length === 0) {
                    if (directionQueue[directionQueue.length - 1] !== opposite) {
                        directionsInOneTick.push(direction)
                    }
                }
                else {
                    if (directionsInOneTick[directionsInOneTick.length - 1] !== opposite) {
                        directionsInOneTick.push(direction)
                    }
                }
            }
            else {
                directionsInOneTick.push(direction)
            }
            toAutoMove()
        }
    }
}
document.getElementById("Rbtn").addEventListener("click",function () {
    changeDirection("r")
})
document.getElementById("Lbtn").addEventListener("click",function () {
    changeDirection("l")
})
document.getElementById("Ubtn").addEventListener("click",function() {
    changeDirection("u")
})
document.getElementById("Dbtn").addEventListener("click",function() {
    changeDirection("d")
})
