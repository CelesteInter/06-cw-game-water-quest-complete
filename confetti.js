// Simple confetti effect using canvas
// Usage: call launchConfetti() to trigger the effect
function launchConfetti() {
  // Remove any existing confetti canvas
  const oldCanvas = document.getElementById('confetti-canvas');
  if (oldCanvas) oldCanvas.remove();

  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const confettiCount = 150;
  const confetti = [];
  const colors = ['#FFC907', '#2E9DF7', '#4FCB53', '#FF902A', '#F5402C', '#159A48', '#F16061'];

  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: 6 + Math.random() * 6,
      d: 2 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      tiltAngleIncremental: (Math.random() * 0.07) + 0.05
    });
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < confetti.length; i++) {
      let c = confetti[i];
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 3);
      ctx.stroke();
    }
    update();
    frame++;
    if (frame < 180) {
      requestAnimationFrame(draw);
    } else {
      canvas.remove();
    }
  }

  function update() {
    for (let i = 0; i < confetti.length; i++) {
      let c = confetti[i];
      c.y += c.d;
      c.tiltAngle += c.tiltAngleIncremental;
      c.tilt = Math.sin(c.tiltAngle) * 15;
      if (c.y > canvas.height) {
        c.x = Math.random() * canvas.width;
        c.y = -10;
      }
    }
  }

  draw();
}
