/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

/** A Map to store multiple warnings and errors indexed by K */
export default class ProblemMap<K, E, W> {
    private readonly errors: Map<K, E[]>;
    private readonly warnings: Map<K, W[]>;

    constructor() {
        this.errors = new Map<K, E[]>();
        this.warnings = new Map<K, W[]>();
    }

    /** Check if there are errors for a specific key */
    public hasErrors(key: K) {
        const value = this.errors.get(key);

        return value !== undefined && value.length > 0;
    }

    /** Get the errors for a specific key */
    public getErrors(key: K) {
        return this.errors.get(key);
    }

    /** Add an error to the error array under key K */
    public addError(key: K, value: E) {
        let prevalue = this.errors.get(key);
        if (prevalue === undefined) {
            prevalue = [];
        }
        prevalue.push(value);

        this.errors.set(key, prevalue);
    }

    /** Check if there are warnings for a specific key */
    public hasWarns(key: K) {
        const value = this.warnings.get(key);

        return value !== undefined && value.length > 0;
    }

    /** Get the warns for a specific key */
    public getWarns(key: K) {
        return this.warnings.get(key);
    }

    /** Add an warning to the warn array under key K */
    public addWarn(key: K, value: W) {
        let prevalue = this.warnings.get(key);
        if (prevalue === undefined) {
            prevalue = [];
        }
        prevalue.push(value);

        this.warnings.set(key, prevalue);
    }

    /** Delete the array for the key K */
    public delete(key: K) {
        return this.errors.delete(key) && this.warnings.delete(key);
    }

    /** Clear all keys and arrays */
    public clear() {
        this.errors.clear();
        this.warnings.clear();
    }

    /** The size of the map */
    get errorsSize() {
        return this.errors.size;
    }

    get warningsSize() {
        return this.warnings.size;
    }
}