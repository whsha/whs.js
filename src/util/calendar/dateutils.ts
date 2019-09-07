/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs, { Dayjs } from "dayjs";
import dayjsutc from "dayjs/plugin/utc";
import { Time } from "ical.js";

dayjs.extend(dayjsutc);

export function icalDateToDayjs(date: Time): Dayjs {
    return dayjs().utc()
        .set("year", date.year)
        .set("month", date.month - 1)
        .set("day", date.day)
        .set("hour", date.hour)
        .set("minute", date.minute)
        .set("second", date.second)
        .set("millisecond", 0);
}