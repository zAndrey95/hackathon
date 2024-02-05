# Hackathon

Card game with utilizing Pyth’s Entropy (RNG) and minting card combinations using Liteflow.
Smart Contracts [text]([https://openai.com/](https://github.com/zAndrey95/hackathon-sc))

## Keys (.env)

1. apiKey - please get your personal key in [text](https://openai.com/)
2. GAME_CONTRACT - you Smart Contract with card game. Example: 0x5622a1Fe9C994844E6A78D2abf6e9b8834b175E3
3. ANSWERS_CONTRACT - you Smart Contract with text list answers. Example: 0x0Ae7eA919296a279EbCfD2F6F6Cb30a8a128C787
4. QUESTIONS_CONTRACT - you Smart Contract with text list questions. Example: 0x6445cC914C3F7F128d5Cbef781C8C54094Ab0566
5. projectId - your personal key in [text](https://cloud.walletconnect.com/app)

## How to start?

0. nmv use node 18
1. Yarn or npm install
2. Yarn dev or npm run dev

## About structure

### API

#### POST api/generateImage 

###### Parameters
* Request: An instance of the Request object representing the incoming HTTP request.
* Return Value: A promise that resolves to a Response object representing the HTTP response.
* 
#### Function Logic

1. Extracting Request Data 
    - The function retrieves the JSON payload from the incoming request using the request.json() method.
2. Generating NFT Image
    - The extracted data is used to create a prompt for the OpenAI API's images.generate method. 
    - The prompt instructs the AI model (DALL-E 3) to generate an image with specific text content for the question and answer sections of the NFT card.
    - The generated image's URL and filename are extracted from the API response.
3. Error Handling
    - In case of any errors during the OpenAI API request, the function logs an error message to the console.
4. Returning Response
    - The function constructs and returns a JSON response containing the generated NFT image's URL (nftURL) and filename (fileName).

#### Response:
```
{
  "nftURL": "https://example.com/nft-image.jpg",
  "fileName": "nft-image.jpg"
}
```

#### GET api/users 

###### Parameters
* Request: An instance of the Request object representing the incoming HTTP request.
* Return Value: A promise that resolves to a Response object representing the HTTP response.
* 
#### Function Logic

1. Extracting Request Data 
    - The function extracts the wallet parameter from the request URL using the URL class and validates it.
    - If the wallet parameter is an array or not provided, the function returns a 400 Bad Request response with an error message.
2. Handling Respone
    - If the cache contains the name associated with the wallet, the function returns a JSON response with the name; otherwise, it returns a JSON response with the wallet itself.
3. Error Handling
    - In case of any errors during the process, the function logs an error message to the console and returns a 500 Internal Server Error response.

#### Response:
```
{
  "name": "John Doe"
}
```

#### POST api/users 

###### Parameters
* Request: An instance of the Request object representing the incoming HTTP request.
* Return Value: A promise that resolves to a Response object representing the HTTP response.
* 
#### Function Logic

1. Extracting Request Body 
    - The function extracts the JSON payload from the incoming request using the req.json() method.
2. Data Validation
    - The function checks if the required wallet and name fields are present in the payload.
     - If not, the function returns a 400 Bad Request response with an error message.
3. Caching Data
     - The function adds the received data to a cache using the cache.set method.
4. Response
    - The function returns a JSON response indicating the success of the operation.
5. Error Handling
- In case of any errors during the process, the function logs an error message to the console and returns a 500 Internal Server Error response.

#### Response:
```
{
  "success": true
}
```

### Components

1. Shared: logic that is reused;
2. UI: React components;
3. Provider: provider to manage and (or) receive information;
4. Layout: layouts in app. A set of components and logic that is responsible for a certain amount of work;
5. Game: Components for laout/Game;

### Contracts

Contains addresses of contracts, their abi and typed objects
