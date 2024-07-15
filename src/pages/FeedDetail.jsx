import React, {useState, useEffect} from 'react'
import {Dimensions, SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, ScrollView, TextInput,KeyboardAvoidingView, StyleSheet} from 'react-native';
import { CommentItem } from '../components/Comment/CommentItem';
import HashTags from '../components/HashTags';
import { getFeedDetail } from '../apis/Feed';
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

const angry_icon = require('../assets/icons/emotion_angry.png');
const funny_icon = require('../assets/icons/emotion_funny.png');
const good_icon = require('../assets/icons/emotion_good.png');
const sad_icon = require('../assets/icons/emotion_angry.png');
const surprise_icon = require('../assets/icons/emotion_angry.png');

const defaultProfileImage = require('../assets/images/blank_profile.png')

const FeedDetail = ({ route, navigation }) => {
    const { id } = route.params;
    const [feedDetail, setFeedDetail] = useState([]);
    const [replys, setReplys] = useState([]);
    const [replyValue, setReplyValue] = useState([]);
    
    const getFeedDetailApi = async ({id}) => {
        const feedDetail = await getFeedDetail(id);
        setReplys(feedDetail.replys)
        setFeedDetail(feedDetail);
    };
    useEffect(() => {
        getFeedDetailApi({id});
    }, []);

    const renderItem = ({ item }) => (
        <CommentItem
            // profileImg={defaultProfileImage}
            nickname={item.nickname}
            comment={item.reply}
            likeNum={item.likeNum=0} //임시
            replyNum={item.replyNum=0} //임시
            date={item.date}
        />
    );

    const handleLikePress = () => {

    }
    const handleReplySubmit = () => {}
    //프로필이미지 없는경우 처리'
 const profileImageUrl = feedDetail.profileImagePath ? { uri: baseURL + feedDetail.profileImagePath } : defaultProfileImage;
 const ImageUrl = feedDetail.images ? { uri: baseURL + feedDetail.images[0] } : "";

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#FFF', paddingBottom: 60}}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={back_icon} style={styles.iconBtn} />
                </TouchableOpacity>
                <View style={styles.headerButtonsWrapper}>
                    <TouchableOpacity>
                        <Image source={share_icon} style={styles.iconBtn} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={scrab_icon} style={styles.iconBtn} /> 
                    </TouchableOpacity>
                </View>
            </View>
            
        <KeyboardAvoidingView>
            <ScrollView>
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

                    {/** 캐러셀로 구현해보기 */}
                    {/* <Carousel
                    data={feedDetail.images}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={width}
                    /> */}

                    <Image 
                        source={ImageUrl} 
                        style={styles.thumbnailImg}
                        resizeMode='contain' />

                    <View style={styles.contentContainer}>
                        <Text styles={styles.timeText}> 30분 전 </Text>
                        <Text style={styles.contentsText}>{feedDetail.content}</Text>
                    <HashTags
                        tagList={feedDetail.tags}/>
                    </View>

                    <View style={styles.reactionsContainer}>
                        <ReactionButton
                            onPress={handleLikePress()}
                            text="표현하기"
                            img={emotion_icon}/>
                        <ReactionButton
                            text="댓글"
                            img={comment_icon}/>
                    </View>

                    <FlatList //댓글목록
                        data={replys}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </ScrollView>
                <View style={styles.replyrWrapper}>
                    <TouchableOpacity onPress={() => {/**사진업로드 */}}>
                        <Image source={imgUpload_icon} style={styles.iconBtn} />
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                value={replyValue}
                                onChangeText={setReplyValue}
                                placeholder="댓글을을 입력하세요."
                                style={styles.inputStyle}
                            />
                            <TouchableOpacity onPress={()=>{"댓글작성API"}}>
                                <Text style={styles.followButton}>작성</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ReactionButton = ({ onPress, text, img }) => (
    <TouchableOpacity
        style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
        onPress={onPress}>
        <Image source={img} style={{ width: 16, height: 16 }} />
        <Text>{text}</Text>
    </TouchableOpacity>
);
const styles = StyleSheet.create({
    //헤더
    headerWrapper: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA'
    },
    headerButtonsWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4 
    },
    iconBtn:{
        width: 28,
        height: 28
    },
    //글 상단
    postHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 10,
    },
    nicknameText:{
        fontSize: 14,
        fontWeight: "bold",
        lineHeight: 20.27,
        color: '#3A3A3A'
    },
    profileImg:{
        width: 32,
        height: 32,
        borderRadius: 16
    },
    //이미지
    thumbnailImg:{
        width, 
        height: width, 
    },
    //컨텐츠영역
    contentContainer:{
        marginHorizontal: 20,
        marginVertical: 20, 
        gap: 10
    },
        timeText: {
            fontSize: 13,
            lineHeight:18.82,
            letterSpacing: 0.03,
            textAlign: 'right',
            color: '#A5A5A5',
        },
        contentsText:{
            fontSize: 15,
            lineHeight: 21.72,
            letterSpacing: 0.03,
            textAlign: 'left',
            color: '#3A3A3A'   
        },
    //반응
    reactionsContainer:{
        flexDirection: 'row',
        gap: 14,
        alignItems: 'center', 
        paddingHorizontal: 24, 
        paddingVertical: 16,
        borderTopWidth:0.2,
        borderBottomWidth:0.2,
        borderColor:'#d0d0d0',
    },
    //댓글
    replyrWrapper: {
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
})


export default FeedDetail