import React, {useEffect} from 'react'
import { SafeAreaView, Text, View, FlatList } from 'react-native'
import { getFeed } from '../apis/Feed';
import FeedPost from '../components/FeedPost';

const dummy_feed = [
    {
        id: 1,
        name: 'Jeongtaeyoung_5812',
        profileImg: 'https://avatar.iran.liara.run/public',
        feedImg: [
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
        ],
        contents: '내 마음...받아줘',
        like: 37,
        likeUsers: [
            1, 2, 3,
        ]
    },
    {
        id: 2,
        name: 'Jeongtaeyoung_5812',
        profileImg: 'https://avatar.iran.liara.run/public',
        feedImg: [
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
        ],
        contents: '내 마음...받아줘',
        like: 37,
        likeUsers: [
            1, 2, 3,
        ]
    },
    {
        id: 3,
        name: 'Jeongtaeyoung_5812',
        profileImg: 'https://avatar.iran.liara.run/public',
        feedImg: [
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
        ],
        contents: '하이룽룽닝닝',
        like: 37,
        likeUsers: [
            1, 2, 3,
        ]
    }
]

//pagenation
const page = 0;
const pageSize = 10;

const Home = () =>{
    // useEffect(() => {
    //     getFeedApi(page, pageSize);
    //   }, []);

    // const getFeedApi = async (page, pageSize) => {
    // const feed = await getFeed();
    // console.log('Received posts:', feed);
    // };

const renderFeed = ({ item, index }) => {
    return (
        <FeedPost 
         profileImg={item.profileImg}
         nickname={item.name}
         likeNum={item.like}
         commentNum={3}
         thumbnail={item.feedImg[0]}
         contents={item.contents}/>
    )
}


      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1, backgroundColor: '#FFF', marginBottom: 32 }}>
                <FlatList
                    data={dummy_feed}
                    renderItem={renderFeed}
                    keyExtractor={item => item.id}
                    removeClippedSubviews
                    showsVerticalScrollIndicator={false}
                />
            </View>

        </SafeAreaView>
    )
}
export default Home;