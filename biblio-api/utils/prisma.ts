// copier coller pours tous les projets backend - ça changera pas ou tres peu

import { PrismaNeon } from "@prisma/adapter-neon" // import l'adapteur
import { PrismaClient } from "../generated/prisma/client.js" //connexion au modele
import dotenv from "dotenv" // import le dotenv
dotenv.config(); // charge les variables d'environnement a partir du .env

const adapter = new PrismaNeon({
    connectionString : process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
    adapter,
    log: ['query','info','warn','error']
})

export default prisma;