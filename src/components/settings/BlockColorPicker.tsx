/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Cell, Section } from "react-native-tableview-simple";
import { BlockColor, getDisplayColorForBlock } from "../../util/blocks/blockColor";

/** The props for BlockColorPicker */
interface IBlockColorPickerProps {
    /** The callback for when a new color is picked */
    onPick(value: BlockColor): void;
    /** The value to display */
    value: BlockColor;
    /** If none is a possible as a block color */
    hasNone?: boolean;
}

/** A component to use to select block colors */
export default function BlockColorPicker({ onPick, value, hasNone = false }: IBlockColorPickerProps) {
    const pick = (color: BlockColor) => () => onPick(color);

    return (
        <Section header="Color Block">
            <ColorCell color={BlockColor.Red} value={value} pick={pick} />
            <ColorCell color={BlockColor.Orange} value={value} pick={pick} />
            <ColorCell color={BlockColor.Yellow} value={value} pick={pick} />
            <ColorCell color={BlockColor.Green} value={value} pick={pick} />
            <ColorCell color={BlockColor.Blue} value={value} pick={pick} />
            <ColorCell color={BlockColor.Purple} value={value} pick={pick} />
            <ColorCell color={BlockColor.Tan} value={value} pick={pick} />
            {hasNone ? <ColorCell color={BlockColor.None} value={value} pick={pick} /> : null}
        </Section>
    );
}

/** The props for ColorCell */
interface IColorCellProps<C extends BlockColor> {
    /** The color for the cell */
    color: C;
    /** The current selected value */
    value: BlockColor;
    /** The callback to use to pick a new color */
    pick(color: C): () => void;
}

/** The cell to choose colors with */
const ColorCell = memo(<C extends BlockColor>({ color, pick, value }: IColorCellProps<C>) => (
    <Cell
        title={color}
        onPress={pick(color)}
        titleTextColor={getDisplayColorForBlock(color)}
        accessory={value === color ? "Checkmark" : undefined}
    />
));