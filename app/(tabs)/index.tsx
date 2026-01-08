import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useOnboarding } from "@/lib/onboarding-provider";

/**
 * Home Screen - NativeWind Example
 *
 * This template uses NativeWind (Tailwind CSS for React Native).
 * You can use familiar Tailwind classes directly in className props.
 *
 * Key patterns:
 * - Use `className` instead of `style` for most styling
 * - Theme colors: use tokens directly (bg-background, text-foreground, bg-primary, etc.); no dark: prefix needed
 * - Responsive: standard Tailwind breakpoints work on web
 * - Custom colors defined in tailwind.config.js
 */
export default function HomeScreen() {
  const router = useRouter();
  const { profile, loading } = useOnboarding();

  useEffect(() => {
    if (!loading && profile && !profile.onboardingCompleted) {
      router.replace("/onboarding" as any);
    }
  }, [loading, profile]);

  if (loading) {
    return (
      <ScreenContainer className="justify-center items-center">
        <ActivityIndicator size="large" color="#8B5CF6" />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-8">
          {/* Hero Section */}
          <View className="gap-3">
            <Text className="text-3xl font-bold text-foreground">NEUROSHOP</Text>
            <Text className="text-base text-muted">
              Sana Özel Öneriler
            </Text>
          </View>

          {/* Welcome Message */}
          {profile && (
            <View className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
              <Text className="text-sm text-primary/80">Hoş geldin!</Text>
              <Text className="text-lg font-semibold text-primary mt-1">
                Senin için {profile.height} cm / {profile.weight} kg ölçülerine uygun ürünler seçtik
              </Text>
            </View>
          )}

          {/* Coming Soon */}
          <View className="w-full bg-surface rounded-2xl p-6 border border-border items-center gap-3">
            <Text className="text-6xl">🎯</Text>
            <Text className="text-xl font-semibold text-foreground text-center">
              Ürünler Yolda!
            </Text>
            <Text className="text-sm text-muted text-center leading-relaxed">
              Yapay zeka destekli ürün önerileri çok yakında burada olacak. Kişiliğine ve bedenine en uygun kıyafetleri bulmak için hazırlanıyoruz.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
