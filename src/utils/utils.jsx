
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