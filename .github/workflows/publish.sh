echo Logging into Expo
$(yarn global bin)/expo login --non-interactive -u $EXPO_USERNAME -p $EXPO_PASSWORD

echo $IS_MASTER $IS_STABLE

# echo Publishing to staging
# $(yarn global bin)/expo publish --non-interactive --release-channel staging-$VERSION
# echo Publish to stable
# $(yarn global bin)/expo publish --non-interactive --release-channel stable-$VERSION


# echo Creating a new sentry release
# sentry-cli releases new -p whs.js $VERSION
# sentry-cli releases set-commits --auto $VERSION