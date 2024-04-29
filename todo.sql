CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

--sample seed data
INSERT INTO public.todo (description) VALUES ('i want to land a full stack job in 5months');
INSERT INTO public.todo (description) VALUES ('finish the PERN series');