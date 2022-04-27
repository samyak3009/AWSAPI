FROM node

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install 
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

RUN unzip awscliv2.zip

RUN ./aws/install

COPY . .

EXPOSE 3001 

CMD [ "node", "index.js" ]