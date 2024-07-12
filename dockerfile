# Usar uma imagem base do Nginx
FROM nginx:alpine

# Copiar os arquivos do frontend para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Expor a porta 80 para acessar o serviço web
EXPOSE 8080

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
