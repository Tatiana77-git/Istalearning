
INSERT INTO customers (email, phone, password_hash, created_at)
VALUES
  ('test1@mail.com', '+33600000001', 'hash_password_1', '2025-01-01'),
  ('test2@mail.com', '+33600000002', 'hash_password_2', '2025-01-02'),
  ('test3@mail.com', '+33600000003', 'hash_password_3', '2025-01-03');



INSERT INTO products (level, test_url, price, title, language_code)
VALUES
  ('A1', 'https://test.com/a1', 10.00, 'English Level A1', 'EN'),
  ('B1', 'https://test.com/b1', 10.00, 'English Level B1', 'EN'),
  ('B2', 'https://test.com/b2', 10.00, 'French Level B2', 'FR');


INSERT INTO purchases (status, amount, currency, created_at, product_id, customer_id)
VALUES
  ('paid',    10.00, 'EUR', '2025-01-10', 1, 1),
  ('paid',    10.00, 'EUR', '2025-01-11', 2, 2),
  ('pending', 10.00, 'EUR', '2025-01-12', 3, 3);




INSERT INTO payments (currency, amount, status, created_at, provider_payment_id, payment_method, purchase_id)
VALUES
  ('EUR', 10.00, 'success', '2025-01-10', 'PAYPAL_TX_001', 'paypal', 1),
  ('EUR', 10.00, 'success', '2025-01-11', 'CARD_TX_002',   'card',   2),
  ('EUR', 10.00, 'pending', '2025-01-12', NULL,            'card',   3);
