const fs = require('fs');
const xlsx = require('xlsx');

function jsonToExcel(jsonFile, excelFile) {
    fs.readFile(jsonFile, 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo JSON:", err);
            return;
        }
        
        const jsonData = JSON.parse(data);
        const structuredData = [];

        jsonData.disciplinas.forEach(disciplina => {
            const disciplinaNome = disciplina.nome;
            disciplina.assuntos.forEach(assunto => {
                const assuntoNome = assunto.nome;
                assunto.topicos.forEach(topico => {
                    const topicoNome = topico.nome;
                    topico.itens.forEach(item => {
                        structuredData.push({
                            "Disciplina": disciplinaNome,
                            "Assunto": assuntoNome,
                            "Tópico": topicoNome,
                            "Item": item.nome
                        });
                    });
                });
            });
        });
        
        const worksheet = xlsx.utils.json_to_sheet(structuredData);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Dados");
        xlsx.writeFile(workbook, excelFile);

        console.log(`Arquivo Excel gerado com sucesso: ${excelFile}`);
    });
}

jsonToExcel("item_procap.json", "cliaca_e_arrasta.xlsx");
