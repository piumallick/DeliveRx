-- Table: public.medicine

-- DROP TABLE public.medicine;

CREATE TABLE public.medicine
(
    medicine_id integer NOT NULL DEFAULT nextval('medicine_medicine_id_seq'::regclass),
    medicine_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    medicine_desc character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT medicine_pkey PRIMARY KEY (medicine_id)
)

TABLESPACE pg_default;

ALTER TABLE public.medicine
    OWNER to postgres;