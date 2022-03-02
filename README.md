# cloudfront-demo-project

## Resources
- S3 bucket
- Cloudformation
- EC2


## Run api on EC2
- clone repo
- install npm and node
```
    npm install
    echo "JWT_SECRET_KEY=<Secretkey>" > .env
    npm run build
    npm install -g pm2
    pm2 start dist/main.js --name loginapi

    pm2 list // ver os serviços
    pm2 startup systemd // vai gerar um comando e vamos copiar e colar este comando assim o pm2 vai ser configurado
    pm2 logs
    pm2 monit // podemos monitar o que esta acontecendo quando chamamos alguma rota pelo insomnia
```