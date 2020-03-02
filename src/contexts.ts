/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { ClassesStorev2, PreparedClassesStorev2 } from "@whsha/classes/v2/store";
import { createContext } from "react";
import CalendarStore from "./stores/calendarStore";
import PreferencesStore from "./stores/preferencesStore";

/** The context to access the reload function */
export const ReloadFunctionContext = createContext<(resetCalendar: boolean) => Promise<void>>(() => Promise.resolve());

/** The context to access the saved calendar */
export const CalendarContext = createContext(new CalendarStore());

/** The context to access the saved and prepared classes */
export const PreparedClassesContext = createContext(new PreparedClassesStorev2());

/** The context to access the user's preferences */
export const PreferencesStoreContext = createContext(new PreferencesStore());

/** The context to access the saved classes */
export const TempClassesContext = createContext(new ClassesStorev2());
