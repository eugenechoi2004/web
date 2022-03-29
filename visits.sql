DROP TABLE IF EXISTS puppies;

CREATE TABLE puppies (p_id INT, p_name VARCHAR(256), PRIMARY KEY(p_id));
INSERT INTO puppies (p_id, p_name)
    VALUES
    (0, 'Odin'),
    (1, 'Ryan');