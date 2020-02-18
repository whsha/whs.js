/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { createContext } from "react";
import CalendarStore from "./stores/calendarStore";
import ClassesStore from "./stores/classesStore";
import PreferencesStore from "./stores/preferencesStore";
import PreparedClassesStore from "./stores/preparedClassesStore";

/** The context to access the reload function */
export const ReloadFunctionContext = createContext<(resetCalendar: boolean) => Promise<void>>(() => Promise.resolve());

/** The context to access the saved calendar */
export const CalendarContext = createContext(new CalendarStore());

/** The context to access the prepared classes */
export const PreparedClassesContext = createContext(new PreparedClassesStore());

/** The context to access the user's preferences */
export const PreferencesStoreContext = createContext(new PreferencesStore());

/** The context to access the saved classes */
export const ClassesContext = createContext(new ClassesStore());

/** The context to access the temp classes */
export const TempClassesContext = createContext(new ClassesStore());