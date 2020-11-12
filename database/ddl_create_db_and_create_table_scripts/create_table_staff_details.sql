-- Table: public.staff_details

-- DROP TABLE public.staff_details;

CREATE TABLE public.staff_details
(
    staff_id integer NOT NULL DEFAULT nextval('staff_staff_id_seq'::regclass),
    ssn integer NOT NULL,
    date_of_joining date NOT NULL,
    salary integer NOT NULL,
    store_id integer NOT NULL,
    role character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT staff_pkey PRIMARY KEY (staff_id),
    CONSTRAINT store_details FOREIGN KEY (store_id)
        REFERENCES public.store (store_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.staff_details
    OWNER to postgres;