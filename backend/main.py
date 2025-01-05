from fastapi import FastAPI, HTTPException
from models import db, ChatModel, get_chat_by_keyword
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173/"],
    allow_credentials=True,
    allow_methods=[""],
    allow_headers=[""],
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
async def launch_chat(name: str = "no_name", password: str = ""):
    try:
        chats = get_chat_by_keyword(name, password)
        if not chats:
            raise HTTPException(status_code=404, detail="No chats found")
        return [
            {"id": chat.id, "username": chat.username, "keyword": chat.keyword, "content": chat.content} for chat in chats
        ]
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")