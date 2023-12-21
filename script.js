const leftEye = document.querySelector('.left-eye');
const rightEye = document.querySelector('.right-eye');
const face = document.querySelector('.face');
const leftEyebrow = document.querySelector('.left-eyebrow');
const rightEyebrow = document.querySelector('.right-eyebrow');

// Create a max value for the translation in the x and y directions
const maxTrans = 30;

// Create a max distance for the mouse position to the center of the element (the viewport dimensions wouldn't be a bad choice).
let maxXDist, maxYDist;

let centerXL, centerYL, centerXR, centerYR, centerXF, centerYF;
// var requestId = null;

const maxRot = 10;
const setXRot = gsap.quickSetter(face, "rotationX", "deg");
const setYRot = gsap.quickSetter(face, "rotationY", "deg");

// const setLeftEye = gsap.quickSetter(leftEye, "rotationY", "deg");




gsap.set(face, {transformOrigin: "center center"});
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

}

function updateTrans(e) {
    const xPercent = getXPercent(e.pageX);
    const yPercent = getYPercent(e.pageY);
    setXRot(xPercent * maxRot);
    setYRot(yPercent * maxRot);
  // Calculate the distance from the mouse position to the center.
  const xL = e.clientX - centerXL;
  const yL = e.clientY - centerYL;

  const xF = e.clientX - centerXF;

  const xR = e.clientX - centerXR;
  const yR = e.clientY - centerYR;
  // const dist = Math.sqrt(Math.pow(x, 2) + Math.pow(x, 2)); // optionally use the total distance as a factor or restriction
  
  // Put that number over the max distance from 2)
  const xLPercent = xL / maxXDist;
  const yLPercent = yL / maxYDist;

  const xRPercent = xR / maxXDist;
  const yRPercent = yR / maxYDist;

  // Multiply that product by the max value from 1 and apply it to your element.
  const scaledXLPercent = xLPercent * maxTrans;
  const scaledYLPercent = yLPercent * maxTrans;
  
  const scaledXRPercent = xRPercent * maxTrans;
  const scaledYRPercent = yRPercent * maxTrans;

//   update with gsap.quickTo for performance
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

//   if (!requestId) {
//     requestId = requestAnimationFrame(update);
//   }


}

// function update() {
//     console.log('first')
// }

window.addEventListener('resize', resize);
resize();

document.querySelector('body').addEventListener('mousemove', updateTrans);
