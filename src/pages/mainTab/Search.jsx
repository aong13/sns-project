import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { getSearchTag } from '../../apis/Feed'
import { baseURL } from '../../apis/index'
const searchIcon = require('../../assets/icons/search.png');
const multiPhoto = require('../../assets/icons/multi.png');

const Search = ({ navigation }) => {
    const [keyword, setKeyword] = useState('');
    const { width } = useWindowDimensions();

    const searchTag = "all";
    const page = 0;
    const pageSize = 100;
    const [searchResult, setSearchResult] = useState([]);

    const getSearchTagApi = async (searchTag, page, pageSize) => {
        const res = await getSearchTag(searchTag, page, pageSize);
        setSearchResult(res.result.content);
    };
    
    useEffect(() => {
        getSearchTagApi(searchTag, page, pageSize);
    }, []);
    
    console.log('검색 결과:', searchResult);
    
    const renderItem = ({item}) => {
        console.log(`${item.id}: `, item);
        return (
            <TouchableOpacity 
                style={{borderWidth: 1, borderColor: '#FFF'}}>
                { item.images.length > 1  && <Image source={multiPhoto} style={{position: 'absolute', right: 8, top: 8, width: 24, height: 24, zIndex: 4 }} />}
                <Image source={{ uri: baseURL + item.images[0]}} style={{width:(width/3) -2, height: (width/3) - 2}} />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1 }}>
                <View style={styles.searchContainer}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('SearchList')}
                        style={styles.searchWrapper}>
                        <TouchableOpacity style={styles.searchIconStyle}>
                            <Image source={searchIcon} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                        <Text
                            allowFontScaling={false}
                            style={styles.inputStyle}
                        >
                            검색어를 입력하세요.
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList 
                    data={searchResult}
                    // data={duumy_search}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews
                    numColumns={3}
                />
            </View>
        </SafeAreaView>
    )
}

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
    searchIconStyle: {
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
    }
})

export default Search;