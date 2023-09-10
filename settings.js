var speedSlider = document.getElementById("speedSet")
var livesSlider = document.getElementById("livesSet")
var tilesSlider = document.getElementById("tilesSet")
var langButton = document.getElementById("langBtn")
var text = {
    title:"",
    gameplay:"",
    visual:"",
    lang:"",
    walls:"",
    autoMove:"",
    lives:"", 
    bonus:"",
    speed:"", 
    tiles:"",
    grid:"",
    check:"",
    uiTheme:"",
    gameTheme:"",
    dark:"",
    light:"",
    apply:"",
    default:"",
    help:""
}
var language
function checkRadio(key,T,F) {
    if (localStorage.getItem(key) === "true") {
        document.getElementById(T).checked = true
    }
    else {
        document.getElementById(F).checked = true
    }
}
var gameTheme
function check(sufix) {
    checkRadio("wallsInitial" + sufix,"wallsT","wallsF")
    checkRadio("autoMove" + sufix,"autoT","autoF")
    checkRadio("toSpawnBonus" + sufix,"bonusT","bonusF")
    checkRadio("showGrid" + sufix,"gridT","gridF")
    checkRadio("checkeredGround" + sufix, "checkeredT", "checkeredF")
    speedSlider.value = Number(localStorage.getItem("initialSnakeSpeed" + sufix)) * 10
    document.getElementById("speedDisplay").innerHTML = speedSlider.value / 10
    document.getElementById("livesDisplay").innerHTML = livesSlider.value = Number(localStorage.getItem("initialLives" + sufix))
    document.getElementById("tilesDisplay").innerHTML = tilesSlider.value = Number(localStorage.getItem("tileCount" + sufix))
    if (localStorage.getItem("language" + sufix) === "eng") {
        english()
    }   
    else {
        portuguese()
    }
    if (localStorage.getItem("uiTheme" + sufix) === "dark") {
        uiDarkMode()
    }
    else {
        uiLightMode()
    }
    if (localStorage.getItem("gameTheme" + sufix) === "dark") {
        gameTheme = "dark"
    }
    else {
        gameTheme = "light"
    }
    changeText()
}
check("")
function submitRadio(radioF,key) {
    if (document.getElementById(radioF).checked) {
        localStorage.setItem(key,false)
    }
    else {
        localStorage.setItem(key,true)
    }
}
function removeGameSettings() {
    let keys = ["wallsInitial","toSpawnBonus","autoMove","initialLives","initialSnakeSpeed","tileCount"]
    for (let i = 0; i < keys.length; i++) {
        localStorage.removeItem(keys[i])
    }
}
function submitSettings() {
    removeGameSettings()
    localStorage.setItem("apply",true)
    submitRadio("wallsF","wallsInitial")
    submitRadio("autoF","autoMove")
    submitRadio("bonusF","toSpawnBonus")
    localStorage.setItem("initialLives",livesSlider.value)
    localStorage.setItem("initialSnakeSpeed",speedSlider.value/10)
    localStorage.setItem("tileCount",tilesSlider.value)
}
document.getElementById("apply").addEventListener("click",submitSettings)
function updateSpeedSlider() {
    document.getElementById("speedDisplay").innerHTML = speedSlider.value / 10
}
speedSlider.addEventListener("input",updateSpeedSlider)
function updateLivesSlider() {
    document.getElementById("livesDisplay").innerHTML = livesSlider.value
}
livesSlider.addEventListener("input",updateLivesSlider)
function updateTilesSlider() {
    document.getElementById("tilesDisplay").innerHTML = tilesSlider.value
}
tilesSlider.addEventListener("input",updateTilesSlider)
function changeText() {
    document.getElementById("title").innerHTML = text.title
    document.getElementById("gameplaySub").innerHTML = text.gameplay
    document.getElementById("wallsSet").innerHTML = text.walls
    document.getElementById("autoMoveSet").innerHTML = text.autoMove
    document.getElementById("livesSetLabel").innerHTML = text.lives
    document.getElementById("bonusSet").innerHTML = text.bonus
    document.getElementById("speedSetLabel").innerHTML = text.speed
    document.getElementById("tilesSetLabel").innerHTML = text.tiles
    document.getElementById("visualSub").innerHTML = text.visual
    document.getElementById("langSet").innerHTML = text.lang
    document.getElementById("gridSet").innerHTML = text.grid
    document.getElementById("checkeredSet").innerHTML = text.check
    document.getElementById("uiThemeSet").innerHTML = text.uiTheme
    document.getElementById("uiThemeBtn").innerHTML = text[uiMode]
    document.getElementById("gameThemeSet").innerHTML = text.gameTheme
    document.getElementById("gameThemeBtn").innerHTML = text[gameTheme]
    document.getElementById("default").innerHTML = text.default
    document.getElementById("help").innerHTML = text.help
    document.getElementById("apply").innerHTML = text.apply
}
function setToDefault() {
    check("Default")
    localStorage.removeItem("uiTheme")
    localStorage.setItem("uiTheme",uiMode)
    console.log("ui light mode set to default")
    localStorage.removeItem("gameTheme")
    localStorage.setItem("gameTheme",gameTheme)
    localStorage.removeItem("language")
    localStorage.setItem("language",language)
    localStorage.removeItem("showGrid")
    submitRadio("gridF","showGrid")
    localStorage.removeItem("checkeredGround")
    submitRadio("checkeredF","checkeredGround")
}
document.getElementById("default").addEventListener("click",setToDefault)
var uiMode
function uiLightMode() {
    uiMode = "light"
    document.getElementById("uiThemeBtn").innerHTML = text.light
    document.body.style.background = "#c4c4c4"
    document.body.style.outline = "6vw solid #c4c4c4"
    document.body.style.color = "#1e1e1e"
}
function uiDarkMode() {
    uiMode = "dark"
    document.getElementById("uiThemeBtn").innerHTML = text.dark 
    document.body.style.backgroundColor = "#1e1e1e"
    document.body.style.outline = "6vw solid #1e1e1e"
    document.body.style.color = "#ffffff"
}
function switchUiMode() {
    if (uiMode === "dark") {
        uiLightMode()
    }
    else {
        uiDarkMode()
    }
    localStorage.removeItem("uiTheme")
    localStorage.setItem("uiTheme",uiMode)
    console.log("switch ui mode")
}
document.getElementById("uiThemeBtn").addEventListener("click",switchUiMode)
function switchGameTheme() {
    if (gameTheme === "dark") {
        gameTheme = "light"
    }
    else {
        gameTheme = "dark"
    }
    localStorage.removeItem("gameTheme")
    localStorage.setItem("gameTheme",gameTheme)
    document.getElementById("gameThemeBtn").innerHTML = text[gameTheme]
}
document.getElementById("gameThemeBtn").addEventListener("click",switchGameTheme)
function english() {
    language = "eng"
    langButton.innerHTML = "English"
    text.title = "Settings"
    text.gameplay = "Gameplay changes"
    text.visual = "Visual changes"
    text.lang = "Language"
    text.walls = "Walls that kill the snake"
    text.autoMove = "Snake moves on a timer"
    text.lives = "How many lives you start with"
    text.bonus = "Spawn extra lives"
    text.speed = "Speed the snake starts at"
    text.tiles = "How many tiles in a row"
    text.grid = "Show grid"
    text.check = "Checkered ground"
    text.uiTheme = "Ui theme"
    text.gameTheme = "GameTheme"
    text.dark = "Dark"
    text.light = "Light"
    text.apply = "Apply and reset"
    text.default = "Set to default"
    text.help = "Help"
}
function portuguese() {
    language = "pt"
    langButton.innerHTML = "Português"
    text.title = "Configurações"
    text.gameplay = "Mudanças no jogo"
    text.visual = "Mudanças visuais"
    text.lang = "Idioma"
    text.walls = "Paredes que matam a cobra"
    text.autoMove = "Cobra anda automaticamente"
    text.lives = "Com quantas vidas o jogo começa"
    text.bonus = "Gerar mais vidas"
    text.speed = "Velocidade que a cobra começa"
    text.tiles = "Quantos quadrados em uma linha"
    text.grid = "Mostrar grade"
    text.check = "Chão em xadrez"
    text.uiTheme = "Tema da página"
    text.gameTheme = "Tema do jogo"
    text.dark = "Escuro"
    text.light = "Claro"
    text.apply = "Aplicar e resetar o jogo"
    text.default = "Voltar ao padrão"
    text.help = "Ajuda"
}
function swicthLang() {
    if (language === "eng") {
        portuguese()
    }
    else {
        english()
    }
    changeText()
    localStorage.removeItem("language")
    localStorage.setItem("language",language)
}
langButton.addEventListener("click",swicthLang)
document.getElementById("gridSetDiv").addEventListener("click",function () {
    localStorage.removeItem("showGrid")
    submitRadio("gridF","showGrid")
})
document.getElementById("checkeredSetDiv").addEventListener("click",function () {
    localStorage.removeItem("checkeredGround")
    submitRadio("checkeredF","checkeredGround")
})
document.getElementById("help").addEventListener("click",function () {
    localStorage.removeItem("isHelpOpen")
    localStorage.setItem("isHelpOpen","true")
    console.log("setting is help open true")
})
