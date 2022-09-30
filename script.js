const inputWindow = document.querySelector('input');

const allCards = [
    {name: "A", example: "ALLIGATOR", keycode: "65", src: "sounds/A.wav"},
    {name: "B", example: "BANAAN", keycode: "66", src: "sounds/B.wav"},
    {name: "C", example: "CARLOS", keycode: "67", src: "sounds/C.wav"},
    {name: "D", example: "DOOMINO", keycode: "68", src: "sounds/D.wav"},
    {name: "E", example: "ELEVANT", keycode: "69", src: "sounds/E.wav"},
    {name: "F", example: "FOOR", keycode: "70", src: "sounds/F.wav"},
    {name: "G", example: "GORILLA", keycode: "71", src: "sounds/G.wav"},
    {name: "H", example: "HOBUNE", keycode: "72", src: "sounds/H.wav"},
    {name: "I", example: "ILVES", keycode: "73", src: "sounds/I.wav"},
    {name: "J", example: "JAAGUAR", keycode: "74", src: "sounds/J.wav"},
    {name: "K", example: "KOAALA", keycode: "75", src: "sounds/K.wav"},
    {name: "L", example: "LAAMA", keycode: "76", src: "sounds/L.wav"},
    {name: "M", example: "MAASIKAS", keycode: "77", src: "sounds/M.wav"},
    {name: "N", example: "NOOT", keycode: "78", src: "sounds/N.wav"},
    {name: "O", example: "ORAV", keycode: "79", src: "sounds/O.wav"},
    {name: "P", example: "PINGVIIN", keycode: "80", src: "sounds/P.wav"},
    {name: "R", example: "REBANE", keycode: "82", src: "sounds/R.wav"},
    {name: "S", example: "SAARMAS", keycode: "83", src: "sounds/S.wav"},
    {name: "T", example: "TUVI", keycode: "84", src: "sounds/T.wav"},
    {name: "U", example: "USS", keycode: "85", src: "sounds/U.wav"},
    {name: "V", example: "VAAL", keycode: "86", src: "sounds/V.wav"},
    {name: "Z", example: "ZEBRA", keycode: "90", src: "sounds/Z.wav"},

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
const getInputText = inputWindow.value.toUpperCase().replace(/[^A-Za-z]/g,"").split("");
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
