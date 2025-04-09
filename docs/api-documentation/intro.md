---
sidebar_position: 1
description: "Introductory information about the Crux API."
---

# Introduction

The Crux API is a RESTful API that allows you to interact with the Crux platform. It's still fairly new, so expect some inconsistencies and frequent updates.

## Authentication

All requests must be authenticated via a Bearer token. Please see the [authentication](/docs/api-documentation/authentication.md) page for more information.

## Rate Limiting

The Crux API has a rate limit of 20 requests per minute. Please reach out if you require a higher rate limit.

## Pagination

There is no pagination at the moment.

## Versioning and Breaking Changes

The API is currently in "beta" and has no versioning or breaking change policy. A versioning scheme and breaking change policy will be introduced once the dust settles.

That said, we'll do our best to avoid breaking changes. All breaking changes and API updates will be announced in the #api-platform channel of the [Discord](https://discord.com/invite/ypt6e9HBVC).

## Webhooks

We support webhook events for subscribing to different events on Crux. Please see the [webhooks documentation](/docs/api-documentation/webhooks.md) for more information.

## Feature requests

If you need another API or webhook to make your integration possible, please reach out either on [Discord](https://discord.com/invite/ypt6e9HBVC) or via email at [nat@cruxapp.ca](mailto:nat@cruxapp.ca).

