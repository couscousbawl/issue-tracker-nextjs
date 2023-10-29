import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api', // define api folder under app folder
    servers: [{ url: "http://localhost:3000", }],
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Issue Tracker API Documentation',
        version: '1.0',
      },
      // components: {
      //   securitySchemes: {
      //     BearerAuth: {
      //       type: 'http',
      //       scheme: 'bearer',
      //       bearerFormat: 'JWT',
      //     },
      //   },
      // },
      security: [],
    },
  });
  return spec;
};
