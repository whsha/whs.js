/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

/** Simple helper function to make right aligned text show up better in IOS apps */
export function replaceSpaceWithNBSP(text: string) {
    return text.replace(/\u0020/, "\u00a0");
}