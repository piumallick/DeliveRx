-- Table: public.medicine_category

-- DROP TABLE public.medicine_category;

CREATE TABLE public.medicine_category
(
    category_id integer NOT NULL,
    medicine_id integer NOT NULL,
    CONSTRAINT medicine_category_pkey PRIMARY KEY (category_id, medicine_id),
    CONSTRAINT category_details FOREIGN KEY (category_id)
        REFERENCES public.category (category_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT medicine_category_medicine_id_fkey FOREIGN KEY (medicine_id)
        REFERENCES public.medicine (medicine_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT medicine_details FOREIGN KEY (medicine_id)
        REFERENCES public.medicine (medicine_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.medicine_category
    OWNER to postgres;