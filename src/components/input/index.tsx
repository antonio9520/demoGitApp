import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Animated,
  TextInputProps,
} from 'react-native';

interface Props extends TextInputProps {
  isSuccess?: boolean;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
}

const TextInputComponent = ({
  error = false,
  errorMessage = '',
  placeholder,
}: Props) => {
  const [value, setValue] = React.useState('');
  const moveText = React.useRef(new Animated.Value(0)).current;
  const moveInput = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (value !== '') {
      moveTextTop();
      moveInputBottom();
    } else if (value === '') {
      moveTextBottom();
      moveInputTop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onChangeText = (text: string) => {
    setValue(text);
  };

  const onFocusHandler = () => {
    moveTextTop();
    moveInputBottom();
  };

  const onBlurHandler = () => {
    if (value === '') {
      moveTextBottom();
      moveInputTop();
    }
  };

  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveInputBottom = () => {
    Animated.timing(moveInput, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveInputTop = () => {
    Animated.timing(moveInput, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  //Label animation
  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -7],
  });

  const xVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [1, -15],
  });

  const sizeLabel = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
      {
        translateX: xVal,
      },
    ],
  };

  const labelStyle = {
    transform: [
      {
        scale: sizeLabel,
      },
    ],
  };

  //input animation

  const yValInput = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 8],
  });

  const animInputStyle = {
    transform: [
      {
        translateY: yValInput,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.containerInput,
          backgroundColor: 'gray',
          borderWidth: error ? 1 : 0,
          borderColor: 'red',
        }}>
        <Animated.View style={[styles.animatedStyle, animStyle]}>
          <Animated.View style={labelStyle}>
            <Text
              style={{
                ...styles.label,
                color: 'gray',
              }}>
              {placeholder}
            </Text>
          </Animated.View>
        </Animated.View>
        <Animated.View style={animInputStyle}>
          <TextInput
            underlineColorAndroid="transparent"
            style={[styles.input, {color: 'gray'}]}
            value={value}
            onChangeText={(text: string) => onChangeText(text)}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            blurOnSubmit
          />
        </Animated.View>
      </View>
      {error && (
        <View style={{paddingHorizontal: 20, paddingTop: 4}}>
          <Text style={{color: 'green', fontSize: 11}}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  container: {width: '100%', marginVertical: 5},
  containerInput: {
    width: '100%',
    height: 64,
    borderRadius: 4,
    paddingHorizontal: 20,
    justifyContent: 'center',
    elevation: 2,
  },
  icon: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 14,
  },
  label: {
    color: 'grey',
    fontSize: 14,
  },
  animatedStyle: {
    top: 18,
    left: 20,
    position: 'absolute',
  },
  iconStyle: {width: 24, height: 24, position: 'absolute', right: 20},
});
