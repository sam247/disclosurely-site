import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const enPath = path.join(root, "i18n", "locales", "en.json");
const outDir = path.join(root, "i18n", "overrides", "whistleblower");

const base = JSON.parse(fs.readFileSync(enPath, "utf8")).compare.whistleblower;

const locales = {
  es: {
    hero: {
      subtitle:
        "Compare modelos de precios, flujos de denuncia y flexibilidad de la plataforma para ver qué sistema de whistleblowing encaja con su organización.",
    },
    fairnessNote:
      "Esta comparación se basa en información pública y en el posicionamiento del producto en la fecha de redacción. Las funciones y los precios pueden cambiar — verifique los detalles con cada proveedor.",
    quickSummary: {
      title: "Orientación rápida",
      disclosurelyTitle: "Disclosurely puede encajar mejor en organizaciones que buscan:",
      disclosurelyBullet1: "Selección de plan más simple sin escaleras por empleados",
      disclosurelyBullet2: "Una prueba en línea clara para validar flujos pronto",
      disclosurelyBullet3: "Gestión de casos con IA en los planes pertinentes",
      disclosurelyBullet4: "Automatización moderna y flexibilidad al crecer",
      competitorTitle: "Whistleblower Software puede encajar si prefieren:",
      competitorBullet1: "Estructuras de precios por recuento de empleados o bandas",
      competitorBullet2: "Una estructura de paquetes más fija",
      competitorBullet3: "Comparar herramientas con precios ligados a la plantilla",
      competitorBullet4: "Un modelo de compra estructurado como con proveedores similares",
    },
    tables: {
      pricing: { title: "Precios y modelo de compra" },
      reporting: { title: "Denuncia y captación" },
      caseHandling: { title: "Gestión de casos y flujos" },
      security: { title: "Seguridad y control de acceso" },
      rollout: { title: "Despliegue y soporte" },
    },
    why: { title: "Por qué los equipos eligen Disclosurely" },
    fitCompetitor: {
      title: "Whistleblower Software puede encajar en organizaciones que:",
    },
    migration: {
      title: "Cambiar de plataforma no debería frenarle",
      subtitle:
        "Migración práctica con acompañamiento, despliegue por fases si hace falta y mínima interrupción para los gestores internos.",
      step1: {
        title: "Planifique el cambio",
        body: "Acuerde qué migrar, qué recrear y qué exigen sus políticas antes de cambiar el canal de denuncia.",
      },
      step2: {
        title: "Recrear formularios y flujos",
        body: "Le ayudamos a mapear categorías, formularios y roles de gestión en Disclosurely para mantener procesos reconocibles.",
      },
      step3: {
        title: "Despliegue por fases",
        body: "Comunique el nuevo canal, forme a los gestores y ponga en marcha con apoyo — el calendario depende de aprobaciones y datos.",
      },
      disclaimer:
        "Los plazos varían según sus datos, aprobaciones internas y la configuración actual — aclaramos en cada paso qué es viable.",
    },
    finalCta: {
      title: "¿Busca una alternativa más flexible a Whistleblower Software?",
      subtitle:
        "Inicie una prueba gratuita o reserve una demo para ver si Disclosurely encaja con su flujo de denuncias.",
    },
  },
  it: {
    hero: {
      subtitle:
        "Confrontate modelli di prezzo, flussi di segnalazione e flessibilità della piattaforma per capire quale sistema di whistleblowing si adatta alla vostra organizzazione.",
    },
    fairnessNote:
      "Questo confronto si basa su informazioni pubbliche e sul posizionamento del prodotto alla data di redazione. Funzioni e prezzi possono cambiare — verificate i dettagli con ciascun fornitore.",
    quickSummary: {
      title: "Orientamento rapido",
      disclosurelyTitle: "Disclosurely può essere più adatto per organizzazioni che vogliono:",
      disclosurelyBullet1: "Selezione del piano più semplice senza scale per dipendenti",
      disclosurelyBullet2: "Un percorso di prova online chiaro per validare i flussi in anticipo",
      disclosurelyBullet3: "Gestione casi supportata dall'IA nei piani pertinenti",
      disclosurelyBullet4: "Automazione moderna e flessibilità nella crescita",
      competitorTitle: "Whistleblower Software può adattarsi se preferite:",
      competitorBullet1: "Strutture tariffarie per numero di dipendenti o fasce",
      competitorBullet2: "Una struttura di pacchetti più fissa",
      competitorBullet3: "Confrontare strumenti con prezzi legati all'organico",
      competitorBullet4: "Un modello di acquisto strutturato come per fornitori simili",
    },
    tables: {
      pricing: { title: "Prezzi e modello di acquisto" },
      reporting: { title: "Segnalazione e raccolta" },
      caseHandling: { title: "Gestione casi e workflow" },
      security: { title: "Sicurezza e controllo degli accessi" },
      rollout: { title: "Distribuzione e supporto" },
    },
    why: { title: "Perché i team scelgono Disclosurely" },
    fitCompetitor: {
      title: "Whistleblower Software può adattarsi a organizzazioni che:",
    },
    migration: {
      title: "Il cambio piattaforma non dovrebbe rallentarvi",
      subtitle:
        "Migrazione pratica con supporto, rollout graduale se necessario e minima interruzione per i gestori interni.",
      step1: {
        title: "Pianificate il passaggio",
        body: "Concordate cosa migrare, cosa ricreare e cosa richiedono le policy prima di cambiare canale di segnalazione.",
      },
      step2: {
        title: "Ricreare moduli e flussi",
        body: "Vi aiutiamo a mappare categorie, moduli e ruoli gestori in Disclosurely per processi familiari.",
      },
      step3: {
        title: "Distribuire a fasi",
        body: "Comunicate il nuovo canal, formate i gestori e andate live con supporto — i tempi dipendono da approvazioni e dati.",
      },
      disclaimer:
        "I tempi variano in base a dati, approvazioni interne e configurazione attuale — chiariremo cosa è realistico a ogni passo.",
    },
    finalCta: {
      title: "Cercate un'alternativa più flessibile a Whistleblower Software?",
      subtitle:
        "Iniziate una prova gratuita o prenotate una demo per vedere se Disclosurely si adatta al vostro flusso di segnalazione.",
    },
  },
  nl: {
    hero: {
      subtitle:
        "Vergelijk prijsmodellen, meldworkflows en platformflexibiliteit om te zien welk klokkenluidersysteem bij uw organisatie past.",
    },
    fairnessNote:
      "Deze vergelijking is gebaseerd op openbare informatie en productpositionering op het moment van schrijven. Functies en prijzen kunnen wijzigen — verifieer details bij elke leverancier.",
    quickSummary: {
      title: "Snelle orientatie",
      disclosurelyTitle: "Disclosurely kan beter passen voor organisaties die willen:",
      disclosurelyBullet1: "Eenvoudigere plankeuze zonder medewerkersladders",
      disclosurelyBullet2: "Een duidelijk online testpad om workflows vroeg te valideren",
      disclosurelyBullet3: "AI-ondersteund zaakbeheer in relevante abonnementen",
      disclosurelyBullet4: "Moderne automatisering en flexibiliteit bij groei",
      competitorTitle: "Whistleblower Software kan passen als u de voorkeur geeft aan:",
      competitorBullet1: "Prijzen op basis van medewerkersaantallen of banden",
      competitorBullet2: "Een vastere pakketstructuur",
      competitorBullet3: "Tools vergelijken met personeelsgebonden prijzen",
      competitorBullet4: "Een gestructureerd inkoopmodel zoals bij vergelijkbare leveranciers",
    },
    tables: {
      pricing: { title: "Prijzen en koopmodel" },
      reporting: { title: "Melding en intake" },
      caseHandling: { title: "Zaakbeheer en workflows" },
      security: { title: "Beveiliging en toegangsbeheer" },
      rollout: { title: "Uitrol en ondersteuning" },
    },
    why: { title: "Waarom teams voor Disclosurely kiezen" },
    fitCompetitor: {
      title: "Whistleblower Software kan passen bij organisaties die:",
    },
    migration: {
      title: "Van platform wisselen hoeft u niet te vertragen",
      subtitle:
        "Praktische migratie met begeleiding, gefaseerde uitrol indien nodig en minimale verstoring voor interne behandelaars.",
      step1: {
        title: "Plan de overstap",
        body: "Spreek af wat u migreert, wat u opnieuw opbouwt en wat uw beleid vereist voordat u van meldkanaal wisselt.",
      },
      step2: {
        title: "Formulieren en workflows opnieuw opbouwen",
        body: "We helpen categorieën, formulieren en behandelaarsrollen in Disclosurely te mappen zodat processen herkenbaar blijven.",
      },
      step3: {
        title: "Gefaseerd live gaan",
        body: "Communiceer het nieuwe kanaal, train behandelaars en ga live met ondersteuning — planning hangt af van goedkeuringen en data.",
      },
      disclaimer:
        "Tijdlijnen verschillen per data, interne goedkeuringen en huidige configuratie — we maken per stap duidelijk wat haalbaar is.",
    },
    finalCta: {
      title: "Zoekt u een flexibeler alternatief voor Whistleblower Software?",
      subtitle:
        "Start een gratis proef of boek een demo om te zien of Disclosurely bij uw meldworkflow past.",
    },
  },
  pl: {
    hero: {
      subtitle:
        "Porównaj modele cenowe, przepływy zgłoszeń i elastyczność platformy, aby sprawdzić, który system sygnalistyczny pasuje do organizacji.",
    },
    fairnessNote:
      "To porównanie opiera się na informacjach publicznych i pozycjonowaniu produktu w momencie opracowania. Funkcje i ceny mogą się zmieniać — zweryfikuj szczegóły u każdego dostawcy.",
    quickSummary: {
      title: "Szybka orientacja",
      disclosurelyTitle: "Disclosurely może lepiej pasować do organizacji, które chcą:",
      disclosurelyBullet1: "Prostszy wybór planu bez drabin pracowniczych",
      disclosurelyBullet2: "Jasnej ścieżki testu online do wczesnej walidacji przepływów",
      disclosurelyBullet3: "Obsługi spraw wspieranej przez AI w odpowiednich planach",
      disclosurelyBullet4: "Nowoczesnej automatyzacji i elastyczności przy wzroście",
      competitorTitle: "Whistleblower Software może pasować, jeśli wolicie:",
      competitorBullet1: "Struktury cenowe oparte na liczbie pracowników lub progach",
      competitorBullet2: "Bardziej sztywną strukturę pakietów",
      competitorBullet3: "Porównywanie narzędzi z cenami powiązanymi z zatrudnieniem",
      competitorBullet4: "Ustrukturyzowany model zakupów jak u podobnych dostawców",
    },
    tables: {
      pricing: { title: "Ceny i model zakupu" },
      reporting: { title: "Zgłaszanie i przyjmowanie" },
      caseHandling: { title: "Obsługa spraw i przepływy" },
      security: { title: "Bezpieczeństwo i kontrola dostępu" },
      rollout: { title: "Wdrożenie i wsparcie" },
    },
    why: { title: "Dlaczego zespoły wybierają Disclosurely" },
    fitCompetitor: {
      title: "Whistleblower Software może pasować do organizacji, które:",
    },
    migration: {
      title: "Zmiana platformy nie powinna Was spowalniać",
      subtitle:
        "Praktyczna migracja z pomocą, etapowe wdrożenie w razie potrzeby i minimalne zakłócenia dla wewnętrznych obsługujących.",
      step1: {
        title: "Zaplanuj przejście",
        body: "Ustalcie, co migrujecie, co odtwarzacie i co wymagają polityki przed zmianą kanału zgłoszeń.",
      },
      step2: {
        title: "Odtwórz formularze i przepływy",
        body: "Pomagamy zmapować kategorie, formularze i role obsługi w Disclosurely, aby procesy pozostały znajome.",
      },
      step3: {
        title: "Wdrażaj etapami",
        body: "Komunikujcie nowy kanał, szkolcie obsługę i uruchamiajcie ze wsparciem — harmonogram zależy od akceptacji i danych.",
      },
      disclaimer:
        "Terminy zależą od danych, wewnętrznych akceptacji i konfiguracji — przy każdym kroku precyzujemy, co jest realne.",
    },
    finalCta: {
      title: "Szukacie bardziej elastycznej alternatywy dla Whistleblower Software?",
      subtitle:
        "Rozpocznijcie bezpłatny trial lub umówcie demo, aby sprawdzić, czy Disclosurely pasuje do przepływu zgłoszeń.",
    },
  },
  pt: {
    hero: {
      subtitle:
        "Compare modelos de preços, fluxos de denúncia e flexibilidade da plataforma para ver qual sistema de whistleblowing se adequa à sua organização.",
    },
    fairnessNote:
      "Esta comparação baseia-se em informação pública e posicionamento do produto na data de redação. As funcionalidades e os preços podem alterar-se — verifique os detalhes com cada fornecedor.",
    quickSummary: {
      title: "Orientação rápida",
      disclosurelyTitle: "O Disclosurely pode ser mais adequado para organizações que querem:",
      disclosurelyBullet1: "Seleção de plano mais simples sem escadas por número de colaboradores",
      disclosurelyBullet2: "Um percurso de teste online claro para validar fluxos cedo",
      disclosurelyBullet3: "Gestão de casos com apoio de IA nos planos relevantes",
      disclosurelyBullet4: "Automação moderna e flexibilidade à medida que cresce",
      competitorTitle: "O Whistleblower Software pode adequar-se se preferir:",
      competitorBullet1: "Estruturas de preços por número de colaboradores ou escalões",
      competitorBullet2: "Uma estrutura de pacotes mais fixa",
      competitorBullet3: "Comparar ferramentas com preços ligados à headcount",
      competitorBullet4: "Um modelo de compra estruturado como em fornecedores semelhantes",
    },
    tables: {
      pricing: { title: "Preços e modelo de compra" },
      reporting: { title: "Denúncia e recolha" },
      caseHandling: { title: "Gestão de casos e fluxos" },
      security: { title: "Segurança e controlo de acesso" },
      rollout: { title: "Implementação e suporte" },
    },
    why: { title: "Porque as equipas escolhem o Disclosurely" },
    fitCompetitor: {
      title: "O Whistleblower Software pode adequar-se a organizações que:",
    },
    migration: {
      title: "Mudar de plataforma não deve atrasá-lo",
      subtitle:
        "Migração prática com acompanhamento, implementação faseada se necessário e perturbação mínima para gestores internos.",
      step1: {
        title: "Planear a mudança",
        body: "Acordem o que migrar, o que recriar e o que as políticas exigem antes de alterar o canal de denúncia.",
      },
      step2: {
        title: "Recriar formulários e fluxos",
        body: "Ajudamo-lo a mapear categorias, formulários e funções de gestão no Disclosurely para manter processos reconhecíveis.",
      },
      step3: {
        title: "Implementar em fases",
        body: "Comunique o novo canal, forme gestores e entre em produção com apoio — o calendário depende de aprovações e dados.",
      },
      disclaimer:
        "Os prazos variam conforme os dados, aprovações internas e configuração atual — esclarecemos em cada passo o que é viável.",
    },
    finalCta: {
      title: "Procura uma alternativa mais flexível ao Whistleblower Software?",
      subtitle:
        "Inicie um teste gratuito ou marque uma demo para ver se o Disclosurely se adequa ao seu fluxo de denúncias.",
    },
  },
  sv: {
    hero: {
      subtitle:
        "Jämför prismodeller, rapporteringsflöden och plattformsflexibilitet för att se vilket visselblåsarsystem som passar er organisation.",
    },
    fairnessNote:
      "Jämförelsen bygger på offentlig information och produktpositionering vid tidpunkten för framtagning. Funktioner och priser kan ändras — verifiera detaljer hos respektive leverantör.",
    quickSummary: {
      title: "Snabb orientering",
      disclosurelyTitle: "Disclosurely kan passa bättre för organisationer som vill ha:",
      disclosurelyBullet1: "Enklare planval utan medarbetarstegar",
      disclosurelyBullet2: "En tydlig onlinetestväg för att validera arbetsflöden tidigt",
      disclosurelyBullet3: "AI-stödd ärendehantering i relevanta planer",
      disclosurelyBullet4: "Modern automatisering och flexibilitet när ni växer",
      competitorTitle: "Whistleblower Software kan passa om ni föredrar:",
      competitorBullet1: "Prisstrukturer baserade på antal anställda eller band",
      competitorBullet2: "En mer fast paketstruktur",
      competitorBullet3: "Att jämföra verktyg med personalbaserade priser",
      competitorBullet4: "En strukturerad upphandlingsmodell som hos liknande leverantörer",
    },
    tables: {
      pricing: { title: "Priser och köpmodell" },
      reporting: { title: "Rapportering och intag" },
      caseHandling: { title: "Ärendehantering och arbetsflöden" },
      security: { title: "Säkerhet och åtkomstkontroll" },
      rollout: { title: "Utrullning och support" },
    },
    why: { title: "Varför team väljer Disclosurely" },
    fitCompetitor: {
      title: "Whistleblower Software kan passa organisationer som:",
    },
    migration: {
      title: "Ett plattformsbyte ska inte sakta ner er",
      subtitle:
        "Praktisk migrering med vägledning, fasvis utrullning vid behov och minimal störning för interna handläggare.",
      step1: {
        title: "Planera bytet",
        body: "Enig om vad som migreras, återskapas och vad policyn kräver innan ni byter rapporteringskanal.",
      },
      step2: {
        title: "Återskapa formulär och flöden",
        body: "Vi hjälper er kartlägga kategorier, formulär och handläggarroller i Disclosurely så processerna känns igen.",
      },
      step3: {
        title: "Rulla ut i faser",
        body: "Kommunicera den nya kanalen, utbilda handläggare och gå live med stöd — tidsplan beror på godkännanden och data.",
      },
      disclaimer:
        "Tidslinjer varierar med er data, interna godkännanden och nuvarande konfiguration — vi redogör tydligt för vad som är genomförbart i varje steg.",
    },
    finalCta: {
      title: "Letar ni efter ett mer flexibelt alternativ till Whistleblower Software?",
      subtitle:
        "Starta en gratis provperiod eller boka en demo för att se om Disclosurely passar ert rapporteringsarbetsflöde.",
    },
  },
  no: {
    hero: {
      subtitle:
        "Sammenlign prismodeller, varslingsarbeidsflyter og plattformfleksibilitet for å se hvilket varslingssystem som passer organisasjonen deres.",
    },
    fairnessNote:
      "Sammenligningen bygger på offentlig tilgjengelig informasjon og produktposisjonering på tidspunktet for utarbeidelse. Funksjoner og priser kan endres — verifiser detaljer hos hver leverandør.",
    quickSummary: {
      title: "Rask orientering",
      disclosurelyTitle: "Disclosurely kan passe bedre for organisasjoner som ønsker:",
      disclosurelyBullet1: "Enklere planvalg uten medarbeiderstiger",
      disclosurelyBullet2: "En tydelig nettbasert prøvevei for å validere arbeidsflyter tidlig",
      disclosurelyBullet3: "AI-støttet saksbehandling i relevante planer",
      disclosurelyBullet4: "Moderne automatisering og fleksibilitet når dere vokser",
      competitorTitle: "Whistleblower Software kan passe hvis dere foretrekker:",
      competitorBullet1: "Prisstrukturer basert på antall ansatte eller bånd",
      competitorBullet2: "En mer fast pakkestruktur",
      competitorBullet3: "Å sammenligne verktøy med bemanningsbaserte priser",
      competitorBullet4: "En strukturert anskaffelsesmodell som hos lignende leverandører",
    },
    tables: {
      pricing: { title: "Priser og kjøpsmodell" },
      reporting: { title: "Varsling og inntak" },
      caseHandling: { title: "Saksbehandling og arbeidsflyter" },
      security: { title: "Sikkerhet og tilgangskontroll" },
      rollout: { title: "Utrulling og støtte" },
    },
    why: { title: "Hvorfor team velger Disclosurely" },
    fitCompetitor: {
      title: "Whistleblower Software kan passe organisasjoner som:",
    },
    migration: {
      title: "Plattformbytte skal ikke sinke dere",
      subtitle:
        "Praktisk migrering med veiledning, trinnvis utrulling ved behov og minimal forstyrrelse for interne saksbehandlere.",
      step1: {
        title: "Planlegg flyttingen",
        body: "Bli enige om hva som migreres, gjenskapes og hva retningslinjene krever før dere bytter varslingskanal.",
      },
      step2: {
        title: "Gjenopprett skjemaer og flyter",
        body: "Vi hjelper dere å kartlegge kategorier, skjemaer og saksbehandlerroller i Disclosurely slik at prosessene gjenkjennes.",
      },
      step3: {
        title: "Rull ut i faser",
        body: "Kommuniser den nye kanalen, opplær saksbehandlere og gå live med støtte — tidsplan avhenger av godkjenninger og data.",
      },
      disclaimer:
        "Tidslinjer varierer med dataene deres, interne godkjenninger og nåværende konfigurasjon — vi tydeliggjør hva som er gjennomførbart i hvert trinn.",
    },
    finalCta: {
      title: "Leter dere etter et mer fleksibelt alternativ til Whistleblower Software?",
      subtitle:
        "Start en gratis prøveperiode eller book en demo for å se om Disclosurely passer deres varslingsarbeidsflyt.",
    },
  },
  da: {
    hero: {
      subtitle:
        "Sammenlign prismodeller, indberetningsworkflows og platformsfleksibilitet for at se, hvilket whistleblowing-system der passer til jeres organisation.",
    },
    fairnessNote:
      "Sammenligningen bygger på offentligt tilgængelig information og produktpositionering på tidspunktet for udarbejdelse. Funktioner og priser kan ændre sig — verificer detaljer hos hver leverandør.",
    quickSummary: {
      title: "Hurtig orientering",
      disclosurelyTitle: "Disclosurely kan passe bedre til organisationer, der ønsker:",
      disclosurelyBullet1: "Enklere planvalg uden medarbejderstiger",
      disclosurelyBullet2: "En klar online-prøvevej til at validere workflows tidligt",
      disclosurelyBullet3: "AI-understøttet sagsbehandling i relevante planer",
      disclosurelyBullet4: "Moderne automatisering og fleksibilitet, når I vokser",
      competitorTitle: "Whistleblower Software kan passe, hvis I foretrækker:",
      competitorBullet1: "Prisstrukturer baseret på medarbejderantal eller bånd",
      competitorBullet2: "En mere fast pakkestruktur",
      competitorBullet3: "At sammenligne værktøjer med personalebaserede priser",
      competitorBullet4: "En struktureret indkøbsmodel som hos lignende leverandører",
    },
    tables: {
      pricing: { title: "Priser og købsmodel" },
      reporting: { title: "Indberetning og modtagelse" },
      caseHandling: { title: "Sagsbehandling og workflows" },
      security: { title: "Sikkerhed og adgangskontrol" },
      rollout: { title: "Udrulning og support" },
    },
    why: { title: "Hvorfor teams vælger Disclosurely" },
    fitCompetitor: {
      title: "Whistleblower Software kan passe til organisationer, der:",
    },
    migration: {
      title: "Et platformskifte bør ikke sinke jer",
      subtitle:
        "Praktisk migration med vejledning, trinvis udrulning ved behov og minimal forstyrrelse for interne sagsbehandlere.",
      step1: {
        title: "Planlæg skiftet",
        body: "Bli enige om, hvad der migreres, genskabes, og hvad politikker kræver, før I skifter indberetningskanal.",
      },
      step2: {
        title: "Genskab formularer og workflows",
        body: "Vi hjælper med at kortlægge kategorier, formularer og sagsbehandlerroller i Disclosurely, så processerne genkendes.",
      },
      step3: {
        title: "Udrul i faser",
        body: "Kommuniker den nye kanal, oplær sagsbehandlere og gå live med støtte — tidsplan afhænger af godkendelser og data.",
      },
      disclaimer:
        "Tidslinjer varierer med jeres data, interne godkendelser og nuværende konfiguration — vi gør klart, hvad der er realistisk i hvert trin.",
    },
    finalCta: {
      title: "Leder I efter et mere fleksibelt alternativ til Whistleblower Software?",
      subtitle:
        "Start en gratis prøveperiode eller book en demo for at se, om Disclosurely passer til jeres indberetningsworkflow.",
    },
  },
  el: {
    hero: {
      subtitle:
        "Συγκρίνετε μοντέλα τιμολόγησης, ροές αναφοράς και ευελιξία πλατφόρμας για να δείτε ποιο σύστημα whistleblowing ταιριάζει στον οργανισμό σας.",
    },
    fairnessNote:
      "Αυτή η σύγκριση βασίζεται σε δημόσια διαθέσιμες πληροφορίες και θέση προϊόντος κατά το χρόνο σύνταξης. Οι λειτουργίες και οι τιμές μπορεί να αλλάξουν — επαληθεύστε τις λεπτομέρειες με κάθε προμηθευτή.",
    quickSummary: {
      title: "Γρήγορη προσανατολισμός",
      disclosurelyTitle: "Το Disclosurely μπορεί να ταιριάζει καλύτερα σε οργανισμούς που θέλουν:",
      disclosurelyBullet1: "Απλούστερη επιλογή πλάνου χωρίς κλίμακες εργαζομένων",
      disclosurelyBullet2: "Σαφή διαδρομή δοκιμής online για έγκαιρη επικύρωση ροών",
      disclosurelyBullet3: "Διαχείριση υποθέσεων με υποστήριξη AI σε σχετικά πλάνα",
      disclosurelyBullet4: "Σύγχρονη αυτοματοποίηση και ευελιξία καθώς μεγαλώνετε",
      competitorTitle: "Το Whistleblower Software μπορεί να ταιριάζει αν προτιμάτε:",
      competitorBullet1: "Δομές τιμολόγησης βάσει αριθμού εργαζομένων ή κλιμάκων",
      competitorBullet2: "Πιο σταθερή δομή πακέτων",
      competitorBullet3: "Σύγκριση εργαλείων με τιμές συνδεδμένες με προσωπικό",
      competitorBullet4: "Δομημένο μοντέλο προμήθειας όπως με παρόμοιους προμηθευτές",
    },
    tables: {
      pricing: { title: "Τιμολόγηση και μοντέλο αγοράς" },
      reporting: { title: "Αναφορά και υποδοχή" },
      caseHandling: { title: "Διαχείριση υποθέσεων και ροές" },
      security: { title: "Ασφάλεια και έλεγχος πρόσβασης" },
      rollout: { title: "Εφαρμογή και υποστήριξη" },
    },
    why: { title: "Γιατί οι ομάδες επιλέγουν Disclosurely" },
    fitCompetitor: {
      title: "Το Whistleblower Software μπορεί να ταιριάζει σε οργανισμούς που:",
    },
    migration: {
      title: "Η αλλαγή πλατφόρμας δεν πρέπει να σας καθυστερεί",
      subtitle:
        "Πρακτική μετάβαση με καθοδήγηση, σταδιακή εφαρμογή όπου χρειάζεται και ελάχιστη διατάραξη για εσωτερικούς χειριστές.",
      step1: {
        title: "Σχεδιάστε τη μετάβαση",
        body: "Συμφωνήστε τι μεταφέρεται, τι αναδημιουργείται και τι απαιτούν οι πολιτικές πριν αλλάξετε κανάλι αναφοράς.",
      },
      step2: {
        title: "Αναδημιουργία φορμών και ροών",
        body: "Σας βοηθάμε να χαρτογραφήσετε κατηγορίες, φόρμες και ρόλους χειριστών στο Disclosurely ώστε οι διεργασίες να παραμένουν οικείες.",
      },
      step3: {
        title: "Εφαρμογή σε φάσεις",
        body: "Επικοινωνήστε το νέο κανάλι, εκπαιδεύστε χειριστές και ξεκινήστε με υποστήριξη — το χρονοδιάγραμμα εξαρτάται από εγκρίσεις και δεδομένα.",
      },
      disclaimer:
        "Οι χρονοδιαγράμματα διαφέρουν ανάλογα με τα δεδομένα, τις εσωτερικές εγκρίσεις και τη ρύθμιση — διευκρινίζουμε τι είναι ρεαλιστικό σε κάθε βήμα.",
    },
    finalCta: {
      title: "Ψάχνετε μια πιο ευέλικτη εναλλακτική στο Whistleblower Software;",
      subtitle:
        "Ξεκινήστε δωρεάν δοκιμή ή κλείστε demo για να δείτε αν το Disclosurely ταιριάζει στη ροή αναφοράς σας.",
    },
  },
};

function deepMerge(target, source) {
  if (!source) return target;
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

for (const [lang, patch] of Object.entries(locales)) {
  const merged = JSON.parse(JSON.stringify(base));
  deepMerge(merged, patch);
  fs.writeFileSync(path.join(outDir, `${lang}.json`), JSON.stringify(merged, null, 2) + "\n");
  console.log("wrote", lang);
}
