module.exports = api => {
    const isTest = api.env('test');

    return isTest ? {
        presets: [
            "expo",
            "@babel/env"
        ],
        plugins: [
            "@babel/plugin-proposal-class-properties"
        ]
    } : { presets: ["expo"] };
}