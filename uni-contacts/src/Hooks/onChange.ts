import { useState } from "react";

export const useOnChange = <T>(initialState: T) => {

    const [state, setState] = useState<T>(initialState);

    const onChange = <T>(key: keyof T, value: any) => {
        setState( oldState => {
            return {...oldState, [key]: value};
        });
    }

    return {state, onChange, setState};
}