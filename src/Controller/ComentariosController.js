let Comentarios = require('../Model/Comentarios')
const pool = require('../database/mysql')
const ComentariosController = {
    async criar(req, res) {
        const data = new Date();
        const usuarios_id = req.userId;

        const {capitulos_id, comentarios} = req.body;
        let sql = `insert into comentarios (capitulos_id, usuarios_id, comentarios,data_comentario) VALUES(?,?,?,?)`
        const result = await pool.query(sql, [capitulos_id, usuarios_id, comentarios,data])
        const insertId = result[0]?.insertId;
        if(!insertId) {
            return res.status(401).json({message: 'erro ao criar comentario!'})
        }
        const sql_select = 'SELECT * from comentarios where id = ?'
        const [rows] = await pool.query(sql_select, [insertId])
        return res.status(201).json(rows[0])
    },
    async listar(req, res) {
        let sql = "SELECT * FROM comentarios";
        const [rows] = await pool.query(sql);
        return res.status(200).json(rows);
    },
    async alterar(req, res){
        //pegar o id via parametro da url de requisiçao
        const usuarios_id = req.userId;
        const paramId = req.params.id;

        // return res.status(201).json({id: paramId});
        //pegou os valores do form via body
        //recuperar a postagem a partir do id
        // const canis = Canil.find(canis => canis.id === parseInt(paramId) ? true : false);
        // const canisIndex = Canil.findIndex(canis => canis.id === parseInt(paramId))
        // canis.nome = nome;
        // canis.email = email;
        // canis.endereco = endereco;
        // canis.img = imgUrl;
        // canis.mensagem = mensagem;
    
        // //salvar as alterações
        // Canil[canisIndex] = canis;
          
        // return res.status(201).json(canis);
        const {capitulos_id, comentarios} = req.body;
        const data = new Date();

        let sql = 'UPDATE comentarios SET capitulos_id= ? usuarios_id= ? comentarios= ? data_comentario=? WHERE id = ? '
        const result = await pool.query(sql, [capitulos_id, usuarios_id, comentarios, data, Number(paramId)])

        const changedRows = result[0]?.changedRows;
        if(!changedRows){
            return res.status(401).json({message:'erro ao atualizar o comentario!'})
        }
        const sql_select = `SELECT * FROM comentarios WHERE id = ?`
        const [rows] = await pool.query(sql_select, [paramId])
        return res.status(201).json(rows[0])
    },
    async show(req, res){
        const usuarios_id = req.userId;
        // const canis = Canil.find(canis => canis.id === parseInt(paramId) ? true : false);
        // return res.status(201).json(canis);
        const sql_select = `SELECT * FROM comentarios WHERE usuarios_id = ?`
        const [rows] = await pool.query(sql_select, [usuarios_id])
        return res.status(201).json(rows)
    },
    async deletar(req, res){
        const paramId = req.params.id;
    //     const canisIndex = Canil.findIndex(canis => canis.id === parseInt(paramId))
    //     Canil=[
    //         ...Canil.slice(0 ,canisIndex),
    //         ...Canil.slice(canisIndex+1, Canil.length)
    // ]
    //     return res.status(200).json({mensagem: "Canil deletado com sucesso!"})
    // }
    let sql = `DELETE FROM comentarios WHERE id = ?`
    const result = await pool.query(sql, [Number(paramId)])
    console.log(result)
     const affectedRows = result[0]?.affectedRows;
     if(!affectedRows){
         return res.status(401).json({message:'erro ao deletar o comentario!'})
     }
    return res.status(200).json({mensagem: "Comentario deletado com sucesso!"})
}
}
module.exports = ComentariosController;