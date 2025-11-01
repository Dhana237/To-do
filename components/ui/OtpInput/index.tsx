// OTPInput.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  focusedInputStyle?: TextStyle;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 4,
  onComplete,
  autoFocus = true,
  disabled = false,
  secureTextEntry = false,
  style,
  inputStyle,
  focusedInputStyle,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    // Initialize the ref array
    inputsRef.current = inputsRef.current.slice(0, length);
    
    if (autoFocus && inputsRef.current[0]) {
      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 100);
    }
  }, [autoFocus, length]);

  const handleChange = (text: string, index: number) => {
    if (disabled) return;

    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');
    
    if (numericText.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = numericText;
      setOtp(newOtp);

      // Auto-focus next input
      if (numericText && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
        setFocusedIndex(index + 1);
      }

      // Check if OTP is complete
      const otpString = newOtp.join('');
      if (otpString.length === length && onComplete) {
        onComplete(otpString);
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputsRef.current[index - 1]?.focus();
        setFocusedIndex(index - 1);
      } else if (otp[index]) {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(-1);
  };

  const handlePress = () => {
    // Find first empty input and focus it
    const firstEmptyIndex = otp.findIndex(digit => digit === '');
    if (firstEmptyIndex !== -1) {
      inputsRef.current[firstEmptyIndex]?.focus();
    } else {
      inputsRef.current[length - 1]?.focus();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, style]}>
        {otp.map((digit, index) => (
          <View key={index} style={styles.inputWrapper}>
            <TextInput
              ref={(ref) => {
                inputsRef.current[index] = ref;
              }}
              style={[
                styles.input,
                inputStyle,
                focusedIndex === index && [styles.focusedInput, focusedInputStyle],
                disabled && styles.disabledInput,
              ]}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              keyboardType="number-pad"
              maxLength={1}
              secureTextEntry={secureTextEntry}
              editable={!disabled}
              selectTextOnFocus={!disabled}
              contextMenuHidden={true}
              caretHidden={false}
              onPressIn={handlePress}
            />
          </View>
        ))}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputWrapper: {
    marginHorizontal: 8, // Add spacing between inputs
  },
  input: {
    width: 77,
    height: 77,
    borderWidth: 1,
    fontFamily:"UbuntuMedium",
    borderColor: '#934790',
    borderRadius: 38,
    textAlign: 'center',
    fontSize: 32, 
    fontWeight: '600',
    color: '#6A0066', // Using your theme color
    backgroundColor: '#FFF5E7',
  },
  focusedInput: {
    borderColor: '#6A0066', // Using your theme color
    shadowColor: '#934790',
    borderWidth:2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledInput: {
    backgroundColor: '#F5F5F5',
    color: '#999',
    borderColor: '#CCC',
  },
});

export default OTPInput;