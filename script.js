score = 0;
cross = true;

audioOver = new Audio('gameOver.mp3');



document.onkeydown = function(e){
    console.log("Key Code is: ", e.keyCode)

    // Code for jumping
    if(e.keyCode==38){
        hero = document.querySelector('.hero');
        hero.classList.add('animateHero');
        setTimeout(() =>{
            hero.classList.remove('animateHero')
        }, 700);
    }

    //move right
    if(e.keyCode == 39){
        hero = document.querySelector('.hero');
        herox = parseInt(window.getComputedStyle(hero,null).getPropertyValue('left'));
        hero.style.left = (herox + 122) + "px";
        console.log(herox);
    }

    //move left
    if(e.keyCode == 37){
        hero = document.querySelector('.hero');
        herox = parseInt(window.getComputedStyle(hero,null).getPropertyValue('left'));
        hero.style.left = (herox - 122) + "px";
        console.log(herox);
    }
}

setInterval(()=>{
    hero = document.querySelector('.hero');
    obstacle = document.querySelector('.obstacle');
    gameOver = document.querySelector('.gameOver');

    
    dx = parseInt(window.getComputedStyle(hero).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(hero,null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    console.log(dx,dy,ox,oy);

    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);
    console.log(offsetX, offsetY);

    //check for collission
    if(offsetX<106 && offsetY<41){
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAnimate');
        // score = score - 10;
        // updateScore(score);
        audioOver.play();
        setTimeout(()=>{
            audioOver.pause();
            
        },3000);
  
    }
    
    //no collission update score
    else if(offsetX < 145 && cross){
        score+=10;
        updateScore(score);
        cross = false;

        setTimeout(() => {
            cross = true;
        },1000);

        //to make spike move faster after every dodge
        setTimeout(() => {
            animationDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newDur = animationDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur);
        },500)
        
    }

},10)


//function to update score
function updateScore(score){
    scoreCont.innerHTML = "Your Score: " + score;
}