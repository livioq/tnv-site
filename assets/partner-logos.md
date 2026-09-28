# Partner logos

HTML hotlinks official brand assets so logos stay exact without a binary commit:

| Partner | HTML source URL | Local copy prepared on box |
|---------|-----------------|----------------------------|
| Sardiamo | https://www.sardiamo.com/ (Wix CDN wordmark) | `assets/sardiamo-logo.png` |
| 601 Analytics | LinkedIn company logo (601analytics.com is behind a bot wall) | `assets/601-analytics-logo.png` |
| Red Solutions | https://redsolutions.it/brand/logo-light.png | `assets/red-solutions-logo.png` |
| Tomato Blue | https://www.tomato.blue/_next/static/media/tomatoblue-logo.04gxp_sq78ygn.png | `assets/tomato-blue-logo.png` |

Follow-up: commit the local PNG/SVG copies under `assets/` when binary push is available.

## TNV Academy partners (community.html, "Partner")

Source: live site https://thenetvalue.com/academy/, block "La TNV Academy è supportata da" (fetched 28 Sep 2026). Logos downloaded from thenetvalue.com/wp-content/uploads, transparent padding cropped, resized to max 480×120, imported with `scripts/import_asset.sh <file> other partner-<slug>`.

| Partner | Original file on thenetvalue.com | Repo file |
|---------|----------------------------------|-----------|
| Abinsula | /wp-content/uploads/2024/07/8-1.png | `assets/partner-abinsula.png` |
| Agile Lab | /wp-content/uploads/2025/06/agilelab-colours-orizzontale-scaled.png | `assets/partner-agile-lab.png` |
| C22 | /wp-content/uploads/2024/11/c22.png | `assets/partner-c22.png` |
| Dauvea (white logo, shown on ink tile) | /wp-content/uploads/2024/07/dauvea.png | `assets/partner-dauvea.png` |
| Entando | /wp-content/uploads/2024/07/4.png | `assets/partner-entando.png` |
| Flosslab | /wp-content/uploads/2025/07/logo-flosslab-h-512-1.png | `assets/partner-flosslab.png` |
| Growens | /wp-content/uploads/2025/11/growens_left-white-scaled.png (white) | reuses existing `assets/network/growens.png` |
| Nivea Lavanderia Industriale | /wp-content/uploads/2025/07/progetto-senza-titolo-7.png | `assets/partner-nivea-lavanderia-industriale.png` |
| Pluribus One (white logo, shown on ink tile) | /wp-content/uploads/2024/08/logo_pluribus_one_pos@4x.png | `assets/partner-pluribus-one.png` |
| Quantyx | /wp-content/uploads/2024/07/6.png | reuses existing `assets/network/quantyx.png` |
| Sicuritalia | /wp-content/uploads/2025/10/sicuritalia_logo.png | `assets/partner-sicuritalia.png` |
