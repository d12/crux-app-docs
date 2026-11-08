---
sidebar_position: 5
description: "Work with gym walls, wall photos and holds, and create climbs through the API."
---

# Walls, holds and creating climbs

This page explains how walls, wall photos and holds fit together, and how to create a climb from holds on a wall. For the full list of fields, see the [API reference](/docs/api-documentation/api-reference.md).

## Walls and wall photos

A gym wall is a physical wall at a gym. Scanned walls (spray walls and board walls) have a **wall photo**: the photo climbs are set on, with every hold on it outlined.

When a gym re-photographs a wall, the wall gets a new current photo. Climbs set on the old photo stay on the old photo, so they keep showing the holds they were set on.

- `GET /api/v1/gym_walls/:id` includes the wall's `current_photo`.
- `GET /api/v1/wall_photos/:id` returns any wall photo, including old ones. Its `current` field tells you whether it's still the wall's current photo.
- A climb's `photo` tells you which photo it's on.

## Holds

Fetch the holds on a wall's current photo with `GET /api/v1/gym_walls/:id/holds`, or the holds on a specific photo with `GET /api/v1/wall_photos/:id/holds`:

```sh
curl -H "Authorization: Bearer $CRUX_TOKEN" \
     https://www.cruxapp.ca/api/v1/gym_walls/123/holds
```

```json
{
  "id": 1077,
  "wall_id": 123,
  "image_url": "https://imagedelivery.net/.../public",
  "width": 1600,
  "height": 1200,
  "current": true,
  "created_at": "2026-11-08 19:17:38 UTC",
  "holds": [
    { "id": "5325e24d91bcf1b0", "mask": [[412.5, 233.0], [440.0, 230.5], [446.0, 261.0]] },
    ...
  ]
}
```

Hold responses include an `ETag` header. Send it back in `If-None-Match` and you'll get a `304 Not Modified` until the wall's holds change.

### Hold IDs

Each hold has an `id`. A hold has the same ID in the photo's holds and in the holds of every climb that uses it, so you can match a climb's holds to the wall's (to light up the right LEDs on a board, for example).

Treat hold IDs as opaque strings. They don't change, except:

- Re-photographing a wall gives its holds new IDs.
- On walls photographed before November 2026, the first time the gym edits the wall's holds gives every hold a new ID. After that, editing some holds doesn't change the IDs of the others.

If you store hold IDs (for example, a mapping from holds to LEDs), refresh them when a wall's `current_photo` changes.

### Hold outlines

A hold's `mask` is its outline: a list of `[x, y]` points that form a polygon. In a photo's holds, the points are in pixels of the photo's `width` x `height`.

The image at `image_url` has the same shape as the photo but may be smaller. To draw outlines on it, scale the points by the image's width divided by the photo's `width`.

On a climb, each hold's `photo_mask` is its outline in the same pixels as the photo's holds.

## Creating a climb

Create a climb with `POST /api/v1/gym_walls/:id/climbs`. Pick holds by their IDs from the wall's holds, and give each one a type: `start`, `hand`, `hand_l`, `hand_r`, `foot`, `foot_l`, `foot_r`, `finish` or `zone`. Send the parameters as a JSON body:

```sh
curl -X POST \
     -H "Authorization: Bearer $CRUX_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Crimp line",
           "grade": "V4",
           "holds": [
             { "id": "5325e24d91bcf1b0", "type": "start" },
             { "id": "c3c82c524a79989e", "type": "hand" },
             { "id": "ec908a5d78bb5c52", "type": "finish" }
           ]
         }' \
     https://www.cruxapp.ca/api/v1/gym_walls/123/climbs
```

You don't need to send an image. Crux draws the climb's image from its holds, the same way it draws climbs posted in the app, and returns the new climb with a `201` status. The climb is posted as you, and triggers the same webhooks as posting a climb in the app.

A few things to know:

- `grade` must be one of the gym's grades, which you can find with `GET /api/v1/gyms/:gym_slug`.
- Holds come from the wall's current photo. To set a climb on an older photo of the wall, pass its `photo_id`.
- Set `draft` to `true` to save the climb as a draft, visible only to you.
- Only the gym's admins can create official climbs (`"official": true`, with a `color`).
- On free-tier gyms, climbs created through the API count towards your climb allowance, the same as in the app.

If any hold IDs aren't on the photo, you'll get a `422` that lists them in `unknown_hold_ids`:

```json
{
  "error": "Some hold IDs aren't on this photo: 0000000000000000",
  "unknown_hold_ids": ["0000000000000000"]
}
```

## Deprecated fields

These fields still work, and we have no plans to remove them, but there are better ways to get the same information:

- A gym wall's `holds`: use `GET /api/v1/gym_walls/:id/holds`, which doesn't add every hold to every wall response.
- A climb hold's `mask`: use `photo_mask`, which is in the same pixels as the photo's holds.
