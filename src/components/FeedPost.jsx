import React from 'react';
import {Dimensions, View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const more_icon = require('../assets/icons/more.png');
const heart_fill_icon = require('../assets/icons/heart-fill.png');
const heart_icon = require('../assets/icons/heart.png');
const comment_icon = require('../assets/icons/comment.png');

const { width } = Dimensions.get('window');


const FeedPost = ({ id, profileImg, nickname, likeNum, commentNum, thumbnail, contents, navigation }) => {
    console.log("id: ", id);
    
    const handleImgPress = () => {
        console.log("클릭된 id: ", id);
        navigation.navigate('FeedDetail', { id }); //home으로부터 받은 id 전달
    }; 
    const handleLikePress = () => {
        //좋아요 클릭시 좋아요 색 변경
    };
    const handleCommentPress = () => {
        //댓글 아이콘 클릭시 댓글만 보이도록
    };
      
  return (
    <View style={styles.postContainer}>
    <View style={styles.postHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <TouchableOpacity>
            <Image source={{ uri: profileImg}} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={{ fontSize: 16, lineHeight: 19.97 }}>{nickname}</Text> 
        </TouchableOpacity>
        </View>
        <TouchableOpacity>
            <Image source={more_icon} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={() => handleImgPress()} >
        <Image 
            source={{ uri: thumbnail }} //첫번째만 가져오기!!
            style={styles.thumbnailImg}
            resizeMode='contain'/>
    </TouchableOpacity>
    <View style={styles.reactionsContainer}>
        <TouchableOpacity
            onPress={() => handleLikePress()}>
            <Image source={heart_icon} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => handleCommentPress()}>
            <Text>{likeNum}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Image source={comment_icon} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <Text>{commentNum}</Text>
    </View>
    <View style={styles.postContentContainer}>
        <Text>{nickname}</Text>
        <Text style={{color: '#4F4F4F' }}>{contents}</Text>
    </View>
</View>
  )
}


const styles = StyleSheet.create({
    postContainer:{
        paddingVertical: 24, 
        borderBottomWidth:0.2,
        borderBottomColor:'#d0d0d0',
        paddingBottom: 24, 
    },
    postHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 10 
    },
    thumbnailImg:{
        width: width-24, 
        height: width-24, 
        marginHorizontal: 12,
        borderRadius: 5
    },
    reactionsContainer:{
        flexDirection: 'row',
        gap:10,
        alignItems: 'center', 
        paddingHorizontal: 16, 
        paddingVertical: 8,
        borderBottomWidth:0.2,
        borderBottomColor:'#d0d0d0',
    },
    postContentContainer:{
        paddingVertical: 8,
        marginHorizontal: 16,
        gap: 4,
    }
});
export default FeedPost