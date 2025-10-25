import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import {
    ActivityIndicator,
    GestureResponderEvent,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { BoldText } from '../Typography';



type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

interface CustomButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?:
  | "primary"
  | "secondary"
  | "white"
  | "disabledGreen"
  | "dull"
  | "negative"
  | "outline"
  | "outlineActive"
  | "text"
  | "icon"
  | "glassy"
  | "disabled";
  size?: "xs" | "small" | "post" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  pressDisabled?: boolean;
  iconLeft?: React.ReactNode | MaterialIconName;
  iconRight?: React.ReactNode | MaterialIconName;
  icon?: React.ReactNode | MaterialIconName;
  iconColor?: string;
  buttonStyle?: ViewStyle | any;
  textStyle?: TextStyle;
  loaderColor?: string;
  iconSize?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  pressDisabled = false,
  iconLeft,
  iconRight,
  icon,
  iconColor,
  buttonStyle,
  textStyle,
  loaderColor = "#fff",
  iconSize = 24,
}) => {
  

  // Determine the effective variant based on disabled state
  const effectiveVariant = disabled ? "disabled" : variant;


  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: effectiveVariant === "icon" ? 40 : 8,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 52,
      paddingVertical: 16,
      paddingHorizontal: 32,
    };

    const sizeStyles: Record<string, ViewStyle> = {
      xs: { paddingVertical: 8, paddingHorizontal: 16, height: 32 },
      small: { paddingVertical: 0, paddingHorizontal: 0, height: 36, borderRadius: 4 },
      post: { paddingVertical: 0, paddingHorizontal: 0, height: 40, borderRadius: 8 },
      medium: { paddingVertical: 0, paddingHorizontal: 0, height: 52 },
      large: { paddingVertical: 20, paddingHorizontal: 40, height: 60, borderRadius:48, margin:12 },
    };

    const variantStyles: Record<string, ViewStyle> = {
      primary: { backgroundColor: "#FF0067" },
      secondary: { borderWidth:1, borderColor:"#6A0066" },
      disabledGreen: { backgroundColor: "#E8F0F3" },
      glassy: { backgroundColor: "#000000A1" },
      white: { backgroundColor: "#fff" },
      dull: { backgroundColor: "rgba(255,255,255,0.24)" },
      negative: { backgroundColor: '#DF4848' },
      outline: { backgroundColor: "transparent", borderWidth: 2, borderColor: "#C0A9C7" },
      outlineActive: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#007AFF" },
      text: { backgroundColor: "transparent" },
      icon: { width: 52, paddingHorizontal: 0, justifyContent: "center", alignItems: "center" },
      disabled: { backgroundColor: "rgba(255, 255, 255, 0.48)" },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[effectiveVariant],
    };
  };

  const getTextStyles = (): TextStyle => {
    const sizeFonts: Record<string, number> = {
      xs: 16,
      small: 14,
      post: 16,
      medium: 16,
      large: 16,
    };

    const variantTextColors: Record<string, string> = {
      primary: '#fff',
      secondary: '#6A0066',
      disabledGreen: '#71717A',
      glassy: '#ffffff',
      white: '#622774',
      dull: '#fff',
      negative: '#fff',
      outline: '#000',
      outlineActive: '#007AFF',
      text: '#000',
      icon: '#007AFF',
      disabled: '#71717A',
    };

    return {
      fontSize: sizeFonts[size],
      color: variantTextColors[effectiveVariant],
      marginLeft: iconLeft ? 8 : 0,
      marginRight: iconRight ? 8 : 0,
    };
  };

  const getIconColor = () => {
    if (iconColor) return iconColor;
    if (effectiveVariant === "disabled") return "#71717A";
    if (effectiveVariant === "text" || effectiveVariant === "icon") return "#ffffff";
    if (effectiveVariant === "primary" || effectiveVariant === "secondary") return "#fff";
    return "#FFFFFF";
  };

  const renderIcon = (iconProp: React.ReactNode | MaterialIconName) => {
    if (React.isValidElement(iconProp)) {
      return iconProp;
    } else if (typeof iconProp === "string") {
      return <MaterialIcons name={iconProp as MaterialIconName} size={iconSize} color={getIconColor()} />;
    }
    return null;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={pressDisabled || loading || disabled}
      style={[getButtonStyles(), buttonStyle]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <>
          {icon && effectiveVariant === "icon" ? (
            renderIcon(icon)
          ) : (
            <>
              {iconLeft && (
                renderIcon(iconLeft)
              )}
              {title && <BoldText style={[getTextStyles(), textStyle]}>{title}</BoldText>}
              {iconRight && (
                renderIcon(iconRight)
              )}
            </>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;