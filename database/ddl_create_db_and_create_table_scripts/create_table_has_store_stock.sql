-- Table: public.has_store_stock

-- DROP TABLE public.has_store_stock;

CREATE TABLE public.has_store_stock
(
    store_id integer NOT NULL,
    stock_id integer NOT NULL,
    medicine_id integer NOT NULL,
    availability_of_medicine character varying(4) COLLATE pg_catalog."default" NOT NULL,
    unit_selling_price numeric(7,4) NOT NULL DEFAULT 0,
    CONSTRAINT has_store_stock_pkey PRIMARY KEY (stock_id, store_id, medicine_id),
    CONSTRAINT medicine_st_detail FOREIGN KEY (medicine_id)
        REFERENCES public.medicine (medicine_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT store_st_detail FOREIGN KEY (store_id)
        REFERENCES public.store (store_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT store_stock_detail FOREIGN KEY (stock_id)
        REFERENCES public.stock (stock_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.has_store_stock
    OWNER to postgres;