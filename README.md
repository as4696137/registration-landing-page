# registration-landing-page

> [!IMPORTANT]
> 此作品為簡訊設計外包工程測試考題，設計稿由簡訊設計提供，該專案僅供簡訊設計面試時使用，不另做其它用途。

這是一套「初聲新聞獎」活動網站與報名/交件系統。前端使用 React、TypeScript、Vite、Tailwind CSS 與 Framer Motion 製作活動頁、導覽列、頁面轉場、報名表單與交件流程；後端放在 `backend/`，使用 Laravel 提供賽事設定、報名資料與交件資料 API。

## 功能範圍

- 首頁活動介紹：Hero、關於初聲、賽事說明、評審/獎勵、入圍作品、報名詳情。
- Navbar 導覽：首頁 section smooth scroll、跨頁回首頁定位、報名與交件 CTA。
- 頁面轉場：Framer Motion 驅動的 SVG 星形放大轉場、首頁綠底轉場、初次載入遮罩、首頁 section 進場動畫。
- 報名流程：建立團隊資料、選擇獎項、填寫聯絡人與成員，送出後取得報名編號。
- 交件流程：用報名編號查詢團隊資料，建立或更新作品交件資料，可上傳檔案。
- 設計系統：抽出 Button、Card、Field、Input、Tag、SectionTitle 等基礎元件與 Tailwind tokens。

## 技術棧

| Layer | Tech |
| --- | --- |
| Frontend | React 18, TypeScript, Vite 5 |
| Styling | Tailwind CSS, custom utility classes |
| Animation | Framer Motion |
| Routing | React Router DOM |
| API client | Fetch wrapper in `src/utils/contestApi.ts` |
| Backend | Laravel 13, PHP 8.3+ |
| Database | Neon Postgres for deployment, SQLite for local development |

## 專案結構

```txt
.
├── src/
│   ├── assets/                 # 首頁、Navbar、Footer 圖像資產
│   ├── components/             # Layout、Navbar、Footer、PageTransition、首頁 sections
│   ├── design-system/          # 可重用 UI atoms 與 tokens
│   ├── pages/                  # HomePage、RegisterPage、SubmitPage
│   ├── utils/                  # API、scroll、motion presets、表單錯誤處理
│   ├── routes.tsx              # React Router routes
│   └── tailwind.css            # Tailwind layers + custom utilities
├── backend/
│   ├── app/                    # Laravel models, requests, resources, controllers
│   ├── config/contest.php      # 賽事名稱、期間、獎項、檔案限制
│   ├── database/migrations/    # registrations / submissions tables
│   └── routes/api.php          # REST API routes
├── vite.config.ts              # Vite + /api proxy
├── tailwind.config.js          # Tailwind tokens and animations
└── package.json                # Frontend scripts and dependencies
```

## 環境需求

- Node.js 18+，建議 20+
- npm
- PHP 8.3+
- Composer

前端可以獨立啟動；若要測試報名與交件表單，需要同時啟動 Laravel backend。

## 快速啟動

### 1. 安裝前端

```bash
npm install
```

### 2. 啟動後端 API

```bash
cd backend
composer install
cp .env.local.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
php artisan storage:link
php artisan serve --host=127.0.0.1 --port=8000
```

後端預設在 `http://127.0.0.1:8000`。根目錄 `vite.config.ts` 已設定 `/api` proxy，所以前端可以直接呼叫 `/api/...`。

### 3. 啟動前端

另開一個 terminal，在專案根目錄執行：

```bash
npm run dev
```

Vite 預設使用 `http://localhost:3000`。若 port 被占用，Vite 會自動改用下一個可用 port，請以 terminal 顯示的 `Local:` URL 為準。

## 常用 scripts

```bash
npm run dev      # 啟動 Vite dev server
npm run build    # TypeScript build + Vite production build
npm run lint     # ESLint
npm run preview  # 預覽 production build
```

Backend：

```bash
cd backend
composer run serve
composer run test
```

## 前端路由

| Route | Page | Description |
| --- | --- | --- |
| `/` | `HomePage` | 活動首頁與所有介紹 section |
| `/register` | `RegisterPage` | 報名表單 |
| `/submit` | `SubmitPage` | 交件查詢與作品上傳 |

所有頁面都包在 `MainLayout` 中，包含 `Navbar`、`Footer` 與 `PageTransitionProvider`。

## API

Frontend API wrapper 位於 `src/utils/contestApi.ts`。本機預設走 `/api`，部署時可用 `VITE_API_BASE_URL` 指向遠端 Laravel API。

| Method | Endpoint | 用途 |
| --- | --- | --- |
| `GET` | `/api/contest` | 取得賽事設定、期間、獎項、隊伍人數、檔案限制 |
| `POST` | `/api/registrations` | 建立報名資料並回傳報名編號 |
| `GET` | `/api/registrations/{registrationCode}` | 用報名編號查詢團隊與交件狀態 |
| `POST` | `/api/submissions` | 建立或更新交件資料，支援檔案上傳 |

### 報名 payload

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

### 交件 payload

`POST /api/submissions` 使用 `multipart/form-data`：

| Field | Required | Description |
| --- | --- | --- |
| `registration_code` | Yes | 報名編號，例如 `FSN-220301-AB12CD` |
| `work_title` | Yes | 作品名稱，最多 160 字 |
| `work_summary` | Yes | 作品摘要，最多 3000 字 |
| `strategy_statement` | No | 策略單內容，最多 8000 字 |
| `work_file` | No | `pdf/doc/docx/ppt/pptx/zip`，預設上限 20MB |

## 賽事設定

賽事內容集中在 `backend/config/contest.php`：

- `name`：賽事名稱
- `registration_period`：報名期間
- `submission_period`：交件期間
- `team_size`：隊伍人數限制
- `awards`：三大獎項 key/name/prompt
- `submission_file`：交件檔案儲存位置、大小與副檔名限制

可以透過 `.env` 覆寫日期：

```env
CONTEST_REGISTRATION_START=2022-03-01
CONTEST_REGISTRATION_END=2022-05-25
CONTEST_SUBMISSION_START=2022-03-01
CONTEST_SUBMISSION_END=2022-07-10
```

## 動畫與轉場

動畫主要集中在：

- `src/components/PageTransition.tsx`
- `src/components/PageTransitionContext.ts`
- `src/components/Navbar.tsx`
- `src/components/homepage/SectionMotion.tsx`
- `src/utils/motionPresets.ts`

目前使用 Framer Motion 實作：

- 初次載入：綠底 overlay 第一幀即覆蓋全螢幕，避免先露出首頁內容，再往下退場。
- 點 `點我報名` / `交件專區`：Navbar SVG 多邊形從按鈕位置放大到全螢幕，接著黃底淡掉並顯示目標頁。
- 點 Logo 或首頁 section nav 從其他頁回首頁：使用另一套綠底轉場，完成後切回首頁或定位到指定 section。
- Navbar CTA 背景：SVG 多邊形與右下角陰影分層，兩者自轉，陰影位置固定偏右下。
- 首頁 section：進入 viewport 時套用 staggered fade/translate 進場。

## Styling 與設計系統

專案已從 styled-components 改為 Tailwind CSS。主要設定：

- `tailwind.config.js`：字體、brand colors、section colors、hard shadows、display font sizes、marquee keyframes。
- `src/tailwind.css`：base reset、grid background utilities、title shadow、text stroke。
- `src/design-system/`：以現有視覺語言抽出的 atoms。

Design system 已有獨立文件：`src/design-system/README.md`。

常用 tokens：

```txt
bg-brand / bg-brand-hover
text-ink / text-body / text-danger
bg-section-green / bg-section-mint / bg-section-blue
drop-shadow-hard-sm / drop-shadow-hard-md / drop-shadow-hard-lg
text-display-sm / text-display-md / text-display-lg
```

## TypeScript 規則

`tsconfig.app.json` 設定：

- `strict: true`
- `allowJs: false`
- `noUnusedLocals: true`
- `noUnusedParameters: true`

也就是 `src/` 內應維持 TypeScript-only，新增 React component 使用 `.tsx`。

## Backend data model

Laravel backend 目前有兩個主要 model：

- `Registration`
  - UUID primary key
  - `registration_code`
  - team/contact/award/members/status
  - has one `Submission`
- `Submission`
  - UUID primary key
  - belongs to `Registration`
  - work title/summary/strategy/file/status/submitted_at

報名編號格式由 `RegistrationController` 產生：

```txt
FSN-{YYMMDD}-{6 random chars}
```

例如：

```txt
FSN-220301-AB12CD
```

## 驗證與建置

提交前建議執行：

```bash
npm run lint
npm run build
```

Backend 若有 PHP 變更：

```bash
cd backend
php artisan route:list --path=api
php artisan migrate
```

若需要重置本機測試資料，才使用 `php artisan migrate:fresh`。

目前 `npm run build` 可能出現 Vite chunk size warning，主因是 `framer-motion` 與前端 bundle 體積；這是 warning，不代表 build 失敗。若正式部署需要控制 bundle，可再做 route-level code splitting 或手動 chunk。

## 部署備註

Frontend GitHub Pages：

```bash
npm run build
```

產物輸出到 `dist/`。正式部署由 `.github/workflows/deploy-frontend.yml` 自動處理，並會把 `dist/index.html` 複製成 `dist/404.html` 支援 React Router deep links。

Backend Render：

```bash
cd backend
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
```

正式環境請使用 Neon Postgres，並在 Render 設定：

- `APP_KEY` 已生成
- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL=https://registration-landing-page-api.onrender.com`
- `FRONTEND_URL=https://as4696137.github.io`
- `DB_CONNECTION=pgsql`
- `DB_HOST` / `DB_DATABASE` / `DB_USERNAME` / `DB_PASSWORD` 使用 Neon connection details

完整零預算部署步驟請看 `DEPLOYMENT.md`。

## Troubleshooting

### Vite port 被占用

Vite 會自動嘗試下一個 port。請看 terminal 的 `Local:` URL。

### 報名或交件頁沒有獎項資料

確認 Laravel backend 已啟動在 `127.0.0.1:8000`，並且 Vite dev server 是從根目錄啟動，才能吃到 `/api` proxy。

### SQLite local database 不存在

```bash
cd backend
touch database/database.sqlite
php artisan migrate
```

### 上傳檔案 URL 無法讀取

```bash
cd backend
php artisan storage:link
```

並確認 `.env`：

```env
FILESYSTEM_DISK=public
```
