/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, useColorScheme, View as DefaultView, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, KeyboardTypeOptions } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import Colors, { acccent, secondary } from '../constants/Colors';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string; inverse?: boolean
};
interface TextInputProps {
  placeholder: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  value: string | undefined;
  onChange: (text: string) => void; // Specify the argument type and return type
}
interface Viewing {
  inverse?: boolean
}
export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'] & Viewing;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  inverse = false // Default value for inverse
) {
  const theme = useColorScheme() ?? 'light';
  const targetTheme = inverse ? (theme === 'light' ? 'dark' : 'light') : theme;
  const colorFromProps = props[targetTheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[targetTheme][colorName];
  }
}




export function Text(props: TextProps) {
  const { style, lightColor, darkColor, inverse, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text', inverse);

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, inverse, ...otherProps } = props;

  const backgroundColor = useThemeColor({ light: inverse ? darkColor : lightColor, dark: inverse ? lightColor : darkColor }, 'background', inverse);

  return <DefaultView style={[{ backgroundColor, flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', }, style]} {...otherProps} >{otherProps.children}</DefaultView>;
}

export function CustomTextInput(props: TextInputProps) {
  const theme = useColorScheme() ?? 'light';
  return <TextInput placeholder={props.placeholder} keyboardType={props.keyboardType} value={props.value} onChangeText={props.onChange} style={{ backgroundColor: Colors[theme].tint, padding: 10, borderRadius: 10 }} />
}
export function CustomButton(props: any) {
  const { style, lightColor, darkColor, text, onPress, ...otherProps } = props;


  const backgroundColor = useThemeColor(
    {
      light: otherProps.inverse ? darkColor : lightColor,
      dark: otherProps.inverse ? lightColor : darkColor,
    },
    'background'
  );

  const randomWidth = useSharedValue(0);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  // const onPress = () => {
  //   randomWidth.value = withTiming(100, config);
  // };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${randomWidth.value}%`,
    };
  });

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: otherProps.isLoading ? secondary : acccent, width: '80%', justifyContent: 'center' },
        style,
      ]}
      onPress={onPress}
      disabled={otherProps.isLoading} // Disable button while loading
      {...otherProps}
    >
      <Animated.View style={[styles.animatedButton, animatedStyle]} />
      {otherProps.isLoading ? (
        <Text style={{ fontWeight: "400" }} >{'...loading'}</Text>
      ) : (
        <DefaultView style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}><Text style={{ fontWeight: "600", color: Colors.light.text, fontSize: 16, textAlign: 'center' }}>{otherProps.title}</Text><DefaultView style={{ position: 'absolute', right: 10 }}>{otherProps.endIcon}</DefaultView></DefaultView>

      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5, height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  animatedButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
  },

});