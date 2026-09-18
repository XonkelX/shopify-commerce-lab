param(
  [switch]$SkipThemeCheck
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$themeRoot = Join-Path $projectRoot 'theme'
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCommand) {
  throw 'Node.js is required for standards-compliant JSON validation.'
}
$jsonFileValidator = "const fs=require('fs');let s=fs.readFileSync(process.argv[1],'utf8').replace(/^\s*\/\*[\s\S]*?\*\/\s*/,'');JSON.parse(s);"
$jsonStdinValidator = "let s='';process.stdin.setEncoding('utf8');process.stdin.on('data',d=>s+=d);process.stdin.on('end',()=>JSON.parse(s));"

$requiredPaths = @(
  '.github/workflows/quality.yml',
  'docs/evidence/phase-7-completion.md',
  'docs/evidence/phase-7-reproduction.md',
  'docs/test-results/phase-7-quality.md',
  'scripts/run-lighthouse.ps1',
  'theme/sections/cart-drawer.liquid',
  'theme/sections/product.liquid'
)

foreach ($relativePath in $requiredPaths) {
  if (-not (Test-Path -LiteralPath (Join-Path $projectRoot $relativePath))) {
    throw "Missing required Phase 7 path: $relativePath"
  }
}

Get-ChildItem -LiteralPath $themeRoot -Recurse -Filter '*.json' | ForEach-Object {
  $jsonPath = $_.FullName
  & node -e $jsonFileValidator $jsonPath
  if ($LASTEXITCODE -ne 0) {
    throw "Invalid JSON in ${jsonPath}."
  }
}

Get-ChildItem -LiteralPath $themeRoot -Recurse -Filter '*.liquid' | ForEach-Object {
  $source = Get-Content -LiteralPath $_.FullName -Raw
  foreach ($match in [regex]::Matches($source, '(?s){%\s*schema\s*%}(.*?){%\s*endschema\s*%}')) {
    $match.Groups[1].Value | & node -e $jsonStdinValidator
    if ($LASTEXITCODE -ne 0) {
      throw "Invalid schema JSON in $($_.FullName)."
    }
  }
}

$suppressions = Get-ChildItem -LiteralPath $themeRoot -Recurse -File |
  Select-String -Pattern 'theme-check-(disable|enable)' -CaseSensitive:$false
if ($suppressions) {
  throw 'Theme Check suppressions exist. Document and review them before Phase 7 can pass.'
}

$productSource = Get-Content -LiteralPath (Join-Path $themeRoot 'sections/product.liquid') -Raw
$drawerSource = Get-Content -LiteralPath (Join-Path $themeRoot 'sections/cart-drawer.liquid') -Raw

$invariants = @(
  @{ Pass = $productSource.Contains('role="group" aria-label="Choose product image"'); Message = 'Product thumbnails must expose a valid named group.' },
  @{ Pass = $productSource.Contains('Free shipping over $75'); Message = 'PDP shipping copy must match the cart goal.' },
  @{ Pass = $drawerSource.Contains('"default": 75'); Message = 'Cart free-shipping goal must remain $75.' },
  @{ Pass = $drawerSource.Contains('<dialog'); Message = 'Cart drawer must use native dialog semantics.' },
  @{ Pass = $drawerSource.Contains('aria-labelledby="CartDrawerHeading"'); Message = 'Cart dialog must have an accessible name.' },
  @{ Pass = $drawerSource.Contains('role="status"'); Message = 'Cart status updates must remain announced.' }
)

foreach ($invariant in $invariants) {
  if (-not $invariant.Pass) {
    throw $invariant.Message
  }
}

if (-not $SkipThemeCheck) {
  if (-not (Get-Command shopify -ErrorAction SilentlyContinue)) {
    throw 'Shopify CLI is required. Re-run with -SkipThemeCheck only when CI runs Theme Check separately.'
  }

  Push-Location $projectRoot
  try {
    shopify theme check --path theme --fail-level warning
    if ($LASTEXITCODE -ne 0) {
      throw 'Theme Check failed at warning severity.'
    }
  }
  finally {
    Pop-Location
  }
}

Write-Output 'Phase 7 quality gates passed: JSON/schema validation, no suppressions, accessibility invariants, and shipping-copy consistency.'
