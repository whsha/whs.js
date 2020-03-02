/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { IClass } from "@whsha/classes/v2/class";
import deepEqual from "deep-equal";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import { useContext } from "react";
import { DeepReadonly } from "ts-essentials";
import { TempClassesContext } from "../../contexts";
import usePreparedClasses from "./usePreparedClasses";

/** A hook to access and manipulate a single class */
export default function useClass(uuid: string) {
    const savedClasses = usePreparedClasses();
    const tempClasses = useContext(TempClassesContext);

    return useObserver(() => ({
        saved: savedClasses.classes.get(uuid) as DeepReadonly<IClass>,
        temp: tempClasses.classes.get(uuid) as Readonly<IClass>,
        updated: !deepEqual(toJS(savedClasses.classes.get(uuid)), toJS(tempClasses.classes.get(uuid)), { strict: true }),
        delete() {
            tempClasses.classes.delete(uuid);
        }
    }));
}