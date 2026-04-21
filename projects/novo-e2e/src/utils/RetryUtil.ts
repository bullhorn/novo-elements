
import { failureMessage } from './AutomationHelpers';
import { sleep } from './SleepUtil';

export async function retry(asyncFunction: () => Promise<any>, onErrorFunction: (error: Error) => Promise<any> = null, maxRetries: number = 3) {
    return recursiveRetry(asyncFunction, maxRetries, onErrorFunction);
}

async function recursiveRetry(asyncFunction: () => Promise<any>, maxRetries: number, onErrorFunction: (error: Error) => Promise<any> = null, attempt: number = 1) {
    return asyncFunction().catch(async error => {
        if (maxRetries >= attempt) {
            if (onErrorFunction) {
                await onErrorFunction(error);
            }
            failureMessage(error.message);
            failureMessage(`Retrying after ${attempt} sec: ${maxRetries - attempt} attempt(s) remaining`);
        } else {
            throw error;
        }
        await sleep(1000 * attempt);
        return recursiveRetry(asyncFunction, maxRetries, onErrorFunction, ++attempt);
    });
}

export async function repeatUntilCondition(asyncFunction: () => Promise<boolean>, description: string, maxRetries: number = 50): Promise<void> {
    let attempt = 0;

    const executeAsyncFunction = async (): Promise<void> => {
        const result = await asyncFunction();
        if (result) {
            return;
        } else if (attempt >= maxRetries) {
            throw new Error(`Check "${description}" failed after ${maxRetries} attempts`);
        } else {
            attempt++;
            console.info(`Repeating check "${description}": Attempt #${attempt} of ${maxRetries}`);
            return executeAsyncFunction();
        }
    };

    return executeAsyncFunction();
}
