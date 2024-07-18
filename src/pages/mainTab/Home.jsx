import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, SafeAreaView, Text, View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BasicHeader from '../../components/BasicHeader';
import { getFeed } from '../../apis/Feed';
import FeedPost from '../../components/FeedPost';
import { baseURL } from '../../apis/index';

const Home = ({ navigation }) => {
    const [feedData, setFeedData] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false); 
    const [refreshing, setRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true); 
    const pageSize = 5; // 한 페이지당 불러올 데이터 개수

    const getFeedApi = async (page, pageSize, reset = false) => {
        setLoading(true); 
        try {
            const feed = await getFeed(page, pageSize);
            if (feed.content.length < pageSize) { // 응답 데이터 길이가 pageSize보다 작으면 더 불러올 데이터 없음
                setHasMore(false);
            }
            setFeedData(prevResults => reset ? feed.content : [...prevResults, ...feed.content]); // 피드목록 추가
            console.log("피드갱신",feed)
        } catch (error) {
            console.error('검색 실패함:', error);
        } finally {
            setLoading(false);
        }
    }

    const loadMoreResults = () => {
        if (!loading && hasMore) { // 로딩중도 아니고 불러올 데이터도 있을때
            setPage(prevPage => prevPage + 1); // 페이지 +1
        }
    };

    useEffect(() => {        
        getFeedApi(page, pageSize);
    }, [page]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setPage(0); // 페이지를 초기화하여 첫 페이지부터 다시 불러오기
        setHasMore(true);// 추가 데이터가 있다고 상태변경
        getFeedApi(0, pageSize).then(() => setRefreshing(false));
    }, []);

    useFocusEffect(
        useCallback(() => {
            onRefresh(); // 홈 화면에 포커스가 돌아올 때 데이터를 새로고침
        }, [])
    );


    useEffect(() => {
        getFeedApi(page, pageSize);
    }, [page]);

    const renderFeed = ({ item }) => {
        return (
            <FeedPost 
                id={item.id}
                profileImg={item.profileImagePath} 
                nickname={item.nickname}
                myEmotion={item.emotions.emotionCheck}
                emotionNum={item.emotions.total} 
                commentNum={item.replys.length}
                thumbnail={baseURL + item.images[0]}
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
                    keyExtractor={(item, index) => item.id.toString() + index}
                    // keyExtractor={item => item.id.toString()}
                    removeClippedSubviews
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMoreResults} // 리스트 끝에 도달하면 loadMoreResults
                    onEndReachedThreshold={0.5} // 리스트 절반지점 onEndReached
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default Home;
