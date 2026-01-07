CREATE TABLE Customers(
   id_customer SERIAL,
   email VARCHAR(250)  NOT NULL,
   phone VARCHAR(250)  NOT NULL,
   password_hash VARCHAR(250)  NOT NULL,
   created_at DATE NOT NULL,
   PRIMARY KEY(id_customer),
   UNIQUE(email)
);

CREATE TABLE Products(
   id_product SERIAL,
   level VARCHAR(10)  NOT NULL,
   test_url VARCHAR(250) ,
   price NUMERIC(15,2)   NOT NULL,
   title VARCHAR(250)  NOT NULL,
   language_code VARCHAR(10)  NOT NULL,
   PRIMARY KEY(id_product)
);

CREATE TABLE Purchases(
   id_purchase SERIAL,
   status VARCHAR(50) ,
   amount NUMERIC(15,2)   NOT NULL,
   currency VARCHAR(10)  NOT NULL,
   created_at DATE NOT NULL,
   product_id INTEGER NOT NULL,
   customer_id INTEGER NOT NULL,
   PRIMARY KEY(id_purchase),
   FOREIGN KEY(product_id) REFERENCES Products(id_product),
   FOREIGN KEY(customer_id) REFERENCES Customers(id_customer)
);

CREATE TABLE Payments(
   id_payment SERIAL,
   currency VARCHAR(50)  NOT NULL,
   amount NUMERIC(15,2)   NOT NULL,
   status VARCHAR(50) ,
   created_at DATE NOT NULL,
   provider_payment_id VARCHAR(250) ,
   payment_method VARCHAR(50)  NOT NULL,
   purchase_id INTEGER NOT NULL,
   PRIMARY KEY(id_payment),
   UNIQUE(purchase_id),
   FOREIGN KEY(purchase_id) REFERENCES Purchases(id_purchase)
);