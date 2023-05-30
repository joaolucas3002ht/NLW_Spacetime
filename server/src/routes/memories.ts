import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prismaQuery } from '../lib/prisma';

export async function memoriesRoutes(app: FastifyInstance) {
   //
   app.addHook('preHandler', async (request) => {
      await request.jwtVerify();
   });

   app.get('/memories', async (request, reply) => {
      const { sub } = request.user;

      const memories = await prismaQuery.memory.findMany({
         where: {
            userId: sub,
         },
         orderBy: {
            createdAt: 'asc',
         },
         select: {
            content: true,
            id: true,
            coverUrl: true,
         },
      });

      return memories.map(({ content, coverUrl, id }) => ({
         excerpt: content.substring(0, 115).concat('...'),
         coverUrl,
         id,
      }));
   });

   app.get('/memories/:id', async (request, reply) => {
      const { sub } = request.user;

      const paramsSchame = z.object({
         id: z.string().uuid(),
      });

      const { id } = paramsSchame.parse(request.params);

      const memory = await prismaQuery.memory.findUniqueOrThrow({
         where: {
            id,
         },
      });

      if (!memory.isPublic && memory.userId !== sub) {
         return reply.status(401).send();
      }

      return memory;
   });

   app.post('/memories', async (request, reply) => {
      const { sub } = request.user;

      const bodySchame = z.object({
         content: z.string(),
         coverUrl: z.string(),
         isPublic: z.coerce.boolean().default(false),
      });

      const { content, isPublic, coverUrl } = bodySchame.parse(request.body);

      const memory = await prismaQuery.memory.create({
         data: {
            content,
            isPublic,
            coverUrl,
            userId: sub,
         },
      });

      return memory;
   });

   app.put('/memories/:id', async (request, reply) => {
      const { sub } = request.user;

      const paramsSchame = z.object({
         id: z.string().uuid(),
      });

      const { id } = paramsSchame.parse(request.params);

      const bodySchame = z.object({
         content: z.string(),
         coverUrl: z.string(),
         isPublic: z.coerce.boolean().default(false),
      });

      const { content, isPublic, coverUrl } = bodySchame.parse(request.body);

      let memory = await prismaQuery.memory.findUniqueOrThrow({
         where: {
            id,
         },
      });

      if (memory.userId !== sub) {
         return reply.status(401).send();
      }

      memory = await prismaQuery.memory.update({
         where: {
            id,
         },
         data: {
            content,
            isPublic,
            coverUrl,
         },
      });

      return memory;
   });

   app.delete('/memories/:id', async (request, reply) => {
      const { sub } = request.user;

      const paramsSchame = z.object({
         id: z.string().uuid(),
      });

      const { id } = paramsSchame.parse(request.params);

      const memory = await prismaQuery.memory.findUniqueOrThrow({
         where: {
            id,
         },
      });

      if (memory.userId !== sub) {
         return reply.status(401).send();
      }

      await prismaQuery.memory.delete({
         where: {
            id,
         },
      });
   });
}
