let Comentarios = require('../Model/Comentarios')
const pool = require('../database/mysql')
const ClassesController = {
    async criar(req, res) {
        const {descricao} = req.body;
        let sql = `insert into racas_classe (descricao) VALUES(?)`
        const result = await pool.query(sql, [descricao])
        const insertId = result[0]?.insertId;
        if(!insertId) {
            return res.status(401).json({message: 'erro ao criar postagem!'})
        }
        const sql_select = 'SELECT * from racas_classe where id = ?'
        const [rows] = await pool.query(sql_select, [insertId])
        return res.status(201).json(rows[0])
    },
    async listar(req, res) {
        let sql = "select * from racas_classe";
        const [rows] = await pool.query(sql);
        return res.status(200).json(rows);
    },
    async alterar(req, res){
        //pegar o id via parametro da url de requisiçao
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
        const {descricao} = req.body;
        let sql = 'UPDATE racas_classe SET descricao =? WHERE id = ?'
        const result = await pool.query(sql, [descricao, Number(paramId)])

        const changedRows = result[0]?.changedRows;
        if(!changedRows){
            return res.status(401).json({message:'erro ao atualizar a classe!'})
        }
        const sql_select = `SELECT * FROM racas_classe WHERE id = ?`
        const [rows] = await pool.query(sql_select, [paramId])
        return res.status(201).json(rows[0])
    },
    async show(req, res){
        const paramId = req.params.id;
        // const canis = Canil.find(canis => canis.id === parseInt(paramId) ? true : false);
        // return res.status(201).json(canis);
        const sql_select = `SELECT * FROM racas_classe WHERE id = ?`
        const [rows] = await pool.query(sql_select, Number(paramId))
        return res.status(201).json(rows[0])
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
    let sql = `DELETE FROM racas_classe WHERE id = ?`
    const result = await pool.query(sql, [Number(paramId)])
    console.log(result)
     const affectedRows = result[0]?.affectedRows;
     if(!affectedRows){
         return res.status(401).json({message:'erro a classe!'})
     }
    return res.status(200).json({mensagem: "Classe deletada com sucesso!"})
}
}
module.exports = ClassesController;