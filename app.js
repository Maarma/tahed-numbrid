const inputWindow = document.querySelector('input');

const allCards = [
    {name: "1", example: "ÜKS", keycode: "49", src: "sounds/1.wav"},
    {name: "2", example: "KAKS", keycode: "50", src: "sounds/2.wav"},
    {name: "3", example: "KOLM", keycode: "51", src: "sounds/3.wav"},
    {name: "4", example: "NELI", keycode: "52", src: "sounds/4.wav"},
    {name: "5", example: "VIIS", keycode: "53", src: "sounds/5.wav"},
    {name: "6", example: "KUUS", keycode: "54", src: "sounds/6.wav"},
    {name: "7", example: "SEITSE", keycode: "55", src: "sounds/7.wav"},
    {name: "8", example: "KAHEKSA", keycode: "56", src: "sounds/8.wav"},
    {name: "9", example: "ÜHEKSA", keycode: "57", src: "sounds/9.wav"},
];
const createLetterCards = (letter) => {
 return `<div class="key" id=${letter.keycode}>
        <kbd>${letter.name}</kbd>
        <span class="item">${letter.example}</span>
        <audio data-key="${letter.keycode}" src="${letter.src}"></audio>
        <img class="back" src="images/${letter.name}.png" alt="${letter.example}"/>
</div>`
}

const allCardsBuilt = allCards.map(createLetterCards);

inputWindow.addEventListener("keyup", function (e){
if (document.activeElement == !inputWindow) return;
const getInputText = inputWindow.value.toUpperCase().replace(/[^1-9]/g,"").split("");
const findObjectsForInput = getInputText.map(letter=> {
return allCards.find(letterName => {
 return `${letter}` === letterName.name})
});
const renderPressedKeys = findObjectsForInput.map(createLetterCards);
document.getElementById("keyIDPressed").innerHTML = renderPressedKeys;
})

document.getElementById("keyID").innerHTML = allCardsBuilt;

inputWindow.addEventListener("keyup", function(e){
const inputDiv = document.getElementById("keyIDPressed");
const alphaDiv = document.getElementById("keyID");
if (inputWindow.value.length > 0){
return alphaDiv.classList.add('showing')
} else {
return alphaDiv.classList.remove('showing')
}})

window.addEventListener("keydown", function(e){
    if (document.activeElement == inputWindow) return;
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.getElementById(`${e.keyCode}`)
    if(!audio) return;
    audio.currentTime = 0;
    key.classList.add('playing');
    audio.play();
});

function removeTransition(e){
    if(e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
