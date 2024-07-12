import { useState } from 'react';
import {View, Text, Image, TouchableOpacity,StyleSheet } from 'react-native';

const comment_icon = require('../../assets/icons/comment.png');
const heart_fill_icon = require('../../assets/icons/comment-heart-fill.png');
const heart_icon = require('../../assets/icons/comment-heart-outline.png');


export const CommentItem = ({ profileImg, nickname, comment, likeNum, replyNum, date }) => {
    const [isLiked, setIsLiked] = useState(false);
    
    const goToUserProfile = () => {
        //댓글 작성자의 프로필로 이동
    }
    const handleLikePress = () => {
        //좋아요 클릭시 좋아요 색 변경
        setIsLiked(!isLiked);
    };
    const handleCommentPress = () => {
        //대댓글 보기
    };
      
    return (
        <View style={styles.cmnt_Container}>
            <View style={styles.authorInfoWrapper}>
                <TouchableOpacity 
                style={{flexDirection: 'row', gap:10, alignItems: 'center'}} 
                onPress={()=>goToUserProfile()}>
                    <Image source={{ uri: profileImg }} style={{ width: 28, height: 28, borderRadius: 15 }} />
                    <Text style={styles.cmnt_Author}>{nickname}</Text>
                </TouchableOpacity>
                <Text style={styles.cmnt_Date}>{date}</Text>
            </View>
            <Text style={styles.cmnt_Text}>{comment}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <View style={styles.cmnt_ReactionWrapper}>
                        <TouchableOpacity
                        onPress={()=>handleLikePress()}
                        activeOpacity={0.7}>
                            <Image source={isLiked ? heart_fill_icon : heart_icon} style={{ width: 18, height: 18 }} />
                        </TouchableOpacity>
                        <Text>{likeNum}</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.cmnt_ReactionWrapper}
                        onPress={()=>handleCommentPress()}>  
                        <Image source={comment_icon} style={{ width: 18, height: 18 }} />
                        <Text>{replyNum}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Text>신고</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cmnt_Container : {
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderBottomWidth:0.2,
        borderColor:'#d0d0d0',
    },
    authorInfoWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cmnt_Author:{
        fontSize: 13,
        lineHeight: 19.97, 
        fontWeight: "bold",
        color: '#7B7B7B'   
    },
    cmnt_Text:{
        fontSize: 13,
        lineHeight: 19.97, 
        color: '#3A3A3A',   
        marginBottom: 10,
    },
    cmnt_Date:{
        fontSize: 12, 
        lineHeight: 19.97,
        color: '#A5A5A5',
    },
    cmnt_ReactionWrapper:{
        flexDirection: 'row', alignItems: 'center', gap:4
    }
});