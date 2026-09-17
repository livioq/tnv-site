# Incoming assets

Agents cannot push JPG/PNG through the GitHub text API. Drop a **text** pointer here instead. The ingest workflow writes the real file into `assets/` and commits it.

## What Livio says to an agent

> This photo is Mario. Put it on the site.

The agent then writes one of:

### Pointer to a file that already exists online

`incoming/team/mario_mariani.png.url`

```
https://raw.githubusercontent.com/livioq/livio-os/pr/286/livio_os/static/team/mario_mariani.png
```

### Pointer from a chat attachment

The agent base64-encodes the attached file and writes:

`incoming/team/mario_mariani.png.b64`

You do not open Terminal or GitHub Upload.

## Destinations

| Drop this | Becomes |
| --- | --- |
| `incoming/team/mario_mariani.png.url` | `assets/team/mario_mariani.png` |
| `incoming/coworking-desk.jpg.url` | `assets/coworking-desk.jpg` |
