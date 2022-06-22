//selecting Element
//select main section
let gameContainer=document.querySelector('.cards-container');
//New game btn
let newGameBtn=document.querySelector('.new-game-btn');
//hint btn
let hintBtn=document.querySelector('.hint-btn')
//winning game select element
let winnerDiv = document.querySelector('.confetti');
let body = document.querySelector('body');
let winner=document.querySelector('.winner');
//losing game selection element
let LosingDiv = document.querySelector('.lose-container');
let losingContainer = document.querySelector('.sad');
let losingTitle = document.querySelector('.lose-title');
let clickedCounter = document.querySelector('.clicked-counter');
//select try hint span
let trySpanChildren = document.querySelector('.try-hint');
//sounds(Audio)
let gameOverAudio = document.querySelector('.game-over');
let ImgNotEqualAudio = document.querySelector('.img-not-equal');
let ImgEqualAudio = document.querySelector('.img-equal');
let victory = document.querySelector('.victory');


let images=[
    'Shock.png',
    'Shock.png',
    'Boat.png',
    'Boat.png',
    'Citizenship.png',
    'Citizenship.png',
    'Hack.png',
    'Hack.png',
    'Nerd-Rage.png',
    'Nerd-Rage.png',
    'Robotics.png',
    'Robotics.png',
    'Cola.png',
    'Cola.png',
    'Agility.png',
    'Agility.png'
];

/*Refactor of code => by expression fn = must be decalred before calling =================================*/

 //shuffling of array 2 method
//1st way
//images.sort(() =>Math.random() - 0.5 );
//2nd way
/* 1- suffle array and put random img in container by for loop ========================== */
function shuffle(array)
{
    let current = array.length;
    let temp,random;
    while (current>0) {
        random = Math.floor(Math.random()*current);
        //decrease length to out loop
        current--;
        //swaping
        //[1]save current elemnt in temp
        temp=array[current];
        //[2]save random elemnt in current elemnt
        array[current]=array[random];
        //[3]random elemnt=temp value
        array[random]=temp;
    }
}  
//unshuffled array
console.log(images);
shuffle(images);//shuffled images array
for (let i = 0; i < images.length; i++) {
    gameContainer.innerHTML += `<div class="card" id="${i+1}"><img src="imgs/${images[i]}" alt=""></div>` 
}

/* 2- initialize (Reset) variable to zero value only ====================================== */
let initializeGame = function () {
    clearInterval(timerInterval);
    winnerCounter=0;
    numberOfClicks=0;
    tryCounter=0;
    IdenticalImg = [];
    clickedCounter.textContent='00';
    LosingDiv.style.display='none';
    winnerDiv.style.display='none';
    body.style.background = 'linear-gradient(to top left ,#753682 0%,#bf2e34 100%)';
    gameContainer.style.display='grid';
    winner.style.display='none';
    losingContainer.style.display='none';
    losingTitle.style.display='none';  
    hintBtn.style.pointerEvents='auto'; 
    gameContainer.innerHTML='';
    trySpanChildren.innerHTML = ` <span class="try">💚</span>
                                  <span class="try">💚</span>
                                  <span class="try">💚</span>`;
}
/* 3- timer fn===================================================================== */
//timer variable
let timerInterval;
let second=30;
let minute=2;
let seconds = document.querySelector('.seconds');
let minutes = document.querySelector('.minutes');

let timer = function()
{
   
    if(minute===0 && second===0)
    {
        LosingFn();
        clearInterval(timerInterval);
    }
    second--;
    if (second<0) {
        second=29; 
    }
    
    if(second==29)
    {
        minute--;
    }
    seconds.textContent=second<=9 ? ('0'+second):(second);
    minutes.textContent='0'+minute;   
    
}

/*4- if 2 img Not Equal or double click on same img bug  =========================================================== */
let imgNotEqual = function()
{
    cardsDiv[0].style.backgroundImage='url(imgs/ignasi_pattern_s.png)';
    cardsDiv[1].style.backgroundImage='url(imgs/ignasi_pattern_s.png)';
    matchImageArray[0].style.display='none';
    matchImageArray[1].style.display='none';   
    cardsDiv =[];
    matchImageArray=[];
}
/*5- if 2 img Equal  =========================================================== */
let IdenticalImg = [];
let imgEqual = function(){
    cardsDiv[0].style.pointerEvents='none';
    cardsDiv[1].style.pointerEvents='none';
    IdenticalImg.push(cardsDiv[0].getAttribute('id'),cardsDiv[1].getAttribute('id'));
    winnerCounter++;
    ImgEqualAudio.play();
    console.log(winnerCounter);
    cardsDiv=[];
    matchImageArray=[]; 
}
/*6-if player win the game =========================================================== */
let winningFn=function()
{
    if(winnerCounter===8)
    {
        clearInterval(timerInterval);
        setTimeout(function(){
        //display winning style
        winnerDiv.style.display='flex';
        winner.style.display='block';
        body.style.background = '#60b347';
        gameContainer.style.display='none';
        victory.play();
        creepy.play();
        },50);
    }   
}
/*7- if player lose the game  => call this fn in timer fn & hint btn */
let LosingFn = function()
{
    minute=2;second=30;
    //display of sad emoji
    losingContainer.style.display='block';
    LosingDiv.style.display='block';
    // display none of game container
    gameContainer.style.display='none';
    //display of losing title
    losingTitle.style.display='block';
    body.style.background = 'white';
    //gameover sound
    gameOverAudio.play();
}

/*8- fn to play game =========================================================== */
/*select all cards divs make looping on all cards to event with click on one card*/
let allCardsContainer = document.querySelectorAll('.card');//look line 51 
//gamecontainer قبل ما تحطها في ال  divمينفعش تمسك ال 
//logic variable to Intialize game function & must be global variable
let matchImageArray=[];
let cardsDiv=[];
let winnerCounter=0;
let numberOfClicks=0;
let playingGame = function(allCards)
{
    timerInterval = setInterval(timer,1000);
    allCards.forEach(function(card){

    card.addEventListener('click',function(){
    card.firstChild.style.display='block';
    card.style.backgroundImage = 'url()';
    matchImageArray.push(card.firstChild);
    cardsDiv.push(card);
    numberOfClicks++;
    clickedCounter.textContent = (numberOfClicks<=9)?('0'+numberOfClicks):numberOfClicks;
    //console.log(matchImageArray);
    console.log(cardsDiv);
        
    if (matchImageArray.length===2) {  
            if(cardsDiv[0].getAttribute('id')===cardsDiv[1].getAttribute('id'))
            {
            ImgNotEqualAudio.pause();
            imgNotEqual();
            }
            else
            {
                if(matchImageArray[0].getAttribute('src')===matchImageArray[1].getAttribute('src'))
                {
                    imgEqual(); 
                }
                else
                {
                    ImgNotEqualAudio.play();
                    //make low time to prevent timeout bug 
                    setTimeout(function(){
                        imgNotEqual()},200); 
                }      
            } 
                 
        } 
        winningFn(); 
       
    });
 });
}
//call intialize fn to start game with Render a project 
playingGame(allCardsContainer);
/*9- make new by Reset needed value===================================================== */
//make new game
let allCards;
let newGame=function(){
    initializeGame();
    shuffle(images);
    console.log(images);
    for (let i = 0; i < images.length; i++) {
        gameContainer.innerHTML += `<div class="card" id="${i+1}"><img src="imgs/${images[i]}" alt=""></div>` 
    }
     allCards = document.querySelectorAll('.card');
        second=30;
        minute=2;
        playingGame(allCards);
        allCardsContainer = allCards;
}
newGameBtn.addEventListener('click',newGame);

/*10- Hint fn you have three tries ===================================================== */
let tryCounter=0;
let tryTimeOut;
let hint=function(){

    //console.log(trySpanChildren.children);
    trySpanChildren.removeChild(trySpanChildren.firstElementChild);
    matchImageArray=[];
    cardsDiv=[];
    console.log(IdenticalImg);
    allCardsContainer.forEach(function(element){
        element.style.pointerEvents = 'none';
        hintBtn.style.pointerEvents = 'none';
        if(IdenticalImg.indexOf(element.getAttribute('id'))==-1)
        {
            element.style.backgroundImage = 'url()';
            element.firstChild.style.display = 'block';
        }
    });
    tryTimeOut = setTimeout(function(){
        hintBtn.style.pointerEvents = 'auto';
        allCardsContainer.forEach(function(element){
            if(IdenticalImg.indexOf(element.getAttribute('id'))==-1)
            {
                element.style.pointerEvents = 'auto';
                element.style.backgroundImage = 'url(imgs/ignasi_pattern_s.png)';
                element.firstChild.style.display = 'none';
            }
        });
    },800);
    tryCounter++;
    if(tryCounter===3)
    {
        clearTimeout(tryTimeOut);
         setTimeout(function(){
            allCardsContainer.forEach(function(element){
                if(IdenticalImg.indexOf(element.getAttribute('id'))==-1)
                {
                    element.style.pointerEvents = 'auto';
                    element.style.backgroundImage = 'url(imgs/ignasi_pattern_s.png)';
                    element.firstChild.style.display = 'none';
                }
            });
        },800);
        hintBtn.style.pointerEvents = 'none'; 
    }
}

hintBtn.addEventListener('click',hint);


// أكواد للمحاولة

    // console.log(allCardsContainer[0].getAttribute('id'));
    // tryCounter++;
    // console.log(tryCounter);
    // allCardsContainer.forEach(function(element){
    //     if(element.style.backgroundImage!='url(imgs/ignasi_pattern_s.png)')
    //     {
    //         element.style.background='url()';
    //         element.style.pointerEvents='none';
    //         element.firstChild.style.display='block';
    //         hintBtn.style.pointerEvents='none';
    //     }
    // });

    // tryTimeOut = setTimeout(function(){
    //     hintBtn.style.pointerEvents = 'auto';
    //     allCardsContainer.forEach(function(element){

    //         if(element.style.backgroundImage!='url(imgs/ignasi_pattern_s.png)')
    //         {
    //             element.style.background='url(imgs/ignasi_pattern_s.png)';
    //             element.style.pointerEvents='auto';
    //             element.firstChild.style.display='none';
    //             hintBtn.style.pointerEvents='none';
    //         }
    //     });
    // },2000);





//     allCardsContainer.forEach(function(element){
//         if(element.style.pointerEvents !=='none')
//         {
//             element.style.backgroundImage = 'url()';
//             element.style.pointerEvents = 'none';
//             element.firstChild.style.display = 'block';
//             hintBtn.style.pointerEvents = 'none';
//         }
//     });
//    tryTimeOut= setTimeout(function(){
//         hintBtn.style.pointerEvents = 'auto';
//         allCardsContainer.forEach(function(element){
//             element.style.pointerEvents = 'auto';
//             if(element.style.pointerEvents !=='none')
//             {
//                 element.style.backgroundImage = 'url(imgs/ignasi_pattern_s.png)';
//                 element.firstChild.style.display = 'none';
//             }
//         });
//     },3000);



//     if(tryCounter===3)
//     {
//         clearTimeout(tryTimeOut);
//         tryTimeOut= setTimeout(function(){
//             allCardsContainer.forEach(function(element){
//                 if(element.style.pointerEvents !=='none')
//                 {
//                     element.style.backgroundImage = 'url(imgs/ignasi_pattern_s.png)';
//                     element.firstChild.style.display = 'none';
//                 }
//             });
//         },1000);
//         hintBtn.style.pointerEvents = 'none';
//     }





























// console.log(RandomNumber);
// let ArrayOfRnum = RandomNumber.slice();
// console.log(idOfEqualImg);
// let idOfEqualImg = [];
// console.log(idOfEqualImg);
// let RandomNumber = Array.from(Array(16).keys());
// idOfEqualImg.push(parseInt( cardsDiv[0].getAttribute('id')-1),parseInt(cardsDiv[1].getAttribute('id')-1) );
// ArrayOfRnum = RandomNumber.filter(function(element){
//     return ((element != idOfEqualImg[0])&& (element != idOfEqualImg[1]))
//     });
//     RandomNumber = ArrayOfRnum.slice();
// idOfEqualImg = [];

// hintBtn.addEventListener('click',function(){
    
//     shuffle(ArrayOfRnum);
//     console.log(ArrayOfRnum);
//     let rNumber=Math.floor(Math.random()*ArrayOfRnum.length);
//     console.log(ArrayOfRnum[rNumber]);
//     let IdenticalImg = ArrayOfRnum.filter(function(element){
//       return allCardsContainer[element].firstChild.getAttribute('src') === allCardsContainer[ArrayOfRnum[rNumber]].firstChild.getAttribute('src');
//     });
//     ArrayOfRnum.splice(idOfEqualImg[0],1)
//     ArrayOfRnum.splice(idOfEqualImg[1],1)
//     allCardsContainer[IdenticalImg[0]].firstChild.style.display='block';
//     allCardsContainer[IdenticalImg[1]].firstChild.style.display='block';
//     allCardsContainer[IdenticalImg[0]].style.backgroundImage='url()'
//     allCardsContainer[IdenticalImg[1]].style.backgroundImage='url()';
//     console.log(ArrayOfRnum);
// });



// let hintTry=0;
// hintBtn.addEventListener('click',function (){
//     let rNumber=Math.floor(Math.random()*allCardsContainer.length);
   
//     ArrayOfRnum.push(rNumber);
//     // console.log(trySpanHint);
//     // trySpanHint.forEach(function(hideTry){
//     //     hideTry.remove(hideTry);
//     // });
//      console.log(ArrayOfRnum);
//     console.log(rNumber+1);
//     for (let i = 0; i < allCardsContainer.length; i++) {
//         if(idOfEqualImg.indexOf(rNumber+1)===-1)

//         {
//             if(i!==rNumber)
//             {
//                 if(allCardsContainer[rNumber].firstChild.getAttribute('src') === allCardsContainer[i].firstChild.getAttribute('src'))
//                 {
//                         allCardsContainer[rNumber].style.backgroundImage='url()';
//                         allCardsContainer[rNumber].firstChild.style.display='block';
//                         allCardsContainer[i].style.backgroundImage='url()';
//                         allCardsContainer[i].firstChild.style.display='block';
//                         allCardsContainer[rNumber].style.pointerEvents='none';
//                         allCardsContainer[i].style.pointerEvents='none';
//                         idOfEqualImg.push(parseInt( allCardsContainer[i].getAttribute('id')),parseInt(allCardsContainer[rNumber].getAttribute('id')) )
//                         winnerCounter++;
//                         hintTry++;
//                         console.log(idOfEqualImg);
//                 }
//             }
//         }
        
//     }
//     // if (hintTry==3) {
//     //     hintBtn.style.pointerEvents='none';
//     // }
    
// });

   





    
    


