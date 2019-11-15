/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

export interface IProblems<E, W> {
    errors: E[];
    warns: W[];
}

/** A Map to store multiple warnings and errors indexed by K */
export default class ProblemMap<K, E, W> {
    private readonly map: Map<K, IProblems<E, W>>;

    constructor() {
        this.map = new Map<K, IProblems<E, W>>();
    }

    /** Check if there are errors for a specific key */
    public hasErrors(key: K) {
        const value = this.map.get(key);

        return value !== undefined && value.errors.length > 0;
    }

    /** Get the errors for a specific key */
    public getErrors(key: K) {
        const value = this.map.get(key);

        return value === undefined ? undefined : value.errors;
    }

    /** Add an error to the error array under key K */
    public addError(key: K, value: E) {
        let prevalue = this.map.get(key);
        if (prevalue === undefined) {
            prevalue = {
                errors: [],
                warns: []
            };
        }

        prevalue.errors.push(value);
        this.map.set(key, prevalue);
    }

    /** Check if there are warnings for a specific key */
    public hasWarns(key: K) {
        const value = this.map.get(key);

        return value !== undefined && value.warns.length > 0;
    }

    /** Get the warns for a specific key */
    public getWarns(key: K) {
        const value = this.map.get(key);

        return value === undefined ? undefined : value.warns;
    }

    /** Add an warning to the warn array under key K */
    public addWarn(key: K, value: W) {
        let prevalue = this.map.get(key);
        if (prevalue === undefined) {
            prevalue = {
                errors: [],
                warns: []
            };
        }

        prevalue.warns.push(value);
        this.map.set(key, prevalue);
    }

    /** Get the errors and warns for the key K */
    public get(key: K) {
        return this.map.get(key);
    }

    /** Delete the array for the key K */
    public delete(key: K) {
        return this.map.delete(key);
    }

    /** Clear all keys and arrays */
    public clear() {
        this.map.clear();
    }

    /** The size of the map */
    get size() {
        return this.map.size;
    }
}