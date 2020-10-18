-- Table: public.category

-- DROP TABLE public.category;

CREATE TABLE public.category
(
    category_id integer NOT NULL DEFAULT nextval('category_category_id_seq'::regclass),
    category_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    lower_age character varying(10) COLLATE pg_catalog."default" NOT NULL,
    upper_age character varying(10) COLLATE pg_catalog."default" NOT NULL,
    gender character varying(2) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT category_pkey PRIMARY KEY (category_id)
)

TABLESPACE pg_default;

ALTER TABLE public.category
    OWNER to postgres;