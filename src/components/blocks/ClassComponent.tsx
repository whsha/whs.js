/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { IClass } from "@whsha/classes/v2/class";
import React, { memo } from "react";
import { ClassContainerView } from "../../styles/components/class";
import ExtraInfo from "./parts/ExtraInfo";
import TitleTimes from "./parts/TitleTimes";
import { ITimes } from "./times";

/** The props for a class component */
interface IDisplayClass extends ITimes {
    /** The class to display */
    clazz: IClass;
}

/** A component that will display a class */
function ClassComponent({ end, start, clazz }: IDisplayClass) {
    return (
        <ClassContainerView>
            <TitleTimes block={clazz.block} start={start} end={end} name={clazz.name} />
            <ExtraInfo room={clazz.room} teacher={clazz.teacher} block={clazz.block} />
        </ClassContainerView>
    );
}

export default memo(ClassComponent);
