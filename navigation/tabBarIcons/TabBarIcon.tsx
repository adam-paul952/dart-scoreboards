/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const TabBarIconRules = (props: {
  name: React.ComponentProps<typeof Entypo>["name"];
  color: string;
}) => {
  return <Entypo size={30} style={{ marginBottom: -3 }} {...props} />;
};

const TabBarIconHome = (props: {
  name: React.ComponentProps<typeof Foundation>["name"];
  color: string;
}) => {
  return <Foundation size={30} style={{ marginBottom: -3 }} {...props} />;
};

const TabBarIconSettings = (props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) => {
  return <Ionicons size={30} {...props} />;
};

export { TabBarIconHome, TabBarIconRules, TabBarIconSettings };
