from fastapi import FastAPI, HTTPException, WebSocket , WebSocketDisconnect ,Query
from models import db, ChatModel, get_chat_by_room_id, save_new_chat
from fastapi.middleware.cors import CORSMiddleware
from wsManager import ConnectionManager

app = FastAPI() # API作成
manager = ConnectionManager()  # ConnectionManagerクラスのインスタンス化


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # スラッシュを削除
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    if db.is_closed():
        db.connect()
    db.create_tables([ChatModel])

@app.on_event("shutdown")
def shutdown():
    if not db.is_closed():
        db.close()

@app.get("/chat")
async def launch_chat(
    name: str = Query(None, description="The name of the user"), 
    password: str = Query(None, description="The password or keyword")
):
    if not name or not password:
        raise HTTPException(status_code=400, detail="Name and password are required")

    try:
        print(f"Fetching chats for name={name} and password={password}")
        chats = get_chat_by_room_id(name, password)
        if not chats:
            raise HTTPException(status_code=404, detail="No chats found")
        
        response = [
            {"id": chat.id, "username": chat.username, "keyword": chat.room_id, "content": chat.content} for chat in chats
        ]
        print(f"Response: {response}")
        return response
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error") 

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()  # JSON形式でデータを受信
            print(f"Received data: {data}")
            
            # 必要なキーが含まれているか確認
            if not all(key in data for key in ["username", "content"]):
                raise ValueError("Invalid data format")

            # Broadcastに渡すデータを構築
            broadcast_data = {
                "room_id": room_id,
                "username": data["username"],
                "content": data["content"],
            }
            await manager.broadcast(broadcast_data)

            # チャットをデータベースに保存（コメント解除で有効化）
            save_new_chat(data["username"], room_id, data["content"])

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast({"message": f"User left the room: {room_id}"})  # 辞書型で送信
    except Exception as e:
        print(f"Error in websocket: {e}")
