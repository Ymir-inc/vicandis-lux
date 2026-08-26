#!/usr/bin/env bash
# Disposable GitHub Pages preview for showing the client.
# `next build` wipes out/, so the deploy checkout lives outside it.
set -euo pipefail

REPO=vicandislux-preview
OWNER=rusu-cristian
WORK=.deploy

export NEXT_PUBLIC_BASE_PATH="/$REPO"
export NEXT_PUBLIC_PREVIEW=1
# Absolute URLs (canonical, OG, sitemap, JSON-LD) resolve against the Pages origin.
export NEXT_PUBLIC_SITE_URL="https://$OWNER.github.io"

npx --no-install next build
touch out/.nojekyll

rm -rf "$WORK"
git clone -q --depth 1 "https://github.com/$OWNER/$REPO.git" "$WORK"
find "$WORK" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R out/. "$WORK"/

cd "$WORK"
git add -A
if git diff --cached --quiet; then
  echo "No changes to deploy."
else
  git -c user.email="rusucristian2002@gmail.com" -c user.name="Cristian Rusu" \
      commit -q -m "${1:-Update client preview}"
  git push -q origin HEAD:main
  echo "Deployed → https://$OWNER.github.io/$REPO/"
fi
