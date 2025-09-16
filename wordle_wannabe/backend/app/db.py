import asyncpg
from .core.config import settings

async def get_connection():
    return await asyncpg.connect(settings.database_url)
