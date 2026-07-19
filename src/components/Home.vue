<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const canvasRef = ref(null);
const wrapRef = ref(null);
let rafId = null;
let cleanupFns = [];

onMounted(async () => {
  await nextTick();
  const canvas = canvasRef.value;
  const wrap = wrapRef.value;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const PX = 4; // pixel-art unit scale
  const GROUND_HEIGHT = 70; // fixed sand strip height in px, ground never stretches

  // These are responsive now: recomputed on every resize.
  let W = 800, H = 300, GROUND_Y = H - GROUND_HEIGHT;

  function resizeCanvas(){
    const rect = wrap.getBoundingClientRect();
    W = Math.max(280, Math.round(rect.width));
    H = Math.max(300, Math.round(rect.height));
    canvas.width = W;
    canvas.height = H;
    GROUND_Y = H - GROUND_HEIGHT;
    ctx.imageSmoothingEnabled = false;

    // keep the player glued to the ground after a resize
    if (player) {
      if (player.onGround) player.y = GROUND_Y - player.h;
    }
  }

  // ---------- Pixel sprite data ----------
  const PAL = {
    '.': null,
    'H': '#6b4423', // hair (brown curly)
    'G': '#111111', // headset / black outline
    'S': '#ffcc99', // skin
    'P': '#1a1a1a', // pupil
    'C': '#ffffff', // shirt
    'T': '#2196f3', // tie
    'N': '#e0a878', // neck shade
    'D': '#20232b', // pants dark navy
    'K': '#0a0a0a', // shoes
    'A': '#ffb300', // badge/id accent
    'R': '#ff2e4d', // bug red
    'B': '#141414', // bug black
    'Y': '#ffe94a', // yellow
    'O': '#ff8a3d', // orange
    'F': '#9aa7b0', // frame gray
    'M': '#141c3a', // monitor dark
    'X': '#ff1744', // error X red
    'W': '#ffffff'  // white
  };

  function sprite(rows){ return rows; }

  const RUN1 = sprite([
    ".H.HHH.H...",
    "..HHHHHHH..",
    "HHHHGHHHHHH",
    "HHSSSSSSSHH",
    "GSSPSSSPSSH",
    "HSSSSNSSSSG",
    "..SSPPPSS..",
    "..NNNNNNN..",
    ".CCCCCCCCC.",
    "CCCCTCCCCCC",
    ".CCCCTCCCC.",
    "..CCCTCCC..",
    "..DD...DD..",
    ".DD.....DD.",
    "KK.......KK",
    "..........."
  ]);

  const RUN2 = sprite([
    ".H.HHH.H...",
    "..HHHHHHH..",
    "HHHHGHHHHHH",
    "HHSSSSSSSHH",
    "GSSPSSSPSSH",
    "HSSSSNSSSSG",
    "..SSPPPSS..",
    "..NNNNNNN..",
    ".CCCCCCCCC.",
    "CCCCTCCCCCC",
    ".CCCCTCCCC.",
    "..CCCTCCC..",
    ".DD.....DD.",
    "..DD...DD..",
    ".KK.....KK.",
    "..........."
  ]);

  const JUMP = sprite([
    ".H.HHH.H...",
    "..HHHHHHH..",
    "HHHHGHHHHHH",
    "HHSSSSSSSHH",
    "GSSPSSSPSSH",
    "HSSSSNSSSSG",
    "..SSPPPSS..",
    "..NNNNNNN..",
    ".CCCCCCCCC.",
    "CCCCTCCCCCC",
    ".CCCCTCCCC.",
    "..CCCTCCC..",
    "...DDDDD...",
    "...DDDDD...",
    "...KKKKK...",
    "..........."
  ]);

  const BUG = sprite([
    "....BBB....",
    "...BRRRB...",
    "..BRRRRRB..",
    ".BRRYRYRRB.",
    "BRRRRRRRRRB",
    ".BRRRRRRRB.",
    "..B.B.B.B..",
    ".B..B.B..B.",
    "..........."
  ]);

  const WARN = sprite([
    ".....B.....",
    "....BYB....",
    "...BYYYB...",
    "..BYYBYYB..",
    ".BYYYBYYYB.",
    "BYYYYBYYYYB",
    "..........."
  ]);

  const ERR1 = sprite([
    "XXX.XXX.XXX",
    "X...X.X.X...",
    "XXX.X.X.XXX.",
    "..X.X.X...X",
    "XXX.XXX.XXX"
  ]);

  function drawSprite(grid, x, y, scale){
    const s = scale || PX;
    for(let r=0;r<grid.length;r++){
      const row = grid[r];
      for(let c=0;c<row.length;c++){
        const ch = row[c];
        const color = PAL[ch];
        if(color){
          ctx.fillStyle = color;
          ctx.fillRect(Math.round(x + c*s), Math.round(y + r*s), s, s);
        }
      }
    }
  }
  function spriteW(grid, scale){ return grid[0].length * (scale||PX); }
  function spriteH(grid, scale){ return grid.length * (scale||PX); }

  // ---------- Game state ----------
  let player, obstacles, particles, clouds, groundOffset;
  let speed, score, best = 0, running, gameOver, spawnTimer;
  let started = false;

  const GRAV = 0.62;
  const JUMP_V = -11.2;

  function resetGame(){
    player = {
      x: 70, y: GROUND_Y - spriteH(RUN1), vy: 0,
      onGround: true, w: spriteW(RUN1), h: spriteH(RUN1),
      frame: 0, frameTimer: 0
    };
    obstacles = [];
    particles = [];
    speed = 5.2;
    score = 0;
    running = true;
    gameOver = false;
    spawnTimer = 70;
    groundOffset = 0;
  }

  function spawnObstacle(){
    const kinds = [
      { grid: BUG, scale: PX, type:'bug' },
      { grid: WARN, scale: PX + 1, type:'warn' },
      { grid: ERR1, scale: PX + 1, type:'err' },
    ];
    const k = kinds[Math.floor(Math.random()*kinds.length)];
    const w = spriteW(k.grid, k.scale);
    const h = spriteH(k.grid, k.scale);
    obstacles.push({
      grid: k.grid, scale: k.scale,
      x: W + 20, y: GROUND_Y - h, w, h,
      wobble: Math.random()*Math.PI*2,
      type: k.type
    });
  }

  function makeClouds(){
    clouds = [];
    for(let i=0;i<5;i++){
      clouds.push({
        x: Math.random()*W,
        y: 20 + Math.random()*70,
        s: 10 + Math.random()*10,
        speed: 0.3 + Math.random()*0.5
      });
    }
  }

  function drawCloud(c){
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    const b = c.s;
    ctx.fillRect(c.x, c.y+b*0.4, b*3, b*0.6);
    ctx.fillRect(c.x+b*0.6, c.y, b*1.8, b*0.6);
  }

  function drawBackground(){
    // sky gradient — fills all available height above the ground, so extra
    // vertical space on a tall phone just becomes more sky, no stretching.
    const g = ctx.createLinearGradient(0,0,0,GROUND_Y);
    g.addColorStop(0, '#cdeeff');
    g.addColorStop(1, '#8fd0ef');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,GROUND_Y+4);

    // sun (fixed square size, anchored to top-right, never distorts)
    ctx.fillStyle = 'yellow';
    ctx.fillRect(W-90, 30, 40, 40);

    clouds.forEach(c=>{
      drawCloud(c);
      c.x -= c.speed * (running?1:0.2);
      if(c.x < -40) c.x = W + Math.random()*60;
    });

    // distant skyline silhouette, slow parallax scroll, anchored to GROUND_Y
    const skylineOffset = (groundOffset*0.4) % 340;
    ctx.fillStyle = '#5b7ba6';
    for(let i=-1;i<Math.ceil(W/340)+2;i++){
      const bx = i*340 - skylineOffset;
      ctx.fillRect(bx+10, GROUND_Y-90, 26, 90);
      ctx.fillRect(bx+45, GROUND_Y-135, 22, 135);
      ctx.fillRect(bx+80, GROUND_Y-70, 30, 70);
      ctx.fillRect(bx+250, GROUND_Y-115, 24, 115);
      ctx.fillRect(bx+285, GROUND_Y-65, 26, 65);
      ctx.fillStyle = '#dff0ff';
      for(let wRow=0; wRow<6; wRow++){
        ctx.fillRect(bx+50, GROUND_Y-125+wRow*18, 4,4);
        ctx.fillRect(bx+58, GROUND_Y-125+wRow*18, 4,4);
      }
      ctx.fillStyle = '#5b7ba6';
    }

    // sandy ground — fixed height strip pinned to the bottom
    const sg = ctx.createLinearGradient(0,GROUND_Y,0,H);
    sg.addColorStop(0, 'chocolate');
    sg.addColorStop(1, 'brown');
    ctx.fillStyle = sg;
    ctx.fillRect(0, GROUND_Y, W, H-GROUND_Y);

    ctx.fillStyle = '#eccd8f';
    ctx.fillRect(0, GROUND_Y-4, W, 4);

    ctx.fillStyle = 'rgba(150,110,60,0.35)';
    for(let i=0;i<50;i++){
      const dx = ((i*53 - groundOffset) % (W+60)) - 30;
      const dy = GROUND_Y + 8 + ((i*29)%56);
      ctx.fillRect(dx, dy, 3, 3);
    }
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    for(let i=0;i<30;i++){
      const dx = ((i*71 + 20 - groundOffset) % (W+60)) - 30;
      const dy = GROUND_Y + 14 + ((i*17)%50);
      ctx.fillRect(dx, dy, 2, 2);
    }
  }

  function collide(a,b){
    const pad = 6;
    return a.x+pad < b.x+b.w-pad &&
           a.x+a.w-pad > b.x+pad &&
           a.y+pad < b.y+b.h-pad &&
           a.y+a.h-pad > b.y+pad;
  }

  function update(){
    if(running){
      groundOffset += speed;
      score += speed*0.05;
      if(speed < 13) speed += 0.0018;

      player.vy += GRAV;
      player.y += player.vy;
      if(player.y >= GROUND_Y - player.h){
        player.y = GROUND_Y - player.h;
        player.vy = 0;
        player.onGround = true;
      } else {
        player.onGround = false;
      }

      player.frameTimer++;
      if(player.frameTimer > 5){
        player.frame = 1 - player.frame;
        player.frameTimer = 0;
      }

      spawnTimer--;
      if(spawnTimer <= 0){
        spawnObstacle();
        const gap = 65 - Math.min(speed*2.4, 34) + Math.random()*40;
        spawnTimer = gap;
      }
      obstacles.forEach(o=>{ o.x -= speed; o.wobble += 0.15; });
      obstacles = obstacles.filter(o=> o.x + o.w > -20);

      const pBox = {x:player.x, y:player.y, w:player.w, h:player.h};
      for(const o of obstacles){
        if(collide(pBox, o)){
          running = false;
          gameOver = true;
          best = Math.max(best, Math.floor(score));
          for(let i=0;i<18;i++){
            particles.push({
              x: player.x+player.w/2, y: player.y+player.h/2,
              vx: (Math.random()-0.5)*8, vy: (Math.random()-0.5)*8,
              life: 30+Math.random()*20,
              color: ['#ff2e4d','#ffe94a','#00e5ff','#ff6ec7'][Math.floor(Math.random()*4)]
            });
          }
          break;
        }
      }
    }

    particles.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; p.vy+=0.3; p.life--; });
    particles = particles.filter(p=>p.life>0);
  }

  function draw(){
    drawBackground();

    obstacles.forEach(o=>{
      const wob = Math.sin(o.wobble)*2;
      drawSprite(o.grid, o.x, o.y+wob, o.scale);
    });

    if(!player.onGround){
      drawSprite(JUMP, player.x, player.y);
    } else {
      drawSprite(player.frame===0?RUN1:RUN2, player.x, player.y);
    }

    particles.forEach(p=>{
      ctx.globalAlpha = Math.max(p.life/40,0);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x,p.y,5,5);
      ctx.globalAlpha = 1;
    });

    if(!started){
      overlay('BUG DASH', 'Help Meanleap dash the Bugs');
    } else if(gameOver){
      overlay('Error Add', 'Play again and Give him more problems');
    }
  }

  function overlay(title, sub){
    ctx.fillStyle = 'rgba(10,8,25,0.55)';
    ctx.fillRect(0,0,W,H);
    ctx.textAlign = 'center';
    ctx.fillStyle = 'red';
    ctx.font = 'bold 40px monospace';
    ctx.fillText(title, W/2, H/2 - 10);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(sub, W/2, H/2 + 24);
  }

  function loop(){
    update();
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function jump(){
    if(!started){
      started = true;
      resetGame();
      return;
    }
    if(gameOver){
      resetGame();
      return;
    }
    if(player.onGround){
      player.vy = JUMP_V;
      player.onGround = false;
    }
  }

  function onKeydown(e){
    if(e.code === 'Space' || e.code === 'ArrowUp'){
      e.preventDefault();
      jump();
    }
  }
  function onTouch(e){ e.preventDefault(); jump(); }
  function onResize(){ resizeCanvas(); }

  window.addEventListener('keydown', onKeydown);
  canvas.addEventListener('mousedown', jump);
  canvas.addEventListener('touchstart', onTouch, {passive:false});
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  cleanupFns.push(() => {
    window.removeEventListener('keydown', onKeydown);
    canvas.removeEventListener('mousedown', jump);
    canvas.removeEventListener('touchstart', onTouch);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('orientationchange', onResize);
  });

  // init: size the canvas to its real on-screen dimensions first
  resizeCanvas();
  makeClouds();

  player = { x:70, y: GROUND_Y - spriteH(RUN1), w: spriteW(RUN1), h: spriteH(RUN1), onGround:true, frame:0, frameTimer:0, vy:0 };
  obstacles = [];
  particles = [];
  score = 0;
  groundOffset = 0;

  loop();
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
  cleanupFns.forEach(fn => fn());
});



</script>

<template>
  <div id="home">
    <div id="wrap" ref="wrapRef">
      <canvas ref="canvasRef" id="game"></canvas>
    </div>
  </div>
</template>

<style scoped>
#page {
  margin: 0; padding: 0;
  background: #291cdb;
  font-family: 'Courier New', monospace;
  display: flex; align-items: center; justify-content: center;
  touch-action: manipulation;
}
#wrap {
  position: relative;
  width: 100%;
  height: 95vh;
}
#game {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  display: block;
  z-index: 1;
  background: #7ad6f5;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
</style>