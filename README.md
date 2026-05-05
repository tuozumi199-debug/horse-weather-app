# 馬場天気 🐴

乗馬競技場ごとの時間別天気予報を、スマートフォンで確認しやすい形にしたWebアプリです。
主な用途は、夜間の馬着判断、翌日の試合準備、現地の雨・風・気温の確認です。

## 1. 中身の確認

このプロジェクトは、React + TypeScript + Vite + Recharts で作成されています。

主なファイル構成は以下です。

```text
horse-weather-app/
├─ README.md
├─ SPEC.md
├─ package.json
├─ vite.config.ts
├─ index.html
├─ public/
│  └─ manifest.json
├─ src/
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ styles.css
│  ├─ components/
│  │  ├─ VenueSelector.tsx
│  │  ├─ TimeRangeSelector.tsx
│  │  ├─ WeatherCharts.tsx
│  │  ├─ WeatherTooltip.tsx
│  │  └─ HourlyTable.tsx
│  ├─ data/
│  │  └─ venues.json
│  ├─ services/
│  │  └─ openMeteo.ts
│  ├─ types/
│  │  └─ weather.ts
│  └─ utils/
│     ├─ dateRange.ts
│     └─ formatWeather.ts
└─ .github/
   └─ workflows/
      └─ deploy.yml
```

## 2. GitHubにアップロードする手順

### ブラウザだけで行う場合

1. GitHubにログインする
2. 右上の `+` から `New repository` を選ぶ
3. Repository name に例として `horse-weather-app` と入力する
4. Public または Private を選ぶ
5. `Create repository` を押す
6. 作成したリポジトリ画面で `Add file` → `Upload files` を選ぶ
7. ZIPを解凍して、中の `horse-weather-app` フォルダの中身をすべてアップロードする
8. `Commit changes` を押す

注意：ZIPファイルそのものではなく、解凍後の中身をアップロードしてください。

### PCでGitを使う場合

```bash
cd horse-weather-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ユーザー名/horse-weather-app.git
git push -u origin main
```

## 3. GitHub Pagesで公開する手順

1. GitHubのリポジトリを開く
2. `Settings` を開く
3. 左メニューの `Pages` を開く
4. `Build and deployment` の `Source` を `GitHub Actions` にする
5. `main` ブランチにpushする
6. `Actions` タブで `Deploy to GitHub Pages` が成功するのを待つ
7. 成功後、PagesのURLを開く

## 4. コードを修正・機能追加する場所

### 競技場を追加・修正する

`src/data/venues.json` を編集します。

```json
{
  "id": "example",
  "name": "表示名",
  "fullName": "正式名称",
  "prefecture": "都道府県",
  "latitude": 35.0000,
  "longitude": 139.0000
}
```

### グラフの表示項目を変える

`src/components/WeatherCharts.tsx` を編集します。

### 表の列を変える

`src/components/HourlyTable.tsx` を編集します。

### Open-Meteoから取得する項目を変える

`src/services/openMeteo.ts` を編集します。

### デザインを変える

`src/styles.css` を編集します。

### 表示時間枠を変える

`src/utils/dateRange.ts` と `src/components/TimeRangeSelector.tsx` を編集します。

## 5. ローカルで動かす方法

PCで確認する場合は、Node.jsを入れた上で以下を実行します。

```bash
npm install
npm run dev
```

ビルド確認は以下です。

```bash
npm run build
```

## 6. 機能一覧

- 競技場切替
- 今日＋明日表示
- 夜間〜翌日表示
- 明日だけ表示
- 試合期間指定
- カスタム日時指定
- 気温・体感温度グラフ
- 降水量・降水確率グラフ
- 平均風速グラフ
- グラフ上の時間別ツールチップ
- ページ下部の毎時データ表
- 現在時刻の赤線表示
- 現在時刻の表行強調

## 7. データソース

Open-Meteo Forecast APIを使用しています。
APIキーは不要です。

## 8. 仕様書

詳細仕様は `SPEC.md` を確認してください。
