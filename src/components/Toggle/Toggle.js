import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export function Toggle({ title, children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(new Animated.Value(0));
  const [contentHeight, setContentHeight] = useState(0);

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(height, {
      toValue: isExpanded ? 0 : contentHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View className="overflow-hidden">
      <TouchableOpacity
        className="flex-row justify-between items-center p-4 bg-blue-400"
        onPress={toggleExpand}
      >
        <Text className="text-xl font-semibold text-white">{title}</Text>
        <Text className="text-xl text-white">{isExpanded ? (
          <AntDesign name="caretup" size={18} color="white" />
        ) : (
          <AntDesign name="caretdown" size={18} color="white" />
        )}</Text>
      </TouchableOpacity>

      <Animated.View style={[{ height }, { overflow: 'hidden' }]}>
        <View className="p-4 bg-blue-500 min-h-80" onLayout={onLayout}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}
