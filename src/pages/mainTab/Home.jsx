import React, { useState, useEffect } from 'react'
import { Dimensions, SafeAreaView, Text, View, FlatList, StyleSheet } from 'react-native'
import BasicHeader from '../../components/BasicHeader';
import { getFeed } from '../../apis/Feed';
import FeedPost from '../../components/FeedPost';
import { baseURL } from '../../apis/index'

const { width } = Dimensions.get('window');

const defaultProfileImage = require('../../assets/images/blank_profile.png')


const Home = ({ navigation }) => {

    const [feedData, setFeedData] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false); 
    const [hasMore, setHasMore] = useState(true); 
    const pageSize = 20; // 한 페이지당 불러올 데이터 개수

    const getFeedApi = async (page, pageSize) => {
        setLoading(true); 
        try {
            const feed = await getFeed(page, pageSize);
            if (feed.content.length < pageSize) { // 응답 데이터 길이가 pageSize보다 작으면 더 불러올 데이터 없음
                setHasMore(false);
            }
            setFeedData(prevResults => [...prevResults, ...feed.content]); // 검색결과 추가
        } catch (error) {
            console.error('검색 실패함:', error);
        } finally {
            setLoading(false);
        }
    };


    const loadMoreResults = () => {
        if (!loading && hasMore) { // 로딩중도 아니고 불러올 데이터도 있을때
            setPage(prevPage => prevPage + 1); //페이지 +1
        }
    };

    useEffect(() => {        
        getFeedApi(page, pageSize);
    }, [page]);

    const renderFeed = ({ item }) => {
        return (
            <FeedPost 
                id={item.id}
                profileImg={item.profileImagePath} 
                nickname={item.nickname}
                likeNum={item.like=2} //좋아요 임시
                commentNum={item.replys.length}
                thumbnail={baseURL+item.images[0]}
                contents={item.content}
                navigation={navigation}  
            />
        );
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <BasicHeader
                showBackButton={false}
                title="오운완"
            />
            <View style={{ flex: 1, backgroundColor: '#FFF', marginBottom: 32 }}>
                <FlatList
                    data={feedData}
                    renderItem={renderFeed}
                    keyExtractor={item => item.id.toString()}
                    removeClippedSubviews
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMoreResults} // 리스트 끝에 도달하면 loadMoreResults
                    onEndReachedThreshold={0.5} // 리스트 절반지점 onEndReached
                    ListFooterComponent={loading && <Text>Loading...</Text>} //하단에 표시
                />
            </View>
        </SafeAreaView>
    );
}

export default Home;
