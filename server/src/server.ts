import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { convertHourStringToMinutes } from './utils/convert-hours-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const port = process.env.PORT || 3333;
const app = express();
const prisma = new PrismaClient({
  log: ['query']
});

app
  .use(express.json())
  .use(cors())
  .get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          }
        }
      }
    });
    return res.status(200).json(games)
  })
  .post('/games/:id/ads', async (req, res) => {
    const gameId: string = req.params.id;
    const body: any = req.body;

    //Validação - Recomenda-se usar a biblioteca zod javascript

    const ad = await prisma.ad.create({
      data: {
        gameId,
        name: body.name,
        yearsPlaying: body.yearsPlaying,
        discord: body.discord,
        weekDays: body.weekDays.join(','),
        hourStart: convertHourStringToMinutes(body.hourStart),
        hourEnd: convertHourStringToMinutes(body.hourEnd),
        useVoiceChannel: body.useVoiceChannel,        
      }
    })

    return res.status(201).json(ad)
  })
  .get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;

    const ads: any = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
      },
      where: {
        gameId
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
    return res.status(200).json(ads.map((ad: any) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd)
      }

    }))
  })
  .get('/ads/:id/discord', async (req, res) => {
    const adId = req.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
      select: {
        discord: true
      },
      where: {
        id: adId
      }
    })
    return res.status(200).json({
      discord: ad.discord,
    })
  })
  .listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })