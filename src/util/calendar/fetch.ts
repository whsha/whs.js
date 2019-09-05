/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Result } from "@badrap/result";

/** Simply fetch the calendar from the url */
export default async function fetchCalendar(): Promise<Result<string>> {
    // Get the calendar
    let response = await fetch("https://calendar.google.com/calendar/ical/wellesleyps.org_qvqdo2dkb151vorl1f0dkigin0%40group.calendar.google.com/public/basic.ics");

    if (!response.ok) {
        return Result.err(new Error(`${response.status}: ${response.statusText}`));
    }

    // Get the full text body
    return Result.ok(await response.text());
}
