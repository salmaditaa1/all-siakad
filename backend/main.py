from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from controllers import auth_controller

from controllers import prodi_controller
from sqlalchemy import text
from controllers import fakultas_controller

from database import SessionLocal
from models import create_tables
from schemas import UserRegister, UserLogin
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    decode_token
)

from schemas import (
    ProdiCreate,
    ProdiUpdate,
    FakultasCreate,
    FakultasUpdate
)


app = FastAPI(
    title="SIAKAD API"
)
app.include_router(
    auth_controller.router
)
app.include_router(
    prodi_controller.router
)
app.include_router(
    fakultas_controller.router
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():

    db = SessionLocal()
    create_tables(db)
    db.close()


@app.get("/")
def root():

    return {
        "message": "SIAKAD API Running"
    }