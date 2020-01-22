/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { createContext } from "react";
import CalendarStore from "./stores/calendarStore";
import LegacyClassesStore from "./stores/legacyClassesStore";
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

// TODO: REMOVE
/** The context to access the saved classes */
export const LegacyClassesContext = createContext(new LegacyClassesStore());

/** The context to access the temp classes */
export const LegacyTempClassesContext = createContext(new LegacyClassesStore());