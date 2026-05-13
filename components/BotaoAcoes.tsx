import { AppTheme } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Text,
  useTheme,
} from "react-native-paper";

const BotaoAcoes = ({ onPress }: any) => {
  const theme = useTheme<AppTheme>();

  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const opcoes = [
    {
      icon: "pill",
      label: "Menstruação",
      color: "#c52222",
      background: "#ffeeee",
      style: styles.leftOption,
    },

    {
      icon: "clipboard-pulse-outline",
      label: "Sintomas",
      color: "#366600",
      background: "#ebffd4",
      style: styles.centerOption,
    },

    {
      icon: "emoticon-happy-outline",
      label: "Humor",
      color: "#F59E0B",
      background: "#FFF4DB",
      style: styles.rightOption,
    },
  ];

  return (
    <View style={styles.container}>
      {/* MENU */}
      {menuAberto && (
        <View style={styles.menuContainer}>
          {opcoes.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              style={[styles.optionWrapper, item.style]}
              onPress={() => {
                console.log(item.label);
                setMenuAberto(false);
              }}
            >
              <View
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: item.background,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={22}
                  color={item.color}
                />
              </View>

              <Text style={styles.optionText}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* BOTÃO PRINCIPAL */}
      <TouchableOpacity
        style={styles.customButtonContainer}
        activeOpacity={0.9}
        onPress={() => {
          toggleMenu();

          if (onPress) {
            onPress();
          }
        }}
      >
        <View
          style={[
            styles.customButton,
            {
              backgroundColor: theme.colors.primary,
              shadowColor: theme.colors.primary,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={menuAberto ? "close" : "plus"}
            size={34}
            color="#FFF"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  /* MENU */

  menuContainer: {
    position: "absolute",
    width: 180,
    height: 120,
    bottom: 58,
    alignItems: "center",
    justifyContent: "center",
  },

  optionWrapper: {
    position: "absolute",
    alignItems: "center",
    width: 72,
  },

  optionButton: {
    width: 54,
    height: 54,
    borderRadius: 27,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  optionText: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: "600",
    color: "#555",
    textAlign: "center",
  },

  /* POSIÇÕES */

  leftOption: {
    left: 0,
    top: 28,
  },

  centerOption: {
    top: -4,
  },

  rightOption: {
    right: 0,
    top: 28,
  },

  /* FAB */

  customButtonContainer: {
    top: -14,
    justifyContent: "center",
    alignItems: "center",
  },

  customButton: {
    width: 70,
    height: 70,
    borderRadius: 35,

    justifyContent: "center",
    alignItems: "center",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default BotaoAcoes;