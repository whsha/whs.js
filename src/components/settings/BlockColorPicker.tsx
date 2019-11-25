/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { GestureResponderEvent, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { blockColorPickerStyles } from "../../layout/default";
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
        <ScrollView horizontal={true} centerContent={true}>
            <ColorPicker color={BlockColor.Red} selected={value === BlockColor.Red} onPress={pick(BlockColor.Red)} />
            <ColorPicker color={BlockColor.Orange} selected={value === BlockColor.Orange} onPress={pick(BlockColor.Orange)} />
            <ColorPicker color={BlockColor.Yellow} selected={value === BlockColor.Yellow} onPress={pick(BlockColor.Yellow)} />
            <ColorPicker color={BlockColor.Green} selected={value === BlockColor.Green} onPress={pick(BlockColor.Green)} />
            <ColorPicker color={BlockColor.Blue} selected={value === BlockColor.Blue} onPress={pick(BlockColor.Blue)} />
            <ColorPicker color={BlockColor.Purple} selected={value === BlockColor.Purple} onPress={pick(BlockColor.Purple)} />
            <ColorPicker color={BlockColor.Tan} selected={value === BlockColor.Tan} onPress={pick(BlockColor.Tan)} />
            {hasNone ? <ColorPicker color={BlockColor.None} selected={value === BlockColor.None} onPress={pick(BlockColor.None)} /> : null}
        </ScrollView>
    );
}

/** The props for the ColorPicker */
interface IColorPickerProps {
    /** The color that this will display */
    color: BlockColor;
    /** If this picker should show as selected */
    selected: boolean;
    /** The callback for when the picker is pressed */
    onPress?(event: GestureResponderEvent): void;
}

/** The individual colors in the BlockColorPicker */
const ColorPicker = memo(({ color, selected, onPress }: IColorPickerProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[blockColorPickerStyles.container, selected ? blockColorPickerStyles.containerSelected : undefined]}>
                <View style={[blockColorPickerStyles.color, { backgroundColor: getDisplayColorForBlock(color) }]} />
                <View style={[blockColorPickerStyles.slash, { display: color === BlockColor.None ? undefined : "none" }]} />
            </View>
        </TouchableOpacity>
    );
});