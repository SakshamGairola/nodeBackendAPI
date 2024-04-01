# Production url for the backend service can be found [here](https://nodebackendapi-4.onrender.com)

## URL for (swagger-ui)[https://nodebackendapi-4.onrender.com/docs]

### This service has

- [Resgistration](https://nodebackendapi-4.onrender.com/api/v1/auth/register) endpoint to register oneself
- [Login](https://nodebackendapi-4.onrender.com/api/v1/auth/login) endpoint to obtain authentication token for other enpoints

### Once obtained authentication token one can access follwing endpoints

- [Entries](https://nodebackendapi-4.onrender.com/api/v1/publicendpoint/entries) - Fetch entries from the API
  - Parameters
    - title => string
    - description => string
    - https => boolean
    - cors => yes, no or unknown
    - category => string
- [Random](https://nodebackendapi-4.onrender.com/api/v1/publicendpoint/random) - Fetches a random entry from catalogue

  - Parameters
    - title => string
    - description => string
    - https => boolean
    - cors => yes, no or unknown
    - category => string

- [Categories](https://nodebackendapi-4.onrender.com/api/v1/publicendpoint/catgories) - Lists all available categories

### This endpoint can be accessed by anyone and does not need any authentication

- [Health Check](https://nodebackendapi-4.onrender.com/api/v1/publicendpoint/healthCheck) - checks if server is up

Express.postman_collection is the whole postman collection for every above mentioned endpoints
