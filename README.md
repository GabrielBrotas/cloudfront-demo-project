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
    
    sudo docker build -t loginapi-image .
    sudo docker container run -d -p 4000:4000 --name c-loginapi loginapi-image
```