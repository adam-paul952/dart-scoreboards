module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset", "babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@components": "./components",
            "@scoreboard": "./components/scoreboard",
            "@context": "./context",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
