FROM node:lts-buster
RUN git clone ‎https://github.com/Rahmantech12/RAHMAN-MD-V2
‎/root/RAHMAN-MD-V2
WORKDIR /root/RAHMAN-MD-V2
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
