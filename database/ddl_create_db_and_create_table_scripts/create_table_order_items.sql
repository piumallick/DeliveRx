-- Table: public.order_items

-- DROP TABLE public.order_items;

CREATE TABLE public.order_items
(
    order_id integer NOT NULL,
    medicine_id integer NOT NULL,
    stock_id integer NOT NULL,
    unit_selling_price numeric(7,4) NOT NULL DEFAULT 0,
    quantity integer NOT NULL DEFAULT 0,
    total_amt numeric(20,10) NOT NULL DEFAULT 0,
    CONSTRAINT order_items_pkey PRIMARY KEY (order_id, medicine_id, stock_id),
    CONSTRAINT order_items_stock FOREIGN KEY (stock_id)
        REFERENCES public.stock (stock_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT orders_order_items FOREIGN KEY (order_id)
        REFERENCES public.orders (order_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.order_items
    OWNER to postgres;