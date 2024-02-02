#syntax=docker/dockerfile:1

FROM node:alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY src/ ./
RUN tsc

EXPOSE 8080
# Transpile typescript to javascript and start app
CMD [ "node", "dist/index.js"]
# FROM python:3.8-slim-buster

# WORKDIR /python-docker

# COPY code/requirements.txt requirements.txt
# RUN pip3 install -r requirements.txt

# COPY code/. .

# CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0","--port=8080"]