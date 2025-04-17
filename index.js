// Definindo porta que a API vai rodar, no caso 4000
const port = 4000;
app.listen(port, (error) => {
    if(error) {
        console.log(error);
    }
    console.log(`API rodando em http://localhost:${port}.`);
})