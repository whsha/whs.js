echo Logging into Expo
$(yarn global bin)/expo login --non-interactive -u $EXPO_USERNAME -p $EXPO_PASSWORD

CHANNEL=$([ $IS_STABLE = "true" ] && echo "stable" || echo "staging")

echo Publishing to $CHANNEL
$(yarn global bin)/expo publish --non-interactive --release-channel $CHANNEL

WEBHOOK_DATA="{
   \"embeds\": [{
       \"title\": \"New $CHANNEL version published\",
       \"description\": \"$COMMIT_MESSAGE\",
       \"url\": \"https://exp.host/@dusterthefirst/WHS?release-channel=$CHANNEL\",
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

echo $WEBHOOK_DATA > data.json

curl -sS --header "Content-Type: application/json" \
  --request POST \
  --data @data.json \
  $WEBHOOK_URL