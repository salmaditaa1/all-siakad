from pydantic import BaseModel

class UserRegister(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str


class ProdiCreate(BaseModel):
    id: str
    nama: str
    fakultas: str


class ProdiUpdate(BaseModel):
    nama: str
    fakultas: str


class FakultasCreate(BaseModel):
    id: str
    nama: str


class FakultasUpdate(BaseModel):
    nama: str