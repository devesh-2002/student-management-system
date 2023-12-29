// swaggerSetup.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import YAML from 'yamljs';

function setupSwaggerDocs(app: express.Express) {
  const swaggerSpecYAML = YAML.load('./swagger.yaml');
  console.log('Swagger file loaded:', swaggerSpecYAML);

  // Convert YAML to JSON
  const swaggerSpec = JSON.parse(JSON.stringify(swaggerSpecYAML));

  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Student Management System',
        description: 'Description of your API',
        contact: {
          name: 'Devesh Rahatekar',
          email: 'dev241202@gmail.com',
        },
        version: '1.0.0',
      },
      servers: [
        {
          url: 'https://student-management-system-six.vercel.app/', 
          description: 'Vercel deployment',
        },
      ],
    },
    apis: ['./routes/*.ts'],
  };

  // Combine the loaded YAML spec and the dynamically generated spec
  const combinedSwaggerSpec = { ...swaggerSpec, ...swaggerJsdoc(options) };
  console.log('Combined Swagger Spec:', combinedSwaggerSpec);

  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(combinedSwaggerSpec));

  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(combinedSwaggerSpec);
  });
}

export default setupSwaggerDocs;
