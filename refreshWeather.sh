#!/bin/sh
source ./.env
while true;
do
curl -o /tmp/weather.json https://api.darksky.net/forecast/$DARK_SKY_API_KEY/55.8611,-4.2502?units=uk2 && mv /tmp/weather.json public/weather.json 
sleep 600
done