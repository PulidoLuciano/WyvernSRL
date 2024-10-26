import { PrismaClient } from "@prisma/client"
import PLATAFORMAS from "./PLATAFORMAS"

export default (prisma : PrismaClient) => ({
    dependencies: [PLATAFORMAS],
    schema: prisma.clientes,
    data: [
        { nombre: "DarkHunter77", correo: "darkhunter77@mail.com", telefono: "+1-202-555-0143", suscripto: false, Paises_id: 8, Plataformas_id: 3 },
        { nombre: "ShadowGlitchX", correo: "shadowglitchx@mail.com", telefono: "+44-7700-900123", suscripto: false, Paises_id: 2, Plataformas_id: 1 },
        { nombre: "CyberWolf23", correo: "cyberwolf23@mail.com", telefono: "+61-491-570-458", suscripto: false, Paises_id: 3, Plataformas_id: 5 },
        { nombre: "PixelVortex", correo: "pixelvortex@mail.com", telefono: "+34-612-345-678", suscripto: false, Paises_id: 10, Plataformas_id: 2 },
        { nombre: "NovaStrike", correo: "novastrike@mail.com", telefono: "+49-151-234-56789", suscripto: false, Paises_id: 14, Plataformas_id: 4 },
        { nombre: "VoidRanger", correo: "voidranger@mail.com", telefono: "+1-303-555-0175", suscripto: false, Paises_id: 7, Plataformas_id: 1 },
        { nombre: "PhantomByte", correo: "phantombyte@mail.com", telefono: "+1-415-555-0199", suscripto: false, Paises_id: 3, Plataformas_id: 3 },
        { nombre: "CrimsonBladeX", correo: "crimsonbladex@mail.com", telefono: "+44-7911-123456", suscripto: false, Paises_id: 12, Plataformas_id: 2 },
        { nombre: "ThunderSoul", correo: "thundersoul@mail.com", telefono: "+33-612-345-987", suscripto: false, Paises_id: 6, Plataformas_id: 5 },
        { nombre: "SpectreLord", correo: "spectrelord@mail.com", telefono: "+39-331-234-5678", suscripto: false, Paises_id: 9, Plataformas_id: 1 },
        { nombre: "FrostReaper", correo: "frostreaper@mail.com", telefono: "+1-646-555-0193", suscripto: false, Paises_id: 3, Plataformas_id: 4 },
        { nombre: "NightFalcon", correo: "nightfalcon@mail.com", telefono: "+61-490-123-456", suscripto: false, Paises_id: 3, Plataformas_id: 2 },
        { nombre: "IronVortexX", correo: "ironvortexx@mail.com", telefono: "+52-55-1234-5678", suscripto: false, Paises_id: 5, Plataformas_id: 5 },
        { nombre: "BlazeTitan", correo: "blazetitan@mail.com", telefono: "+1-212-555-0167", suscripto: false, Paises_id: 1, Plataformas_id: 3 },
        { nombre: "ObsidianShade", correo: "obsidianshade@mail.com", telefono: "+44-7111-765432", suscripto: false, Paises_id: 3, Plataformas_id: 1 },
        { nombre: "StormRiderX", correo: "stormriderx@mail.com", telefono: "+33-611-234-567", suscripto: false, Paises_id: 11, Plataformas_id: 4 },
        { nombre: "SilverPhoenix", correo: "silverphoenix@mail.com", telefono: "+49-171-345-6789", suscripto: false, Paises_id: 13, Plataformas_id: 5 },
        { nombre: "DarkNemesisX", correo: "darknemesisx@mail.com", telefono: "+34-612-765-432", suscripto: false, Paises_id: 10, Plataformas_id: 2 },
        { nombre: "AetherKnight", correo: "aetherknight@mail.com", telefono: "+61-482-234-123", suscripto: false, Paises_id: 3, Plataformas_id: 1 },
        { nombre: "LunarBlade", correo: "lunarblade@mail.com", telefono: "+52-55-9876-5432", suscripto: false, Paises_id: 3, Plataformas_id: 3 },
        { nombre: "NeonSpectre", correo: "neonspectre@mail.com", telefono: "+1-202-555-0199", suscripto: false, Paises_id: 8, Plataformas_id: 4 },
        { nombre: "TitanFuryX", correo: "titanfuryx@mail.com", telefono: "+49-162-234-5678", suscripto: false, Paises_id: 14, Plataformas_id: 2 },
        { nombre: "VortexGhost", correo: "vortexghost@mail.com", telefono: "+44-7020-123456", suscripto: false, Paises_id: 12, Plataformas_id: 5 },
        { nombre: "PhoenixRiderX", correo: "phoenixriderx@mail.com", telefono: "+1-718-555-0192", suscripto: false, Paises_id: 1, Plataformas_id: 3 },
        { nombre: "EchoSlayer", correo: "echoslayer@mail.com", telefono: "+34-600-123-456", suscripto: false, Paises_id: 9, Plataformas_id: 1 },
        { nombre: "CyberBeastX", correo: "cyberbeastx@mail.com", telefono: "+33-612-876-543", suscripto: false, Paises_id: 6, Plataformas_id: 4 },
        { nombre: "ShadowClaw", correo: "shadowclaw@mail.com", telefono: "+49-172-876-5432", suscripto: false, Paises_id: 3, Plataformas_id: 2 },
        { nombre: "FlameHawk", correo: "flamehawk@mail.com", telefono: "+61-481-987-654", suscripto: false, Paises_id: 5, Plataformas_id: 3 },
        { nombre: "RogueStrikerX", correo: "roguestrikerx@mail.com", telefono: "+44-7932-987654", suscripto: false, Paises_id: 2, Plataformas_id: 5 },
        { nombre: "VenomWraith", correo: "venomwraith@mail.com", telefono: "+34-601-876-543", suscripto: false, Paises_id: 10, Plataformas_id: 1 },
        { nombre: "FrostWing", correo: "frostwing@mail.com", telefono: "+1-818-555-0124", suscripto: false, Paises_id: 7, Plataformas_id: 4 },
        { nombre: "IronGriffonX", correo: "irongriffonx@mail.com", telefono: "+44-7560-654321", suscripto: false, Paises_id: 12, Plataformas_id: 2 },
        { nombre: "NovaDemonX", correo: "novademonx@mail.com", telefono: "+33-611-765-432", suscripto: false, Paises_id: 3, Plataformas_id: 5 },
        { nombre: "BladeSpecter", correo: "bladespecter@mail.com", telefono: "+52-55-4321-9876", suscripto: false, Paises_id: 5, Plataformas_id: 3 },
        { nombre: "ShadowVortex", correo: "shadowvortex@mail.com", telefono: "+61-491-123-654", suscripto: false, Paises_id: 3, Plataformas_id: 1 },
        { nombre: "CyberTitanX", correo: "cybertitanx@mail.com", telefono: "+34-611-654-987", suscripto: false, Paises_id: 9, Plataformas_id: 4 },
        { nombre: "SpectralStorm", correo: "spectralstorm@mail.com", telefono: "+49-151-654-3219", suscripto: false, Paises_id: 13, Plataformas_id: 2 },
        { nombre: "VenomStrike", correo: "venomstrike@mail.com", telefono: "+44-7123-543210", suscripto: false, Paises_id: 3, Plataformas_id: 5 },
        { nombre: "TitanGhost", correo: "titanghost@mail.com", telefono: "+1-415-555-0148", suscripto: false, Paises_id: 1, Plataformas_id: 3 },
        { nombre: "NeonHawkX", correo: "neonhawkx@mail.com", telefono: "+34-600-654-321", suscripto: false, Paises_id: 10, Plataformas_id: 1 },
        { nombre: "FrostRiderX", correo: "frostriderx@mail.com", telefono: "+61-491-987-123", suscripto: false, Paises_id: 7, Plataformas_id: 2 },
        { nombre: "BlazeWraith", correo: "blazewraith@mail.com", telefono: "+52-55-1234-7654", suscripto: false, Paises_id: 5, Plataformas_id: 4 },
        { nombre: "DarkGlitch", correo: "darkglitch@mail.com", telefono: "+1-646-555-0134", suscripto: false, Paises_id: 8, Plataformas_id: 3 },
        { nombre: "EchoBladeX", correo: "echobladex@mail.com", telefono: "+44-7911-876543", suscripto: false, Paises_id: 3, Plataformas_id: 5 },
        { nombre: "IronShade", correo: "ironshade@mail.com", telefono: "+33-612-345-876", suscripto: false, Paises_id: 6, Plataformas_id: 2 },
        { nombre: "VortexNemesis", correo: "vortexnemesis@mail.com", telefono: "+49-171-543-2109", suscripto: false, Paises_id: 14, Plataformas_id: 1 },
        { nombre: "NovaWolf", correo: "novawolf@mail.com", telefono: "+1-202-555-0129", suscripto: false, Paises_id: 1, Plataformas_id: 4 }
      ]
})




