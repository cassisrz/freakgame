export function startGameTimer(): number {
    return Date.now();
}

export function stopGameTimer(startTime: number): number {
    /* Calcula la diferencia de tiempo entre el momento donde se inició el juego y el momento donde se detuvo 
    Redondea al centésimo de segundo y convierte en a segundos */
    return ((Date.now() - startTime) / 10) / 100;
}