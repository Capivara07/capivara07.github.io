document.getElementById("back").addEventListener("click",function () {
    localStorage.removeItem("isHelpOpen")
    localStorage.setItem("isHelpOpen","false")
})
var colorKeys = ["snake","target","enemy","fruit","speedBoost","portal1","star","bonusLife","wall"]
for (let i = 0; i < colorKeys.length; i++) {
    document.getElementById(colorKeys[i] + "Color").style.background = localStorage.getItem(colorKeys[i] + "Color")
}
if (localStorage.getItem("uiTheme") === "dark") {
    document.body.style.background = "#1e1e1e"
    document.body.style.color = "#ffffff"
}
else {
    document.body.style.background = "#c4c4c4"
    document.body.style.color = "#1e1e1e"
}
var text = {
    title:"",
    snake:"",
    target:"",
    enemy:"",
    fruit:"",
    speedBoost:"",
    portal1:"",
    star:"",
    bonusLife:"",
    wall:""
}
if (localStorage.getItem("language") === "eng") {
    text.title = "Help"
    text.snake = "The snake is the player. It's speed increases naturally by 1 every 5 points."
    text.target = "The target is what gives you points. It starts moving after you catch it for the first time."
    text.enemy = "The enemy spawns when you have 5 points. It follows you, and if it catches you, you die."
    text.fruit = "The fruits make the snake grow. They have a 5% chance to spawn every time the snake moves."
    text.speedBoost = "The speed boosts increase the snake's speed by 0.2. They have a 5% chance to spawn every time the snake moves."
    text.portal1 = "One portal teleports you to the other. They have a 50% chance of spawning every time you get a point and they only last for one level."
    text.star = "The star temporarily removes the walls. It lasts for 10 seconds. It has a 0.5% chance to spawn every time the snake moves. There can only be one of it in the game at once."
    text.bonusLife = "The bonus life gives you an extra life. It has a 0.5% chance to spawn every time the snake moves. There can only be one of it in the game at once."
    text.wall = "If walls are enabled, the walls kill the snake. In addition to bordering the map, they also spawn every time you get a point."
}
else {
    text.title = "Ajuda"
    text.snake = "A cobra é o jogador. Sua velocidade aumenta naturalmente a cada 5 pontos."
    text.target = "O alvo é o que te dá pontos. Seu objetivo é pegá-lo. Ele começa a fugir da cobra depois de ser pego pela primeira vez."
    text.enemy = "O inimigo aparece ao fazer 5 pontos. Ele te segue e, se te pegar, você morre."
    text.fruit = "As frutas fazem a cobra crescer. Toda vez que a cobra anda, elas têm 5% de chance de aparecer."
    text.speedBoost = "O boost de velocidade aumenta a velocidade da cobra em 0.2. Toda vez que a cobra anda, eles têm 5% de chance de aparecer."
    text.portal1 = "Um portal te teleporta para o outro. Eles tem 50% de chance de aparecer quando você faz um ponto e duram somente por um nível."
    text.star = "A estrela remove as paredes temporariamente. Ela dura por 10 segundos. Ela tem 0.5% de chance de aparecer quando a cobra anda. Nunca haverá mais de uma estrela no jogo de uma vez."
    text.bonusLife = "O bônus te dá uma vida a mais. Ele tem 0.5% de chance de aparecer quando a cobra anda. Nunca haverá mais de um bônus no jogo de uma vez."
    text.wall = "Se as paredes estiverem ativadas, elas matam a cobra. Além de cercarem o mapa, elas também aparecem toda vez que você ganha um ponto."
}
var textProperties = ["title","snake","target","enemy","fruit","speedBoost","portal1","star","bonusLife","wall"] 
for (let i = 0; i < textProperties.length; i++) {
    document.getElementById(textProperties[i] + "Info").innerHTML = text[textProperties[i]]
  }
