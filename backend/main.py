from fastapi import FastAPI, HTTPException, Query
from models import db, ChatModel, get_chat_by_keyword
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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
        chats = get_chat_by_keyword(name, password)
        if not chats:
            raise HTTPException(status_code=404, detail="No chats found")
        
        response = [
            {"id": chat.id, "username": chat.username, "keyword": chat.keyword, "content": chat.content} for chat in chats
        ]
        print(f"Response: {response}")
        return response
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
