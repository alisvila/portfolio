gsap.registerPlugin(TextPlugin)
gsap.registerPlugin(ScrollTrigger);

const leftEye = document.querySelector('#left-eye');
const rightEye = document.querySelector('#right-eye');
const face = document.querySelector('.face');
const leftEyebrow = document.querySelector('#left-eyebrow');
const rightEyebrow = document.querySelector('#right-eyebrow');
const cursorCircle = document.querySelector(".cursor-wrapper")
const cursorDot = document.querySelector(".dot")
const portfolio = document.querySelector('.section')
const word = document.querySelector('.word')
const player = document.querySelector('#audio')
const player_play = document.querySelector('#player_play')
const player_pause = document.querySelector('#player_pause')
const mySound = new Audio('/assets/wildest.mp3')
mySound.volume = 0.5;

// Create a max value for the translation in the x and y directions
const maxTrans = 30;

// Create a max distance for the mouse position to the center of the element (the viewport dimensions wouldn't be a bad choice).
let maxXDist, maxYDist;

let centerXL, centerYL, centerXR, centerYR, centerXF, centerYF, mouseX, mouseY, posX, posY;
// var requestId = null;
gsap.set(face, {transformOrigin: "center bottom"});

const maxRot = 10;
const setXRot = gsap.quickSetter(face, "rotationX", "deg");
const setYRot = gsap.quickSetter(face, "rotationY", "deg");

// const setLeftEye = gsap.quickSetter(leftEye, "rotationY", "deg");

// let theme_toggler = document.querySelector('#theme_toggler');

// theme_toggler.addEventListener('click', function(){ 
//   document.body.classList.toggle('blue-theme');
// });

player_play.addEventListener('click', function(){ 
  mySound.play()
  player_play.style.display = "none";
  player_pause.style.display = "inline-block";
});

player_pause.addEventListener('click', function(){ 
  console.log('here')
  mySound.pause()
  player_play.style.display = "inline-block";
  player_pause.style.display = "none";
});


let cardLength
// the new about
select = e => document.querySelector(e);
selectAll = e => document.querySelectorAll(e);
const shapesStage = select('.shapes');
let gltl = gsap.timeline({ delay: 1 });
// let bandST = new SplitText('.name', {type:"chars", charsClass:"bandChar", position: "absolute" }); 

function intro() {
    
    let tl = gsap.timeline({
        delay: 1,
        defaults: {
            duration: 2,
            ease: 'power4'
        }
    });
    tl.from('.names', {
        x: function(i) {
            if (i%2==0) {
                return 1000;
            }
            return -1000;
        },
        stagger: 0.15    
    })
    .from('p span', {
        y: 70,
        stagger: 0.1
    }, 2)
    
    return tl;
}

function loopAnim() {
    
    let tl = gsap.timeline({
        repeat: -1
    });
    
    tl.
    to('.names', {
        y: -950,
        duration: 30,
        ease: 'none'
    })    
    return tl;
}

function init() {
    gsap.set(shapesStage, { autoAlpha: 1 });
    gsap.set('.content', { rotate: -25 });
    gltl.add(loopAnim(), 0);
}

let getYPercent, getXPercent;

function resize() {

  getXPercent = gsap.utils.mapRange(0, innerWidth, -1, 1);
  getYPercent = gsap.utils.mapRange(0, innerHeight, -1, 1);

  maxXDist = innerWidth / 2;
  maxYDist = innerHeight / 2;
  
  const leftEyeArea = leftEye.getBoundingClientRect();
  const RL = leftEyeArea.width/2;
  centerXL = leftEyeArea.left + RL;
  centerYL = leftEyeArea.top + RL;

  const rightEyeArea = rightEye.getBoundingClientRect();
  const RR = rightEyeArea.width/2;
  centerXR = rightEyeArea.left + RR;
  centerYR = rightEyeArea.top + RR;

  const faceArea = face.getBoundingClientRect();
  const RF = faceArea.width/2;
  centerXF = faceArea.left + RF;
  centerYF = faceArea.top + RF;

  cardLength = document.documentElement.clientWidth * 3


  let vh = window.innerHeight;
	let sh = shapesStage.offsetHeight;
	let scaleFactor = vh/sh;
	if(scaleFactor<1) {
		gsap.set(shapesStage, { scale: scaleFactor });
	}
	else {
    gsap.set(shapesStage, { scale: 1 });
  }


}

function updateTrans(e) {
  const yPercent = getYPercent(e.pageY);

  mouseX = e.clientX;
  mouseY = e.clientY;

  const xL = e.clientX - centerXL;
  const yL = e.clientY - centerYL;

  const xF = e.clientX - centerXF;
  const yF = e.clientY - centerYF;

  const xR = e.clientX - centerXR;
  const yR = e.clientY - centerYR;
  
  const xLPercent = xL / maxXDist;
  const yLPercent = yL / maxYDist;

  const xRPercent = xR / maxXDist;
  const yRPercent = yR / maxYDist;

  const scaledXLPercent = xLPercent * maxTrans;
  const scaledYLPercent = yLPercent * maxTrans;
  
  const scaledXRPercent = xRPercent * maxTrans;
  const scaledYRPercent = yRPercent * maxTrans;

  gsap.to(leftEye, { xPercent: scaledXLPercent, yPercent: scaledYLPercent, duration: 0.2, overwrite: 'auto' });
  gsap.to(rightEye, { xPercent: scaledXRPercent, yPercent: scaledYRPercent, duration: 0.2, overwrite: 'auto' });

  if (xF > 0) {
      gsap.to(leftEyebrow, { yPercent: 20, duration: 2, overwrite: 'auto' });
      gsap.to(rightEyebrow, { yPercent: 1, duration: 2, overwrite: 'auto' });
  }
  else {
      gsap.to(rightEyebrow, { yPercent: 20, duration: 2, overwrite: 'auto' });
      gsap.to(leftEyebrow, { yPercent: 1, duration: 2, overwrite: 'auto' });
  }

  if (xF > 0 && yF > 0 ) {
    gsap.to(face, { rotation: 3, duration: 2, overwrite: 'auto' });
  }
  else if (xF > 0 && yF < 0 ) {
    gsap.to(face, { rotation: -2, duration: 2, overwrite: 'auto' });

  }
  else if (xF < 0 && yF < 0 ) {
    gsap.to(face, { rotation: 3, duration: 2, overwrite: 'auto' });

  }
  else if (xF < 0 && yF > 0 ) {
    gsap.to(face, { rotation: -2, duration: 2, overwrite: 'auto' });

  }
}
window.addEventListener('resize', resize);
resize();

document.querySelector('body').addEventListener('mousemove', updateTrans);

let introReveal = gsap.timeline({
  scrollTrigger: {
    scrub: 1,
    trigger: '.container',
    start: 'center center',
    end: 'top top',
    scrub: false
  },
})
introReveal.to('.word', {
  y: 0,
  stagger: 0.05,
  delay: 0.2,
  duration: .1,
  x:0,
  opacity: 1,
})
introReveal.to(face, {
  opacity: 1,
  y:0
})
introReveal.to('.full-name', {
  y: 0,
  duration: .1,
  x:0,
  opacity: 1,
})
introReveal.to('.full-job', {
  y: 0,
  duration: .1,
  x:0,
  opacity: 1,
})


let aboutReveal = gsap.timeline({
  scrollTrigger: {
    trigger: '.about-section',
    start: 'top 80%',
    end: 'top top',
    scrub: false
  },
})

aboutReveal.to('.about-section .outside-y *', {
  x:0,
  y: 0,
  opacity: 1,
  stagger: .2
})

let container = document.querySelector(".outer");
let cards = gsap.utils.toArray(".panel")
let tl = gsap.timeline({
  scrollTrigger: {
    pin: true,
    scrub: 1,
    trigger: container,
    end: () => container.scrollWidth - document.documentElement.clientWidth
  },
  defaults: { ease: "none", duration: 1 }
});

tl.to(".parallax", { x: 200 })
  .to(".panel", { x: () =>{console.log(cardLength); return (-(cardLength))} }, 0)

  cards.forEach((stop, index) => {
    tl.to(stop.querySelectorAll('.outside *'), {
      x:0,
      opacity: 1,
      stagger: .6,
      delay: .2,
      ease: "elastic.out(1,0.3)",
      scrollTrigger: {
        trigger: stop.querySelector('.card'),
        start: 'left 80%',
        end: 'left 80%',
        containerAnimation: tl,
        scrub: true
      }
    })
  });

window.onresize = resize;

window.onload = () => {
	init();
    resize();
};

gsap.set(cursorDot ,{xPercent:-50, yPercent: -50})


portfolio.addEventListener('mouseenter', () => {
  gsap.to(cursorCircle, 1, {
      scale: 1,
      opacity: 1,
      top: '-75px',
      left: '-75px',
      rotate: 0,
      ease: Elastic.easeOut.config(1, 0.3)
  })
})

portfolio.addEventListener('mousemove', () => {
  gsap.to(cursorCircle, 2, {
      x: mouseX - 45,
      y: mouseY - 5 - portfolio.getBoundingClientRect().top
  })
})

portfolio.addEventListener('mouseleave', () => {
  gsap.to(cursorCircle, 0.2, {
      scale: 0,
      opacity: 0,
      top: '10',
      left: '40',
      rotate: 45,
  })
})


const titleContainer = document.querySelector(".title-container");
const titleBoxes = document.querySelector(".title-boxes")
const tween = gsap.to(titleBoxes, {yPercent:-50, repeat:10, ease:"none"})
const eased = gsap.to(tween, {totalProgress:1, duration:4, ease:"power4.inOut"})

let letsReveal = gsap.timeline({
  scrollTrigger: {
    trigger: '.lets-section',
    start: '10% center',
    end: 'center center'
  },
})
letsReveal.to('.no-opacity *', {
  y: 0,
  stagger: 0.05,
  duration: .1,
  x:0,
  opacity: 1,
})

function scrollToHash(hash, e) {
  const elem = hash ? document.querySelector(hash) : false;
  if(elem) {
    if(e) e.preventDefault();
    gsap.to(window, {scrollTo: elem});
  }
}
document.querySelectorAll('a[href]').forEach(a => {
  a.addEventListener('click', e => {
    scrollToHash(a.hash, e);
  });
});
