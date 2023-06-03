import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
    allowExitOnIdle: true
});


export const getPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
}

export const createPost = async ({ titulo, img, descripcion, likes = 0 }) => {

    const sentencia = "INSERT INTO posts (titulo, img, descripcion, likes) values($1, $2, $3, $4) RETURNING *";
    const { rows } = await pool.query(sentencia, [titulo, img, descripcion, likes]);

    return rows[0];
};

export const updatePost = async (id, { likes }) => {

    const sentencia = "UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *";
    const { rows } = await pool.query(sentencia, [likes, id]);

    return rows[0];
};

export const deletePost = async (id) => {
    console.log("Soy id:" + id);
    const sentencia = "DELETE FROM posts WHERE id = $1 RETURNING *";
    const { rows } = await pool.query(sentencia, [id]);

    return rows[0];
};
