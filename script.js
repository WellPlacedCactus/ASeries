
// -------------------------------------------- wrapper

(() => {

// -------------------------------------------- functions

  const randint = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const rands = () => Math.random() < 0.5 ? -1 : 1;

// -------------------------------------------- variables

  const canvas = document.querySelector('canvas');
  const c = canvas.getContext('2d');
  const mouse = {};
  const emitter = {};
  const parts = [];
  let h = 0;
  let a = 0;
  let r = 25;

// -------------------------------------------- loop

  const load = () => {
    mouse.x = 0;
    mouse.y = 0;
    mouse.down = false;
    emitter.x = canvas.width / 2;
    emitter.y = canvas.height / 2;
    emitter.vx = 5;
    emitter.vy = emitter.vx;
    requestAnimationFrame(loop);
  };

  const loop = () => {

// -------------------------------------------- clear

    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);

// -------------------------------------------- emit parts

    emitter.x += emitter.vx;
    emitter.y += emitter.vy;
    if (emitter.x < 0) emitter.vx *= -1;
    if (emitter.y < 0) emitter.vy *= -1;
    if (emitter.x > canvas.width) emitter.vx *= -1;
    if (emitter.y > canvas.height) emitter.vy *= -1;
    h += 1;
    a += 0.1;

    parts.push({
      x: emitter.x + r * Math.cos(a),
      y: emitter.y + r * Math.sin(a),
      d: Math.random() * Math.PI * 2,
      m: Math.random() * 2,
      h: h,
      l: 10,
      dl: -(Math.random() + 0.1)
    });
    parts.push({
      x: emitter.x + r * Math.cos(a + Math.PI),
      y: emitter.y + r * Math.sin(a + Math.PI),
      d: Math.random() * Math.PI * 2,
      m: Math.random() * 2,
      h: h,
      l: 10,
      dl: -(Math.random() + 0.1)
    });

    if (mouse.down) {
      for (let i = 0; i < 1; i++) {
        parts.push({
          x: mouse.x,
          y: mouse.y,
          d: Math.random() * Math.PI * 2,
          m: Math.random() * 2,
          h: h + 180,
          l: 10,
          dl: -(Math.random() + 0.1)
        });
      }
    }

// -------------------------------------------- handle parts

    c.lineWidth = 1;

    for (let i = parts.length - 1; i >= 0; --i) {

      const p = parts[i];

// -------------------------------------------- tick

      p.x += p.m * Math.cos(p.d);
      p.y += p.m * Math.sin(p.d);
      p.l += p.dl;

      if (p.l < 0) {
        parts.splice(i, 1);
        continue;
      }

// -------------------------------------------- draw

      c.strokeStyle = `hsl(${p.h}, 100%, 50%)`;

      parts.forEach(pp => {
        if (p != pp) {
          const dx = pp.x - p.x;
          const dy = pp.y - p.y;
          const d = dx * dx + dy * dy;
          if (d < 100 * 100) {
            c.beginPath();
            c.moveTo(pp.x, pp.y);
            c.lineTo(p.x, p.y);
            c.stroke();
          }
        }
      });

    }

// -------------------------------------------- loop again

    requestAnimationFrame(loop);
  };

// -------------------------------------------- events

  addEventListener('load', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    load();
  });

  addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });

// -------------------------------------------- mouse events

  addEventListener('mousemove', ({x, y}) => {
    mouse.x = x;
    mouse.y = y;
  });

  addEventListener('mousedown', () => {
    mouse.down = true;
  });

  addEventListener('mouseup', () => {
    mouse.down = false;
  });
  
// -------------------------------------------- touch events

  addEventListener('touchmove', ({touches}) => {
    const t = touches[0];
    mouse.x = t.clientX;
    mouse.y = t.clientY;
  });

  addEventListener('touchstart', () => {
    mouse.down = true;
  });

  addEventListener('touchend', () => {
    mouse.down = false;
  });

})();