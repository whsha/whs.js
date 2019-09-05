/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Result } from "@badrap/result";

/** Simply fetch the calendar from the url */
export default async function fetchCalendar(): Promise<Result<string>> {
    // Get the calendar
    let response = await fetch("http://goo.gl/FR0zjg");

    if (!response.ok) {
        return Result.err(new Error(`${response.status}: ${response.statusText}`));
    }

    // Get the full text body
    return Result.ok(await response.text());
}
