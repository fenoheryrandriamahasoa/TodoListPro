# Script de verification des composants standalone
$files = Get-ChildItem -Path "src/app" -Recurse -Filter "*.component.ts"

Write-Host "Verification des composants..." -ForegroundColor Cyan

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    if ($content -match "standalone:\s*true") {
        Write-Host "ERREUR STANDALONE dans $($file.FullName)" -ForegroundColor Red
    } else {
        Write-Host "OK: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "`nVerification terminee!" -ForegroundColor Cyan