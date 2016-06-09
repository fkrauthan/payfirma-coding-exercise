import Immutable from "immutable";
import Promise from "bluebird";

import mapErrors from "../utils/mapErrors";

// Actions
export const LAPTOP_LOADED = "store/LAPTOP_LOADED";
export const STEP_SELECTED = "store/STEP_SELECTED";
export const CPU_SELECTED = "store/CPU_SELECTED";
export const MEM_SELECTED = "store/MEM_SELECTED";
export const HDD_SELECTED = "store/HDD_SELECTED";

// Default state
const defaultState = Immutable.fromJS({
    laptop: null,
    step: 1,

    cpuOptions: [],
    memOptions: [],
    hddOptions: [],

    selectedCpu: null,
    selectedMem: null,
    selectedHdd: null,
});

// Reducer definition
export default function reducer(state = defaultState, action = {}) {
    switch (action.type) {
        case LAPTOP_LOADED:
            return state.withMutations((ctx) => {
                ctx
                    .set("step", 1)
                    .set("laptop", action.laptop)
                    .set("cpuOptions", action.cpuOptions)
                    .set("memOptions", action.memOptions)
                    .set("hddOptions", action.hddOptions)
                    .set("selectedCpu", action.selectedCpu)
                    .set("selectedMem", action.selectedMem)
                    .set("selectedHdd", action.selectedHdd);
            });
        case STEP_SELECTED:
            return state.set("step", action.step);
        case CPU_SELECTED:
            return state.set("selectedCpu", action.cpu);
        case MEM_SELECTED:
            return state.set("selectedMem", action.mem);
        case HDD_SELECTED:
            return state.set("selectedHdd", action.hdd);
        default:
            return state;
    }
}

// Dump actions
export function laptopLoaded(laptop, cpuOptions, memOptions, hddOptions, selectedCpu, selectedMem, selectedHdd) {
    return {
        type: LAPTOP_LOADED,
        laptop,
        cpuOptions,
        memOptions,
        hddOptions,
        selectedCpu,
        selectedMem,
        selectedHdd,
    };
}

export function stepSelected(step) {
    return {
        type: STEP_SELECTED,
        step,
    };
}

export function cpuSelected(cpu) {
    return {
        type: CPU_SELECTED,
        cpu,
    };
}

export function memSelected(mem) {
    return {
        type: MEM_SELECTED,
        mem,
    };
}

export function hddSelected(hdd) {
    return {
        type: HDD_SELECTED,
        hdd,
    };
}

// Smart actions
export function load(id) {
    return (dispatch, getState) => {
        const state = getState();

        const laptop = state.get("store").get("laptops").toArray().find((laptop) => laptop.get("id") == id);

        const cpuOptions = laptop.get("configurationList").toArray().filter((config) => config.get("type") == "CPU");
        const memOptions = laptop.get("configurationList").toArray().filter((config) => config.get("type") == "MEMORY");
        const hddOptions = laptop.get("configurationList").toArray().filter((config) => config.get("type") == "HARD_DRIVE");

        const selectedCpu = cpuOptions.find((option) => option.get("amount") == 0);
        const selectedMem = memOptions.find((option) => option.get("amount") == 0);
        const selectedHdd = hddOptions.find((option) => option.get("amount") == 0);

        dispatch(laptopLoaded(laptop, cpuOptions, memOptions, hddOptions, selectedCpu, selectedMem, selectedHdd));

        return Promise.resolve();
    };
}
