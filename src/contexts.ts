/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { createContext } from "react";
import { IAdvisory } from "./components/AdvisoryComponent";
import CalendarStore from "./stores/calendarStore";

export const ReloadFunctionContext = createContext<(reset: boolean) => Promise<void>>(() => Promise.resolve());
export const CalendarContext = createContext(new CalendarStore());
export const AdvisoryContext = createContext<[IAdvisory, React.Dispatch<React.SetStateAction<IAdvisory>>]>([{room: 0, teacher: ""}, () => void 0]);