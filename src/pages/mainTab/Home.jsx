import React, { useState, useEffect } from 'react'
import { Dimensions, SafeAreaView, Text, View, FlatList, StyleSheet } from 'react-native'
import { getFeed } from '../../apis/Feed';
import FeedPost from '../../components/FeedPost';
import { baseURL } from '../../apis/index'

const { width } = Dimensions.get('window');

const defaultProfileImage = require('../../assets/images/blank_profile.png')


const Home = ({ navigation }) => {
    const [feedData, setFeedData] = useState([]);
    // Pagination
    const page = 0;
    const pageSize = 10;

    const getFeedApi = async (page, pageSize) => {
        const feed = await getFeed(page, pageSize);
        console.log('Received posts:', feed);
        setFeedData(feed.content);
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
                likeNum={item.like=2}
                commentNum={item.replys.length}
                thumbnail={baseURL+item.images[0]}
                contents={item.content}
                navigation={navigation}  
            />
        );
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={styles.headerWrapper}>
                <Text style={styles.headerTitle}>오운완</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#FFF', marginBottom: 32 }}>
                <FlatList
                    data={feedData}
                    renderItem={renderFeed}
                    keyExtractor={item => item.id.toString()}
                    removeClippedSubviews
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 19.97,
        textAlign: 'center',
        color: '#3A3A3A'
    },
});

export default Home;
