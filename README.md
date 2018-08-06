## Usage:

```
npm install
npm install -g jasmine
set PORT=3001 && node bin/www in project folder
jasmine (for tests)
download pgAdmin from https://www.pgadmin.org/
create a database, open the query window and execute:
```
```
-- Table: public.friends

-- DROP TABLE public.friends;

CREATE TABLE public.friends
(
  name character varying,
  starred boolean,
  id integer NOT NULL DEFAULT nextval('friends_id_seq'::regclass),
  CONSTRAINT friends_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.friends
  OWNER TO postgres;

INSERT INTO friends (name, starred) VALUES ('Theodore Roosevelt', true)
INSERT INTO friends (name, starred) VALUES ('Abraham Lincoln', false)
INSERT INTO friends (name, starred) VALUES ('George Washington', false)
```
```The database connection can be configured in config/config.js```


The front end can be found here [Soreto frontend](https://github.com/iulia1122/Soreto-frontend)
