#!/usr/bin/env python3
"""Import GoodSpan site updates from .dc.html sources."""

from __future__ import annotations

import re
from pathlib import Path

from bundle_dc import (
    bundle_dc,
    get_template,
    hide_splash,
    set_template_block,
    validate,
)

REPO = Path(__file__).resolve().parent
SITE_EXPORT = Path("/Users/sara/Downloads/goodspan-site")

DC_PAGES = {
    "GoodSpan Landing.dc.html": "index.html",
    "Your Journey.dc.html": "your-journey.html",
    "Memberships.dc.html": "memberships.html",
    "About.dc.html": "about.html",
    "GoodSpan Evidence.dc.html": "evidence.html",
    "GoodSpan Seasons.dc.html": "membership.html",
    "GoodSpan Calendar.dc.html": "calendar.html",
    "Lisbon Chapter.dc.html": "lisbon-chapter.html",
    "Terms and Conditions.dc.html": "terms-and-conditions.html",
    "Privacy Policy.dc.html": "privacy-policy.html",
    "Cookie Policy.dc.html": "cookie-policy.html",
    "Community Guidelines.dc.html": "community-guidelines.html",
    "Medical Disclaimer.dc.html": "medical-disclaimer.html",
}

LINK_REPLACEMENTS = [
    ("GoodSpan Landing.dc (4).html", "/"),
    ("GoodSpan Landing.dc (3).html", "/"),
    ("GoodSpan Landing.dc.html", "/"),
    ("Your Journey.dc (1).html", "/your-journey"),
    ("Your Journey.dc.html", "/your-journey"),
    ("Memberships.dc (1).html", "/memberships"),
    ("Memberships.dc.html", "/memberships"),
    ("GoodSpan Evidence.dc (1).html", "/evidence"),
    ("GoodSpan Evidence.dc.html", "/evidence"),
    ("About.dc (1).html", "/about"),
    ("About.dc.html", "/about"),
    ("GoodSpan Seasons.dc.html?paid=starter", "/membership?paid=starter"),
    ("GoodSpan Seasons.dc.html?paid=explorer", "/membership?paid=explorer"),
    ("GoodSpan Seasons.dc.html?paid=insider", "/membership?paid=insider"),
    ("GoodSpan Seasons.dc.html?theme=sleep", "/membership?theme=sleep"),
    ("GoodSpan Seasons.dc.html?theme=move", "/membership?theme=move"),
    ("GoodSpan Seasons.dc.html?theme=mind", "/membership?theme=mind"),
    ("GoodSpan Seasons.dc.html?theme=eat", "/membership?theme=eat"),
    ("GoodSpan Seasons.dc.html?theme=eating", "/membership?theme=eat"),
    ("GoodSpan Seasons.dc.html?unsure=1", "/membership?unsure=1"),
    ("GoodSpan Seasons.dc.html", "/membership"),
    ("GoodSpan Calendar.dc.html", "/calendar"),
    ("Lisbon Chapter.dc.html", "/lisbon-chapter"),
    ("Terms and Conditions.dc.html", "/terms-and-conditions"),
    ("Privacy Policy.dc.html", "/privacy-policy"),
    ("Cookie Policy.dc.html", "/cookie-policy"),
    ("Community Guidelines.dc.html", "/community-guidelines"),
    ("Medical Disclaimer.dc.html", "/medical-disclaimer"),
    ("index.html#seasons", "/your-journey"),
    ("index.html#circle", "/your-journey"),
    ("index.html#gathering", "/your-journey"),
    ("/#seasons", "/your-journey"),
    ("/#circle", "/your-journey"),
    ("/#gathering", "/your-journey"),
]

ABOUT_ACTIVITIES_FAQ = """        <div style="padding:22px 0;border-top:1px solid #E2DBCC;">
          <div style="font-family:'Newsreader',serif;font-weight:600;font-size:18px;color:#20251F;margin-bottom:8px;">Where do the activities come from?</div>
          <p style="font-size:15px;line-height:1.65;color:#5A5F56;margin:0;">Every experience is grounded in evidence-based practices and shaped by research into what helps people live healthier, more connected and meaningful lives. We turn the evidence into simple actions that are enjoyable, practical and easy to incorporate into daily life.</p>
        </div>
"""

REDIRECTS_APPEND = """
/your-journey.html /your-journey 301
/memberships.html /memberships 301
/about.html /about 301
"""


def normalize_links(text: str) -> str:
    for old, new in sorted(LINK_REPLACEMENTS, key=lambda item: -len(item[0])):
        text = text.replace(old, new)
    return text


def fix_copyright(template: str) -> str:
    return template.replace("© 2026 The Good Span Spans.", "© 2026 The Good Span.")


def patch_template_links(template: str) -> str:
    return fix_copyright(normalize_links(template))


def apply_custom_patches(template: str, dst_name: str) -> str:
    if dst_name == "about.html" and "Where do the activities come from?" not in template:
        marker = """        <div style="padding:22px 0;border-top:1px solid #E2DBCC;border-bottom:1px solid #E2DBCC;">
          <div style="font-family:'Newsreader',serif;font-weight:600;font-size:18px;color:#20251F;margin-bottom:8px;">Is The Good Span a medical programme?</div>"""
        if marker in template:
            template = template.replace(marker, ABOUT_ACTIVITIES_FAQ + marker, 1)

    if dst_name == "your-journey.html":
        template = template.replace(
            'alt="A Circle gathered together over tea and conversation"',
            'alt="Hands joined together in a circle"',
            1,
        )

    return template


def import_dc_page(src_name: str, dst_name: str) -> None:
    src = SITE_EXPORT / src_name
    dst = REPO / dst_name
    print(f"Bundling {src_name} -> {dst_name}")
    text = bundle_dc(src)
    text = hide_splash(text)
    template = apply_custom_patches(patch_template_links(get_template(text)), dst_name)
    text = set_template_block(text, template)
    validate(text)
    if ".dc.html" in get_template(text):
        raise SystemExit(f".dc.html links remain in {dst_name}")
    dst.write_text(text, encoding="utf-8")
    print(f"  wrote {dst.stat().st_size:,} bytes")


def update_redirects() -> None:
    path = REPO / "_redirects"
    content = path.read_text(encoding="utf-8")
    for line in REDIRECTS_APPEND.strip().splitlines():
        if line.strip() and line.strip() not in content:
            content = content.rstrip() + "\n" + line.strip() + "\n"
    path.write_text(content, encoding="utf-8")


def sync_support_assets() -> None:
    src = SITE_EXPORT / "seasons-data.js"
    dst = REPO / "seasons-data.js"
    if src.exists():
        dst.write_bytes(src.read_bytes())
        print(f"Synced {dst.name}")


def main() -> None:
    sync_support_assets()
    for src, dst in DC_PAGES.items():
        import_dc_page(src, dst)
    update_redirects()
    print("Done.")


if __name__ == "__main__":
    main()
