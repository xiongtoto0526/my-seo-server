# 使用官方的node基础镜像
FROM node:14

# 设置工作目录
WORKDIR /usr/src/app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 如果你有全局依赖，比如pm2，可以在这里安装
RUN npm install -g pm2

# 复制项目文件到工作目录
COPY . .

# 暴露你的应用监听的端口
EXPOSE 3000

# 使用pm2运行你的应用
CMD [ "pm2-runtime", "start", "app.js" ]


# # 在开发环境中运行容器
# docker run -e NODE_ENV=dev -p 3000:3000 -d your-image

# # 在生产环境中运行容器
# docker run -e NODE_ENV=production -p 3000:3000 -d your-image