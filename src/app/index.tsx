import {Text} from "@/components/ui/text";
import {View} from "react-native";

export default function HomeScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl font-bold text-red-500 hover:text-blue-500">
                Welcome to Nativewind!
            </Text>
        </View>
    );
}
