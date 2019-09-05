/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

export function stdTimezoneOffset(date: Date) {
    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);

    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

export function isDstObserved(date: Date) {
    return date.getTimezoneOffset() < stdTimezoneOffset(date);
}