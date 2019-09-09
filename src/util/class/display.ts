/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "../blocks/blockColor";
import { ITimes } from "./extentions";
import { IAdvisedClass } from "./primitives";

/** The display information for a class block */
export interface IClassBlock extends IAdvisedClass, ITimes {
    /** The name of the class block */
    name: string;
    /** The block color which to display for the meets */
    block: BlockColor;
}

/** The most basic information needed to identify a Free block */
export interface IFreeBlock extends ITimes {
    /** The block color which the class meets */
    block: BlockColor;
}