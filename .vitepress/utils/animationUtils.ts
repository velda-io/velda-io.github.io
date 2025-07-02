export const cancelledError = new Error('Animation cancelled');
let animationTimeouts: number[] = [];
let animationPromises: {promise: Promise<void>, cancel: () => void}[] = [];
export async function sleep(ms: number): Promise<void> {
    let cancel: () => void = () => {};
    let timeoutId: number = 0;
    const promise = new Promise<void>((resolve, reject) => {
        timeoutId = setTimeout(resolve, ms);
        cancel = () => {
            clearTimeout(timeoutId);
            reject(cancelledError);
        };
    });
    animationPromises.push({ promise, cancel });
    await promise;
    animationPromises = animationPromises.filter(p => p.promise !== promise);
}

export function cancelAllTrackedPromises(): void {
    animationPromises.forEach(({ cancel }) => {
        cancel();
    });
    animationPromises = [];
}