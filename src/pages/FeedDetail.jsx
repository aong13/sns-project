import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import { CommentItem } from '../components/Comment/CommentItem';
import BasicHeader from '../components/BasicHeader';
import HashTags from '../components/HashTags';
import EmotionSelector from '../components/EmotionSelector'
import { getFeedDetail, postReply, postEmotion } from '../apis/Feed';
import { baseURL } from '../apis';
const { width } = Dimensions.get('window');

const more_icon = require('../assets/icons/more.png')

const scrab_icon = require('../assets/icons/scrab.png');
const scrab_fill_icon = require('../assets/icons/scrab_fill.png');
const share_icon = require('../assets/icons/share.png');
const back_icon = require('../assets/icons/back.png');
const imgUpload_icon = require('../assets/icons/image_upload.png');

const emotion_icon = require('../assets/icons/expression-outline.png');
const image_icon = require('../assets/icons/image_upload.png');

const comment_icon = require('../assets/icons/comment.png');

const heart_fill_icon = require('../assets/icons/comment-heart-fill.png');
const heart_icon = require('../assets/icons/comment-heart-outline.png');

const defaultProfileImage = require('../assets/images/blank_profile.png')


export const getEmotionIcon = (emotionType) => {
    switch (emotionType) {
        case 'ANGRY':
            return require('../assets/icons/emotion_angry.png');
        case 'FUNNY':
            return require('../assets/icons/emotion_funny.png');
        case 'GOOD':
            return require('../assets/icons/emotion_good.png');
        case 'SAD':
            return require('../assets/icons/emotion_sad.png');
        case 'SURPRISE':
            return require('../assets/icons/emotion_surprise.png');
        default:
            return require('../assets/icons/expression-outline.png');
    }
};

const FeedDetail = ({ route, navigation }) => {
    const { id } = route.params;
    const [feedDetail, setFeedDetail] = useState([]);
    const [emotions, setEmotions] = useState([]);
    const [replys, setReplys] = useState([]);
    const [replyValue, setReplyValue] = useState('');
    const [showEmotionSelector, setShowEmotionSelector] = useState(false); 
    const emotionBtnRef = useRef(null);
    //const [emotionBtnPosition, setEmotionBtnPosition] = useState();

    //API 호출 함수
    const getFeedDetailApi = async ({id}) => {
        const feedDetail = await getFeedDetail(id);
        setReplys(feedDetail.replys)
        setFeedDetail(feedDetail);
        setEmotions(feedDetail.emotions);
    };
    const addReplyApi = async({feedId, reply}) => {
        const res = await postReply(feedId, reply);
        console.log("댓글 작성 성공:", res)
        getFeedDetailApi({id})
    };
    const addEmotionApi = async({feedId, emotion}) => {
        const res = await postEmotion(feedId, emotion);
        console.log("감정 추가 성공:", res)
        getFeedDetailApi({id})
    };

    //첫 렌더링
    useEffect(() => {
        getFeedDetailApi({id});
    }, []);


    //감정선택
    const handleEmotionBtnPress = () => {
        // setEmotionBtnPosition(emotionBtnRef.current);
        // console.log(emotionBtnPosition)
        setShowEmotionSelector(true);
    };
    const handleEmotionSelect = (emotion) => {
        addEmotionApi({ feedId: id, emotion: emotion})
        setShowEmotionSelector(false); 
    };

    //댓글업로드/렌더링
    const handleReplySubmit = () => {
        addReplyApi({ feedId: id, reply: replyValue })
        setReplyValue("");
    };
    
    const renderReply = ({ item }) => (
        <CommentItem
            // profileImg={defaultProfileImage} //이미지 없음
            nickname={item.nickname}
            comment={item.reply}
            likeNum={item.likeNum || 0} // 임시
            replyNum={item.replyNum || 0} // 임시
            date={item.date}
        />
    );
    
    //캐러셀 미구현 
    const renderCarousel = ({ item, index }) => {
        console.log("renderCarousel: ", item);
        return (
            <Image
                source={{ uri: baseURL + item }}
                style={styles.thumbnailImg}
                resizeMode="contain"
            />
        );
    };
    
    //이미지처리(default, baseurL)
    const profileImageUrl = feedDetail.profileImagePath ? { uri: baseURL + feedDetail?.profileImagePath } : defaultProfileImage;
    const ImageUrl = feedDetail.images ? { uri: baseURL + feedDetail?.images[0] } : "";

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: 66 }}>
           
            <BasicHeader
                rightButtons={[{ icon: share_icon },{ icon: scrab_icon }]}
            />

            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.postHeader}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <TouchableOpacity>
                                    <Image source={profileImageUrl} style={styles.profileImg} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.nicknameText}>{feedDetail.nickname}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity>
                                <Image source={more_icon} style={{ width: 24, height: 24 }} />
                            </TouchableOpacity>
                        </View>

                        {/* <Carousel
                            data={feedDetail.images || []}
                            renderItem={renderCarousel}
                            sliderWidth={width}
                            itemWidth={width}
                        /> */}

                    {/** 캐러셀로 구현해보기 */}
                    <Image 
                        source= {ImageUrl}  
                        style={styles.thumbnailImg}
                        resizeMode='contain' />

                        <View style={styles.contentContainer}>
                            <Text styles={styles.timeText}> 30분 전 </Text>
                            <Text style={styles.contentsText}>{feedDetail.content}</Text>
                            <HashTags tagList={feedDetail.tags} />
                        </View>

                        <EmotionSelector
                            ref={emotionBtnRef}
                            isVisible={showEmotionSelector}
                            onSelectEmotion={handleEmotionSelect}
                            onClose={() => setShowEmotionSelector(false)}
                        />
                        <View style={styles.reactionsContainer}>
                            <ReactionButton onPress={handleEmotionBtnPress} text="표현하기" img={getEmotionIcon(emotions.emotionCheck)} />
                            <ReactionButton text="댓글" img={comment_icon} />
                            
                            <FeeedEmotions emotions={emotions}/>
                       </View>

                        <FlatList
                            data={replys}
                            renderItem={renderReply}
                            keyExtractor={item => item.id} // id를 문자열로 변환하여 사용
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.replyWrapper}>
                <TouchableOpacity onPress={() => {/** 사진 업로드 */ }}>
                    <Image source={imgUpload_icon} style={styles.iconBtn} />
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            value={replyValue}
                            onChangeText={setReplyValue}
                            placeholder="댓글을 입력하세요."
                            style={styles.inputStyle}
                        />
                        <TouchableOpacity onPress={handleReplySubmit}>
                            <Text style={styles.followButton}>작성</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );

};

const ReactionButton = ({ onPress, text, img }) => (
    <TouchableOpacity
        style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
        onPress={onPress}>
        <Image source={img} style={{ width: 16, height: 16 }} />
        <Text>{text}</Text>
    </TouchableOpacity>
);

// const dummy_emotion = [
//     {type: 'SURPRISE', count:1},
//     {type: 'GOOD', count:2},
// ]
const FeeedEmotions = ({ emotions }) => {

    const emotionsArray = Object.entries(emotions)
        .filter(([key, value]) => key !== 'total' && value > 0) // total 제외하고 count가 0 이상인 것만 필터링
        .map(([key, value]) => ({ type: key.toUpperCase(), count: value })) // type을 대문자로 변환
        .sort((a, b) => b.count - a.count) // count 기준으로 내림차순 정렬
        .slice(0, 2); // 상위 두 개의 감정만 선택

    console.log("이모션 확인", { emotions, emotionsArray });

    return (
        <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
            <View style={styles.emotionContainer}>
                {emotionsArray.map((emotion, index) => (
                    <View key={index} style={{position: 'absolute',}}>
                        <Image source={getEmotionIcon(emotion.type)} style={[styles.emotionIcon, { left: index * 12 }]}/>
                    </View>
                ))}
            </View>
            <Text> {emotions.total}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    // 글 상단
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 10,
    },
    nicknameText: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 20.27,
        color: '#3A3A3A'
    },
    profileImg: {
        width: 32,
        height: 32,
        borderRadius: 16
    },
    // 이미지
    thumbnailImg: {
        width: width,
        height: width,
    },
    // 컨텐츠 영역
    contentContainer: {
        marginHorizontal: 20,
        marginVertical: 20,
        gap: 10
    },
    timeText: {
        fontSize: 13,
        lineHeight: 18.82,
        letterSpacing: 0.03,
        textAlign: 'right',
        color: '#A5A5A5',
    },
    contentsText: {
        fontSize: 15,
        lineHeight: 21.72,
        letterSpacing: 0.03,
        textAlign: 'left',
        color: '#3A3A3A'
    },
    // 반응
    reactionsContainer: {
        flexDirection: 'row',
        gap: 14,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2,
        borderColor: '#d0d0d0',
    },
    //감정표현
    emotionContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 30,
        height: 16,
    },
    emotionIcon: {
        width: 20,
        height: 20,
    },

    // 댓글
    replyWrapper: {
        position: 'absolute',
        bottom: 0,
        paddingLeft: 16,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EAEAEA'
    },
    inputContainer: {
        flex: 1,
        height: 68,
        backgroundColor: '#FFF',
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        marginHorizontal: 10,
        marginVertical: 12,
        borderRadius: 4
    },
    inputIconStyle: {
        marginLeft: 16,
        marginRight: 2
    },
    inputStyle: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        fontWeight: '400',
        color: '#828282',
        paddingRight: 12
    },
    followButton: {
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#2F80ED',
        fontWeight: 'bold'
    },
});

export default FeedDetail;
