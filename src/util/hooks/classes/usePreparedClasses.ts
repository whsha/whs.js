/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { useObserver } from "mobx-react-lite";
import { useContext } from "react";
import { PreparedClassesContext } from "../../../contexts";
import { IClasses } from "./useClasses";

/** Helper hook to use the prepared classes context */
export default function usePreparedClasses() {
    const context = useContext(PreparedClassesContext);

    return useObserver(() => ({
        advisory: context.advisory,
        classes: context.prepared,
        prepare(classes: IClasses) {
            context.prepare(classes);
        },
        clear() {
            context.clear();
        }
    }));
}