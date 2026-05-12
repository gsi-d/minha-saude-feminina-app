import { AppTheme } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

const BotaoAcoes = ({ onPress }: any) => {
  const theme = useTheme<AppTheme>();

  return (
    <TouchableOpacity
      style={styles.customButtonContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View 
        style={[
          styles.customButton, 
          { 
            backgroundColor: theme.colors.primary,
            shadowColor: theme.colors.primary 
          }
        ]}
      >
        <MaterialCommunityIcons
          name="plus"
          size={32}
          color="#FFF" 
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customButtonContainer: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  customButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default BotaoAcoes;