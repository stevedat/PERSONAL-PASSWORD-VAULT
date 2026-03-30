#!/bin/bash
# Remove hanging console.log blocks that broke syntax
sed -i '' -e '/console\.log(/,/}/d' src/lib/auto-backup.ts
sed -i '' -e '/console\.log(/,/}/d' src/lib/backup.ts
sed -i '' -e '/console\.log(/,/}/d' src/lib/restore.ts
sed -i '' -e '/console\.log(/,/}/d' src/routes/+page.svelte
