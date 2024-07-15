import React, { useState } from 'react';
import { Dimensions, View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { baseURL } from '../apis/index';

const more_icon = require('../assets/icons/more.png');
const heart_fill_icon = require('../assets/icons/heart-fill.png');
const heart_icon = require('../assets/icons/heart.png');
const comment_icon = require('../assets/icons/comment.png');

const { width } = Dimensions.get('window');

const defaultProfileImage = require('../assets/images/blank_profile.png');

const FeedPost = ({ id, profileImg, nickname, likeNum, commentNum, thumbnail, contents, navigation }) => {
    const [isLiked, setIsLiked] = useState(false);

    const goToUserProfile = () => {
        // 댓글 작성자의 프로필로 이동
    };
    const handleLikePress = () => {
        // 좋아요 클릭시 좋아요 색 변경
        setIsLiked(!isLiked);
    };
    const handleImgPress = () => {
        navigation.navigate('FeedDetail', { id }); // home으로부터 받은 id 전달
    };
    const handleCommentPress = () => {
        // 댓글 아이콘 클릭시 댓글만 보이도록
    };

    // 프로필 이미지 없는 경우 처리
    const profileImageUrl = profileImg ? { uri: baseURL + profileImg } : defaultProfileImage;

    console.log("props:", profileImg); // profileImg의 값 확인
    console.log("img", profileImageUrl); // profileImageUrl의 값 확인

    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <TouchableOpacity>
                        <Image source={profileImageUrl} style={{ width: 32, height: 32, borderRadius: 16 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.nicknameText}>{nickname}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Image source={more_icon} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => handleImgPress()}
                activeOpacity={0.8}>
                <Image
                    source={{ uri: thumbnail }} // 첫번째만 가져오기!!
                    style={styles.thumbnailImg}
                    resizeMode='contain' />
            </TouchableOpacity>

            <View style={styles.reactionsContainer}>
                <View style={styles.reactionWrapper}>
                    <TouchableOpacity
                        onPress={() => handleLikePress()}>
                        <Image source={isLiked ? heart_fill_icon : heart_icon} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleCommentPress()}>
                        <Text>{likeNum}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.reactionWrapper}>
                    <TouchableOpacity>
                        <Image source={comment_icon} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                    <Text>{commentNum}</Text>
                </View>
            </View>
            <View style={styles.postContentContainer}>
                <Text style={styles.contentsText}>{contents}</Text>
                <Text style={styles.timeText}>{"2시간 전"}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        paddingVertical: 16,
        borderBottomWidth: 0.2,
        borderBottomColor: '#d0d0d0',
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    nicknameText: {
        fontSize: 14,
        fontWeight: "bold",
        lineHeight: 20.27,
        color: '#3A3A3A'
    },
    thumbnailImg: {
        width: width - 24,
        height: width - 24,
        marginHorizontal: 12,
        borderRadius: 5
    },
    reactionsContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginHorizontal: 16,
        paddingVertical: 8,
        marginTop: 4,
    },
    reactionWrapper: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    postContentContainer: {
        marginHorizontal: 20,
        gap: 6,
    },
    timeText: {
        fontSize: 13,
        lineHeight: 18.82,
        letterSpacing: 0.03,
        color: '#A5A5A5',
    },
    contentsText: {
        fontSize: 15,
        lineHeight: 21.72,
        letterSpacing: 0.03,
        textAlign: 'left',
        color: '#3A3A3A'
    },
});

export default FeedPost;
