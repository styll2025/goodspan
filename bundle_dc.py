#!/usr/bin/env python3
"""Bundle .dc.html design files into self-contained GoodSpan pages."""

from __future__ import annotations

import base64
import json
import mimetypes
import re
import uuid
from pathlib import Path

REPO = Path(__file__).resolve().parent
REFERENCE = REPO / "evidence.html"
LISBON = REPO / "lisbon-chapter.html"

UPLOAD_DIRS = [
    REPO / "uploads",
    Path("/Users/sara/Downloads/Untitled design/uploads"),
    Path("/Users/sara/Downloads"),
]

IMAGE_ALIASES: dict[str, str | tuple[str, str]] = {
    "uploads/_gathering.png": "/Users/sara/Downloads/_gathering.png",
    "uploads/gathering.png": "/Users/sara/Downloads/_gathering.png",
    "uploads/sara-portell.jpg": ("lisbon", "Sara Portell"),
    "uploads/wgpaNsuM_400x400.jpeg": ("lisbon", "Joël Palix"),
    "uploads/WhatsApp Image 2026-07-16 at 15.16.27.jpeg": ("lisbon", "Beatriz Eusébio"),
    "uploads/together.png": "/Users/sara/Downloads/Untitled design/uploads/together.png",
    "uploads/Untitled design (1).png": "/Users/sara/Documents/goodspan/uploads/evidence-collage.png",
    "uploads/Untitled design (2).png": "/Users/sara/Documents/goodspan/uploads/evidence-journeys.png",
    "uploads/sleep-waking-up.png": "/Users/sara/Downloads/Untitled design/uploads/sleep.png",
    "uploads/14.png": "/Users/sara/Downloads/Untitled design/uploads/move.png",
    "uploads/6.png": "/Users/sara/Downloads/Untitled design/uploads/6.png",
    "uploads/5.png": "/Users/sara/Downloads/Untitled design/uploads/eat.png",
    "uploads/circle.png": "/Users/sara/Downloads/Untitled design/uploads/circle.png",
    "uploads/12.png": "/Users/sara/Documents/goodspan/uploads/healthy-habits.jpg",
    "uploads/hero_image.jpg": "/Users/sara/Downloads/Untitled design/uploads/hero_image.jpg",
}

PAGE_IMAGE_SOURCES = {
    "index.html": REPO / "lisbon-chapter.html",
    "lisbon": LISBON,
}


def encode_template(template: str) -> str:
    return json.dumps(template, ensure_ascii=False).replace("</script>", "<\\u002Fscript>")


def get_block(text: str, kind: str) -> str:
    match = re.search(rf'<script type="__bundler/{kind}">\n([\s\S]*?)\n  </script>', text)
    if not match:
        raise SystemExit(f"Missing __bundler/{kind}")
    return match.group(1)


def get_template(text: str) -> str:
    return json.loads(get_block(text, "template"))


def get_manifest(text: str) -> dict:
    return json.loads(get_block(text, "manifest"))


def get_ext_resources(text: str) -> list:
    return json.loads(get_block(text, "ext_resources"))


def set_manifest(text: str, manifest: dict) -> str:
    encoded = json.dumps(manifest, ensure_ascii=False, separators=(",", ":"))
    block = re.search(r'(<script type="__bundler/manifest">\n)(.*?)(\n  </script>)', text, re.S)
    return text[: block.start(2)] + encoded + text[block.end(2) :]


def set_template_block(text: str, template: str) -> str:
    match = re.search(r'(<script type="__bundler/template">\n)(.*?)(\n  </script>)', text, re.S)
    return text[: match.start(2)] + encode_template(template) + text[match.end(2) :]


def hide_splash(text: str) -> str:
    text = re.sub(
        r"#__bundler_loading \{[^}]*\}",
        "#__bundler_loading { display: none !important; }",
        text,
    )
    text = re.sub(
        r"#__bundler_thumbnail \{[^}]*\}",
        "#__bundler_thumbnail { display: none !important; }",
        text,
    )
    noscript = re.search(r"<noscript>\s*<style>#__bundler_loading \{[^}]*\}</style>", text)
    if noscript:
        text = (
            text[: noscript.start()]
            + "<noscript>\n    <style>#__bundler_loading { display: none !important; }</style>"
            + text[noscript.end() :]
        )
    return text


def extract_font_block(ref_template: str) -> str:
    start = ref_template.find("<style>/* cyrillic-ext */")
    if start < 0:
        raise SystemExit("Font block not found in reference template")
    end = ref_template.find("*{box-sizing:border-box;}", start)
    if end < 0:
        end = ref_template.find("<style>\n  *{box-sizing", start)
    if end < 0:
        raise SystemExit("Could not locate end of font block")
    return ref_template[start:end]


def page_image(source_key: str, alt: str) -> dict:
    page = PAGE_IMAGE_SOURCES[source_key]
    text = page.read_text(encoding="utf-8")
    tpl = get_template(text)
    manifest = get_manifest(text)
    match = re.search(rf'src="([0-9a-f-]{{36}})"[^>]*alt="{re.escape(alt)}"', tpl)
    if not match:
        raise SystemExit(f"Image not found in {page.name} for alt={alt!r}")
    return manifest[match.group(1)]


def lisbon_image(alt: str) -> dict:
    return page_image("lisbon", alt)


def resolve_image(path: str) -> tuple[bytes, str]:
    alias = IMAGE_ALIASES.get(path)
    if isinstance(alias, tuple):
        entry = page_image(alias[0], alias[1])
        return base64.b64decode(entry["data"]), entry["mime"]
    if isinstance(alias, str):
        file_path = Path(alias)
        if file_path.exists():
            mime = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
            try:
                return file_path.read_bytes(), mime
            except OSError:
                pass

    rel = path.removeprefix("uploads/")
    candidates = [Path(path), *[d / rel for d in UPLOAD_DIRS], *[d / Path(path).name for d in UPLOAD_DIRS]]
    for candidate in candidates:
        if not candidate.exists():
            continue
        try:
            size = candidate.stat().st_size
        except OSError:
            continue
        if size > 100:
            mime = mimetypes.guess_type(candidate.name)[0] or "application/octet-stream"
            try:
                return candidate.read_bytes(), mime
            except OSError:
                continue
    raise SystemExit(f"Missing image asset: {path}")


def image_manifest_entry(data: bytes, mime: str) -> dict:
    return {"mime": mime, "compressed": False, "data": base64.b64encode(data).decode("ascii")}


def collect_upload_paths(template: str) -> set[str]:
    paths: set[str] = set()
    paths.update(re.findall(r'src="(uploads/[^"]+)"', template))
    paths.update(re.findall(r"url\((uploads/[^)]+)\)", template))
    paths.update(re.findall(r'background-image:url\((uploads/[^)]+)\)', template))
    return paths


def substitute_images(template: str, manifest: dict) -> str:
    paths = collect_upload_paths(template)
    for path in sorted(paths, key=len, reverse=True):
        data, mime = resolve_image(path)
        uid = str(uuid.uuid4())
        manifest[uid] = image_manifest_entry(data, mime)
        template = template.replace(path, uid)
    return template


def parse_dc(dc_text: str) -> tuple[str, str, str, str]:
    script_match = re.search(r"(<script type=\"text/x-dc\" data-dc-script>[\s\S]*?</script>)", dc_text)
    if not script_match:
        raise SystemExit("Missing data-dc-script block")

    thumb_match = re.search(
        r'<template id="__bundler_thumbnail"[^>]*>([\s\S]*?)</template>',
        dc_text,
    )
    thumbnail_inner = thumb_match.group(1).strip() if thumb_match else ""

    xdc_match = re.search(r"<x-dc>([\s\S]*?)</x-dc>", dc_text)
    if not xdc_match:
        raise SystemExit("Missing <x-dc> block")
    xdc = xdc_match.group(1)

    helmet_match = re.search(r"<helmet>([\s\S]*?)</helmet>", xdc)
    if not helmet_match:
        raise SystemExit("Missing <helmet> block")
    helmet = helmet_match.group(1)
    helmet = re.sub(r'<link href="https://fonts\.googleapis\.com/css2[^"]+" rel="stylesheet">\s*', "", helmet)

    body_match = re.search(r"</helmet>\s*([\s\S]*?)(?:<template id=\"__bundler_thumbnail\"|$)", xdc)
    if not body_match:
        raise SystemExit("Missing page body in dc file")
    body = body_match.group(1).strip()

    return helmet, body, script_match.group(1), thumbnail_inner


def build_template(
    runtime_uid: str,
    font_block: str,
    helmet_inner: str,
    body: str,
    dc_script: str,
) -> str:
    preconnect = (
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">'
    )
    helmet_block = f"{preconnect}\n{font_block}{helmet_inner}"
    return (
        "<!DOCTYPE html>\n<html><head>\n"
        '<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f'<script src="{runtime_uid}"></script>\n'
        "</head>\n<body>\n<x-dc>\n<helmet>\n"
        f"{helmet_block}\n"
        "</helmet>\n"
        f"{body}\n"
        f"{dc_script}\n"
        "</body></html>"
    )


def replace_thumbnail_shell(text: str, thumbnail_inner: str) -> str:
    if not thumbnail_inner:
        return text
    block = re.search(r"(<div id=\"__bundler_thumbnail\">)([\s\S]*?)(</div>)", text)
    if not block:
        raise SystemExit("Missing __bundler_thumbnail shell")
    return text[: block.start(2)] + "\n  " + thumbnail_inner + "\n" + text[block.end(2) :]


def bundle_dc(dc_path: Path) -> str:
    ref_text = REFERENCE.read_text(encoding="utf-8")
    ref_template = get_template(ref_text)
    ref_manifest = get_manifest(ref_text)
    ext_resources = get_ext_resources(ref_text)

    runtime_uid = str(uuid.uuid4())
    ref_runtime_uid = re.search(r'<script src="([0-9a-f-]{36})"', ref_template).group(1)

    manifest: dict = {}
    for uid, entry in ref_manifest.items():
        if entry.get("mime") == "font/woff2":
            manifest[uid] = entry
    manifest[runtime_uid] = ref_manifest[ref_runtime_uid]
    for item in ext_resources:
        manifest[item["uuid"]] = ref_manifest[item["uuid"]]

    helmet_inner, body, dc_script, thumbnail_inner = parse_dc(dc_path.read_text(encoding="utf-8"))
    template = build_template(runtime_uid, extract_font_block(ref_template), helmet_inner, body, dc_script)
    template = substitute_images(template, manifest)

    output = hide_splash(ref_text)
    output = replace_thumbnail_shell(output, thumbnail_inner)
    output = set_manifest(output, manifest)
    output = set_template_block(output, template)
    return output


def validate(text: str) -> None:
    for key in ("manifest", "template", "ext_resources"):
        json.loads(get_block(text, key))
    raw = get_block(text, "template")
    if "</script>" in raw:
        raise SystemExit("Unsafe template encoding")


if __name__ == "__main__":
    import sys

    if len(sys.argv) != 3:
        raise SystemExit("Usage: bundle_dc.py input.dc.html output.html")
    out = bundle_dc(Path(sys.argv[1]))
    validate(out)
    Path(sys.argv[2]).write_text(out, encoding="utf-8")
    print(f"Wrote {sys.argv[2]} ({len(out):,} bytes)")
