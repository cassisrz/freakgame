import { RoundResult } from "../../../types/games/timeguessr";

export function startGameTimer(): number {
    return Date.now();
}

export function stopGameTimer(startTime: number): number {
    /* Calcula la diferencia de tiempo entre el momento donde se inició el juego y el momento donde se detuvo 
    Redondea al centésimo de segundo y convierte en a segundos */
    return ((Date.now() - startTime) / 10) / 100;
}

export function calculateSingleScore(realTime: number, guess: number): number {
    const difference = Math.abs(realTime - guess);
    /* Sistema de puntuación:
    Acierta el tiempo exacto: 2 puntos
    Se queda a 0.5 segundos: 1 punto
    Si la diferencia es mayor: 0 puntos
    Los decimales con js pueden ser problemáticos, por eso uso 0.01 */
    if (difference < 0.01) {
        return 2;
    } else if (difference <= 0.5) {
        return 1;
    } else {
        return 0;
    }
}

export function calculateMultiplayerScores(realTime: number, guesses: { playerName: string, guess: number }[]): RoundResult[] {
    // Cálculo de la diferencia de cada jugador
    const results = guesses.map(({ playerName, guess }) => ({
        playerName,
        guess,
        difference: Math.abs(realTime - guess),
        pointsEarned: 0
    }))

    // Se busca si alguno acierta el tiempo exacto
    const exactGuess = results.find(result => result.difference < 0.01);

    if (exactGuess) {
        // Si hay un acierto exacto, ese jugador gana 2 puntos y el resto 0
        return results.map(result => ({
            ...result,
            pointsEarned: result.playerName === exactGuess.playerName ? 2 : 0
        }));
    } else {
        // Si no hay aciertos exactos, se busca el jugador con la menor diferencia
        const minDifference = Math.min(...results.map(result => result.difference));
        return results.map(result => ({
            ...result,
            pointsEarned: result.difference === minDifference ? 1 : 0
        }));
    }
}