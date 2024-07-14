import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput, Keyboard, ScrollView } from 'react-native';
import HashTags from '../components/HashTags';
import { createFeed } from '../apis/Feed';

const { width } = Dimensions.get('window');

const back_icon = require('../assets/icons/back.png');
const hashTagIcon = require('../assets/icons/hashtag.png');
const closeIcon = require('../assets/icons/close.png');


const AddFeed = ({ navigation, route }) => {
    const { selectedPhotos } = route.params;
    const [uploadingImage, setUploadingImage] = useState(selectedPhotos || []);
    const [keyword, setKeyword] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [content, setContent] = useState('');
    
    const handleUpload = async () => {
        try {
            await createFeed(content, keywords, uploadingImage);
            alert('피드가 성공적으로 업로드되었습니다.');
            navigation.goBack();
        } catch (error) {
            console.log("addFeed.jsx에서 보내주는 uploadImag:", uploadingImage)
            console.log("선택한 이미지:", selectedPhotos)
            alert('피드 업로드에 실패했습니다.');
        }
    };

    const handleDelete = (uri) => {
      const updatedData = uploadingImage.filter(item => item.uri !== uri);
      setUploadingImage(updatedData);
    };

    const handleAddKeyword = () => {
        if (keyword.trim().length > 0) {
            setKeywords([...keywords, keyword.trim()]);
            setKeyword('');
        }
    };

    const handleDeleteKeyword = (tag) => {
        const updatedKeywords = keywords.filter((keyword) => keyword !== tag);
        setKeywords(updatedKeywords);
    };
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF'}}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={back_icon} style={styles.headerIcon} />
                </TouchableOpacity>
                <Text style={{ fontSize: 15, color: '#3A3A3A', fontWeight: 'bold' }}>데일리 피드 작성</Text>
                <TouchableOpacity
                    onPress={()=> handleUpload()}>
                    <Text style={{ fontSize: 14, color: '#2F80ED', fontWeight: 'bold' }}>업로드</Text>
                </TouchableOpacity>
            </View>
            <View style={{ margin:16, width: width-32}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageWrapper}>
                    {uploadingImage.map(item => (
                        <View style={{paddingHorizontal: 4}}key={item.uri}>
                            <Image source={{ uri: item.uri }} style={{ width: 100, height: 100, borderRadius: 4 }} />
                                <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.uri)} >
                                    <Image source={closeIcon} />
                                </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
        
                <TextInput
                    style={styles.contentInput}
                    placeholder="게시글을 입력하세요. 오늘은 어떤 운동을 했나요?"
                    value={content}
                    onChangeText={(text) => setContent(text)}
                    multiline
                />
                    
                <Text style={styles.heading}>키워드 추가</Text>
                
                <View style={styles.searchWrapper}>
                    <View style={styles.searchSection}>
                        <TouchableOpacity style={styles.hashTagIconStyle}>
                            <Image source={hashTagIcon} style={{ width: 18, height: 18 }} />
                        </TouchableOpacity>
                        <TextInput
                            placeholder='태그를 입력하세요.'
                            returnKeyType='search'
                            spellCheck={false}
                            autoCorrect={false}
                            autoCapitalize='none'
                            value={keyword}
                            onChangeText={(text) => setKeyword(text)}
                            onSubmitEditing={handleAddKeyword}
                            allowFontScaling={false}
                            style={styles.inputStyle}
                        />
                    </View>
                </View>
                <View style={styles.hashTagWrapper}>
                    <HashTags tagList={keywords} onDelete={handleDeleteKeyword} />
                </View>
            </View>
        </SafeAreaView>
    );
};

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
  headerIcon: {
    width: 28,
    height: 28
  },
  imageWrapper: {
    paddingVertical: 16,
    flexDirection: 'row',
  },
  deleteBtn: {
    position: 'absolute',
    top: 5,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 2,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "#3A3A3A",
    paddingVertical: 10
  },
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hashTagIconStyle: {
    marginLeft: 10,
    marginRight: 2,
  },
  contentInput: {
    marginHorizontal: 4,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 2,
    fontSize: 12,
    fontWeight: '400',
    color: '#828282',
    paddingRight: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 10
  },
  hashTagWrapper:{
    paddingVertical: 8
  }
});

export default AddFeed;
