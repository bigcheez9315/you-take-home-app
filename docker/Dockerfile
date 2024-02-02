#syntax=docker/dockerfile:1

FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY src/ ./
EXPOSE 8080
RUN npx tsc

# Transpile typescript to javascript and start app
CMD [ "npm", "start"]
# FROM python:3.8-slim-buster

# WORKDIR /python-docker

# COPY code/requirements.txt requirements.txt
# RUN pip3 install -r requirements.txt

# COPY code/. .

# CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0","--port=8080"]