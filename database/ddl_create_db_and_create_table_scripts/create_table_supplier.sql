-- Table: public.supplier

-- DROP TABLE public.supplier;

CREATE TABLE public.supplier
(
    supplier_id integer NOT NULL DEFAULT nextval('supplier_supplier_id_seq'::regclass),
    supplier_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    address character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(20) COLLATE pg_catalog."default" NOT NULL,
    email_address character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT supplier_pkey PRIMARY KEY (supplier_id),
    CONSTRAINT unique_email_addr UNIQUE (email_address),
    CONSTRAINT unique_phone_nbr UNIQUE (phone_number)
)

TABLESPACE pg_default;

ALTER TABLE public.supplier
    OWNER to postgres;