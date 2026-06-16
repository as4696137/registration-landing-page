# Laravel backend

這個後端依目前首頁內容先規劃成「初聲新聞獎」報名與交件 API。

## 功能範圍

- `GET /api/contest`：取得賽事設定、報名/交件期間、獎項、檔案限制。
- `POST /api/registrations`：建立報名資料，回傳報名編號。
- `GET /api/registrations/{registrationCode}`：用報名編號查詢團隊與交件狀態。
- `POST /api/submissions`：用報名編號建立或更新交件資料，可上傳作品檔案。

## 本機啟動

在有 PHP 8.3+ 與 Composer 的環境中執行：

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
php artisan storage:link
php artisan serve --host=127.0.0.1 --port=8000
```

前端 Vite 開在 `http://localhost:3000` 時，CORS 已允許呼叫 `http://localhost:8000/api/*`。根目錄的 Vite 設定也已加入 `/api` proxy，可在前端直接呼叫 `/api/...`。

## 報名 payload

```json
{
  "team_name": "新聞實驗室",
  "award_key": "audience_insight",
  "contact_name": "王小明",
  "contact_email": "ming@example.com",
  "contact_phone": "0912345678",
  "members": [
    {
      "name": "王小明",
      "email": "ming@example.com",
      "age": 24,
      "role": "企劃",
      "school_or_company": "某某大學"
    }
  ]
}
```

## 交件 payload

用 `multipart/form-data`：

- `registration_code`
- `work_title`
- `work_summary`
- `strategy_statement`
- `work_file`：可選，支援 `pdf/doc/docx/ppt/pptx/zip`，預設上限 20MB。
