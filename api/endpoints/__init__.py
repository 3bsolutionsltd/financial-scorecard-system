from fastapi import APIRouter
from .borrowers import router as borrowers_router
from .inventory import router as inventory_router
from .trading_accounts import router as trading_accounts_router
from .risk_factors import router as risk_factors_router

router = APIRouter()

# Include sub-routers
router.include_router(borrowers_router)
router.include_router(inventory_router)
router.include_router(trading_accounts_router)
router.include_router(risk_factors_router)
