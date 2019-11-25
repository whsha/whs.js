/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { IAdvisedClass, IColored, IIdentifiable, IIrregular, INamed } from "./primitives";
import { ClassType, IClassType } from "./type";

// tslint:disable: no-empty-interface

/** The advisory object, missing a class type due to the fact that there only ever is one and storage can be smplified */
export interface IAdvisory extends
    IAdvisedClass { }

/** The most basic information needed to identify a major */
export interface IMajor extends
    IColored,
    INamed,
    IAdvisedClass,
    IClassType<ClassType.Major>,
    IIdentifiable {
    /** If the major has a Lab block or not */
    lab: boolean;
}

/** The most basic information needed to identify a minor */
export interface IMinor extends
    IColored,
    INamed,
    IAdvisedClass,
    IIrregular,
    IClassType<ClassType.Minor>,
    IIdentifiable { }

/** The most basic information needed to identify a DR */
export interface IDR extends
    IColored,
    IAdvisedClass,
    IIrregular,
    IClassType<ClassType.DR>,
    IIdentifiable { }