$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$requiredPaths = @(
  'theme',
  'docs/case-studies',
  'docs/evidence/inventory.md',
  'docs/evidence/job-mapping.md',
  'docs/screenshots',
  'docs/test-results/phase-0-local-validation.md',
  'docs/market-readiness.md',
  'README.md'
)

foreach ($relativePath in $requiredPaths) {
  $fullPath = Join-Path $projectRoot $relativePath
  if (-not (Test-Path -LiteralPath $fullPath)) {
    throw "Missing required Phase 0 path: $relativePath"
  }
}

$shopifyCommand = Get-Command shopify -ErrorAction SilentlyContinue
if (-not $shopifyCommand) {
  throw 'Shopify CLI is not installed or is not available on PATH.'
}

Push-Location $projectRoot
try {
  shopify version
  if ($LASTEXITCODE -ne 0) {
    throw 'Unable to execute Shopify CLI.'
  }

  shopify theme check --path theme
  if ($LASTEXITCODE -ne 0) {
    throw 'Theme Check failed.'
  }
}
finally {
  Pop-Location
}

Write-Output 'Phase 0 local checks passed. Remote Shopify authentication and preview verification are separate required gates.'

