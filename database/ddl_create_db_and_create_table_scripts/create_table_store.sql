-- Table: public.store

-- DROP TABLE public.store;

CREATE TABLE public.store
(
    store_id integer NOT NULL DEFAULT nextval('store_store_id_seq'::regclass),
    store_name text COLLATE pg_catalog."default" NOT NULL,
    store_address character(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT store_pkey PRIMARY KEY (store_id)
)

TABLESPACE pg_default;

ALTER TABLE public.store
    OWNER to postgres;