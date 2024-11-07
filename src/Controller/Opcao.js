let Canil = require('../Model/CadastrarCanil')
const pool = require('../database/mysql')
const OpcaoController = {
    async criar(req, res) {
        const {opcao, Perguntas_id} = req.body;
       
        // const novoCanil = {
        //     id: Canil[Canil.length-1]?.id ? Canil[Canil.length-1]?.id+1 : 1,
        //     nome: nome,
        //     email: email,
        //     endereco: endereco,
        //     img: imgUrl,
        //     mensagem: mensagem,
        // }
        let sql = `insert into Opcao (opcao, Perguntas_id) VALUES(?,?)`
        const result = await pool.query(sql, [opcao, Perguntas_id])
        const insertId = result[0]?.insertId;

        //const insertId = result[0]?.insertId;
        if(!insertId) {
            return res.status(401).json({message: 'erro ao ao inserir Opção!'})
        }
        const sql_select = 'SELECT * from Opcao where id = ?'
        const [rows] = await pool.query(sql_select, [insertId])
        return res.status(201).json(rows[0])
    },
    async listar(req, res) {
        let sql = "select * from Opcao";
        const [rows] = await pool.query(sql);
        return res.status(200).json(rows);
    },
    async alterar(req, res){
        //pegar o id via parametro da url de requisiçao
        const paramId = req.params.id;
        // return res.status(201).json({id: paramId});
        //pegou os valores do form via body
        const {opcao, Perguntas_id} = req.body;
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
        let sql = 'UPDATE Perguntas Set opcao=?, Perguntas_id=? WHERE id = ?'
        const result = await pool.query(sql, [opcao, Perguntas_id,Number(paramId)])

        const changedRows = result[0]?.changedRows;
        if(!changedRows){
            return res.status(401).json({message:'erro ao atualizar perguntas'})
        }
        const sql_select = `SELECT * FROM Perguntas WHERE id = ?`
        const [rows] = await pool.query(sql_select, [paramId])
        return res.status(201).json(rows[0])
    },
    async show(req, res){
        const paramId = req.params.id;
        // const canis = Canil.find(canis => canis.id === parseInt(paramId) ? true : false);
        // return res.status(201).json(canis);
        const sql_select = `SELECT * FROM Opcao WHERE id = ?`
        const [rows] = await pool.query(sql_select, Number(paramId))
        return res.status(201).json(rows[0])
    },
    async deletar(req, res){
        // const paramId = req.params.id;
    //     const canisIndex = Canil.findIndex(canis => canis.id === parseInt(paramId))
    //     Canil=[
    //         ...Canil.slice(0 ,canisIndex),
    //         ...Canil.slice(canisIndex+1, Canil.length)
    // ]
    //     return res.status(200).json({mensagem: "Canil deletado com sucesso!"})
    // }
    const paramId = req.params.id;
    let sql = `DELETE FROM Opcao WHERE id = ?`
    const result = await pool.query(sql, [Number(paramId)])
    console.log(result)
     const affectedRows = result[0]?.affectedRows;
     if(!affectedRows){
         return res.status(401).json({message:'erro ao deletar a pergunta!'})
     }
    return res.status(200).json({mensagem: "Pergunta deletada com sucesso!"})
}
}
module.exports = OpcaoController;