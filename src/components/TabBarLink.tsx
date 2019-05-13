import { Link } from "react-router-native";
import { View, Text } from "react-native";
import TabBarIcon from "./TabBarIcon";
import useRouter from "use-react-router";

export default function TabBarLink() {
    const { location } = useRouter();

    return (
        <Link to="/settings">
            <View>
                <TabBarIcon name="cog" focused={location.pathname === "/settings"} />
                <Text>Settings</Text>
            </View>
        </Link>
    );
}