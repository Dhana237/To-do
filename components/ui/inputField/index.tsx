import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  onLeftIconPress?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  leftIcon,
  rightIcon,
  onRightIconPress,
  onLeftIconPress,
  ...textInputProps
}) => {
  return (
      <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      
      <View style={styles.inputContainer}>
        {leftIcon && (
          <TouchableOpacity 
            style={styles.leftIcon}
            onPress={onLeftIconPress}
            disabled={!onLeftIconPress}
          >
            {leftIcon}
          </TouchableOpacity>
        )}
        
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : undefined,
            rightIcon ? styles.inputWithRightIcon : undefined,
            inputStyle,
            error ? styles.inputError : undefined,
          ]}
          placeholderTextColor="#999"
          {...textInputProps}
        />
        
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    fontFamily:"UbuntuRegular",
    color: '#6A0066',
  },
    inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#6A0066',
    borderRadius: 22,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily:"UbuntuRegular",
    backgroundColor: '#fff',
    flex:1
  },
   inputWithLeftIcon: {
    paddingLeft: 40, // Space for left icon
  },
  inputWithRightIcon: {
    paddingRight: 40, // Space for right icon
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  error: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
  },
   leftIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
    padding: 4,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
    padding: 4,
  },
});

export default Input;