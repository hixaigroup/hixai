#!/usr/bin/env bash
# ============================================================================
# rebrand-to-hixai.sh (macOS-compatible)
#
# Automated rebranding script: HixAI → HixAI
# Run this from the ROOT of your cloned hixai repo.
#
# Usage:
#   chmod +x rebrand-to-hixai.sh
#   ./rebrand-to-hixai.sh
# ============================================================================

set -euo pipefail

# -- Configuration -----------------------------------------------------------
NEW_GITHUB_ORG="hixaigroup"
NEW_REPO_NAME="hixai"
NEW_DOMAIN="hixai.com"
NEW_BRAND_UPPER="HixAI"
NEW_BRAND_LOWER="hixai"
NEW_SCOPE="@hixai"
NEW_COPYRIGHT="HixAI Group"
# ----------------------------------------------------------------------------

echo "============================================"
echo "  HixAI → ${NEW_BRAND_UPPER} Rebranding"
echo "============================================"
echo ""

# Safety check
if [ ! -f "package.json" ]; then
  echo "ERROR: No package.json found. Run this from the repo root."
  exit 1
fi

if ! grep -q "hixai" package.json 2>/dev/null; then
  echo "WARNING: package.json doesn't mention 'hixai'. Already rebranded?"
  read -p "Continue anyway? (y/N): " confirm
  [[ "$confirm" =~ ^[Yy]$ ]] || exit 0
fi

echo "Step 1/6: Running string replacements (longest patterns first)..."
echo ""

# Function to do a replacement across all matching files
do_replace() {
  local pattern="$1"
  local replacement="$2"

  # Find all text files, excluding binaries and generated stuff
  local count=0
  while IFS= read -r file; do
    if grep -q "$pattern" "$file" 2>/dev/null; then
      if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s|${pattern}|${replacement}|g" "$file"
      else
        sed -i "s|${pattern}|${replacement}|g" "$file"
      fi
      count=$((count + 1))
    fi
  done < <(find . \
    -not -path '*/node_modules/*' \
    -not -path '*/.git/*' \
    -not -path '*/dist/*' \
    -not -path '*/.next/*' \
    -not -path '*/build/*' \
    -not -path '*/.pnpm/*' \
    -not -name 'pnpm-lock.yaml' \
    -not -name '*.png' -not -name '*.jpg' -not -name '*.jpeg' \
    -not -name '*.gif' -not -name '*.webp' -not -name '*.webm' \
    -not -name '*.woff' -not -name '*.woff2' -not -name '*.ttf' \
    -not -name '*.eot' -not -name '*.ico' -not -name '*.zip' \
    -type f 2>/dev/null)

  if [ "$count" -gt 0 ]; then
    printf "  %-40s → %-30s (%d files)\n" "$pattern" "$replacement" "$count"
  fi
}

# ORDER MATTERS: longest/most-specific patterns first
do_replace "hixaigroup/hixai"  "${NEW_GITHUB_ORG}/${NEW_REPO_NAME}"
do_replace "@hixai/"          "${NEW_SCOPE}/"
do_replace "hixai"            "${NEW_BRAND_LOWER}"
do_replace "HIXAI_"             "HIXAI_"
do_replace "hixai\.ing"         "${NEW_DOMAIN}"
do_replace "HixAI"              "${NEW_BRAND_UPPER}"
do_replace "hixai"              "${NEW_BRAND_LOWER}"

echo ""
echo "Step 2/6: Updating LICENSE copyright..."
if [ -f "LICENSE" ]; then
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/© 2026 HixAI/© 2026 ${NEW_COPYRIGHT}/g" LICENSE 2>/dev/null || true
  else
    sed -i "s/© 2026 HixAI/© 2026 ${NEW_COPYRIGHT}/g" LICENSE 2>/dev/null || true
  fi
  echo "  Updated LICENSE."
fi

echo ""
echo "Step 3/6: Checking for ClipMart references..."
find . -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/dist/*' -type f 2>/dev/null | while IFS= read -r file; do
  if grep -qi "clipmart" "$file" 2>/dev/null; then
    echo "  Note: ClipMart reference in $file — review manually."
  fi
done || true

echo ""
echo "Step 4/6: Removing stale lockfile..."
if [ -f "pnpm-lock.yaml" ]; then
  rm pnpm-lock.yaml
  echo "  Deleted pnpm-lock.yaml."
fi

echo ""
echo "Step 5/6: Cleaning build artifacts..."
rm -rf node_modules dist 2>/dev/null || true
echo "  Cleared node_modules and dist."

echo ""
echo "Step 6/6: Final verification scan..."
REMAINING=$(find . \
  -not -path '*/node_modules/*' \
  -not -path '*/.git/*' \
  -not -path '*/dist/*' \
  -not -name '*.png' -not -name '*.jpg' -not -name '*.webm' \
  -type f 2>/dev/null | xargs grep -rl "hixai" 2>/dev/null | head -20 || true)

if [ -n "$REMAINING" ]; then
  echo ""
  echo "  ⚠️  Remaining 'hixai' references found in:"
  echo "$REMAINING" | sed 's/^/    /'
  echo ""
  echo "  Review these manually — may be image filenames or comments."
else
  echo "  ✅ No remaining 'hixai' references found!"
fi

echo ""
echo "============================================"
echo "  Rebranding complete!"
echo "============================================"
echo ""
echo "Next steps:"
echo "  1. pnpm install"
echo "  2. pnpm build"
echo "  3. pnpm dev"
echo ""
echo "  Then open http://127.0.0.1:3100 and verify HixAI branding."
echo ""
