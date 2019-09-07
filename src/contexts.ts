/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { createContext } from "react";
import CalendarStore from "./stores/calendarStore";
import ClassesStore from "./stores/classesStore";

export const ReloadFunctionContext = createContext<(reset: boolean) => Promise<void>>(() => Promise.resolve());
export const CalendarContext = createContext(new CalendarStore());
export const ClassesContext = createContext(new ClassesStore());
export const TempClassesContext = createContext(new ClassesStore());