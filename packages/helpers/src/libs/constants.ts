export const currencyOptions = [
    {
        label: 'AUD $ - Australian dollar',
        value: 'aud',
        description: 'Australian dollar',
        symbol: '$'
    },
    {
        label: 'USD $ - United States dollar',
        value: 'usd',
        description: 'United States dollar',
        symbol: '$'
    },
    { label: 'EUR € - Euro', value: 'eur', description: 'Euro', symbol: '€' },
    {
        label: 'GBP £ - British pound sterling',
        value: 'gbp',
        description: 'British pound sterling',
        symbol: '£'
    },
    { label: 'JPY ¥ - Japanese yen', value: 'jpy', description: 'Japanese yen', symbol: '¥' },
    { label: 'CAD $ - Canadian dollar', value: 'cad', description: 'Canadian dollar', symbol: '$' },
    { label: 'CHF ₣ - Swiss franc', value: 'chf', description: 'Swiss franc', symbol: '₣' },
    { label: 'CNY ¥ - Chinese yuan', value: 'cny', description: 'Chinese yuan', symbol: '¥' },
    { label: 'INR ₹ - Indian rupee', value: 'inr', description: 'Indian rupee', symbol: '₹' },
    { label: 'BRL R - Brazilian real', value: 'brl', description: 'Brazilian real', symbol: 'R$' },
    { label: 'RUB ₽ - Russian ruble', value: 'rub', description: 'Russian ruble', symbol: '₽' },
    {
        label: 'KRW ₩ - South Korean won',
        value: 'krw',
        description: 'South Korean won',
        symbol: '₩'
    },
    { label: 'SEK kr - Swedish krona', value: 'sek', description: 'Swedish krona', symbol: 'kr' },
    {
        label: 'NZD $ - New Zealand dollar',
        value: 'nzd',
        description: 'New Zealand dollar',
        symbol: '$'
    },
    { label: 'MXN $ - Mexican peso', value: 'mxn', description: 'Mexican peso', symbol: '$' },
    {
        label: 'SGD $ - Singapore dollar',
        value: 'sgd',
        description: 'Singapore dollar',
        symbol: '$'
    },
    {
        label: 'HKD $ - Hong Kong dollar',
        value: 'hkd',
        description: 'Hong Kong dollar',
        symbol: '$'
    },
    {
        label: 'NOK kr - Norwegian krone',
        value: 'nok',
        description: 'Norwegian krone',
        symbol: 'kr'
    },
    {
        label: 'ZAR R - South African rand',
        value: 'zar',
        description: 'South African rand',
        symbol: 'R'
    },
    { label: 'THB ฿ - Thai baht', value: 'thb', description: 'Thai baht', symbol: '฿' },
    {
        label: 'AED د.إ - United Arab Emirates dirham',
        value: 'aed',
        description: 'United Arab Emirates dirham',
        symbol: 'د.إ'
    },
    { label: 'DKK kr - Danish krone', value: 'dkk', description: 'Danish krone', symbol: 'kr' },
    { label: 'PLN zł - Polish złoty', value: 'pln', description: 'Polish złoty', symbol: 'zł' },
    { label: 'TRY ₺ - Turkish lira', value: 'try', description: 'Turkish lira', symbol: '₺' },
    { label: 'SAR ﷼ - Saudi riyal', value: 'sar', description: 'Saudi riyal', symbol: '﷼' },
    {
        label: 'ILS ₪ - Israeli new shekel',
        value: 'ils',
        description: 'Israeli new shekel',
        symbol: '₪'
    },
    { label: 'PHP ₱ - Philippine peso', value: 'php', description: 'Philippine peso', symbol: '₱' },
    {
        label: 'MYR RM - Malaysian ringgit',
        value: 'myr',
        description: 'Malaysian ringgit',
        symbol: 'RM'
    },
    {
        label: 'TWD NT - New Taiwan dollar',
        value: 'twd',
        description: 'New Taiwan dollar',
        symbol: 'NT$'
    },
    { label: 'CZK Kč - Czech koruna', value: 'czk', description: 'Czech koruna', symbol: 'Kč' }
]

export const languageOptions = [
    { label: 'English (Australia)', value: 'en-au' },
    // { label: 'English (Canada)', value: 'en-ca' },
    // { label: 'English (United Kingdom)', value: 'en-gb' },
    { label: 'English (United States)', value: 'en-us' },
    // { label: 'Spanish', value: 'es' },
    // { label: 'French', value: 'fr' },
    // { label: 'German', value: 'de' },
    // { label: 'Italian', value: 'it' },
    // { label: 'Portuguese', value: 'pt' },
    // { label: 'Russian', value: 'ru' },
    { label: 'Chinese / 繁體中文 (Traditional)', value: 'zh-tw' },
    { label: 'Chinese / 简体字 (Simplified)', value: 'zh-cn' },
    { label: 'Japanese / 日本語', value: 'jp' }
]

export const yearLevelOptions = [
    { label: 'Foundation Year', value: 'FY' },
    { label: 'Year 1', value: 'Y1' },
    { label: 'Year 2', value: 'Y2' },
    { label: 'Year 3', value: 'Y3' },
    { label: 'Year 4', value: 'Y4' },
    { label: 'Year 5', value: 'Y5' },
    { label: 'Year 6', value: 'Y6' },
    { label: 'Year 7', value: 'Y7' },
    { label: 'Year 8', value: 'Y8' },
    { label: 'Year 9', value: 'Y9' },
    { label: 'Year 10', value: 'Y10' }
]

export const subjectOptions = [
    { label: 'English', value: 'ENGENG' },
    { label: 'Mathematics', value: 'MATMAT' },
    { label: 'Science', value: 'SCISCI' },
    { label: 'Digital Technologies', value: 'TECTDI' }
]

export const questionTypeOptions = [
    {
        label: 'Short text',
        value: 'short-text',
        questionPlaceholder: 'e.g. What is the capital of France?',
        questionCorrectAnswerPlaceholder: 'e.g. Paris',
        questionHintsPlaceholder: 'e.g. Think about the geography of Europe.',
        questionExplanationsPlaceholder:
            'e.g. Paris is the capital of France according to its geography.'
    },
    {
        label: 'Multiple choice',
        value: 'multiple-choice',
        questionPlaceholder: 'e.g. Which of the following is a capital of France?',
        questionCorrectAnswerPlaceholder: 'e.g. Paris',
        questionHintsPlaceholder: 'e.g. Think about the geography of Europe.',
        questionExplanationsPlaceholder:
            'e.g. Paris is the capital of France according to its geography'
    },
    {
        label: 'Draw canvas',
        value: 'draw-canvas',
        questionPlaceholder: 'e.g. Draw the Eiffel Tower.',
        questionCorrectAnswerPlaceholder:
            'e.g. It should be a picture of a tower with two legs and a flat top.',
        questionHintsPlaceholder: 'e.g. Remember the famous tower in Paris',
        questionExplanationsPlaceholder: 'e.g. The Eiffel Tower is a famous tower in Paris'
    },
    {
        label: 'Fill in the blank',
        value: 'fill-in-the-blank',
        questionPlaceholder: 'e.g. The capital of France is _______.',
        questionCorrectAnswerPlaceholder: 'e.g. Paris',
        questionHintsPlaceholder: 'e.g. Think about the geography of Europe.',
        questionExplanationsPlaceholder:
            'e.g. Paris is the capital of France according to its geography'
    }
]