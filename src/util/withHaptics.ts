/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { impactAsync } from "expo-haptics";

/** Wrap a function so that it will provide haptic feedback when called */
// tslint:disable-next-line: no-any
export default function withHaptics<F extends (...args: any) => any, T>(this: T, fn: F) {
    return (...args: Parameters<F>) => {
        impactAsync().catch(() => console.warn("Haptics failed to fire"));

        return fn.call(this, ...args) as ReturnType<F>;
    };
}