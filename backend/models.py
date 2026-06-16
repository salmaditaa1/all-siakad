from sqlalchemy import text

def create_tables(db):

    db.execute(text("""
        CREATE TABLE IF NOT EXISTS users(
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE,
            password VARCHAR(255)
        )
    """))

    db.execute(text("""
        CREATE TABLE IF NOT EXISTS fakultas(
            id VARCHAR(10) PRIMARY KEY,
            nama VARCHAR(100)
        )
    """))

    db.execute(text("""
        CREATE TABLE IF NOT EXISTS prodi(
            id VARCHAR(10) PRIMARY KEY,
            nama VARCHAR(100),
            fakultas VARCHAR(100)
        )
    """))

    db.commit()