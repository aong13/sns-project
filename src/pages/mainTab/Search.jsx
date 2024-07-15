import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { getSearchTag } from '../../apis/Feed';
import { baseURL } from '../../apis/index';

const hashTagIcon = require('../../assets/icons/hashtag.png');
const multiPhoto = require('../../assets/icons/multi.png');

const { width } = Dimensions.get('window');

const Search = ({ navigation }) => {
    const [searchResult, setSearchResult] = useState([]); 
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false); 
    const [hasMore, setHasMore] = useState(true); 
    const [searchTag, setSearchTag] = useState(""); 

    const pageSize = 10; // 한 페이지당 불러올 데이터 개수

    const getSearchTagApi = async (searchTag, page, pageSize) => {
        setLoading(true); 
        try {
            const res = await getSearchTag(searchTag, page, pageSize); 
            if (res.content.length < pageSize) { // 응답 데이터 길이가 pageSize보다 작으면 더 불러올 데이터 없음
                setHasMore(false);
            }
            setSearchResult(prevResults => [...prevResults, ...res.content]); // 검색결과 추가
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
            getSearchTagApi("all", page, pageSize);
    }, []); //처음엔 전부다불러오기

    useEffect(() => {
        if (page > 0) {
            getSearchTagApi(searchTag, page, pageSize);
        }
    }, [page]);//page번호 바뀌면 검색api 호출

    const handleSearch = () => {
        // 초기화
        setSearchResult([]);
        setPage(0);
        setHasMore(true);
        setSearchTag(searchTag);
        getSearchTagApi(searchTag, 0, pageSize);
    };

    const handleFeedPress = (id) => {
        navigation.navigate('FeedDetail', { id }); // id전달
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ borderWidth: 1, borderColor: '#FFF' }}
                onPress={()=>handleFeedPress(item.id)}>
                {item.images.length > 1 && <Image source={multiPhoto} style={{ position: 'absolute', right: 8, top: 8, width: 24, height: 24, zIndex: 4 }} />}
                <Image source={{ uri: baseURL + item.images[0] }} style={{ width: (width / 3) - 2, height: (width / 3) - 2 }} />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF', marginBottom:30 }}>
            <View style={{ flex: 1 }}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchWrapper}>
                        <TouchableOpacity style={styles.hashTagIconStyle}>
                            <Image source={hashTagIcon} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                        <TextInput
                            value={searchTag}
                            onChangeText={setSearchTag}
                            placeholder="검색어를 입력하세요."
                            style={styles.inputStyle}
                        />
                        <TouchableOpacity onPress={handleSearch}>
                            <Text style={styles.searchButton}>검색</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={searchResult}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()} 
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews
                    numColumns={3}
                    onEndReached={loadMoreResults} // 리스트 끝에 도달하면 loadMoreResults
                    onEndReachedThreshold={0.5} // 리스트 절반지점 onEndReached
                    ListFooterComponent={loading && <Text>Loading...</Text>} //하단에 표시
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        height: 68,
        backgroundColor: '#FFF',
    },
    searchWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        marginHorizontal: 16,
        marginVertical: 12,
        borderRadius: 4
    },
    hashTagIconStyle: {
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
    searchButton: {
        paddingHorizontal: 16,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3A3A3A'
    }
});

export default Search;
