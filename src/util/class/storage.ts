/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "../blocks/blockColor";
import { IClassMeta } from "./extentions";
import { IAdvisedClass, IIrregular } from "./primitives";
import { ClassType, IClassType } from "./type";

/** The most basic information needed to identify a major */
export interface IMajor extends IAdvisedClass, IClassType<ClassType.Major>, IClassMeta {
    /** The name of the major */
    name: string;
    /** The block color which the major meets */
    block: BlockColor;
    /** If the major has a Lab block or not */
    lab: boolean;
}

/** The most basic information needed to identify an elective */
export interface IElective extends IAdvisedClass, IIrregular, IClassType<ClassType.Elective>, IClassMeta {
    /** The name of the elective */
    name: string;
    /** The block color which the elective meets (None = 730) */
    block: BlockColor;
}

/** The most basic information needed to identify a DR */
export interface IDR extends IAdvisedClass, IIrregular, IClassType<ClassType.DR>, IClassMeta {
    /** The block color which the elective meets */
    block: BlockColor;
}