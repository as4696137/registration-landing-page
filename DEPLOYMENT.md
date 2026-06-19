# Deployment Guide

本專案的零預算部署建議：

- Frontend：GitHub Pages
- Backend：Render Free Web Service
- Database：Neon Free Postgres

## 1. 建立 GitHub repository

在 GitHub 建立 repository：

```txt
registration-landing-page
```

目前這個環境沒有 `gh` CLI，GitHub 連接器也沒有建立新 repo 的工具，所以 repo 需要你先在 GitHub 網站建立。

建立後，在本機專案根目錄執行：

```bash
git remote add origin https://github.com/as4696137/registration-landing-page.git
git branch -M main
git add .
git commit -m "Prepare GitHub Pages and Render deployment"
git push -u origin main
```

## 2. 設定 GitHub Pages

到 GitHub repo：

```txt
Settings -> Pages -> Build and deployment -> Source
```

選：

```txt
GitHub Actions
```

再到：

```txt
Settings -> Secrets and variables -> Actions -> Variables
```

新增 repository variable：

```txt
VITE_API_BASE_URL=https://registration-landing-page-api.onrender.com/api
```

推到 `main` 後，`.github/workflows/deploy-frontend.yml` 會自動部署前端。

前端網址會是：

```txt
https://as4696137.github.io/registration-landing-page/
```

## 3. 建立 Neon database

到 Neon 建立 Free Postgres project，取得 connection details。

你需要拆出這些值給 Render：

```env
DB_HOST=
DB_PORT=5432
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
DB_SSLMODE=require
```

如果 Neon 提供的是完整 connection string，也可以從其中拆出 host、database、user、password。

## 4. 建立 Render backend

到 Render 建立 Blueprint 或 Web Service。

建議用 repo 裡的 `render.yaml`：

```txt
New -> Blueprint -> Connect GitHub repo -> registration-landing-page
```

Render 會使用：

```txt
backend/Dockerfile
```

需要補上的環境變數：

```env
APP_KEY=
DB_HOST=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

`APP_KEY` 可在本機產生：

```bash
cd backend
php artisan key:generate --show
```

把輸出的 `base64:...` 填到 Render 的 `APP_KEY`。

## 5. 部署後檢查

後端成功後，測：

```txt
https://registration-landing-page-api.onrender.com/api/contest
```

應該會看到賽事設定 JSON。

前端成功後，打開：

```txt
https://as4696137.github.io/registration-landing-page/
```

再測報名頁與交件頁是否能呼叫 API。

## 注意事項

Render Free 會冷啟動，第一次呼叫 API 可能慢幾秒。

目前作品檔案上傳使用 Laravel local public disk。Render Free 沒有永久磁碟，服務重建後上傳檔案可能消失；作品集展示可以接受。若未來要正式收件，檔案應改存 S3、Cloudflare R2 或其他物件儲存。
