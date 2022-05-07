# Mutants Api Demo

>  A node API to detect mutants

## Build Setup

### Set environment vars
> You should set the below environment vars to database connection:
>  - DB_PASSWORD
>  - DB_NAME
>  - DB_COLLECTION

```sh
# Run develop environment
$ git clone git@github.com:riclara/mutant.git # or clone your own fork

$ cd mutant

$ npm install

$ npm run start
```
Your app should now be running on [localhost:3000](http://localhost:8000/).

## Deploy
> Before to deploy to productions is necessary install the heroku client.
```sh
$ npm install -g heroku
```
### Configure heroku-cli and deploy
```sh
$ heroku login

$ heroku create

# Deploy app
$ git push heroku main
```

### Live demo

#### Check DNA endpoint
```sh
curl --location --request POST 'https://floating-ocean-95337.herokuapp.com/mutant' \
--header 'Content-Type: application/json' \
--data-raw '{
"dna": ["AGC8AA","CAGGGC","TTATGT","AGAAGA","CCC0GA","TCACT4"]
}'
```

#### Stats
```sh
curl --location --request GET 'https://floating-ocean-95337.herokuapp.com/stats'
```

## Tests
```sh
# Run Tests
$ npm test
```
