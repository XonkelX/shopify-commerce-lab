$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$hub = Join-Path $root 'docs/shopify'
$pages = @(
  'custom-section.md',
  'advanced-pdp.md',
  'bug-fix-lab.md',
  'product-configurator.md',
  'cart-purchase-logic.md',
  'performance-qa.md'
)
$requiredLabels = @(
  'Problem proved:',
  'Screenshot:',
  'Live demo:',
  'Short demo video:',
  'Technologies:',
  'Testing status:',
  'Relevant code:',
  'Jobs supported:'
)

$errors = [System.Collections.Generic.List[string]]::new()

foreach ($page in $pages) {
  $path = Join-Path $hub $page
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
    $errors.Add("Missing proof page: $page")
    continue
  }

  $content = Get-Content -LiteralPath $path -Raw
  foreach ($label in $requiredLabels) {
    if (-not $content.Contains($label)) {
      $errors.Add("$page is missing required field: $label")
    }
  }

}

$markdownFiles = Get-ChildItem -LiteralPath $hub -Filter '*.md' -File
foreach ($markdownFile in $markdownFiles) {
  $content = Get-Content -LiteralPath $markdownFile.FullName -Raw
  $links = [regex]::Matches($content, '!?(?:\[[^\]]*\])\(([^)]+)\)')
  foreach ($match in $links) {
    $target = $match.Groups[1].Value.Trim()
    if ($target -match '^(https?://|#)') { continue }
    $targetWithoutAnchor = ($target -split '#', 2)[0]
    $resolved = [System.IO.Path]::GetFullPath((Join-Path $markdownFile.DirectoryName $targetWithoutAnchor))
    if (-not (Test-Path -LiteralPath $resolved)) {
      $errors.Add("Broken local link in $($markdownFile.Name)`: $target")
    }
  }
}

$assetNames = @(
  'custom-section',
  'advanced-pdp',
  'bug-fix-lab',
  'product-configurator',
  'cart-purchase-logic',
  'performance-qa'
)
foreach ($name in $assetNames) {
  foreach ($extension in @('.png', '-demo.mp4')) {
    $asset = Join-Path $hub "assets/$name$extension"
    if (-not (Test-Path -LiteralPath $asset -PathType Leaf)) {
      $errors.Add("Missing evidence asset: $name$extension")
    } elseif ((Get-Item -LiteralPath $asset).Length -eq 0) {
      $errors.Add("Empty evidence asset: $name$extension")
    }
  }
}

if ($errors.Count -gt 0) {
  $errors | ForEach-Object { Write-Error $_ }
  exit 1
}

Write-Host "Phase 8 gate passed: $($pages.Count) proof pages, required fields, local links, screenshots, and demo videos verified."
