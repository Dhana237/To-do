import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Text as DefaultText,
  TextProps as DefaultTextProps,
  StyleProp,
  TextStyle,
} from 'react-native';

type FontWeight = 'light' | 'regular' | 'medium' | 'bold';
type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';

export interface TypographyProps extends DefaultTextProps {
  variant?: FontWeight;
  align?: TextAlign;
  color?: string;       // Manual color (hex or color name)
  size?: number;
  lineHeight?: number;
  gradient?: boolean;   // Optional gradient text
  gradientColors?: string[]; // Add this if you still want manual gradient
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'regular',
  align,
  color = '#000', // Default black
  size,
  lineHeight,
  style,
  gradient = false,
  gradientColors = ['#FF7E5F', '#FEB47B'], // Default gradient if used
  ...props
}) => {
  const fontFamily = {
    light: 'UbuntuLight',
    regular: 'UbuntuRegular',
    medium: 'UbuntuMedium',
    bold: 'UbuntuBold',
  }[variant];

  const textStyle: StyleProp<TextStyle> = [
    { fontFamily },
    align ? { textAlign: align } : undefined,
    !gradient ? { color } : undefined,
    size != null ? { fontSize: size } : undefined,
    lineHeight != null ? { lineHeight } : undefined,
    style,
  ];

  if (gradient) {
    return (
      <MaskedView maskElement={<DefaultText {...props} style={textStyle} />}>
        <LinearGradient
          colors={gradientColors as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <DefaultText {...props} style={[textStyle, { opacity: 0 }]}>
            {props.children}
          </DefaultText>
        </LinearGradient>
      </MaskedView>
    );
  }

  return <DefaultText {...props} style={textStyle} />;
};

// Variants
export const LightText = (props: TypographyProps) => <Typography variant="light" {...props} />;
export const RegularText = (props: TypographyProps) => <Typography variant="regular" {...props} />;
export const MediumText = (props: TypographyProps) => <Typography variant="medium" {...props} />;
export const BoldText = (props: TypographyProps) => <Typography variant="bold" {...props} />;

