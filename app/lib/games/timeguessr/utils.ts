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