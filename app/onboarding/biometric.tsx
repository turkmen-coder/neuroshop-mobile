import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-provider";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export default function BiometricScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useOnboarding();
  
  const [height, setHeight] = useState(profile?.height?.toString() || "170");
  const [weight, setWeight] = useState(profile?.weight?.toString() || "70");
  const [bodyType, setBodyType] = useState<'slim' | 'regular' | 'oversize'>(profile?.bodyType || 'regular');

  const handleNext = async () => {
    const heightNum = parseInt(height);
    const weightNum = parseInt(weight);
    
    if (heightNum < 140 || heightNum > 210) {
      alert("Boy 140-210 cm arasında olmalıdır");
      return;
    }
    
    if (weightNum < 40 || weightNum > 150) {
      alert("Kilo 40-150 kg arasında olmalıdır");
      return;
    }
    
    await updateProfile({ height: heightNum, weight: weightNum, bodyType });
    
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    router.push("/onboarding/personality" as any);
  };

  const selectBodyType = (type: 'slim' | 'regular' | 'oversize') => {
    setBodyType(type);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        <View className="flex-1 gap-6">
          {/* Progress */}
          <View className="flex-row gap-2">
            <View className="flex-1 h-1 bg-primary rounded-full" />
            <View className="flex-1 h-1 bg-border rounded-full" />
            <View className="flex-1 h-1 bg-border rounded-full" />
          </View>

          {/* Title */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              Seni Tanıyalım
            </Text>
            <Text className="text-base text-muted">
              Fiziksel ölçülerin size en uygun bedenleri bulmamıza yardımcı olur
            </Text>
          </View>

          {/* Height Input */}
          <View className="gap-2">
            <Text className="text-base font-semibold text-foreground">
              Boy (cm)
            </Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground text-base"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              placeholder="170"
              placeholderTextColor="#9BA1A6"
            />
          </View>

          {/* Weight Input */}
          <View className="gap-2">
            <Text className="text-base font-semibold text-foreground">
              Kilo (kg)
            </Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground text-base"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholder="70"
              placeholderTextColor="#9BA1A6"
            />
          </View>

          {/* Body Type Selection */}
          <View className="gap-3">
            <Text className="text-base font-semibold text-foreground">
              Tercih Ettiğin Kesim
            </Text>
            <View className="gap-3">
              <TouchableOpacity
                onPress={() => selectBodyType('slim')}
                className={`p-4 rounded-xl border-2 ${bodyType === 'slim' ? 'border-primary bg-primary/10' : 'border-border bg-surface'}`}
              >
                <Text className={`text-base font-semibold ${bodyType === 'slim' ? 'text-primary' : 'text-foreground'}`}>
                  Slim (İnce/Atletik)
                </Text>
                <Text className="text-sm text-muted mt-1">
                  Vücuda oturan, dar kesim
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => selectBodyType('regular')}
                className={`p-4 rounded-xl border-2 ${bodyType === 'regular' ? 'border-primary bg-primary/10' : 'border-border bg-surface'}`}
              >
                <Text className={`text-base font-semibold ${bodyType === 'regular' ? 'text-primary' : 'text-foreground'}`}>
                  Regular (Normal)
                </Text>
                <Text className="text-sm text-muted mt-1">
                  Standart, rahat kesim
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => selectBodyType('oversize')}
                className={`p-4 rounded-xl border-2 ${bodyType === 'oversize' ? 'border-primary bg-primary/10' : 'border-border bg-surface'}`}
              >
                <Text className={`text-base font-semibold ${bodyType === 'oversize' ? 'text-primary' : 'text-foreground'}`}>
                  Oversize (Geniş/Rahat)
                </Text>
                <Text className="text-sm text-muted mt-1">
                  Bol, serbest kesim
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Spacer */}
          <View className="flex-1" />

          {/* Next Button */}
          <TouchableOpacity
            onPress={handleNext}
            className="w-full bg-primary rounded-full py-4 px-8 active:opacity-80"
          >
            <Text className="text-white text-lg font-semibold text-center">
              İleri
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
