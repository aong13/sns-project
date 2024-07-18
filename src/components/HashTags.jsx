import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const HashTagComponent = ({ hashTag, onDelete }) => (
  <TouchableOpacity 
    activeOpacity={0.8}
    style={styles.hashTagWrapper}
    onPress={() => onDelete && onDelete(hashTag)}
  >
    <Text style={styles.hashTagText}>{`# ${hashTag}`}</Text>
  </TouchableOpacity>
);

const HashTags = ({ tagList, onDelete }) => (
  <View style={styles.hashTagContainer}>
    {tagList && tagList.map((hashTag, index) => (
      <HashTagComponent key={index} hashTag={hashTag} onDelete={onDelete} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  hashTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  hashTagWrapper: {
    backgroundColor: '#F3F3F3',
    padding: 5,
    borderRadius: 5,
  },
  hashTagText: {
    fontSize: 14,
    lineHeight: 20.27,
    letterSpacing: -0.03,
    textAlign: 'left'
  },
});

export default HashTags;
