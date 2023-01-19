export interface ISafe<T> {
    result: T | null;
    error: Error | null;
}

type Safe = <T>(promise: Promise<T>, typeCheck?: (obj: any) => boolean) => Promise<ISafe<T>>;

export const safe: Safe = async <T>(promise: Promise<T>, typeCheck?: (obj: any) => boolean): Promise<ISafe<T>> => {
    try {
        const result = await promise; 

        return { result, error: null }
    }
    catch (e: any) {
        return { result: null, error: e }
    }
}
