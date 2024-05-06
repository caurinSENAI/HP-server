const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 7777;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "herosbattle",
  password: "ds564",
  port: 7007,
});

app.use(express.json());

app.get("/bruxos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bruxo");
    res.json({
      total: result.rowCount,
      bruxos: result.rows,
    });
  } catch (error) {
    console.error("Erro ao obter Bruxos", error);
    res.status(500).json("Erro ao obter Bruxos");
  }
});

app.get("/bruxos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM bruxo WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json("Bruxo não encontrado");
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Erro ao obter Bruxo", error);
    res.status(500).json("Erro ao obter Bruxo");
  }
});

app.post("/bruxos", async (req, res) => {
  const { nome, idade, casa, habilidade, sangue, patrono } = req.body;

  let sangues = ["Puro", "Mestiço", "Trouxa"];
  let casas = ["Grifinoria", "Sonserina", "Corvinal", "Lufa-Lufa"];
  let habilidades = ["Feitiços", "Raciocinio", "Duelos", "Poções"];
  let patronos = ["Cervo", "Cachorro", "Gato", "Rato"];

  if (!sangues.includes(sangue)) {
    return res.status(400).json("O sangue deve ser Puro, Mestiço ou Trouxa.");
  }

  if (!casas.includes(casa)) {
    return res
      .status(400)
      .json("A casa deve ser Grifinoria, Sonserina, Corvinal ou Lufa-Lufa.");
  }

  if (!habilidades.includes(habilidade)) {
    return res
      .status(400)
      .json("A habilidade deve ser Feitiços, Raciocinio, Duelos ou Poções.");
  }

  if (!nome || !idade || !casa || !habilidade || !sangue) {
    return res.status(400).json("Todos os campos são obrigatórios.");
  }

  if (idade < 11 || idade > 100) {
    return res.status(400).json("A idade deve ser entre 11 e 100 anos.");
  }

  if (patrono && !patronos.includes(patrono)) {
    return res
      .status(400)
      .json("O patrono deve ser Cervo, Cachorro, Gato ou Rato.");
  }

  const patronoFinal = patrono || "Nenhum";
  try {
    await pool.query(
      "INSERT INTO bruxo (nome, idade, casa, habilidade, sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)",
      [nome, idade, casa, habilidade, sangue, patronoFinal]
    );
    res.send("Bruxo criado com sucesso");
  } catch (error) {
    console.error("Erro ao inserir Bruxo", error);
    res.status(500).json("Erro ao inserir Bruxo");
  }
});

app.put("/bruxos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, idade, casa, habilidade, sangue, patrono } = req.body;

  let sangues = ["Puro", "Mestiço", "Trouxa"];
  let casas = ["Grifinoria", "Sonserina", "Corvinal", "Lufa-Lufa"];
  let habilidades = ["Feitiços", "Raciocinio", "Duelos", "Poções"];
  let patronos = ["Cervo", "Cachorro", "Gato", "Rato"];

  if (!sangues.includes(sangue)) {
    return res.status(400).json("O sangue deve ser Puro, Mestiço ou Trouxa.");
  }

  if (!casas.includes(casa)) {
    return res
      .status(400)
      .json("A casa deve ser Grifinoria, Sonserina, Corvinal ou Lufa-Lufa.");
  }

  if (!habilidades.includes(habilidade)) {
    return res
      .status(400)
      .json("A habilidade deve ser Feitiços, Raciocinio, Duelos ou Poções.");
  }

  if (!nome || !idade || !casa || !habilidade || !sangue) {
    return res.status(400).json("Todos os campos são obrigatórios.");
  }

  if (idade < 11 || idade > 100) {
    return res.status(400).json("A idade deve ser entre 11 e 100 anos.");
  }

  if (patrono && !patronos.includes(patrono)) {
    return res
      .status(400)
      .json("O patrono deve ser Cervo, Cachorro, Gato ou Rato.");
  }

  try {
    await pool.query(
      "UPDATE bruxo SET nome = $1, idade = $2, casa = $3,  habilidade = $4, sangue = $5, patrono = $6 WHERE id = $7",
      [nome, idade, casa, habilidade, sangue, patrono, id]
    );
    res.status(200).send("Bruxo atualizado com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar Bruxo", error);
    res.status(500).json("Erro ao atualizar Bruxo");
  }
});

app.delete("/bruxos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM bruxo WHERE id = $1", [id]);
    res.status(200).send("Bruxos deletado com sucesso");
  } catch (error) {
    console.error("Erro ao deletar Bruxos", error);
    res.status(500).json("Erro ao deletar Bruxos");
  }
});

app.get("/bruxos/nome/:nome", async (req, res) => {
  try {
    const { nome } = req.params;
    const result = await pool.query("SELECT * FROM bruxo WHERE nome ILIKE $1", [
      `${nome}%`, // O % indica que pode haver qualquer número de caracteres depois de "nome"
    ]);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json("Nenhum bruxo encontrado com esse nome ou início de nome.");
    } else {
      res.json(result.rows);
    }
  } catch (error) {
    console.error("Erro ao obter Bruxos por nome", error);
    res.status(500).json("Erro ao obter Bruxos por nome");
  }
});

//varas

app.get("/vara", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM varinha");
    res.json({
      total: result.rowCount,
      varas: result.rows,
    });
  } catch (error) {
    console.error("Erro ao obter Varainhas", error);
    res.status(500).json("Erro ao obter Varinhas");
  }
});

app.get("/vara/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM varinha WHERE id = $1", [
      id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json("Varinha não encontrada");
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Erro ao obter Varinha", error);
    res.status(500).json("Erro ao obter Varinha");
  }
});

app.post("/vara", async (req, res) => {
  const { material, nucleo, comprimento, data_fabric } = req.body;

  let nucleos = ["Fenix", "Unicornio", "Vela", "Fibra de Coração de Dragão"];

  if (!material || !nucleo || !comprimento || !data_fabric) {
    return res.status(400).json("Todos os campos são obrigatórios.");
  }

  if (comprimento > 45 || comprimento < 15) {
    return res
      .status(400)
      .json("O comprimento da varinha deve ser entre 15 e 45 cm.");
  }

  if (!nucleos.includes(nucleo)) {
    return res
      .status(400)
      .json(
        "O nucleo deve ser Fenix, Unicornio, Vela ou Fibra de Coração de Dragão."
      );
  }

  try {
    await pool.query(
      "INSERT INTO varinha (material, nucleo, comprimento, data_fabric) VALUES ($1, $2, $3, $4)",
      [material, nucleo, comprimento, data_fabric]
    );
    res.send("Varinha criada com sucesso");
  } catch (error) {
    console.error("Erro ao inserir Varinha", error);
    res.status(500).json("Erro ao inserir Varinha");
  }
});

app.put("/vara/:id", async (req, res) => {
  const { id } = req.params;
  const { material, nucleo, comprimento, data_fabric } = req.body;

  try {
    await pool.query(
      "UPDATE varinha SET material = $1, nucleo = $2, comprimento = $3, data_fabric = $4 WHERE id = $5",
      [material, nucleo, comprimento, data_fabric, id]
    );
    res.status(200).send("Varinha atualizada com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar Varinha", error);
    res.status(500).json("Erro ao atualizar Varinha");
  }
});

app.delete("/vara/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM varinha WHERE id = $1", [id]);
    res.status(200).send("Varinha deletada com sucesso");
  } catch (error) {
    console.error("Erro ao deletar Varinha", error);
    res.status(500).json("Erro ao deletar Varinha");
  }
});

/* app.get("/vara/data/:data_fabric", async (req, res) => {
  try {
    const { data_fabric } = req.params;
    const result = await pool.query(
      "SELECT * FROM varinha WHERE data_fabric = $1",
      [data_fabric]
    );
    if (result.rowCount === 0) {
      return res.status(404).json("Varinha não encontrada");
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Erro ao obter Varinha", error);
    res.status(500).json("Erro ao obter Varinha");
  }
}); */

app.get("/vara/data/:data_fabric", async (req, res) => {
  try {
    const { data_fabric } = req.params;
    const result = await pool.query(
      "SELECT * FROM varinha WHERE data_fabric = $1",
      [data_fabric]
    );
    if (result.rowCount === 0) {
      return res.status(404).json("Nenhuma varinha encontrada nessa data.");
    } else {
      res.json(result.rows);
    }
  } catch (error) {
    console.error("Erro ao obter Varinhas por data de fabricação", error);
    res.status(500).json("Erro ao obter Varinhas por data de fabricação");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
