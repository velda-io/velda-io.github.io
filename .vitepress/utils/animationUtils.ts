export class CancelledError extends Error {
    constructor(message: string = 'Animation cancelled') {
        super(message);
        this.name = 'CancelledError';
    }
}

/**
 * AnimationTracker class to scope animation promises to a specific component
 * This allows each component to track and cancel only its own promises
 */
export class AnimationTracker {
    private animationPromises: {promise: Promise<void>, cancel: () => void}[] = [];

    /**
     * Create a promise that resolves after the specified time
     * @param ms Time to sleep in milliseconds
     * @returns Promise that resolves after the specified time
     */
    async sleep(ms: number): Promise<void> {
        let cancel: () => void = () => {};
        let timeoutId: number = 0;
        const promise = new Promise<void>((resolve, reject) => {
            timeoutId = setTimeout(resolve, ms);
            cancel = () => {
                clearTimeout(timeoutId);
                reject(new CancelledError());
            };
        });
        
        // Track this promise in this specific tracker instance
        this.animationPromises.push({ promise, cancel });
        
        try {
            await promise;
        } finally {
            // Remove the promise from tracking once it completes or errors
            this.animationPromises = this.animationPromises.filter(p => p.promise !== promise);
        }
    }

    /**
     * Cancel all tracked promises for this tracker instance
     */
    cancelAll(): void {
        if (this.animationPromises.length !== 0) {
            console.debug(`Cancelling ${this.animationPromises.length} animation promises`);
        }
        
        this.animationPromises.forEach(({ cancel }) => {
            cancel();
        });
        
        this.animationPromises = [];
    }
}

// Legacy global tracker for backward compatibility
let animationPromises: {promise: Promise<void>, cancel: () => void}[] = [];

/**
 * Sleep for the specified time
 * @param ms Time to sleep in milliseconds
 * @deprecated Use an AnimationTracker instance instead
 */
export async function sleep(ms: number): Promise<void> {
    let cancel: () => void = () => {};
    let timeoutId: number = 0;
    const promise = new Promise<void>((resolve, reject) => {
        timeoutId = setTimeout(resolve, ms);
        cancel = () => {
            clearTimeout(timeoutId);
            reject(new CancelledError());
        };
    });
    animationPromises.push({ promise, cancel });
    
    try {
        await promise;
    } finally {
        animationPromises = animationPromises.filter(p => p.promise !== promise);
    }
}

/**
 * Cancel all tracked promises globally
 * @deprecated Use an AnimationTracker instance instead
 */
export function cancelAllTrackedPromises(): void {
    if (animationPromises.length !== 0) {
        console.error('Cancelling all tracked animation promises');
    }
    animationPromises.forEach(({ cancel }) => {
        cancel();
    });
    animationPromises = [];
}

/**
 * Create a new animation tracker for a component
 * @returns A new animation tracker instance
 */
export function createAnimationTracker(): AnimationTracker {
    return new AnimationTracker();
}