// import page styling
require ('./train.css')

// import component styling
require ('../../components/aside/aside.css')
require ('../../components/form/form-row/form-row.css')
require ('../../components/form/form-footer/form-footer.css')
require ('../../components/notification/notification.css')

// external scripts

import { defaultDatabase } from '../../scripts/init-firebase.js';
import { logout } from '../../scripts/logout.js';

logout()

const deleteInputRowTriggers = document.querySelectorAll('[data-delete-row]')
const addInputRowTriggers = document.querySelectorAll('[data-add-input-row]')
const executeTrainingTrigger = document.querySelector('[data-execute-training]')
const notificationHandle = document.querySelector('[data-notification-handle]')
const allStatusClassNames = ['success', 'error']
const traininHistorygRef = defaultDatabase.ref("trainingHistory");
const trainTreeOption = document.querySelector('[train-tree-option]')
const addQuickAnswerFieldTrigger = document.querySelector('[add-quick-answer-field]')
const addExternalFieldTrigger = document.querySelector('[add-external-link-field]')

const fakeTrainingData = {
    "start": {
        "value": "start",
        "message": "Hej! Ik ben de digitale assistent van LOAVIES. Waar wil je iets over vragen?",
        "quickAnswers": [
            "retourneren",
            "bezorging",
            "bestellen",
            "betalen",
            "kortingen",
            "overig"
        ],
        "externalLinks": []
    },
    "start.betalen": {
        "value": "betalen",
        "message": "kies een onderwerp om meer informatie over te krijgen.",
        "quickAnswers": [
            "afterPay",
            "terugbetaling",
            "afbetaling"
        ],
        "externalLinks": []
    },
    "start.betalen.afterPay": {
        "value": "afterPay",
        "message": "Een betaling door middel van AfterPay kan door verschillende oorzaken worden geweigerd. Wegens privacy hebben wij hier helaas geen inzicht op. AfterPay kan je precies uitleggen waarom je betaling wordt geweigerd, wij raden je daarom aan om contact op te nemen met de klantenservice van AfterPay.",
        "quickAnswers": [],
        "externalLinks": [
            {
                "value": "afterPay klantenservice",
                "url": "https://www.afterpay.nl/nl/consumenten/vraag-en-antwoord/"
            }
        ]
    },
    "start.betalen.terugbetaling": {
        "value": "terugbetaling",
        "message": "De manier waarop jij jouw terugbetaling ontvangt is afhankelijk van de betaalmethode die jij gekozen hebt.\n\nAfterPay\nZodra je retour e/o wijziging verwerkt is, ontvang je binnen 24 uur een aangepaste factuur van AfterPay. Heb jij je AfterPay factuur al betaald? In dat geval ontvang je binnen 3 werkdagen een terugbetaling op je bankrekening namens AfterPay.\n\nBancontact\nZodra je retour e/o wijziging verwerkt is, ontvang je de terugbetaling op het zelfde rekeningnummer als de rekening waarmee jij jouw bestelling betaald hebt. Binnen drie werkdagen zal het bedrag weer terug op jouw rekening staan. Credit Card (American Express, Visa, Maestro & Mastercard) Zodra je retour e/o wijziging verwerkt is, ontvang je de terugbetaling op het zelfde rekeningnummer als de rekening waarmee jij jouw bestelling betaald hebt. Binnen drie werkdagen zal het bedrag als krediet weer beschikbaar zijn op jouw creditcard. \n\nGiftcard\nZodra je retour e/o wijziging verwerkt is, wordt het bedrag automatisch weer op je huidige giftcard gezet.\n\niDEAL\nZodra je retour e/o wijziging verwerkt is, ontvang je de terugbetaling op het zelfde rekeningnummer als de rekening waarmee jij jouw bestelling betaald hebt. Binnen drie werkdagen zal het bedrag weer terug op jouw rekening staan.\n\nPayPal\nZodra je retour e/o wijziging verwerkt is, hebben wij een terugbetalingsverzoek ingediend bij PayPal. PayPal zal dit binnen 5 werkdagen verwerken.",
        "quickAnswers": [
            ""
        ],
        "externalLinks": []
    },
    "start.betalen.betalingsmethode": {
        "value": "betalingsmethode",
        "message": "In Nederland kan je de volgende betalingsmogelijkheden gebruiken:\n\n- AfterPay\n- Credit Card (American Express, Visa, Maestro & Mastercard)\n- iDEAL\n- PayPal\n\n\nIn België kan je de volgende betalingsmogelijkheden gebruiken:\n\n- AfterPay\n- Bancontact\n- Credit Card (American Express, Visa, Maestro & Mastercard)\n- PayPal",
        "quickAnswers": [
            ""
        ],
        "externalLinks": []
    },
    "start.kortingen": {
        "value": "kortingen",
        "message": "kies een onderwerp om meer informatie over te krijgen.",
        "quickAnswers": [
            "kortingscode vergeten in te vullen",
            "kortingscode gebruiken",
            "kortingscode werkt niet",
            "afprijzing na bestelling"
        ],
        "externalLinks": []
    },
    "start.kortingen.kortingscodeVergetenInTeVullen": {
        "value": "kortingscode vergeten in te vullen",
        "message": "Stuur ons een bericht zodra je jouw bestelling hebt ontvangen en hebt besloten of je de item(s) wilt houden. Stuur je items retour? Stuur ons dan een bericht zodra jouw retour is verwerkt en terugbetaald. Mocht de korting geldig zijn op jouw bestelling, dan zullen wij de korting achteraf voor je verwerken. (Let op! Dit is niet geldig op persoonlijke kortingen.)",
        "quickAnswers": [],
        "externalLinks": [
            {
                "value": "Customer care",
                "url": "/"
            }
        ],
        "optionalUtterances": ["Ik ben de kortingscode niet ingevuld"]
    },
    "start.kortingen.kortingscodeGebruiken": {
        "value": "kortingscode gebruiken",
        "message": "Kortingscode\nEen kortingscode kun je bij de betaalpagina toepassen. De kortingscode voer je bij “Pas kortingscode toe” in. Per bestelling kun je één kortingscode gebruiken. \n\nLOAVIES Giftcard\nEen LOAVIES cadeaubon is een cadeaubon die is uitgegeven door LOAVIES. Je kan de code bij het veld ''Pas cadeauboncode toe'' invullen. De code is een jaar geldig en je kan de giftcard in meerdere delen besteden. Een LOAVIES giftcard is ingesteld op een e-mail adres. Ontvang je een foutmelding, dan kan het zijn dat je niet het juiste e-mail adres hebt gebruikt bij je gegevens.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.kortingen.kortingscodeWerktNiet": {
        "value": "kortingscode werkt niet",
        "message": "Dit kan verschillende oorzaken hebben. Denk hierbij aan de volgende punten:\n\n- Voor sommige kortingscodes heb je een account nodig. \n- De meeste kortingscodes hebben bepaalde voorwaarden het kan zijn dat jouw bestelling niet aan de voorwaarden voldoet. \n- Kortingscodes zijn niet geldig op SALE artikelen.\n- Let goed op tot wanneer de kortingscode geldig is. \n\n\nMocht het niet aan de bovenstaande punten liggen dan raden wij je aan om de bestelling alsnog te plaatsen. Stuur ons een bericht zodra je jouw bestelling hebt ontvangen en hebt besloten of je de item(s) wilt houden. Stuur je items retour? Stuur ons dan een bericht zodra jouw retour is verwerkt en terugbetaald. Mocht de korting geldig zijn op jouw bestelling, dan zullen wij de korting achteraf voor je verwerken. (Let op! Dit is niet geldig op persoonlijke kortingen.)",
        "quickAnswers": [],
        "externalLinks": [
            {
                "value": "Customer care",
                "url": "/"
            }
        ]
    },
    "start.kortingen.afprijzingNaBestelling": {
        "value": "afprijzing na bestelling",
        "message": "Als de SALE binnen 48 uur gestart is na het plaatsen van je bestelling, vergoeden wij het verschil van de bedragen van de items die je houdt door middel van een LOAVIES Giftcard.\n\nStuur ons een bericht zodra je jouw bestelling hebt ontvangen en hebt besloten of je de item(s) wilt houden. Stuur je items retour? Stuur ons dan een bericht zodra jouw retour is verwerkt en terugbetaald. Je ontvangt dan een Giftcard ter waarde van het verschil van de kortingsbedragen van de items.",
        "quickAnswers": [],
        "externalLinks": [
            {
                "value": "Customer care",
                "url": "/"
            }
        ]
    },
    "start.bezorging": {
        "value": "bezorging",
        "message": "kies een onderwerp om meer informatie over te krijgen.",
        "quickAnswers": [
            "levertijden en verzendkosten",
            "bestelling volgen",
            "niet thuis bij bezorging",
            "bezorgen bij DHL service point",
            "pakket verkeerd gesorteerd",
            "COVID en bezorging",
            "COVID en service point"
        ],
        "externalLinks": []
    },
    "start.bezorging.levertijdenEnVerzendkosten": {
        "value": "levertijden en verzendkosten",
        "message": "Je kan de levertijden en verzendkosten vinden op onze bezorg pagina.",
        "quickAnswers": [],
        "externalLinks": [
            {
                "value": "Bezorgingspagina",
                "url": "https://www.loavies.com/nl/retouren/"
            }
        ]
    },
    "start.bezorging.bestellingVolgen": {
        "value": "bestelling volgen",
        "message": "Zodra jouw pakket is verzonden ontvang je een e-mail van ons met daarin een Track & Trace. Hier kan je de status van de zending inzien en kan je (indien mogelijk) de bezorger verdere instructie geven over jouw levering.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.bezorging.nietThuisBijBezorging": {
        "value": "niet thuis bij bezorging",
        "message": "Nederland\n\nBen je niet thuis op het moment dat jouw pakket wordt bezorgt dan biedt DHL je pakket aan bij de buren. De bezorger laat een bezorger-gemist-kaart achter in je brievenbus met daarop het adres waar je pakket is afgeleverd. Indien deze optie niet mogelijk is laat DHL een bezorgcode achter op de bezorger-gemist-kaart. Hiermee kan je zelf online aangeven waar en wanneer DHL jouw pakket gratis opnieuw kan bezorgen.\n\nBelgië\n\nBen je niet thuis op het moment dat jouw pakket wordt bezorgt dan zal Bpost een afwezigheidsbericht in de brievenbus achterlaten. Dit bericht geeft duidelijk weer waar en wanneer je je zending kan ophalen.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.bezorging.bezorgenBijDHLServicePoint": {
        "value": "bezorgen bij DHL service point",
        "message": "In Nederland is het mogelijk om je pakket bij een DHL Servicepunt te laten bezorgen. \n\nKies als verzendmethode  ‘’Pick up” en selecteer jouw gewenste servicepunt.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.bezorging.pakketVerkeerdGesorteerd": {
        "value": "pakket verkeerd gesorteerd",
        "message": "In dit geval moet jouw bestelling eerst opnieuw gesorteerd worden. Wij raden je aan om de Track & Trace goed in de gaten te houden. Zodra er een nieuwe leverdatum bekend is zal dit zichtbaar worden gemaakt in de Track & Trace. Mocht je bestelling na 5 werkdagen nog steeds niet geleverd zijn, dan raden wij je aan om contact op te nemen met onze Customer Care.",
        "quickAnswers": [],
        "externalLinks": [
            {
                "value": "Customer care",
                "url": "/"
            }
        ]
    },
    "start.bezorging.COVIDEnBezorging": {
        "value": "COVID en bezorging",
        "message": "Ondanks de enorme impact van het COVID-19 virus wordt je bestelling bij LOAVIES nog steeds verstuurd en afgeleverd. We volgen alle ontwikkelingen op de voet en zullen er alles aan doen om de pakketten te blijven bezorgen.\n\nWe houden je in de bevestigingsmail op de hoogte over de status van jouw order.",
        "quickAnswers": [],
        "externalLinks": [
            {
                "value": "COVID-19 beleid",
                "url": "https://www.loavies.com/nl/campaigns/covid-19-beleid/"
            },
            {
                "value": "COVID-19 DHL",
                "url": "https://dhlparcel.nl/nl/zakelijk/corona-europa?dm_i=1VEJ,6TI91,R1B1N9,RB9BK,1"
            },
            {
                "value": "COVID-19 Bpost",
                "url": "https://news.bpost.be/nl-corona"
            }
        ]
    },
    "start.bezorging.COVIDEnServicePoint": {
        "value": "COVID en service point",
        "message": "Onze vervoerders houden goed in de gaten welke servicepunten niet meer beschikbaar zijn. Mocht een servicepunt gesloten zijn dan zal dit zo snel mogelijk worden aangepast in ons systeem. Het is op dat moment tijdelijk niet meer mogelijk gebruik te maken van dit servicepunt. Mocht een servicepunt sluiten tijdens de bezorging van je bestelling dan wordt jouw bestelling automatisch naar een ander servicepunt gebracht. Het is voor ons helaas niet mogelijk dit servicepunt te wijzigen. \n\nWij adviseren je om je pakket thuis af te laten leveren zodat je zo min mogelijk de deur uit hoeft. De bezorger zal jouw pakket op een contactloze manier bezorgen.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.retourneren": {
        "value": "retourneren",
        "message": "kies een onderwerp om meer informatie over te krijgen.",
        "quickAnswers": [
            "verwerking en terugbetaling",
            "aanpassing AfterPay factuur",
            "bestelling retourneren",
            "meerdere bestellingen retour samenvoegen",
            "retoursvoorwaarden",
            "geen pakbon",
            "geen retouretiket ontvangen",
            "retourneertermijn",
            "COVID en retourneren",
            "bestelling omruilen",
            "SALE items retourneren"
        ],
        "externalLinks": []
    },
    "start.retourneren.verwerkingEnTerugbetaling": {
        "value": "verwerking en terugbetaling",
        "message": "Wanneer je het pakket retour verstuurd hebt, duurt het maximaal 15 werkdagen voordat we je retour hebben ontvangen en verwerkt. Zodra je retour bij ons is verwerkt, ontvang je een e-mail met daarin verdere informatie over je terugbetaling/ruiling.\n\nMocht je na 15 werkdagen nog geen bericht van ons hebben ontvangen, dan raden wij je aan om contact met onze Customer Care op te nemen.\n\nLet op! Het kan voorkomen dat jouw retour in meerdere delen wordt verwerkt.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.retourneren.aanpassingAfterPayFactuur": {
        "value": "aanpassing AfterPay factuur",
        "message": "Zodra wij jouw retour hebben ontvangen en verwerkt*, wordt er een aanpassing gemaakt op je factuur. Je ontvangt dan binnen 24 uur een aangepaste factuur van AfterPay, bijgesteld op basis van je retourzending.\n\nHet fijne aan AfterPay is dat je niet je volledige factuur van te voren dient te voldoen. Wel raden wij je aan om je factuur tijdig te betalen, om verhoging van kosten te voorkomen.\n\nHeb je je AfterPay factuur al betaald en uiteindelijk items geretourneerd? In dit geval ontvang je een terugbetaling van AfterPay zodra wij jouw retour ontvangen en verwerkt hebben.\n\nBen je al bekend met de AfterPay app? Met de AfterPay app heb je een overzicht over je bestellingen en kun je onder andere je factuur ‘’on hold’’ zetten of retouren aanmelden.\n\nKijk voor meer informatie op https://www.afterpay.nl/nl/app.\n* voor meer informatie over de duur van onze retourverwerking bekijk: Hoelang duurt een terugbetaling en de retourverwerking?",
        "quickAnswers": [],
        "externalLinks": [
            {
                "value": "AfterPay",
                "url": "https://www.afterpay.nl/nl/app"
            }
        ]
    },
    "start.retourneren.bestellingRetourneren": {
        "value": "bestelling retourneren",
        "message": "Meld jouw retour aan via onze retour pagina en volg onderstaande stappen: \n\nAanmelden: selecteer de items die jij wilt retourneren en kies de gewenste retour methode.Inpakken: pak je items in en plak het retouretiket op het pakket. Vergeet niet om het oude verzendetiket te verwijderen.Breng je pakket naar een DHL ServicePoint of laat je pakket ophalen door gebruik te maken van de DHL Ophaalservice (afhankelijk van welke retour methode je hebt gekozen).Terugbetaling: zodra we je retourzending ontvangen, wordt het aankoopbedrag binnen 15 werkdagen teruggestort. Indien je artikelen nog niet hebt betaald, wordt het bedrag op de openstaande rekening in mindering gebracht.Let op! in België is het niet mogelijk om met DHL je pakket te retourneren. \n\nJe ontvangt van de baliemedewerker of bezorger een verzendbewijs met daarop een Track & Trace code. Bewaar het verzendbewijs goed totdat je retour volledig is verwerkt en is terugbetaald. \n\nZonder een geldig verzendbewijs met daarop een Track & Trace code kunnen wij geen onderzoek starten naar vermiste retouren en zullen wij dus niets terugbetalen.",
        "quickAnswers": [],
        "externalLinks": [
            {
                "value": "Retourpagina",
                "url": "https://www.loavies.com/nl/retouren/"
            }
        ]
    },
    "start.retourneren.meerdereBestellingenRetourSamenvoegen": {
        "value": "meerdere bestellingen retour samenvoegen",
        "message": "Het is mogelijk om maximaal twee bestellingen in één pakket te retourneren. Het is wel belangrijk dat de juiste pakbonnen of papieren aan dit pakket worden toegevoegd. Hierbij moet de volgende informatie per bestelling aanwezig zijn:\n\n- Bestelnummer.- Productcodes van de items die je retour stuurt.- De reden van retour.- Of je de/het item(s) zou willen ruilen voor een andere maat (Zo ja, dan ook de gewenste maat.).\n\nZodra wij je retour(en) ontvangen hebben, ontvang je daarvan retourbevestiging per bestelling.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.retourneren.retoursvoorwaarden": {
        "value": "retoursvoorwaarden",
        "message": "De items die je wil retourneren dienen ongedragen te zijn en alle tags zijn nog aan het artikel bevestigd. Het item bevat geen gebruikssporen of overige vlekken.\n\nSieraden en mondkapjes kunnen i.v.m. hygiëne alleen worden geretourneerd indien de verpakking niet is aangebroken. \n\nBikini's mogen alleen worden geretourneerd als de hygiëne strip niet is verwijderd.\n\nLet op! Wanneer een artikel niet voldoet aan onze retourvoorwaarden, kun je deze helaas niet retourneren. Onze retourverwerking stelt aan de hand van diverse toetsingen vast of een retour gestuurd artikel voldoet aan de voorwaarden. Voldoet je retour niet aan de voorwaarden, dan kunnen we deze niet verwerken en niet overgaan tot terugbetaling.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.retourneren.geenPakbon": {
        "value": "geen pakbon",
        "message": "In dit geval is het belangrijk om een papier bij jouw retour pakket in te doen met daarop de volgende informatie:\n\n- Bestelnummer.- Productcodes van de items die je retour stuurt.- De reden van retour.- Of je de/het item(s) zou willen ruilen voor een andere maat (Zo ja, dan ook de gewenste maat.)",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.retourneren.geenRetouretiketOntvangen": {
        "value": "geen retouretiket ontvangen",
        "message": "Het kan zijn dat je retouretiket in je spambox terecht is gekomen! Mocht dit niet het geval zijn dan dan raden wij je aan om contact op te nemen met onze Customer Care.\n\nVergeet niet om een screenshot van je betalingsafschrift van het etiket mee te sturen.",
        "quickAnswers": [],
        "externalLinks": [
            {
                "value": "Customer care",
                "url": "/"
            }
        ]
    },
    "start.retourneren.retourneertermijn": {
        "value": "retourneertermijn",
        "message": "Je hebt het recht om jouw bestelling te herroepen en retour te sturen binnen ons retourtermijn van 14 dagen. Binnen dit termijn kun je jouw aankoop beoordelen en passen.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.retourneren.COVIDEnRetourneren": {
        "value": "COVID en retourneren",
        "message": "Op dit moment zijn al onze retour mogelijkheden nog steeds beschikbaar. Onze retour partner Returnista heeft de nodige maatregelingen genomen voor hun medewerkers en onze klanten. Via onze retour pagina is het mogelijk om een retouretiket aan te maken om je pakket af te geven bij een DHL servicepunt of je kunt een ophaalafspraak maken. Wanneer je niet in de mogelijkheid bent om je pakket af te geven bij een servicepunt raden wij je aan om gebruik te maken van de ophaalafspraak.",
        "quickAnswers": [],
        "externalLinks": [
            {
                "value": "COVID-19 beleid",
                "url": "https://www.loavies.com/nl/campaigns/covid-19-beleid/"
            }
        ]
    },
    "start.retourneren.bestellingOmruilen": {
        "value": "bestelling omruilen",
        "message": "Wanneer het artikel voldoet aan onze voorwaarden kun je deze omruilen voor een andere maat. Bij het aanmelden van jouw retour kan je het item ruilen voor een andere maat.\n\nZodra we jouw retour hebben ontvangen, wordt er gekeken of de gewenste maat op voorraad is. Wanneer dit het geval is, wordt dit artikel kosteloos naar je verstuurd. \n\nJe ontvangt dezelfde dag nog een bevestiging dat jouw bestelling onderweg is. \n\nMocht de gewenste maat toch niet op voorraad zijn dan ontvang je een terugbetaling.\n\nBestelde items kunnen helaas niet worden omgeruild voor een ander item. Wil je toch graag een ander item ontvangen, dan raden we je aan om jouw aankoop te retourneren. Wanneer je retour voldoet aan de retourvoorwaarden, zullen we overgaan tot terugbetaling van het aankoopbedrag. Je kunt voor het item dat je wilt ontvangen zelf een nieuwe bestelling plaatsen.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.retourneren.SALEItemsRetourneren": {
        "value": "SALE items retourneren",
        "message": "Wanneer de SALE artikelen voldoen aan onze retourvoorwaarden kan je deze retourneren. Zodra wij jouw retour hebben ontvangen en verwerkt zullen we overgaan tot terugbetaling van het aankoopbedrag.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.bestellen": {
        "value": "bestellen",
        "message": "kies een onderwerp om meer informatie over te krijgen.",
        "quickAnswers": [
            "bestelling mislukt",
            "uitverkocht",
            "geen bevestigingsmail ontvangen",
            "bestelling na afloop wijzigen",
            "adresgegevens na afloop wijzigen",
            "reservering van winkelwagen items",
            "heb ik een account nodig?",
            "hoe plaats ik een bestelling?",
            "nieuwsbrief",
            "garantietermijn",
            "garantievoorwaarden"
        ],
        "externalLinks": []
    },
    "start.bestellen.bestellingMislukt": {
        "value": "bestelling mislukt",
        "message": "Dit kan verschillende oorzaken hebben. Wij raden je aan om je adres handmatig in te vullen in de checkout. Mocht het hierna nog niet lukken, dan raden wij je aan om contact op te nemen met onze Customer Care. Het is handig om hierbij een screenshot te sturen van de gehele checkout of de foutmelding.",
        "quickAnswers": [],
        "externalLinks": [
            {
                "value": "Customer care",
                "url": "/"
            }
        ]
    },
    "start.bestellen.uitverkocht": {
        "value": "uitverkocht",
        "message": "We doen ons best om uitverkochte items zo snel mogelijk aan te vullen. Je kan je e-mailadres invoeren door op het envelopje naast de gewenste maat te klikken. Zo blijf je op de hoogte zodra dit product weer leverbaar is.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.bestellen.geenBevestigingsmailOntvangen": {
        "value": "geen bevestigingsmail ontvangen",
        "message": "Het kan voorkomen dat je misschien in alle haast een foutje hebt gemaakt bij het invoeren van je e-mailadres of dat de bevestigings e-mail in je spam terecht is gekomen.\n\nNadat je een order geplaatst hebt wordt je doorverwezen naar de bevestigingspagina. In dit geval kan je er zeker van zijn dat je bestelling goed is doorgekomen en wij je bestelling momenteel aan het inpakken zijn. \n\nMocht je niet worden doorverwezen naar de bevestigingspagina dan raden wij je aan om contact op te nemen met onze Customer Care. Het is hierbij handig om een screenshot mee te sturen van je bankafschrift of bevestigingspagina zodat onze Customer Care jou beter kan helpen.",
        "quickAnswers": [],
        "externalLinks": [
            {
                "value": "Customer care",
                "url": "/"
            }
        ]
    },
    "start.bestellen.bestellingNaAfloopWijzigen": {
        "value": "bestelling na afloop wijzigen",
        "message": "Nadat je jouw bestelling hebt afgerond, wordt deze zo snel mogelijk gereed gemaakt voor verzending. Aangezien je bestelling al te ver in het verzendproces zit, is het helaas niet meer mogelijk om je bestelling te wijzigen of annuleren. Indien je nog een ander artikel wenst te ontvangen, raden wij je aan om een nieuwe bestelling te plaatsen. Indien je je bestelling niet meer wenst te ontvangen, raden wij je aan om de bestelling te retourneren.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.bestellen.adresgegevensNaAfloopWijzigen": {
        "value": "adresgegevens na afloop wijzigen",
        "message": "Nadat je jouw bestelling volledig hebt afgerond, wordt deze zo snel mogelijk gereed gemaakt voor verzending. Aangezien je bestelling al te ver in het verzendproces zit, is het helaas niet meer mogelijk om het afleveradres te wijzigen. Als je bestelling wordt afgeleverd op het door jou opgegeven adres, zal je zelf je bestelling af moeten halen. Mocht het niet lukken om je bestelling op het opgegeven adres te leveren dan zal je een bericht van DHL (Nederland) of Bpost (België) ontvangen met verdere bezorg instructies.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.bestellen.reserveringVanWinkelwagenItems": {
        "value": "reservering van winkelwagen items",
        "message": "Items in je winkelwagen en of verlanglijstje worden niet gereserveerd. Daarnaast is het niet mogelijk om items te reserveren.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.bestellen.hebIkEenAccountNodig?": {
        "value": "heb ik een account nodig?",
        "message": "Je hebt geen account nodig om te bestellen. Wel adviseren wij je om een LOAVIES account aan te maken als je iets wilt bestellen. In je account kan je je gegevens opslaan zodat dit automatisch in de checkout staat. Daarnaast heb je een handig overzicht van je bestelgeschiedenis. Je kan ook items opslaan in jouw verlanglijstje.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.bestellen.hoePlaatsIkEenBestelling?": {
        "value": "hoe plaats ik een bestelling?",
        "message": "Shop jouw favoriete artikelen op onze webshop. Kies je maat en voeg de item(s) toe aan je winkelwagen. Heb je alles gevonden wat je wilt hebben? Ga dan naar je winkelwagen en controleer of de maten en aantallen kloppen. Is alles correct? Klik dan op ''Ik ga bestellen''.\n\nBij het afrekenen kun je je persoonlijke gegevens invullen. Als je al een account hebt en bent ingelogd dan worden deze gegevens automatisch ingevuld. Controleer deze gegevens wel voordat je verder gaat naar de verzendmethode.\n\nBij de verzendmethode kun je ervoor kiezen om je bestelling thuis te laten bezorgen. In Nederland is het ook mogelijk om je pakket bij een DHL servicepunt te laten bezorgen.\n\nAls laatste kies je de betaalmethode en rond je de bestelling af. Na het afronden van je bestelling ontvang je een bevestiging op het doorgegeven e-mailadres.",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.bestellen.nieuwsbrief": {
        "value": "nieuwsbrief",
        "message": "Als je bent ingelogd in de webshop heb je de mogelijkheid om je aan te melden voor onze nieuwsbrieven. In je account menu kan je bij nieuwsbrieven je voorkeur aangeven. Als je niet bent ingelogd in onze webshop kan je onderaan de webshop bij ''Join onze #girlsgoneloavies squad'' je e-mailadres invoeren om de nieuwsbrieven te ontvangen. Wees de eerste die hoort over onze nieuwe collectie, cute lookbooks, sales, kortingen en meer!",
        "quickAnswers": [],
        "externalLinks": []
    },
    "start.bestellen.garantietermijn": {
        "value": "garantietermijn",
        "message": "Voor alle artikelen geldt een garantietermijn van 60 dagen. Mocht een artikel binnen deze periode beschadigd zijn neem dan direct contact op met onze Customer Care. Vergeet niet om een foto van de klacht mee te sturen. Onze Customer Care neemt je bericht zo snel mogelijk in behandeling en zoekt samen met jou naar de beste oplossing!",
        "quickAnswers": [],
        "externalLinks": [
            {
                "value": "Customer care",
                "url": "/"
            }
        ]
    },
    "start.bestellen.garantievoorwaarden": {
        "value": "garantievoorwaarden",
        "message": "De garantie is alleen geldig binnen de garantietermijn en wanneer er sprake is van een gegronde klacht. In de volgende gevallen is er geen sprake van een gegronde klacht:\n\n&#8226;Verkeerd gebruik of nalatig onderhoud&#8226;Opzettelijke of door nalatigheid ontstane beschadiging. Bijvoorbeeld water-, val- en/of stootschade&#8226;Beschadiging door het niet aanhouden van de wasinstructies&#8226;Uitzonderlijke slijtage",
        "quickAnswers": [],
        "externalLinks": [
            {
                "value": "Algemene voorwaarden",
                "url": "https://www.loavies.com/nl/content/algemene-voorwaarden"
            }
        ]
    },
    "start.overig": {
        "value": "overig",
        "message": "stel je vraag, dan probeer ik deze te beantwoorden!",
        "quickAnswers": [],
        "externalLinks": []
    }
}

const allKeys = Object.keys(fakeTrainingData)

const generateTree = (data) => {

    const tree = {}

    data.forEach(key => {
        const stringToArray = key.split(".")
        if (stringToArray.length > 1) {
            stringToArray.pop()
            const newString = stringToArray.join('.')
            if (!tree[newString]) tree[newString] = [key]
            else tree[newString].push(key)
        }  
        else tree[key] = [] 
    })

    const treeByKeys = Object.keys(tree)

    treeByKeys.forEach(key => {
        const optgroup = document.createElement('optgroup')
        optgroup.label = key
        trainTreeOption.append(optgroup)

        tree[key].forEach(innerKey =>{
            const newOption = document.createElement('option')
            newOption.innerHTML = innerKey
            trainTreeOption.append(newOption)
        })        
    })


}
generateTree(allKeys)

const createQuickAnswerInputs = (value) =>{
    const newInput = document.createElement('input')
    newInput.placeholder = "referenende naam"
    if (value) newInput.value = value
    else newInput.value = ""
    return newInput
}

const createExternalLinkInputs = (value) => {
    const externalLinkElement = document.querySelector('#externalLink')
    const newElement = externalLinkElement.cloneNode(true)
    newElement.removeAttribute('id')
    newElement.classList.remove('hide')

    if (value) {
        const keys = Object.keys(value)
        keys.forEach(key => {
            const type = key === "url" ? 'url' : 'text'
            const input = newElement.querySelector(`input[type="${type}"]`)
            input.value = value[key]
        })
    }
    return newElement
}

const setTreeDataInDOM = (event) => {
    const value = event.target.value
    const form = document.querySelector('#chatbotReactionTrainingForm')
    const textarea = form.querySelector('.utterance')
    textarea.innerHTML = fakeTrainingData[value].message

    console.log(fakeTrainingData[value]);
    
    if (fakeTrainingData[value].quickAnswers.length) {
        const quickAnswerWrapper = document.querySelector('.quickAnswer')
        const inputInWrapper = quickAnswerWrapper.querySelector('input')
        inputInWrapper.remove()
        fakeTrainingData[value].quickAnswers.forEach(quickAnswerValue => {
            const newElement = createQuickAnswerInputs(quickAnswerValue)
            quickAnswerWrapper.append(newElement)
        });
    }
    
    if (fakeTrainingData[value].externalLinks.length) {
        const allExternalLinksElement = document.querySelector('#allExternalLinks')
        
        fakeTrainingData[value].externalLinks.forEach( externalLinkValue => {
            const newElement = createExternalLinkInputs(externalLinkValue)
            allExternalLinksElement.append(newElement)
        })
    }

    if (fakeTrainingData[value].optionalUtterances && 
        fakeTrainingData[value].optionalUtterances.length) {
            const utteranceElement = document.querySelector('.utterance')
            const previousWrapper = document.querySelector('[previous-utterances]')
            fakeTrainingData[value].optionalUtterances.forEach(optionalUtterance => {
                const newUtterance = utteranceElement.cloneNode()
                const newLabel = document.createElement('label')
                const newDiv = document.createElement('label')
                newUtterance.innerHTML = optionalUtterance
                newDiv.classList.add('label')
                newDiv.innerHTML = 'Opmerking'
                newLabel.append(newDiv)
                newLabel.append(newUtterance)
                previousWrapper.append(newLabel)
            })
    }
}


const generateId = () => {
    //https://tomspencer.dev/blog/2014/11/16/short-id-generation-in-javascript/
    const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const ID_LENGTH = 12;
    let rtn = '';
    for (let i = 0; i < ID_LENGTH; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
}

const getDataFromDb = (ref) => {
    return new Promise((resolve, reject) => {
        const onError = error => reject(error);
        const onData = snap => resolve(snap.val());

        ref.on("value", onData, onError);
    });
};

const notificationHandler = (message, status) => {
    message ? notificationHandle.innerHTML = message : notificationHandle.innerHTML = ""
    if (status) {
        const classList = Array.from(notificationHandle.classList)
        classList.forEach(className => {
            if (allStatusClassNames.includes(className)) {
                notificationHandle.classList.remove(className)
            }
        })

        notificationHandle.classList.add(status)
    }
}

const resetStatusStyling = () => {
    const inputsWithStatusClasses = Array.from(document.querySelectorAll('.success, .error'))

    inputsWithStatusClasses.forEach(node => {
        const classList = Array.from(node.classList)
        classList.forEach(className => {
            if (allStatusClassNames.includes(className)) {
                node.classList.remove(className)
            }
        })
    })
    notificationHandler()
}

const deleteRowHandler = event => {
    let parentNode

    // get parent node
    event.path.forEach(node => {
        if (node.className === "form-row") {
            parentNode = node.parentNode
        }
    })

    const allFormRows = parentNode.querySelectorAll('[data-form-row]')
    const targetParents = event.path

    // if user deletes one of more rows
    if (allFormRows.length > 1) {
        targetParents.forEach(node => {
            // remove row from DOM
            if (node.className === "form-row") node.outerHTML = ""
        })
        return
    }

    // if user deletes last row
    const allInputsInLastRow = allFormRows[0].querySelectorAll('textarea, input')
    // remove values from inputs
    allInputsInLastRow.forEach(input => input.value = "")
}

const addRowHandler = (event) => {
    let parentNode

    // get parent node
    event.path.forEach(node => {
        if (node.nodeName === "FIELDSET") {
            parentNode = node
        }
    })

    // get footer based of parent node
    const formFooter = parentNode.getElementsByClassName('form-footer')[0]

    // clone form row based on parent node
    const clonedFormRow = parentNode.querySelector('[data-form-row]').cloneNode(true)
    const allInputsInClonedFormRow = clonedFormRow.querySelector('input[type=text]')
    const allTextareasInClonedFormRow = clonedFormRow.querySelector('textarea')
    const deleteButtonInClonedFormRow = clonedFormRow.querySelector('[data-delete-row]')

    // clear all input/textarea fields
    allInputsInClonedFormRow.value = ""
    allTextareasInClonedFormRow.value = ""
    allTextareasInClonedFormRow.removeAttribute('style')

    // attach eventListener to delete button
    deleteButtonInClonedFormRow.addEventListener('click', deleteRowHandler)

    parentNode.insertBefore(clonedFormRow, formFooter)
}

const executeTraining = async (e) => {
    const userInputTrainingForm = document.getElementById('userInputTrainingForm')
    const chatbotReactionTrainingForm = document.getElementById('chatbotReactionTrainingForm')

    resetStatusStyling()

    const chosenIntent = document.querySelector('[train-tree-option]').value
    const allQuickAnswersInDOM = chatbotReactionTrainingForm.querySelector('.quickAnswer')
    const allExternalLinksInDOM = chatbotReactionTrainingForm.querySelectorAll('.externalLinkWrapper')
    const allQuickAnswerInputs = allQuickAnswersInDOM.querySelectorAll('input')
    const getAllOptionalUtterances = userInputTrainingForm.querySelectorAll('.utterance')

    const getValueOfChosenIntent = () =>{
        return chosenIntent.split('.').pop()
    }

    const value = getValueOfChosenIntent()
    const message = chatbotReactionTrainingForm.querySelector('.utterance').innerHTML
    const quickAnswers = []
    const externalLinks = []
    const optionalUtterances = []
    
    allQuickAnswerInputs.forEach(quickAnswer => {
        if (quickAnswer.value) quickAnswers.push(quickAnswer.value)
    })
    
    allExternalLinksInDOM.forEach(externalLink => {
        const allInputs = externalLink.querySelectorAll('input')
        const obj = {}
        allInputs.forEach(input => {
            const key = input.type === 'url' ? 'url' : 'value'
            if (input.value) obj[key] = input.value
        })
        if (Object.keys(obj).length) externalLinks.push(obj)  
    })
    
    getAllOptionalUtterances.forEach(utterance => {
        if (utterance.value) optionalUtterances.push(utterance.value)
    })
    
    console.log({value, message, quickAnswers ,externalLinks, optionalUtterances});
    
}
// const executeTraining = async (e) => {
//     const userInputTrainingForm = document.getElementById('userInputTrainingForm')
//     const chatbotReactionTrainingForm = document.getElementById('chatbotReactionTrainingForm')

//     resetStatusStyling()


//     const allInputsValues = async () => {
//         const queu = [userInputTrainingForm, chatbotReactionTrainingForm]
//         let missingValue = false
//         let duplicateValue = false
//         let alreadyExist = false
//         let formIsEmpty = false
//         const historyTrainingData = await getDataFromDb(traininHistorygRef)
//         const strippedHistoryTrainingData = historyTrainingData ? Object.values(historyTrainingData) : false
//         const trainingData = {}

//         queu.forEach(form => {
//             const id = form.id
//             const filteredHistoryTrainingData = {
//                 language: [],
//                 intent: [],
//                 utterance: []
//             }

//             if (strippedHistoryTrainingData) {
//                 strippedHistoryTrainingData.forEach(e => {
//                     if (!e.trainingData[id]) return
//                     e.trainingData[id].forEach(value => {
//                         const { language, intent, utterance } = value
//                         filteredHistoryTrainingData.language.push(language)
//                         filteredHistoryTrainingData.intent.push(intent)
//                         filteredHistoryTrainingData.utterance.push(utterance)
//                     })
//                 })
//             }

//             const row = Array.from(form.querySelectorAll('[data-form-row]'))
//             const utteranceCollection = []

//             const rows = row.map((formRow, index) => {
//                 const inputObj = {
//                     id: generateId(),
//                     language: '',
//                     intent: '',
//                     utterance: ''
//                 }
//                 const inputTypes = Array.from(formRow.querySelectorAll('select, textarea, input'))
//                 let isOnlyOneInput = false

//                 inputTypes.forEach(input => {
//                     // check if one of the forms is left empty
//                     if (!input.value && index === row.length - 1) {
//                         isOnlyOneInput = true
//                         return
//                     }
//                     // checks if all input fields are filled in
//                     if (!input.checkValidity()) {
//                         missingValue = true
//                         input.classList.add('error')
//                         notificationHandler('Niet alle inputs zijn ingevuld!', 'error')
//                         return
//                     }

//                     if (input.classList.contains('language')) inputObj.language = input.value
//                     if (input.classList.contains('intent')) inputObj.intent = input.value

//                     if (input.classList.contains('utterance')) {
//                         // check if input already exist
//                         if (utteranceCollection.includes(input.value)) {
//                             duplicateValue = true
//                             input.classList.add('error')
//                             notificationHandler('Er zijn opmerkingen met dezelfde waarde!', 'error')
//                             return
//                         }
//                         const inputExistsInDb = filteredHistoryTrainingData.utterance.includes(input.value)
//                         if (inputExistsInDb) {
//                             alreadyExist = true
//                             input.classList.add('error')
//                             notificationHandler('Deze waarde is al eerder toegevoegd!', 'error')
//                         }

//                         // push unique utterance to array
//                         utteranceCollection.push(input.value)
//                         inputObj.utterance = input.value
//                     }
//                 })

//                 const rowIsEmpty = () => {
//                     const keys = Object.keys(inputObj)
//                     if (keys.length === 1 && keys[0] === 'language') return true
//                     return false
//                 }
//                 if (rowIsEmpty()) {
//                     return false
//                 }

//                 if (isOnlyOneInput) {
//                     const hasEmptyValue = Object.values(inputObj).includes('')
//                     if (hasEmptyValue) return
//                 }
//                 return inputObj
//             })

//             if (rows[0]) trainingData[form.id] = rows
//         })
//         // if form is not empty
//         if (!Object.keys(trainingData).length) {
//             notificationHandler('Er is geen trainingsdata ingevuld!', 'error')

//         }

//         const valueIsIncorrect = missingValue || duplicateValue || alreadyExist || formIsEmpty

//         return { valueIsIncorrect, trainingData }
//     }

//     const result = await allInputsValues()

//     // if value is missing in form, this will be false
//     if (!result.valueIsIncorrect) {
//         const { trainingData } = result
//         const trainingId = Date.now()
//         const date = new Date().toLocaleString()

//         const historyObj = {
//             'trainedBy': '',
//             'date': date,
//             'trainingData': trainingData
//         }
//         const traininHistoryChildRef = traininHistorygRef.child(`${trainingId}`);

//         // use to post data to firebase
//         traininHistoryChildRef.update(historyObj)
//         deleteInputRowTriggers.forEach((deleteButton, index) => {
//             // https://stackoverflow.com/a/49117631
//             try {
//                 // For modern browsers except IE:
//                 const event = new CustomEvent('click');
//             } catch (err) {
//                 // If IE 11 (or 10 or 9...?) do it this way:

//                 // Create the event.
//                 const event = deleteButton.createEvent('Event');
//                 // Define that the event name is 'build'.
//                 event.initEvent('click', true, true);
//             }
//             deleteButton.dispatchEvent(new Event("click"))
//         })
//         notificationHandler('Training voltooid!', 'success')
//     }
// }

deleteInputRowTriggers.forEach(deleteButton => {
    deleteButton.addEventListener('click', deleteRowHandler)
})

addInputRowTriggers.forEach(addButton => {
    addButton.addEventListener('click', addRowHandler)
})

executeTrainingTrigger.addEventListener('click', executeTraining)

trainTreeOption.addEventListener('change', setTreeDataInDOM)
addQuickAnswerFieldTrigger.addEventListener('click', (event) => {
    event.preventDefault()
    const quickAnswerWrapper = document.querySelector('.quickAnswer')
    const newElement = createQuickAnswerInputs()
    quickAnswerWrapper.append(newElement)
})
addExternalFieldTrigger.addEventListener('click', (event) => {
    event.preventDefault()
    const allExternalLinksElement = document.querySelector('#allExternalLinks')
    const newElement = createExternalLinkInputs()
    allExternalLinksElement.append(newElement)
})