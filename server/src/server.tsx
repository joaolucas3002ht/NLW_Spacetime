import 'dotenv/config';

import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { memoriesRoutes } from './routes/memories';
import { authRoutes } from './routes/auth';

const app = Fastify({
   logger: true,
});

app.register(cors, {
   origin: true,
});

app.register(jwt, {
   secret: 'spacetime',
});

app.register(authRoutes);
app.register(memoriesRoutes);

app.listen({
   port: 3333,
    host: '0.0.0.0'
}).then((e) => {
   console.log(e);
});
