## チャットアプリ

このプロジェクトは、**Python, FastAPI, React** を使用したウェブアプリケーションです。  
名前と合言葉を入力してチャットルームに入り、リアルタイムでチャットができるアプリを開発します。

---

## 特徴
- **チャット機能**  
  - 名前と合言葉で特定のチャットルームに参加可能
  - テキストだけでなく、**画像、音声ファイル、URL** も送信可能
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

## プロジェクト構成
