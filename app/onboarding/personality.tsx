import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-provider";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

interface Question {
  id: number;
  question: string;
  optionA: { text: string; trait: keyof PersonalityScores; value: number };
  optionB: { text: string; trait: keyof PersonalityScores; value: number };
}

interface PersonalityScores {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Bir partiye giderken hangi kıyafeti tercih edersin?",
    optionA: { text: "Parlak renkli, dikkat çekici bir ceket", trait: "extraversion", value: 80 },
    optionB: { text: "Sade, klasik bir kazak", trait: "extraversion", value: 30 },
  },
  {
    id: 2,
    question: "Günlük kıyafetinde en önemli olan nedir?",
    optionA: { text: "Düzenli, ütülü ve temiz görünüm", trait: "conscientiousness", value: 80 },
    optionB: { text: "Rahat ve serbest hissetmek", trait: "conscientiousness", value: 30 },
  },
  {
    id: 3,
    question: "Yeni bir stil denemek konusunda nasıl hissedersin?",
    optionA: { text: "Heyecan verici! Renkli ve özgün parçalar severim", trait: "openness", value: 80 },
    optionB: { text: "Klasik ve zamansız parçaları tercih ederim", trait: "openness", value: 30 },
  },
  {
    id: 4,
    question: "Kıyafet alırken nelere dikkat edersin?",
    optionA: { text: "Sürdürülebilir ve etik üretim", trait: "agreeableness", value: 80 },
    optionB: { text: "Trend ve performans", trait: "agreeableness", value: 30 },
  },
  {
    id: 5,
    question: "Hangi tarz kıyafetlerde kendini daha rahat hissedersin?",
    optionA: { text: "Geniş, yumuşak ve saran kıyafetler", trait: "neuroticism", value: 70 },
    optionB: { text: "Fit ve yapılandırılmış kıyafetler", trait: "neuroticism", value: 30 },
  },
];

export default function PersonalityScreen() {
  const router = useRouter();
  const { updateProfile } = useOnboarding();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<PersonalityScores>({
    openness: 50,
    conscientiousness: 50,
    extraversion: 50,
    agreeableness: 50,
    neuroticism: 50,
  });

  const handleAnswer = async (option: 'A' | 'B') => {
    const question = questions[currentQuestion];
    const selected = option === 'A' ? question.optionA : question.optionB;
    
    // Update scores
    const newScores = { ...scores, [selected.trait]: selected.value };
    setScores(newScores);
    
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Move to next question or finish
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save personality scores
      await updateProfile(newScores);
      router.push("/onboarding/summary" as any);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        <View className="flex-1 gap-6">
          {/* Progress */}
          <View className="gap-2">
            <View className="flex-row gap-2">
              <View className="flex-1 h-1 bg-primary rounded-full" />
              <View className="flex-1 h-1 bg-primary rounded-full" />
              <View className="flex-1 h-1 bg-border rounded-full" />
            </View>
            <Text className="text-sm text-muted text-right">
              {currentQuestion + 1} / {questions.length}
            </Text>
          </View>

          {/* Title */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              Stilini Keşfet
            </Text>
            <Text className="text-base text-muted">
              Hangi kıyafetler seni daha iyi hissettirir?
            </Text>
          </View>

          {/* Question */}
          <View className="bg-surface rounded-2xl p-6 border border-border">
            <Text className="text-lg font-semibold text-foreground leading-relaxed">
              {question.question}
            </Text>
          </View>

          {/* Options */}
          <View className="gap-4">
            <TouchableOpacity
              onPress={() => handleAnswer('A')}
              className="bg-surface border-2 border-border rounded-2xl p-6 active:border-primary active:bg-primary/5"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full border-2 border-border items-center justify-center">
                  <Text className="text-base font-bold text-foreground">A</Text>
                </View>
                <Text className="flex-1 text-base text-foreground leading-relaxed">
                  {question.optionA.text}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleAnswer('B')}
              className="bg-surface border-2 border-border rounded-2xl p-6 active:border-primary active:bg-primary/5"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full border-2 border-border items-center justify-center">
                  <Text className="text-base font-bold text-foreground">B</Text>
                </View>
                <Text className="flex-1 text-base text-foreground leading-relaxed">
                  {question.optionB.text}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Spacer */}
          <View className="flex-1" />

          {/* Info */}
          <Text className="text-sm text-muted text-center">
            Doğru ya da yanlış cevap yok. Sadece senin için en uygun olanı seç.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
