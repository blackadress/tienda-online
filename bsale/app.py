from flask import Flask, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)
app.config["MYSQL_HOST"] = "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com"
app.config["MYSQL_USER"] = "bsale_test"
app.config["MYSQL_PASSWORD"] = "bsale_test"
app.config["MYSQL_DB"] = "bsale_test"

mysql = MySQL(app)


@app.route("/")
def home():
    return "Reto Bsale"


@app.route("/products", methods=["GET"])
def get_products():
    cur = mysql.connection.cursor()
    cur.execute("""SELECT * FROM product""")
    products = cur.fetchall()
    response = []
    for product in products:
        response.append(
            {
                "id": product[0],
                "name": product[1],
                "url_image": product[2],
                "price": product[3],
                "discount": product[4],
                "category": product[5],
            }
        )
    return jsonify(response)


@app.route("/products/search/name/<string:name>", methods=["GET"])
def get_products_by_name(name):
    cur = mysql.connection.cursor()
    cur.execute(
        """
        SELECT * FROM product AS p 
        WHERE UPPER(p.name) LIKE UPPER("%{}%")
        """.format(
            name
        ),
    )
    products = cur.fetchall()
    response = []
    for product in products:
        response.append(
            {
                "id": product[0],
                "name": product[1],
                "url_image": product[2],
                "price": product[3],
                "discount": product[4],
                "category": product[5],
            }
        )

    return jsonify(response)


@app.route("/products/category/<int:category_id>", methods=["GET"])
def get_products_by_category(category_id):
    cur = mysql.connection.cursor()
    cur.execute(
        """
        SELECT * FROM product AS p
        WHERE p.category = %s
        """,
        [category_id],
    )
    products = cur.fetchall()
    response = []
    for product in products:
        response.append(
            {
                "id": product[0],
                "name": product[1],
                "url_image": product[2],
                "price": product[3],
                "discount": product[4],
                "category": product[5],
            }
        )

    return jsonify(response)


@app.route("/categories", methods=["GET"])
def get_categories():
    cur = mysql.connection.cursor()
    cur.execute("""SELECT * FROM category""")
    categories = cur.fetchall()
    response = []
    for category in categories:
        response.append(
            {
                "id": category[0],
                "name": category[1],
            }
        )

    return jsonify(response)


if __name__ == "__main__":
    app.run(port=4000, debug=True)
