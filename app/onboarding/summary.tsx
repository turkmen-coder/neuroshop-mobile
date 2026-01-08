import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useOnboarding } from "@/lib/onboarding-provider";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export default function SummaryScreen() {
  const router = useRouter();
  const { profile, completeOnboarding } = useOnboarding();

  const handleComplete = async () => {
    await completeOnboarding();
    
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    router.replace("/(tabs)" as any);
  };

  const getDominantTrait = () => {
    if (!profile) return "Dengeli";
    
    const traits = {
      openness: { score: profile.openness, label: "Yenilikçi" },
      conscientiousness: { score: profile.conscientiousness, label: "Düzenli" },
      extraversion: { score: profile.extraversion, label: "Sosyal" },
      agreeableness: { score: profile.agreeableness, label: "Uyumlu" },
      neuroticism: { score: profile.neuroticism, label: "Duygusal" },
    };
    
    const dominant = Object.entries(traits).reduce((a, b) => 
      a[1].score > b[1].score ? a : b
    );
    
    return dominant[1].label;
  };

  const bodyTypeLabel = {
    slim: "Slim (İnce/Atletik)",
    regular: "Regular (Normal)",
    oversize: "Oversize (Geniş/Rahat)",
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        <View className="flex-1 gap-6">
          {/* Progress */}
          <View className="flex-row gap-2">
            <View className="flex-1 h-1 bg-primary rounded-full" />
            <View className="flex-1 h-1 bg-primary rounded-full" />
            <View className="flex-1 h-1 bg-primary rounded-full" />
          </View>

          {/* Title */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              Profilin Hazır!
            </Text>
            <Text className="text-base text-muted">
              Sana özel öneriler hazırladık
            </Text>
          </View>

          {/* Summary Card */}
          <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
            {/* Physical Info */}
            <View className="gap-3">
              <Text className="text-lg font-semibold text-foreground">
                Fiziksel Bilgiler
              </Text>
              <View className="flex-row gap-4">
                <View className="flex-1 bg-background rounded-xl p-4">
                  <Text className="text-sm text-muted">Boy</Text>
                  <Text className="text-2xl font-bold text-foreground mt-1">
                    {profile?.height} cm
                  </Text>
                </View>
                <View className="flex-1 bg-background rounded-xl p-4">
                  <Text className="text-sm text-muted">Kilo</Text>
                  <Text className="text-2xl font-bold text-foreground mt-1">
                    {profile?.weight} kg
                  </Text>
                </View>
              </View>
              <View className="bg-background rounded-xl p-4">
                <Text className="text-sm text-muted">Tercih Edilen Kesim</Text>
                <Text className="text-lg font-semibold text-foreground mt-1">
                  {profile?.bodyType && bodyTypeLabel[profile.bodyType]}
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View className="h-px bg-border" />

            {/* Style Profile */}
            <View className="gap-3">
              <Text className="text-lg font-semibold text-foreground">
                Stil Profili
              </Text>
              <View className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                <Text className="text-sm text-primary/80">Dominant Özellik</Text>
                <Text className="text-2xl font-bold text-primary mt-1">
                  {getDominantTrait()}
                </Text>
              </View>
              <Text className="text-sm text-muted leading-relaxed">
                Kişilik analizine göre senin için en uygun kıyafetleri seçtik. Alışverişe başladığında size özel öneriler göreceksin.
              </Text>
            </View>
          </View>

          {/* Features */}
          <View className="gap-3">
            <View className="flex-row gap-3 items-start">
              <View className="w-8 h-8 rounded-full bg-success/20 items-center justify-center">
                <Text className="text-success text-lg">✓</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">
                  Kişiselleştirilmiş Öneriler
                </Text>
                <Text className="text-sm text-muted mt-1">
                  Bedenine ve kişiliğine uygun ürünler
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3 items-start">
              <View className="w-8 h-8 rounded-full bg-success/20 items-center justify-center">
                <Text className="text-success text-lg">✓</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">
                  Akıllı Eşleştirme
                </Text>
                <Text className="text-sm text-muted mt-1">
                  Yapay zeka destekli stil analizi
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3 items-start">
              <View className="w-8 h-8 rounded-full bg-success/20 items-center justify-center">
                <Text className="text-success text-lg">✓</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">
                  Zaman Tasarrufu
                </Text>
                <Text className="text-sm text-muted mt-1">
                  Sana uygun ürünleri hızlıca bul
                </Text>
              </View>
            </View>
          </View>

          {/* Spacer */}
          <View className="flex-1" />

          {/* Complete Button */}
          <TouchableOpacity
            onPress={handleComplete}
            className="w-full bg-primary rounded-full py-4 px-8 active:opacity-80"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Alışverişe Başla
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
