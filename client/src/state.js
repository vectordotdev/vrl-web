import data from "./scenarios.yaml";
import { createGlobalState } from 'react-hooks-global-state';
const initialState = { scenario: data[0], output: null, resolved: null };

export const { useGlobalState } = createGlobalState(initialState);