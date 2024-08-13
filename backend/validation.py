from fastapi import HTTPException

def not_found(car):
    if not car:
        raise HTTPException(status_code=404, detail="Not found")