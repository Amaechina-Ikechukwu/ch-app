import React, { useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View as Box,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { View } from "../Themed";
import Colors from "../../constants/Colors";

interface Camp {
  id: string,
  state: string,
  address: string,
  status: string

}

interface Props {
  data: Camp[];
}

const ListOfCamps = ({ data, onClose, selectCamp }: { data: any, onClose: () => void, selectCamp: (camp: any) => void }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const color = useColorScheme() ?? 'light'
  const select = (item: Camp) => {
    selectCamp(item)
    setSelectedItem(item.id)
    onClose()

  }
  const renderItem = ({ item }: { item: Camp }) => {
    return (
      <TouchableOpacity onPress={() => select(item)}>
        <View
          style={[styles.item, selectedItem === item.id && styles.selectedItem]}
        >
          <Text>{item.address}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={selectedItem} contentContainerStyle={{ gap: 20, backgroundColor: Colors[color].background }}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc", alignItems: 'flex-start'
  },
  selectedItem: {
    backgroundColor: "lightblue",
  },
});

export default ListOfCamps;
