import axios from 'axios';
import { FastifyInstance } from 'fastify';
import { string, z } from 'zod';
import { prismaQuery } from '../lib/prisma';

export async function authRoutes(app: FastifyInstance) {
   app.post('/register', async (request, reply) => {
      const bodySchema = z.object({
         code: z.string(),
      });

      const { code } = bodySchema.parse(request.body);

      const accessTokenResponse = await axios.post(
         'https://github.com/login/oauth/access_token',
         null,
         {
            params: {
               code,
               client_id: process.env.BITHUB_CLIENT_ID,
               client_secret: process.env.BITHUB_CLIENT_SECRET,
            },
            headers: {
               Accept: 'application/json',
            },
         },
      );

      const { access_token } = accessTokenResponse.data;

      const userResponse = await axios.get('https://api.github.com/user', {
         headers: {
            Authorization: `Bearer ${access_token}`,
         },
      });

      const userSchome = z.object({
         id: z.number(),
         login: z.string(),
         name: z.string(),
         avatar_url: string().url(),
      });

      const { avatar_url, id, login, name } = userSchome.parse(
         userResponse.data,
      );

      console.log(avatar_url);

      let user = await prismaQuery.user.findUnique({
         where: {
            githubId: id,
         },
      });

      if (!user) {
         user = await prismaQuery.user.create({
            data: {
               githubId: id,
               avatarUrl: avatar_url,
               login,
               name,
            },
         });
      }

      const token = app.jwt.sign(
         {
            name: user.name,
            avatarUrl: user.avatarUrl,
         },
         {
            sub: user.id,
            expiresIn: '30 days',
         },
      );

      return reply.send({ token });
   });
}
