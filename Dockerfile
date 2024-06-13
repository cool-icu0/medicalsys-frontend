# 使用官方Node.js镜像
FROM node:latest

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json（如果存在）
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 构建项目，这里假设你的构建命令是npm run build
RUN npm run build

# 暴露端口，根据你的应用配置来设置
EXPOSE 3000

# 定义启动命令，这里假设你的应用是通过npm start启动的
CMD ["npm", "start"]