import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const HashTagComponent = ({ hashTag }) => (
    <TouchableOpacity style={styles.hashTagWrapper}>
        <Text style={styles.hashTagText}>#{hashTag}</Text>
    </TouchableOpacity>
);

const HashTags=({tagList})=>(
    <View style={styles.hashTagContainer}>
        {tagList.map((hashTag, index) => (
            <HashTagComponent key={index} hashTag={hashTag} />
        ))}
    </View>     
)


const styles = StyleSheet.create({
    hashTagContainer:{
        flexDirection: 'row', 
        gap:6
    },
        hashTagWrapper:{
            backgroundColor:'#F3F3F3',
            padding:5,
            borderRadius:5,
        },
        hashTagText:{
            fontSize: 14,
            lineHeight: 20.27,
            letterSpacing: -0.03,
            textAlign: 'left'
        },

      })
export default HashTags;