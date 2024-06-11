CREATE OR REPLACE FUNCTION getFoodPagination(
    os IN INTEGER,
    lm IN INTEGER,
    filt IN jsonb
)
    RETURNS TABLE
            (
                foodId      INTEGER,
                name        VARCHAR,
                price       REAL,
                quantity    INTEGER,
                categoryId  INTEGER,
                createdTime TIMESTAMP
            )
AS
$$
SELECT f."foodId", f.name, f.price, f.quantity, f."categoryId", f."createdTime"
FROM "Food" AS f
WHERE (NOT filt ? 'categoryId' OR f."categoryId"::TEXT = filt ->> 'categoryId')
  AND (NOT filt ? 'minPrice' OR f.price >= (filt ->> 'minPrice')::REAL)
  AND (NOT filt ? 'maxPrice' OR f.price <= (filt ->> 'maxPrice')::REAL)
  AND (NOT filt ? 'minQuantity' OR f.quantity >= (filt ->> 'minQuantity')::INTEGER)
  AND (NOT filt ? 'maxQuantity' OR f.quantity <= (filt ->> 'maxQuantity')::INTEGER)
  AND f.active = TRUE
ORDER BY f."foodId"
OFFSET os ROWS FETCH NEXT lm ROWS ONLY;
$$
    LANGUAGE sql;
-- thêm order
-- từ order id sẽ theem trong orderFood
-- mỗi item trong orderlist sẽ lấy food id để check và lấy số lượng