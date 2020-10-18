-- Table: public.role_mapping

-- DROP TABLE public.role_mapping;

CREATE TABLE public.role_mapping
(
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    isactive character varying(1) COLLATE pg_catalog."default",
    create_date date,
    end_date date,
    modified_date date,
    CONSTRAINT role_mapping_pkey PRIMARY KEY (user_id, role_id),
    CONSTRAINT add_users FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT role_mapping_constraints FOREIGN KEY (role_id)
        REFERENCES public.role (role_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.role_mapping
    OWNER to postgres;