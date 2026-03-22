import { useState, useEffect, useRef, useCallback } from "react";

type GameState = "idle" | "active" | "gameover" | "win";

interface Block {
  left: number;
  width: number;
}

const TOTAL_LEVELS = 8;
const BLOCK_HEIGHT = 26;
const INITIAL_SPEED = 0.38;
const SPEED_INCREMENT = 0.04;
const PERFECT_THRESHOLD = 0.04;

const WIN_MSG = "Microservices deployed.\nThat's the precision I build with.";
const FAIL_MSG = "Systems fail. Engineers debug.\nTap to try again.";
const IDLE_TITLE = "SYSTEM ARCHITECT";
const IDLE_SUB = "Tap to stack the services";

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function StackerGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const posRef = useRef<number>(0.1);
  const dirRef = useRef<number>(1);
  const speedRef = useRef<number>(INITIAL_SPEED);
  const stateRef = useRef<GameState>("idle");

  const [gameState, setGameState] = useState<GameState>("idle");
  const [stack, setStack] = useState<Block[]>([{ left: 0, width: 1 }]);
  const [movingLeft, setMovingLeft] = useState(0.1);
  const [movingWidth, setMovingWidth] = useState(0.75);
  const [perfectCount, setPerfectCount] = useState(0);

  const level = stack.length;

  const startGame = useCallback(() => {
    const startWidth = 0.75;
    posRef.current = 0.1;
    dirRef.current = 1;
    speedRef.current = INITIAL_SPEED;
    stateRef.current = "active";
    setStack([{ left: 0, width: 1 }]);
    setMovingLeft(0.1);
    setMovingWidth(startWidth);
    setPerfectCount(0);
    setGameState("active");
  }, []);

  useEffect(() => {
    if (gameState !== "active") {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    lastTimeRef.current = 0;

    const loop = (timestamp: number) => {
      if (stateRef.current !== "active") return;
      if (lastTimeRef.current === 0) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = timestamp;

      const w = movingWidthRef.current;
      posRef.current += dirRef.current * speedRef.current * dt;

      if (posRef.current <= 0) {
        posRef.current = 0;
        dirRef.current = 1;
      } else if (posRef.current + w >= 1) {
        posRef.current = 1 - w;
        dirRef.current = -1;
      }

      setMovingLeft(posRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameState]);

  const movingWidthRef = useRef(0.75);
  useEffect(() => {
    movingWidthRef.current = movingWidth;
  }, [movingWidth]);

  const handleTap = useCallback(() => {
    if (gameState === "idle" || gameState === "gameover" || gameState === "win") {
      startGame();
      return;
    }
    if (gameState !== "active") return;

    setStack((prev) => {
      const below = prev[prev.length - 1];
      const curLeft = posRef.current;
      const curWidth = movingWidthRef.current;

      const overlapLeft = Math.max(curLeft, below.left);
      const overlapRight = Math.min(curLeft + curWidth, below.left + below.width);
      const overlapWidth = overlapRight - overlapLeft;

      if (overlapWidth <= 0) {
        stateRef.current = "gameover";
        setGameState("gameover");
        return prev;
      }

      const isPerfect = Math.abs(curLeft - below.left) < PERFECT_THRESHOLD &&
        Math.abs(curWidth - below.width) < PERFECT_THRESHOLD;

      const newLeft = isPerfect ? below.left : overlapLeft;
      const newWidth = isPerfect ? below.width : overlapWidth;

      if (!isPerfect) setPerfectCount(0);
      else setPerfectCount((c) => c + 1);

      const newBlock: Block = { left: newLeft, width: newWidth };
      const newStack = [...prev, newBlock];

      const nextLevel = newStack.length;

      if (nextLevel > TOTAL_LEVELS) {
        stateRef.current = "win";
        setGameState("win");
        return newStack;
      }

      posRef.current = 0.1;
      dirRef.current = 1;
      speedRef.current = clamp(INITIAL_SPEED + (nextLevel - 1) * SPEED_INCREMENT, 0, 1.2);
      setMovingLeft(0.1);
      setMovingWidth(newWidth);
      return newStack;
    });
  }, [gameState, startGame]);

  const gameAreaHeight = TOTAL_LEVELS * BLOCK_HEIGHT;

  const blockColors = [
    "hsl(215,52%,22%)",
    "hsl(215,55%,26%)",
    "hsl(210,65%,30%)",
    "hsl(210,70%,33%)",
    "hsl(210,74%,37%)",
    "hsl(210,77%,41%)",
    "hsl(210,79%,46%)",
    "hsl(210,79%,52%)",
  ];

  const getColor = (index: number) =>
    blockColors[Math.min(index, blockColors.length - 1)];

  return (
    <div
      ref={containerRef}
      onClick={handleTap}
      onKeyDown={(e) => (e.key === " " || e.key === "Enter") && handleTap()}
      tabIndex={0}
      role="button"
      aria-label="Stack the services mini-game. Tap or press space to play."
      className="relative w-full select-none outline-none cursor-pointer rounded-2xl overflow-hidden"
      style={{
        height: gameAreaHeight + 72,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Label */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-3 pb-2 z-10">
        <span className="text-[10px] font-bold tracking-[0.18em] text-primary/70 uppercase">
          {IDLE_TITLE}
        </span>
        {gameState === "active" && (
          <span className="text-[10px] font-semibold tracking-widest text-muted-foreground/60">
            {level - 1} / {TOTAL_LEVELS}
          </span>
        )}
        {(gameState === "idle") && (
          <span className="text-[10px] text-muted-foreground/40 tracking-wider animate-pulse">
            {IDLE_SUB}
          </span>
        )}
      </div>

      {/* Game Area */}
      <div
        className="absolute left-0 right-0"
        style={{ bottom: 0, height: gameAreaHeight, padding: "0 12px" }}
      >
        {/* Moving block — only visible when active or just dropped */}
        {gameState === "active" && level <= TOTAL_LEVELS && (
          <div
            className="absolute"
            style={{
              top: 0,
              left: `calc(${movingLeft * 100}% + 0px)`,
              width: `${movingWidth * 100}%`,
              height: BLOCK_HEIGHT - 3,
              borderRadius: 6,
              background: getColor(level - 1),
              boxShadow: `0 0 14px 2px ${getColor(level - 1)}55`,
              transition: "none",
            }}
          />
        )}

        {/* Stacked blocks — rendered from bottom up */}
        {stack.slice(1).map((block, i) => {
          const stackIndex = i;
          const bottomOffset = (TOTAL_LEVELS - 1 - stackIndex) * BLOCK_HEIGHT;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                bottom: bottomOffset,
                left: `${block.left * 100}%`,
                width: `${block.width * 100}%`,
                height: BLOCK_HEIGHT - 3,
                borderRadius: 6,
                background: getColor(stackIndex),
                boxShadow: `0 2px 8px rgba(0,0,0,0.3)`,
                transition: "none",
              }}
            />
          );
        })}

        {/* Base block */}
        <div
          className="absolute left-0 right-0"
          style={{
            bottom: 0,
            left: 0,
            width: "100%",
            height: BLOCK_HEIGHT - 3,
            borderRadius: 6,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
      </div>

      {/* Idle overlay */}
      {gameState === "idle" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20" style={{ paddingTop: 28 }}>
          <div
            className="text-[11px] font-semibold tracking-widest uppercase animate-bounce"
            style={{ color: "hsl(210,79%,62%)", animationDuration: "1.8s" }}
          >
            Tap anywhere to start
          </div>
        </div>
      )}

      {/* Win overlay */}
      {gameState === "win" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4" style={{ paddingTop: 28 }}>
          <div className="text-[13px] font-bold text-white mb-1" style={{ lineHeight: 1.4 }}>
            {WIN_MSG.split("\n").map((l, i) => <div key={i}>{l}</div>)}
          </div>
          <div className="text-[11px] text-primary/60 mt-3 tracking-widest uppercase animate-pulse">
            Tap to play again
          </div>
        </div>
      )}

      {/* Gameover overlay */}
      {gameState === "gameover" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4" style={{ paddingTop: 28 }}>
          <div className="text-[12px] text-muted-foreground" style={{ lineHeight: 1.5 }}>
            {FAIL_MSG.split("\n").map((l, i) => <div key={i}>{l}</div>)}
          </div>
          <div className="text-[11px] text-primary/60 mt-3 tracking-widest uppercase animate-pulse">
            Tap to retry
          </div>
        </div>
      )}
    </div>
  );
}
