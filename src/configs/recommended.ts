export default {
    plugins: [
        'html-class-attribute',
    ],
    rules: {
        'html-class-attribute/order': [
            'error',
            {
                alphabetical: true,
                order: [],
            },
        ],
    },
};
