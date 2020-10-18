-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    user_id integer NOT NULL DEFAULT nextval('customers_cust_id_seq'::regclass),
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email_address character varying(255) COLLATE pg_catalog."default" NOT NULL,
    passwd character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(255) COLLATE pg_catalog."default" NOT NULL,
    address character varying(255) COLLATE pg_catalog."default" NOT NULL,
    gender character varying(1) COLLATE pg_catalog."default" NOT NULL,
    dob date NOT NULL,
    enabled character(1) COLLATE pg_catalog."default",
    CONSTRAINT customers_pkey PRIMARY KEY (user_id),
    CONSTRAINT unique_email UNIQUE (email_address),
    CONSTRAINT unique_phone UNIQUE (phone_number)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;
-- Index: idx_cust

-- DROP INDEX public.idx_cust;

CREATE INDEX idx_cust
    ON public.users USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;