import { useState } from "react";
import { Text, View, Pressable, Animated } from "react-native";
import * as Haptics from "expo-haptics";

const suggestions: string[] = [
  "10 dakika yürüyüş yap",
  "1 sayfa kitap oku",
  "Birine mesaj at",
  "Bir bardak su iç",
  "Masanı toparla",
  "Sevdiğin bir şarkıyı aç",
  "Bugün yeni bir kahve dene",
  "Kısa bir meditasyon yap",
  "Günlük planını gözden geçir",
  "En sevdiğin filmi 10 dakika izle",
];

export default function HomeScreen() {
  const [currentSuggestion, setCurrentSuggestion] = useState<string>(
    "Bugün ne yapmak istersin?"
  );
  const [fadeAnim] = useState(new Animated.Value(1));
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const index = Math.floor(Math.random() * suggestions.length);
    setCurrentSuggestion(suggestions[index]);
  };

  return (
    <View className="flex-1 bg-slate-900 px-6 justify-center">
      <View className="mb-10">
        <Text
          className="text-4xl md:text-5xl text-orange-400 font-bold text-center"
          style={{ fontFamily: "Inter_700Bold" }}
        >
          Bugün Ne Yapalım?
        </Text>
      </View>

      <Animated.View
        className="mb-10"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Text
          className="text-xl md:text-2xl text-slate-100 text-center leading-relaxed"
          style={{ fontFamily: "Inter_400Regular" }}
        >
          {currentSuggestion}
        </Text>
      </Animated.View>

      <View className="items-center">
        <Pressable
          onPress={handlePress}
          className="w-full max-w-xs rounded-2xl bg-orange-500 active:bg-orange-600 py-4 px-6 items-center shadow-lg"
        >
          <Text
            className="text-lg md:text-xl text-slate-900"
            style={{ fontFamily: "Inter_700Bold" }}
          >
            Ne Yapalım?
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
