/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { createContext } from "react";
import CalendarStore from "./stores/calendarStore";

export const ReloadFunctionContext = createContext<(reset: boolean) => Promise<void>>(() => Promise.resolve());
export const CalendarContext = createContext(new CalendarStore());