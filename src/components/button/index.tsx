import React from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  PressableProps,
  ViewStyle,
  View,
} from 'react-native';

interface Props extends PressableProps {
  size?: ButtonSize;
  outline?: boolean;
  styleContainer?: ViewStyle;
  Icon?: any;
  title: string;
}

type ButtonSize = 'small' | 'big';

const Button = ({
  size = 'big',
  outline = false,
  styleContainer = {},
  title,
  Icon,
  ...props
}: Props) => {
  const height = size === 'big' ? 48 : 36;

  //Button Style
  const outlineStyle = outline && {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#000',
  };

  //Text Style

  return (
    <Pressable
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        ...styles.button,
        backgroundColor: 'gray',
        height: height,
        ...outlineStyle,
        ...styleContainer,
      }}
      onPress={() => {}}
      {...props}>
      {Icon && (
        <View style={styles.containerIcon}>
          <Icon />
        </View>
      )}
      <Text>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 48,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  text: {
    fontSize: 14,
  },
  containerIcon: {
    height: '100%',
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
});
