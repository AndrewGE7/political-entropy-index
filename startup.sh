#!/bin/sh
# Restart contract: bring up the preview server on 0.0.0.0:8080 if it is down.
if curl -sf http://127.0.0.1:8080/ >/dev/null 2>&1; then
  exit 0
fi
cd /workspace || exit 1
npm run dev >/tmp/pei-dev.log 2>&1 &
# Wait briefly for the listener so revive is not racing the proxy.
for i in 1 2 3 4 5 6 7 8 9 10; do
  if curl -sf http://127.0.0.1:8080/ >/dev/null 2>&1; then
    exit 0
  fi
  sleep 0.4
done
exit 0
