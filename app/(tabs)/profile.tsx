import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useOnboarding } from "@/lib/onboarding-provider";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, resetOnboarding } = useOnboarding();

  const handleResetOnboarding = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    await resetOnboarding();
    router.replace("/onboarding" as any);
  };

  const bodyTypeLabel = {
    slim: "Slim (İnce/Atletik)",
    regular: "Regular (Normal)",
    oversize: "Oversize (Geniş/Rahat)",
  };

  const getDominantTrait = () => {
    if (!profile) return { label: "Dengeli", score: 50, desc: "Dengeli kişilik" };
    
    const traits = {
      openness: { score: profile.openness, label: "Yenilikçi", desc: "Yeni deneyimlere açık" },
      conscientiousness: { score: profile.conscientiousness, label: "Düzenli", desc: "Organize ve planlı" },
      extraversion: { score: profile.extraversion, label: "Sosyal", desc: "Dışa dönük ve enerjik" },
      agreeableness: { score: profile.agreeableness, label: "Uyumlu", desc: "İşbirlikçi ve empatik" },
      neuroticism: { score: profile.neuroticism, label: "Duygusal", desc: "Hassas ve düşünceli" },
    };
    
    const dominant = Object.entries(traits).reduce((a, b) => 
      a[1].score > b[1].score ? a : b
    );
    
    return dominant[1];
  };

  const dominant = getDominantTrait();

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              Profilim
            </Text>
            <Text className="text-base text-muted">
              Kişisel bilgilerin ve stil profilin
            </Text>
          </View>

          {/* Physical Info Card */}
          <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
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

          {/* Personality Card */}
          <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
            <Text className="text-lg font-semibold text-foreground">
              Kişilik Profili
            </Text>
            <View className="bg-primary/10 rounded-xl p-4 border border-primary/20">
              <Text className="text-sm text-primary/80">Dominant Özellik</Text>
              <Text className="text-2xl font-bold text-primary mt-1">
                {dominant.label}
              </Text>
              {dominant.desc && (
                <Text className="text-sm text-primary/70 mt-2">
                  {dominant.desc}
                </Text>
              )}
            </View>

            {/* Personality Scores */}
            <View className="gap-3">
              <View className="gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-foreground">Yenilikçilik</Text>
                  <Text className="text-sm text-muted">{profile?.openness}%</Text>
                </View>
                <View className="h-2 bg-background rounded-full overflow-hidden">
                <View 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${profile?.openness || 0}%` }}
                />
                </View>
              </View>

              <View className="gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-foreground">Düzenlilik</Text>
                  <Text className="text-sm text-muted">{profile?.conscientiousness}%</Text>
                </View>
                <View className="h-2 bg-background rounded-full overflow-hidden">
                <View 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${profile?.conscientiousness || 0}%` }}
                />
                </View>
              </View>

              <View className="gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-foreground">Sosyallik</Text>
                  <Text className="text-sm text-muted">{profile?.extraversion}%</Text>
                </View>
                <View className="h-2 bg-background rounded-full overflow-hidden">
                <View 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${profile?.extraversion || 0}%` }}
                />
                </View>
              </View>

              <View className="gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-foreground">Uyumluluk</Text>
                  <Text className="text-sm text-muted">{profile?.agreeableness}%</Text>
                </View>
                <View className="h-2 bg-background rounded-full overflow-hidden">
                <View 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${profile?.agreeableness || 0}%` }}
                />
                </View>
              </View>

              <View className="gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-foreground">Duygusallık</Text>
                  <Text className="text-sm text-muted">{profile?.neuroticism}%</Text>
                </View>
                <View className="h-2 bg-background rounded-full overflow-hidden">
                <View 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${profile?.neuroticism || 0}%` }}
                />
                </View>
              </View>
            </View>
          </View>

          {/* Actions */}
          <TouchableOpacity
            onPress={handleResetOnboarding}
            className="w-full bg-surface border border-border rounded-xl py-4 px-6 active:opacity-70"
          >
            <Text className="text-foreground text-base font-semibold text-center">
              Profili Yeniden Oluştur
            </Text>
          </TouchableOpacity>

          {/* Info */}
          <View className="bg-surface/50 rounded-xl p-4 border border-border/50">
            <Text className="text-sm text-muted text-center leading-relaxed">
              Kişilik profilin, sana en uygun ürünleri önermemize yardımcı olur. Verileriniz sadece cihazınızda saklanır ve üçüncü taraflarla paylaşılmaz.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
