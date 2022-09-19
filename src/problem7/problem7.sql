-- recently made a trade: block_height > 730000
-- wallet has at least 500
-- 1. usdc is worth $0.000001
-- 2. swth is worth $0.00000005
-- 3. tmz is worth $0.003
-- don't store usd value of denom in db

select
    *
from
    balances b
    INNER join trades t on b.address = t.address
where
    (
        b.amount * (
            CASE
                WHEN b.denom = 'tmz' then 0.003
                when b.denom = 'swth' then 0.00000005
                when b.denom = 'usdc' then 1
            END
        )
    ) > 50
    and t.block_height > 73000;