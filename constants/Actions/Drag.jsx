import React, { useRef } from "react";
import { View, PanResponder, StyleSheet, Animated } from "react-native";

const DraggableBox = () => {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      // You can add any logic here for when the dragging ends
    },
  });

  const transformStyle = {
    transform: [{ translateX: pan.x }, { translateY: pan.y }],
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.box, transformStyle]}
    />
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
  },
});

export default DraggableBox;
