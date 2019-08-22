echo Logging into Expo
$(yarn global bin)/expo login --non-interactive -u $EXPO_USERNAME -p $EXPO_PASSWORD

CHANNEL=$([ $IS_STABLE ] && echo "stable" || echo "staging")

echo $CHANNEL $VERSION

echo Publishing to $CHANNEL
echo $(yarn global bin)/expo publish --non-interactive --release-channel $(echo $CHANNEL-$VERSION)

echo Creating a new sentry release
echo sentry-cli releases new -p whs.js $VERSION
echo sentry-cli releases set-commits --auto $VERSION