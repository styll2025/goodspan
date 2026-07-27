#!/usr/bin/env python3
"""Import Jul 2026 site structure update from .dc.html sources."""

from __future__ import annotations

import json
import re
from pathlib import Path

from bundle_dc import (
    bundle_dc,
    encode_template,
    get_template,
    hide_splash,
    set_template_block,
    validate,
)

REPO = Path(__file__).resolve().parent
DOWNLOADS = Path("/Users/sara/Downloads")

DC_PAGES = {
    "GoodSpan Landing.dc (3).html": "index.html",
    "Your Journey.dc.html": "your-journey.html",
    "Memberships.dc.html": "memberships.html",
    "About.dc.html": "about.html",
    "GoodSpan Evidence.dc.html": "evidence.html",
}

LINK_REPLACEMENTS = [
    ("GoodSpan Landing.dc (3).html", "/"),
    ("GoodSpan Landing.dc.html", "/"),
    ("Your Journey.dc.html", "/your-journey"),
    ("Memberships.dc.html", "/memberships"),
    ("GoodSpan Evidence.dc.html", "/evidence"),
    ("About.dc.html", "/about"),
    ("GoodSpan Seasons.dc.html?theme=sleep", "/membership?theme=sleep"),
    ("GoodSpan Seasons.dc.html?theme=move", "/membership?theme=move"),
    ("GoodSpan Seasons.dc.html?theme=mind", "/membership?theme=mind"),
    ("GoodSpan Seasons.dc.html?theme=eat", "/membership?theme=eating"),
    ("GoodSpan Seasons.dc.html?theme=eating", "/membership?theme=eating"),
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

NAV_PATCH_PAGES = [
    "calendar.html",
    "terms-and-conditions.html",
    "privacy-policy.html",
    "cookie-policy.html",
    "community-guidelines.html",
    "medical-disclaimer.html",
    "lisbon-chapter.html",
]

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


def extract_nav_block(template: str) -> str | None:
    start = template.find("<!-- NAV -->")
    if start < 0:
        return None
    for marker in ('<span id="top">', "<!-- HERO -->"):
        anchor = template.find(marker, start + 10)
        if anchor > start:
            return template[start:anchor].rstrip() + "\n\n"
    menu = template.find('<sc-if value="{{ menuOpen }}">', start)
    if menu > start:
        end = template.find("</sc-if>", menu) + len("</sc-if>")
        return template[start:end].rstrip() + "\n\n"
    return None


def extract_footer_block(template: str) -> str | None:
    start = template.find("<!-- FOOTER -->")
    if start < 0:
        return None
    end = template.find("</footer>", start)
    if end < 0:
        return None
    return template[start : end + len("</footer>")]


def sync_nav_footer(template: str, reference: str) -> str:
    ref_nav = extract_nav_block(reference)
    ref_footer = extract_footer_block(reference)
    if not ref_nav or not ref_footer:
        raise SystemExit("Reference nav/footer blocks missing")

    old_nav = extract_nav_block(template)
    if old_nav:
        template = template.replace(old_nav, ref_nav, 1)

    old_footer = extract_footer_block(template)
    if old_footer:
        template = template.replace(old_footer, ref_footer, 1)

    return template


def update_page_template(path: Path, reference_nav: str | None = None) -> None:
    text = path.read_text(encoding="utf-8")
    template = get_template(text)
    if reference_nav and path.name in NAV_PATCH_PAGES:
        template = sync_nav_footer(template, reference_nav)
    template = patch_template_links(template)
    text = set_template_block(text, template)
    validate(text)
    path.write_text(text, encoding="utf-8")


def import_dc_page(src_name: str, dst_name: str) -> None:
    src = DOWNLOADS / src_name
    dst = REPO / dst_name
    print(f"Bundling {src_name} -> {dst_name}")
    text = bundle_dc(src)
    text = hide_splash(text)
    template = patch_template_links(get_template(text))
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


def main() -> None:
    for src, dst in DC_PAGES.items():
        import_dc_page(src, dst)

    reference_nav = patch_template_links(get_template((REPO / "index.html").read_text(encoding="utf-8")))

    for html_path in sorted(REPO.glob("*.html")):
        if html_path.name in DC_PAGES.values():
            continue
        print(f"Updating links/nav in {html_path.name}")
        update_page_template(html_path, reference_nav)

    update_redirects()
    print("Done.")


if __name__ == "__main__":
    main()
