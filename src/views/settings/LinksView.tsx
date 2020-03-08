/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Linking } from "react-native";
import { SettingsScrollView } from "../../styles/components/settings";
import { ButtonCell, Section, TableView } from "../../styles/components/tableview";
import { openLinkInBrowserAlert } from "../../util/alerts";
import withHaptics from "../../util/withHaptics";

/** A view containing many links */
export default function LinksView() {
    const openLink = (link: string) =>
        withHaptics(() => openLinkInBrowserAlert(() => Linking.openURL(link)));

    return (
        <SettingsScrollView>
            <TableView>
                <Section header="Help">
                    <ButtonCell
                        title="Feedback Discord Server"
                        onPress={openLink("https://discord.gg/7q3TxUH")}
                    />
                    <ButtonCell
                        title="Feedback Email"
                        onPress={openLink("mailto:feedback@whs.dusterthefirst.com")}
                    />
                </Section>
                <Section header="Legal">
                    <ButtonCell
                        title="License"
                        onPress={openLink("https://github.com/DusterTheFirst/whs.js/blob/master/LICENSE")}
                    />
                    <ButtonCell
                        title="Privacy Policy"
                        onPress={openLink("https://whs.dusterthefirst.com/PRIVACY")}
                    />
                </Section>
                <Section header="Other">
                    <ButtonCell
                        title="Service Status"
                        onPress={openLink("https://status.whs.dusterthefirst.com/")}
                    />
                    <ButtonCell
                        title="Source Code"
                        onPress={openLink("https://github.com/DusterTheFirst/whs.js")}
                    />
                    <ButtonCell
                        title="Changelog"
                        onPress={openLink("https://whs.dusterthefirst.com/CHANGELOG")}
                    />
                </Section>
            </TableView>
        </SettingsScrollView>
    );
}