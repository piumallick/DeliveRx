-- Table: public.stock

-- DROP TABLE public.stock;

CREATE TABLE public.stock
(
    stock_id integer NOT NULL DEFAULT nextval('stock_stock_id_seq'::regclass),
    supply_date date NOT NULL,
    overhead_pct double precision NOT NULL,
    total_cost numeric(20,10) NOT NULL DEFAULT 0,
    supplier_id integer NOT NULL,
    CONSTRAINT stock_pkey PRIMARY KEY (stock_id),
    CONSTRAINT supplier_stock_details FOREIGN KEY (supplier_id)
        REFERENCES public.supplier (supplier_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.stock
    OWNER to postgres;