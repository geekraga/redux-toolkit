import reduce from 'lodash/reduce';
import sampleSize from 'lodash/sampleSize';
import englishTranslations from './en-gb';

const chars = ['覧', '今', '付', '英', '開', '阪', '更', '理', '生', '区', '経', '化', '康', '民', '市', '期'];

// produce a default translation set for testing
const messages = reduce(englishTranslations, (memo, value, key) => {
    memo[key] = sampleSize(chars, 5).join('');
    return memo;
}, {});

export default messages;
