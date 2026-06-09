import prisma from "../utils/prisma.js"

async function seed(){

    // 
    // await prisma.livre.deleteMany({});
    // console.log("Tous les livres ont été supprimés.");

    // ajouter 5 livres
    const livre1 = await prisma.livre.create({
        data: {
            titre: "L'écume des jours",
            auteur: "Boris Vian",
            annee: 1947,
            disponible: true,
        },
    });
    console.log("Créé: ", livre1);

    const livre2 = await prisma.livre.create({
        data: {
            titre: "Candide",
            auteur: "Voltaire",
            annee: 1759,
            disponible: false,
        },
    });
    console.log("Créé: ", livre2);

    const livre3 = await prisma.livre.create({
        data: {
            titre: "Pizza, punk, arena",
            auteur: "Benoit Tardif",
            annee: 2025,
            disponible: false,
        },
    });
    console.log("Créé: ", livre3);

    const livre4 = await prisma.livre.create({
        data: {
            titre: "Le tour du monde en 80 jours",
            auteur: "Jules Verne",
            annee: 1872,
            disponible: true,
        },
    });
    console.log("Créé: ", livre4);

    const livre5 = await prisma.livre.create({
        data: {
            titre: "Jurassic Park",
            auteur: "Michael Chrichton",
            annee: 1990,
            disponible: true,
        },
    });
    console.log("Créé: ", livre5);

}

async function getTousLesLivres() {
    return prisma.livre.findMany();
}

async function getLivresDisponibles() {
    return prisma.livre.findMany({
        where: {disponible: true}
    })
}

async function getLivreParId(id: number) {
    return prisma.livre.findUnique({
        where: {id}
    })
}

async function chercherParAuteur(motCle: string) {
    return prisma.livre.findMany({
        where: {
            auteur: {contains: motCle, mode: "insensitive"}
        }
    })
}

// marquer un livre comme indisponible
async function marquerIndisponible(id: number) {
    return prisma.livre.update({
        where: {id},
        data: {disponible: false},
});
}
// marquer un livre comme disponible
async function marquerDisponible(id: number) {
    return prisma.livre.update({
        where: {id},
        data: {disponible: true},
});
}

// corriger l'année d'un livre
async function corrigerAnnee(id: number, nouvelleAnnee: number) {
    return prisma.livre.update({
        where: {id},
        data: {annee: nouvelleAnnee},
    });
}

//delete one
async function supprimerLivre(id: number) {
    return prisma.livre.delete({
        where: {id}
    })
}

//delete many
async function supprimerAnciens(avantAnnee: number) {
    return prisma.livre.deleteMany({
        where: {annee: {lt: avantAnnee}},
    })
}

async function main() {
    await seed();
    await prisma.$disconnect();

    console.log("\n--- Tous les livres ---");
    console.log(await getTousLesLivres());

    console.log("\n--- Livres disponibles ---");
    console.log(await getLivresDisponibles());

    console.log("\n--- Livre avec ID 3 ---");
    console.log(await getLivreParId(5));

    console.log("\n--- Livres avec 'Vian' dans l'auteur ---");
    console.log(await chercherParAuteur("Vian"));

    console.log(await marquerIndisponible(1));
    console.log(await corrigerAnnee(3, 2026));

    console.log(await supprimerLivre(3));
    console.log(await supprimerAnciens(1800));

    await prisma.$disconnect();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
