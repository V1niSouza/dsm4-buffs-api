const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Buffs API",
            description: "API para o sistema BUFFs",
            version: "1.0.0",
            contact: {
                name: "Vinicius Souza, João Kuzinor e Paulo Cesar" 
            },
            servers: [{ url: "http://localhost:5000" }],
        },
        components: {
            securitySchemes: {
                bearerAuth:{
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        securtity: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./routes/*.js", "./docs/swaggerDocs.yaml"],
};

export default swaggerOptions;