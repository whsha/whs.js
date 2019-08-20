#!/bin/sh

expo login --non-interactive -u $1 -p $2
expo publish --non-interactive --release-channel $3

# Webhook
# {
#   "embeds": [
#     {
#       "title": "New {{beta/stable}} version published",
#       "description": "{{commit message}}",
#       "url": "https://exp.host/@dusterthefirst/WHS?release-channel={{staging/default}}",
#       "color": 32768,
#       "timestamp": "2019-05-17T16:59:05.329Z",
#       "footer": {
#         "text": "WHS Helper App"
#       },
#       "thumbnail": {
#         "url": "https://raw.githubusercontent.com/DusterTheFirst/whs.js/master/assets/icon.png"
#       },
#       "author": {
#         "name": "DusterTheFirst",
#         "url": "https://github.com/DusterTheFirst",
#         "icon_url": "https://avatars0.githubusercontent.com/u/14093962?s=460&v=4"
#       }
#     }
#   ]
# }