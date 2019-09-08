module.exports = {
    presets: [
        "expo",
        "@babel/env"
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties"
    ],
    env: {
        development: {
            plugins: [
                "transform-react-jsx-source"
            ]
        }
    }
}