#Reto Bsale
[Bsale](https://dojiw2m9tvv09.cloudfront.net/4/8/img-logos-logo-bsale-naranjo.png?1757)

Tienda online básica

## ENDPOINTS API
[Lista de productos](#lista-de-productos)
[Filtrar productos por nombre](#filtrar-productos-por-nombre)
[Filtrar productos por categoría](#filtrar-productos-por-categoía)
[Lista de categorías](#lista-de-categorías)

### Lista de productos
Endpoint `dominio.ejemplo/products`
Método: GET
Se obtiene una lista de todos los productos de la BD.
```json
[
	{
		"category":1,
		"discount":20,
		"id":5,
		"name":"ENERGETICA MR BIG",
		"price":1490.0,
		"url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg"
	},
	{
		"category":1,
		"discount":0,
		"id":6,
		"name":"ENERGETICA RED BULL",
		"price":1490.0,
		"url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg"
	},
	...
]

```

### Filtrar productos por nombre
Endpoint `dominio.ejemplo/products/search/name/<string:name>`
Método: GET
Ejemplo request GET a `dominio.ejemplo/products/search/name/ner`
Se obtiene una lista de todos los productos que coincidan con \#ner\# de la BD.

Nota: '#' es un wildcard, es decir e*ner*getica coincide.
```json
[
	{
		"category":1,
		"discount":20,
		"id":5,
		"name":"ENERGETICA MR BIG",
		"price":1490.0,
		"url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg"
	},
	{
		"category":1,
		"discount":0,
		"id":6,
		"name":"ENERGETICA RED BULL",
		"price":1490.0,
		"url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg"
	},
	...
]
```

### Filtrar productos por categoría
Endpoint `dominio.ejemplo/products/category/<int:category_id>`
Método: GET
Ejemplo request GET a `dominio.ejemplo/products/category/2`
Se obtiene una lista de todos los productos que coincidan con la categoría de ID=2.

```json
[
	{
		"category":2,
		"discount":10,
		"id":8,
		"name":"PISCO ALTO DEL CARMEN 35\u00ba",
		"price":7990.0,
		"url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/alto8532.jpg"
	},
	{
		"category":2,
		"discount":0,
		"id":9,
		"name":"PISCO ALTO DEL CARMEN 40\u00ba ",
		"price":5990.0,
		"url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/alto408581.jpg"
	},
	...
]

```

### Lista de categorías
Endpoint `dominio.ejemplo/categories`
Método: GET
Se obtiene una lista de todas las categorías.
```json
[
	{
		"id":1,
		"name":"bebida energetica"
	},
	{
		"id":2,
		"name":"pisco"
	},
	{
		"id":3,
		"name":"ron"
	},
	...
]

```
