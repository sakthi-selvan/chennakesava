#!/usr/bin/env python3
"""Extract an optimized image sequence using a local FFmpeg executable.

Usage:
    python3 scripts/extract-frames.py
    python3 scripts/extract-frames.py --ffmpeg /path/to/ffmpeg

Requires FFmpeg with the libwebp encoder. No Python packages are required.
The source aspect ratio is preserved and frames are never enlarged.
"""

import argparse
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile


ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "source",
        nargs="?",
        type=Path,
        default=ROOT / "video/Create_an_elegant_modern_back.mp4",
    )
    parser.add_argument("--output", type=Path, default=ROOT / "public/frames")
    parser.add_argument("--fps", type=int, default=12)
    parser.add_argument("--quality", type=int, default=72)
    parser.add_argument("--ffmpeg", default=os.environ.get("FFMPEG_BIN", "ffmpeg"))
    args = parser.parse_args()

    if not args.source.is_file():
        parser.error(f"Video does not exist: {args.source}")
    if not shutil.which(args.ffmpeg):
        parser.error("FFmpeg was not found. Install it or pass --ffmpeg /path/to/ffmpeg.")
    if args.fps < 1 or not 0 <= args.quality <= 100:
        parser.error("FPS must be positive and quality must be between 0 and 100.")

    # FFmpeg reports the streams without requiring a separate ffprobe binary.
    metadata = subprocess.run(
        [args.ffmpeg, "-hide_banner", "-i", str(args.source)],
        capture_output=True,
        text=True,
        check=False,
    ).stderr
    dimensions = re.search(r"Video:.*?\b(\d{2,5})x(\d{2,5})\b", metadata)
    if not dimensions:
        parser.error(f"Could not read video dimensions.\n{metadata}")
    source_width, source_height = map(int, dimensions.groups())
    max_width, max_height = (1280, 720) if source_width > source_height else (720, 1280)
    ratio = min(1, max_width / source_width, max_height / source_height)
    width = max(2, int(source_width * ratio) // 2 * 2)
    height = max(2, int(source_height * ratio) // 2 * 2)

    args.output.mkdir(parents=True, exist_ok=True)
    # Encode completely before replacing an existing sequence.
    with tempfile.TemporaryDirectory(prefix="extract-frames-") as temporary:
        staging = Path(temporary)
        command = [
            args.ffmpeg, "-hide_banner", "-loglevel", "warning", "-y",
            "-i", str(args.source),
            "-vf", f"fps={args.fps},scale={width}:{height}",
            "-an", "-c:v", "libwebp", "-lossless", "0",
            "-quality", str(args.quality), "-compression_level", "6",
            str(staging / "frame_%04d.webp"),
        ]
        subprocess.run(command, check=True)
        frames = sorted(staging.glob("frame_*.webp"))
        if not frames:
            parser.error("FFmpeg did not produce any frames.")
        for old_frame in args.output.glob("frame_*.webp"):
            if re.fullmatch(r"frame_\d+\.webp", old_frame.name):
                old_frame.unlink()
        total_bytes = sum(frame.stat().st_size for frame in frames)
        for frame in frames:
            shutil.move(str(frame), str(args.output / frame.name))
        manifest = {
            "frameCount": len(frames),
            "fps": args.fps,
            "width": width,
            "height": height,
            "duration": len(frames) / args.fps,
            "pattern": "/frames/frame_{index}.webp",
            "digits": 4,
        }
        (args.output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
        print(f"Created {len(frames)} frames at {width}x{height}: {total_bytes / 1024 / 1024:.2f} MiB")


if __name__ == "__main__":
    main()
