Production Orders _(/api/productionOrder)_
=======

* [/](#/)
* [/:id](#/:id)

Data provenance from [Data.gov](http://www.data.gov/) ([DataSet](https://catalog.data.gov/dataset/purchase-order-quantity-price-detail-for-commodity-goods-procurements)).
# /

Gets all available production orders.

### Request

```
GET /api/productionOrder
```

### Reply

```typescript
{
    result: ProductionOrder[],
    totalRows: number
}
```

### Additional Parameters

```
--name Search all production orders starting with the given name.
--pageNumber Number of the page to start returning
--pageSize Number of results to return
```

# /:id

Gets the production order with the id given as parameter.
If no production order exists, throws an error 500.

### Request

```
GET /api/productionOrder/:id
```

### Reply

```typescript
<ProductionOrder>{}
```
