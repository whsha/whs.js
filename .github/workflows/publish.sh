echo Logging into Expo
$(yarn global bin)/expo login --non-interactive -u $EXPO_USERNAME -p $EXPO_PASSWORD

VERSION=$(sentry-cli releases propose-version)
CHANNEL=$([ $IS_STABLE ] && echo "stable" || echo "staging")
RELEASE_CHANNEL=$(echo $CHANNEL-$VERSION)

sed -i -- 's/"version": "0.0.1"/"version": "$VERSION"/g' app.json 

echo Publishing to $CHANNEL
$(yarn global bin)/expo publish --non-interactive --release-channel $RELEASE_CHANNEL

echo Creating a new sentry release
sentry-cli releases new -p whs $VERSION
sentry-cli releases set-commits --auto $VERSION

WEBHOOK_DATA="{
   \"embeds\": [{
       \"title\": \"New $CHANNEL version published\",
       \"description\": \"$COMMIT_MESSAGE\",
       \"url\": \"https://exp.host/@dusterthefirst/WHS?release-channel=$RELEASE_CHANNEL\",
       \"color\": 32768,
       \"timestamp\": \"$(date -Iseconds -u)\",
       \"footer\": {
           \"text\": \"WHS Helper App\"
        },
       \"thumbnail\": {
            \"url\": \"https://raw.githubusercontent.com/DusterTheFirst/whs.js/master/assets/icon.png\"
        },
        \"author\": {
            \"name\": \"$SENDER_USERNAME\",
            \"url\": \"$SENDER_URL\",
            \"icon_url\": \"$SENDER_AVATAR\"
        }
    }]
}"

echo $WEBHOOK_DATA

curl -sS --header "Content-Type: application/json" \
  --request POST \
  --data "$WEBHOOK_DATA" \
  $WEBHOOK_URL