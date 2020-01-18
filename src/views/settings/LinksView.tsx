/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Linking } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { SettingsScrollView } from "../../styles/components/settings";
import { openLinkInBrowserAlert } from "../../util/alerts";

/** A view containing many links */
export default function LinksView() {
    const openLink = (link: string) =>
        () => openLinkInBrowserAlert(() => Linking.openURL(link));

    return (
        <SettingsScrollView>
            <TableView>
                <Section header="Help">
                    <Cell
                        title="Feedback Discord Server"
                        accessory="DisclosureIndicator"
                        onPress={openLink("https://discord.gg/7q3TxUH")}
                    />
                    <Cell
                        title="Feedback Email"
                        accessory="DisclosureIndicator"
                        onPress={openLink("mailto:feedback@whs.dusterthefirst.com")}
                    />
                </Section>
                <Section header="Legal">
                    <Cell
                        title="License"
                        accessory="DisclosureIndicator"
                        onPress={openLink("https://github.com/DusterTheFirst/whs.js/blob/master/LICENSE")}
                    />
                    <Cell
                        title="Privacy Policy"
                        accessory="DisclosureIndicator"
                        onPress={openLink("https://whs.dusterthefirst.com/PRIVACY")}
                    />
                </Section>
                <Section header="Other">
                    <Cell
                        title="Service Status"
                        accessory="DisclosureIndicator"
                        onPress={openLink("https://status.whs.dusterthefirst.com/")}
                    />
                    <Cell
                        title="Source Code"
                        accessory="DisclosureIndicator"
                        onPress={openLink("https://github.com/DusterTheFirst/whs.js")}
                    />
                </Section>
            </TableView>
        </SettingsScrollView>
    );
}