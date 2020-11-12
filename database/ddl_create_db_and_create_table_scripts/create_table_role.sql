-- Table: public.role

-- DROP TABLE public.role;

CREATE TABLE public.role
(
    role_id integer NOT NULL,
    role_desc character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT role_pkey PRIMARY KEY (role_id)
)

TABLESPACE pg_default;

ALTER TABLE public.role
    OWNER to postgres;