-- Table: public.has_stock_supply

-- DROP TABLE public.has_stock_supply;

CREATE TABLE public.has_stock_supply
(
    stock_id integer NOT NULL,
    supplier_id integer NOT NULL,
    unit_cost_price numeric(7,4) NOT NULL DEFAULT 0,
    medicine_id integer NOT NULL,
    manufacture_date date NOT NULL,
    expiry_date date NOT NULL,
    quantity integer NOT NULL DEFAULT 0,
    total_cost numeric(20,10) NOT NULL DEFAULT 0,
    CONSTRAINT has_stock_supply_pkey PRIMARY KEY (stock_id, supplier_id, medicine_id),
    CONSTRAINT med_details FOREIGN KEY (medicine_id)
        REFERENCES public.medicine (medicine_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT stock_details FOREIGN KEY (stock_id)
        REFERENCES public.stock (stock_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT supplier_details FOREIGN KEY (supplier_id)
        REFERENCES public.supplier (supplier_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.has_stock_supply
    OWNER to postgres;