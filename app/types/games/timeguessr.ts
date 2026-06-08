// Creo los modos de juego
export type GameMode = "singleplayer" | "multiplayer";

// Las fases del juego: inactivo, en juego, adivinando, resultado, terminado
export type GamePhase = "idle" | "running" | "guessing" | "result" | "finished";

// Información de cada jugador
export interface Player {
    id: string
    name: string
    totalScore: number
}

// Resultado de cada ronda para cada jugador
export interface RoundResult {
    playerName: string
    guess: number
    difference: number
    pointsEarned: number
}

// Estado completo del juego
export interface GameState {
    mode: GameMode
    phase: GamePhase
    players: Player[]
    totalRounds: number
    currentRound: number
    currentPlayerIndex: number
    startTime: number | null
    realTime: number | null
    roundResults: RoundResult[]
}