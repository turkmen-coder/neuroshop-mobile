import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  const handleStart = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/onboarding/biometric");
  };

  return (
    <ScreenContainer className="justify-center items-center p-6">
      <View className="flex-1 justify-center items-center gap-8 w-full max-w-md">
        {/* Logo Placeholder */}
        <View className="w-32 h-32 rounded-full bg-primary items-center justify-center">
          <Text className="text-6xl font-bold text-white">N</Text>
        </View>

        {/* Title */}
        <View className="items-center gap-3">
          <Text className="text-4xl font-bold text-foreground text-center">
            NEUROSHOP
          </Text>
          <Text className="text-lg text-muted text-center px-4">
            Bedenine ve Ruhuna Uyan Moda
          </Text>
        </View>

        {/* Description */}
        <View className="items-center gap-2 px-6">
          <Text className="text-base text-foreground text-center leading-relaxed">
            Yapay zeka destekli kişisel stil asistanınız. Fiziksel ölçüleriniz ve kişilik özelliklerinize göre size en uygun kıyafetleri buluyoruz.
          </Text>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          onPress={handleStart}
          className="w-full max-w-sm bg-primary rounded-full py-4 px-8 active:opacity-80"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Başla
          </Text>
        </TouchableOpacity>

        {/* Info */}
        <Text className="text-sm text-muted text-center px-8">
          Sadece birkaç adımda profilinizi oluşturun ve size özel önerilere ulaşın
        </Text>
      </View>
    </ScreenContainer>
  );
}
