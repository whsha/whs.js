/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { IClass } from "@whsha/classes/v2/class";
import deepEqual from "deep-equal";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import useClasses from "./useClasses";

/** A hook to access and manipulate a single class */
export default function useClass(uuid: string) {
    const classes = useClasses();

    return useObserver(() => {
        const saved = classes.saved.classes.get(uuid);
        const temp = classes.temp.classes.get(uuid) as Readonly<IClass | undefined>;

        if (temp === undefined) {
            return undefined;
        } else {
            return {
                saved,
                temp,
                updated: !deepEqual(toJS(saved), toJS(temp), { strict: true }),
                delete() {
                    classes.temp.classes.delete(uuid);
                },
                update(data: Partial<IClass> | ((pre: IClass | undefined) => IClass)) {
                    if (typeof data === "function") {
                        classes.temp.classes.set(uuid, { ...temp, ...data(temp) });
                    } else {
                        classes.temp.classes.set(uuid, { ...temp, ...data });
                    }
                },
            };
        }
    });
}