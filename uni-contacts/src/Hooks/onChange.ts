import { useState } from "react";


export const useOnChange = <T>(initialState: T) => {

    const [state, setState] = useState<T>(initialState);

    const onChange = <T>(partialT: Partial<T>) => {
        setState( oldState => {
            return {...oldState, ...partialT};
        });
    }

    return {state, onChange, setState};
}