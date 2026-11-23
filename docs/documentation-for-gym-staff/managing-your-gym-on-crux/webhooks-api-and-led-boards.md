---
sidebar_position: 9
---

# Webhooks, the API and LED Boards

:::info
Gym webhooks and the API's gym features are part of **Crux Pro**.
:::

Crux has a public **REST API** and **webhooks**, so you can connect Crux to your own systems: show your newest climbs on your website or a screen in the gym, or light up climbs on an LED board. The [API documentation](/docs/api-documentation/intro.md) covers every endpoint and event.

---

## API Keys

API keys belong to a person, not a gym. To create one, open your **profile → settings cog → "API Authentication"** and tap **"Create API key"**. The key is shown only once, so copy it somewhere safe. See [Authentication](/docs/api-documentation/authentication.md).

---

## Gym Webhooks

Webhooks send a request to your server whenever something happens at your gym, like a new climb being posted. Your gym's admins manage them in **Gym Settings → "Gym webhooks"** (under **Developer settings**).

Every delivery is signed with its webhook's secret (the `X-Crux-Signature` header), so your server can check it came from Crux. Tap the **key icon** to copy a webhook's secret.

If your gym's plan doesn't include webhooks, they're kept but get no events until the gym moves to Pro.

---

## LED Boards

If your wall has an LED board connected to Crux, turn on **"Enable LED board features"** on the Gym webhooks page. Climbers then see a **lightbulb button** on climbs that lights the climb up on the board.
