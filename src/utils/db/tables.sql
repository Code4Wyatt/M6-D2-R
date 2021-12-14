
CREATE TABLE IF NOT EXISTS product
(
    product_id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    brand varchar(100) NOT NULL,
    image_url text NOT NULL,
    price integer NOT NULL,
    category varchar(100) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT product_pkey PRIMARY KEY (product_id)
)