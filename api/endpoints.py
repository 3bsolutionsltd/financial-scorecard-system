from fastapi import APIRouter
from .endpoints import inventory, trading_accounts, risk_factors, scorecards, borrowers

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok"}

# Include sub-routers
router.include_router(borrowers.router)
router.include_router(inventory.router)
router.include_router(trading_accounts.router)
router.include_router(risk_factors.router)
router.include_router(scorecards.router)
