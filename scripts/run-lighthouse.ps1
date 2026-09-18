param(
  [string]$BaseUrl = 'https://oniel-lab.myshopify.com',
  [string]$ProductPath = '/products/atlas-insulated-bottle',
  [string]$CollectionPath = '/collections/all',
  [ValidateRange(1, 9)][int]$Runs = 3,
  [string]$PreviewThemeId = '',
  [string]$PreviewQuery = '',
  [string]$OutputDirectory = 'output/lighthouse'
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$outputRoot = Join-Path $projectRoot $OutputDirectory
$chromePath = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$lighthouseVersion = '12.8.2'

function Get-Median {
  param([double[]]$Values)
  $sorted = @($Values | Sort-Object)
  $middle = [math]::Floor($sorted.Count / 2)
  if ($sorted.Count % 2 -eq 1) { return $sorted[$middle] }
  return [math]::Round(($sorted[$middle - 1] + $sorted[$middle]) / 2, 3)
}

if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
  throw 'npx is required to run the pinned Lighthouse CLI.'
}
if (-not (Test-Path -LiteralPath $chromePath)) {
  throw "Chrome was not found at $chromePath."
}

New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null

$pages = [ordered]@{
  home = '/'
  product = $ProductPath
  collection = $CollectionPath
}
$results = @()

foreach ($page in $pages.GetEnumerator()) {
  for ($run = 1; $run -le $Runs; $run++) {
    $queryParts = @("qa_run=$run")
    if ($PreviewThemeId) { $queryParts += "preview_theme_id=$PreviewThemeId" }
    if ($PreviewQuery) { $queryParts += $PreviewQuery.TrimStart('?') }
    $url = "$($BaseUrl.TrimEnd('/'))$($page.Value)?$($queryParts -join '&')"
    $outputPath = Join-Path $outputRoot "$($page.Key)-run$run.json"

    Write-Output "Running Lighthouse: $($page.Key) $run/$Runs"
    & npx --yes "lighthouse@$lighthouseVersion" $url `
      --output=json `
      "--output-path=$outputPath" `
      "--chrome-path=$chromePath" `
      '--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage' `
      '--only-categories=performance,accessibility,best-practices,seo' `
      --quiet
    if ($LASTEXITCODE -ne 0) { throw "Lighthouse failed for $($page.Key), run $run." }

    $report = Get-Content -LiteralPath $outputPath -Raw | ConvertFrom-Json
    $results += [pscustomobject]@{
      page = $page.Key
      run = $run
      finalPath = ([uri]$report.finalUrl).AbsolutePath
      performance = [math]::Round($report.categories.performance.score * 100)
      accessibility = [math]::Round($report.categories.accessibility.score * 100)
      bestPractices = [math]::Round($report.categories.'best-practices'.score * 100)
      seo = [math]::Round($report.categories.seo.score * 100)
      lcpMs = [math]::Round($report.audits.'largest-contentful-paint'.numericValue)
      tbtMs = [math]::Round($report.audits.'total-blocking-time'.numericValue)
      cls = [math]::Round($report.audits.'cumulative-layout-shift'.numericValue, 3)
    }
  }
}

$medians = foreach ($pageName in $pages.Keys) {
  $pageRuns = @($results | Where-Object page -eq $pageName)
  [pscustomobject]@{
    page = $pageName
    performance = Get-Median $pageRuns.performance
    accessibility = Get-Median $pageRuns.accessibility
    bestPractices = Get-Median $pageRuns.bestPractices
    seo = Get-Median $pageRuns.seo
    lcpMs = Get-Median $pageRuns.lcpMs
    tbtMs = Get-Median $pageRuns.tbtMs
    cls = Get-Median $pageRuns.cls
  }
}

$summary = [ordered]@{
  generatedAt = (Get-Date).ToUniversalTime().ToString('o')
  environment = [ordered]@{
    os = [System.Environment]::OSVersion.VersionString
    node = (& node --version)
    chrome = (Get-Item -LiteralPath $chromePath).VersionInfo.ProductVersion
    lighthouse = $lighthouseVersion
    preset = 'Lighthouse mobile defaults with simulated throttling'
  }
  runsPerPage = $Runs
  medians = $medians
  runs = $results
}

$summaryPath = Join-Path $outputRoot 'summary.json'
$summary | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $summaryPath -Encoding utf8
$medians | Format-Table -AutoSize
Write-Output "Sanitized summary written to $summaryPath. Raw reports remain gitignored."
