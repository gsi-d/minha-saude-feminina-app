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
    },

    {
      icon: "clipboard-pulse-outline",
      label: "Sintomas",
      color: "#366600",
      background: "#ebffd4",
    },

    {
      icon: "emoticon-happy-outline",
      label: "Humor",
      color: "#F59E0B",
      background: "#FFF4DB",
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
              style={[styles.optionWrapper, { backgroundColor: item.background }]}
              onPress={() => {
                console.log(item.label);
                setMenuAberto(false);
              }}
            >
              <View style={[styles.iconWrapper, { backgroundColor: item.color }]}> 
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={18}
                  color="#FFF"
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

  menuContainer: {
    position: "absolute",
    width: 180,
    bottom: 88,
    alignItems: "center",
    justifyContent: "flex-end",
    rowGap: 8,
  },

  optionWrapper: {
    minWidth: 160,
    height: 56,
    borderRadius: 28,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  iconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: 'left',
  },

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

    shadowColor: "#000",

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