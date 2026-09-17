# The Net Value site rebuild (IT prototype)

Live: https://livioq.github.io/tnv-site/

Repo: https://github.com/livioq/tnv-site

## Add or replace an image

Do this on the Mac, not through GitHub’s web upload.

```bash
# team portraits (same filenames as Livio OS)
scripts/import_asset.sh ~/path/mario_mariani.png team mario_mariani --replace
scripts/import_asset.sh ~/path/livio_quintavalle.png team livio_quintavalle --replace
scripts/import_asset.sh ~/path/benedetta_mariani.png team benedetta_mariani --replace
scripts/import_asset.sh ~/path/giulia_onano.png team giulia_onano --replace
scripts/import_asset.sh ~/path/maria_adelaide_lai.png team maria_adelaide_lai --replace

# any other asset
scripts/import_asset.sh ~/path/desk.jpg coworking coworking-desk

git add assets && git commit -m 'Add photos' && git push
```

Pages go live after the GitHub Pages workflow runs. Import only updates the local clone.

Expected team files:

- `assets/team/mario_mariani.png`
- `assets/team/livio_quintavalle.png`
- `assets/team/benedetta_mariani.png`
- `assets/team/giulia_onano.png`
- `assets/team/maria_adelaide_lai.png`

If you already imported them into Livio OS:

```bash
cp ~/livio-os/livio_os/static/team/*.png assets/team/
git add assets/team && git commit -m 'Add team portraits' && git push
```
