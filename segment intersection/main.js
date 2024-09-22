myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

const A = { x: 200, y: 150 };
const B = { x: 150, y: 250 };
const C = { x: 50, y: 100 };
const D = { x: 250, y: 200 };

const E = { x: 50, y: 100 };
const F = { x: 250, y: 200 };

const ctx = myCanvas.getContext("2d");

const mouse = { x: 0, y: 0 };

document.onmousemove = (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
};

let t = 0;
let t1 = 0;
let angle = 0;

let isToB = true;

animate();

function animate() {
  const radius = 50;

  E.x = mouse.x + Math.cos(angle) * radius;
  E.y = mouse.y - Math.sin(angle) * radius;
  F.x = mouse.x - Math.cos(angle) * radius;
  F.y = mouse.y + Math.sin(angle) * radius;
  angle += 0.02;
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(B.x, B.y);

  ctx.moveTo(C.x, C.y);
  ctx.lineTo(D.x, D.y);

  ctx.moveTo(E.x, E.y);
  ctx.lineTo(F.x, F.y);

  ctx.stroke();

  drawDot(A, "A", false);
  drawDot(B, "B", false);
  drawDot(C, "C", false);
  drawDot(D, "D", false);
  drawDot(E, "E", false);
  drawDot(F, "F", false);

  const I = getIntersection(A, B, C, D);
  drawDot(I, "I", false);

  const H = getIntersection(E, F, C, D);
  if (H) drawDot(H, "H", false);

  const G = getIntersection(E, F, A, B);
  if (G) drawDot(G, "G", false);

  const N = {
    x: lerp(D.x, C.x, t1),
    y: lerp(D.y, C.y, t1),
  };

  const M = {
    x: lerp(A.x, B.x, t),
    y: lerp(A.y, B.y, t),
  };

  drawDot(M, "M", true);
  drawDot(N, "N", true);
  t += increaseOrDecreaseT(A.x, B.x, M.x);
  t1 += increaseOrDecreaseT(D.x, C.x, N.x);

  requestAnimationFrame(animate);
}

function getIntersection(A, B, C, D) {
  if (A.x < C.x && A.x < D.x && B.x < C.x && B.x < D.x) return 0;
  const top = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  if (bottom != 0) {
    const t = top / bottom;

    if (t >= 0 && t <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t,
      };
    }
  }
  return null;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function increaseOrDecreaseT(A, B, M) {
  let result = 0.005;
  if (isToB) {
    if (M <= B) {
      result = -0.005;
      isToB = false;
    }
  } else {
    if (M >= A) {
      isToB = true;
    } else {
      result = -0.005;
    }
  }

  return result;
}

function drawDot(point, label, isT) {
  ctx.beginPath();
  ctx.fillStyle = isT ? "red" : "white";
  ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 14px Arial";
  ctx.fillText(label, point.x, point.y);
}
