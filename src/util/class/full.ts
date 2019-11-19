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

/** The most basic information needed to identify a minor */
export interface IMinor extends IAdvisedClass, IIrregular, IClassType<ClassType.Minor>, IClassMeta {
    /** The name of the minor */
    name: string;
    /** The block color which the minor meets (None = 730) */
    block: BlockColor;
}

/** The most basic information needed to identify a DR */
export interface IDR extends IAdvisedClass, IIrregular, IClassType<ClassType.DR>, IClassMeta {
    /** The block color which the DR meets */
    block: BlockColor;
}