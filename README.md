## 実行環境の構築方法
### backend側の環境構築
```bash
pip install -r ./backend/requirements.txt
pip install -r ./backend/websockets

```  

### frontend側の環境構築
### node.jsがインストールされているか確認
```bash
node -v
```
### インストールされていなかったら
```bash
brew install node
```


### 最新の状態に更新
```bash
brew upgrade node
```

### 環境構築
```bash
cd ./frontend
npm i
npm i react-router-dom
```

# 実行
## backend側でサーバーの立ち上げ
### 1.backendディレクトリに移動
```bash
cd ./backend 
```
### 2.　サーバ立ち上げ
```bash
uvicorn main:app --reload
```
## react実行(frontend側でサーバ立ち上げ)
### 1.frontendディレクトリに移動
```bash
cd ./frontend 
```
### 2.サーバ立ち上げ
```bash
npm run dev
```

## backend、frontendでサーバ立ち上げ後、frontend実行時に表示されるURLにアクセス
http://localhost:5173

----------------------------------------------------

# チャットアプリ

このプロジェクトは、**Python, FastAPI, React** を使用したウェブアプリケーションです。  
名前と合言葉を入力してチャットルームに入り、リアルタイムでチャットができるアプリを開発します。

---

## 特徴
- **チャット機能**  
  - 名前と合言葉で特定のチャットルームに参加可能
- **チャット履歴**  
  - 各チャットルームのメッセージ履歴をデータベースに保存
- **使いやすいUI**  
  - CSSで画面を整え、直感的な操作を提供

---

## 使用技術
### フロントエンド
- **React**  
  チャット画面の動的なUIを構築。

### バックエンド
- **FastAPI**  
  APIおよびサーバーサイドのロジックを担当。

### データベース
- **SQLite**（または他のリレーショナルデータベース）  
  メッセージ履歴やユーザー情報を管理。

### WebSocket
- Flask-SocketIOまたはFastAPIのWebSocketを使用し、リアルタイム通信を実現。

---

## 作業分担
| 作業内容                         | 担当者               |
|----------------------------------|----------------------|
| チームリーダー、指揮官            | **K22234 越田雅治** |
| 見た目を整える（CSS）            | **K23056 佐々木颯太** |
| ロジック 中身の実装               | **K23041 河内英二**   |
| データベースを作る               | **K23008 飯田樹靖**   |
| `main.py` の中身を作る、WebSocketを使う | **K23049 小島利光**   |
| Reactを使う、問題の修正           | **K23099 花田歩夢**   |

---
