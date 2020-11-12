-- Table: public.orders

-- DROP TABLE public.orders;

CREATE TABLE public.orders
(
    order_id integer NOT NULL DEFAULT nextval('orders_order_id_seq'::regclass),
    total_amt numeric(20,10) NOT NULL,
    order_date date NOT NULL,
    user_id integer NOT NULL,
    store_id integer NOT NULL,
    CONSTRAINT orders_pkey PRIMARY KEY (order_id),
    CONSTRAINT store_cust_orders FOREIGN KEY (store_id)
        REFERENCES public.store (store_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_orders FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.orders
    OWNER to postgres;