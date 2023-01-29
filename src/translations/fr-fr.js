import reduce from 'lodash/reduce';
import sampleSize from 'lodash/sampleSize';
import englishTranslations from './en-gb';

const chars = ['Ù', 'À', 'Â', 'Û', 'Ü', 'Æ', 'Ç', 'Ÿ', 'É', 'È', 'Ê', 'Ë', 'Ï', 'Î', 'Ô', 'Œ'];

// produce a default translation set for testing
const messages = reduce(englishTranslations, (memo, value, key) => {
    memo[key] = sampleSize(chars, 5).join('');
    return memo;
}, {});

export default messages;
