---
sidebar_position: 2
description: "Learn about how to authenticate your API requests."
---

# Authentication

All requests must be authenticated via a Bearer token. To get a token, head to your user settings and click on "API Authentication".

<img src="/img/api-keys.png" alt="API Authentication" class="screenshot" />

Treat API tokens as passwords and do not share them with anyone. Take care to not check API keys into source control or expose them in client-side code.

## Using a Bearer Token

To use a Bearer token, include it in the `Authorization` header of your request.

```
Authorization: Bearer <token>
```

You can query the API using cURL like this:

```sh
# Set the CRUX_TOKEN environment variable to your API token
export CRUX_TOKEN=<your-api-token>

# Query the API
curl -H "Authorization: Bearer $CRUX_TOKEN" \
     https://www.cruxapp.ca/api/v1/users/me
```

## Cycling your API key

If you think your API key has been leaked, you can cycle it in the API Authentication menu. This will generate a new key and invalidate the old one.
