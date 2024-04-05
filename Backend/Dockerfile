FROM node:20

# Create app directory
WORKDIR /usr/src/app


# ENV DATABASE_USER m2pappdb2
# ENV DATABASE_PASS T@d@Sa4izbDp
# ENV DATABASE_HOST m2p-aws-preprod01.cpufrcioovvo.ap-south-1.rds.amazonaws.com
# ENV DATABASE_NAME automation_master
ENV WEBSITE_HOME https://uat-prepaid.m2pfintech.com/pp-automation-app

ENV SAVE_LOGS false

ENV PORT 8080

# Install app dependencies
COPY /package*.json ./
RUN npm config set registry https://repo.m2pfintech.com/repository/npm-group/
RUN npm install
# RUN npm install pm2 -g

# Bundle app source
COPY . ./

EXPOSE 8080

#scaling
# CMD ["pm2-runtime", "index.js", "-i","-0"]
CMD [ "node", "--env-file=.env","index.js" ]