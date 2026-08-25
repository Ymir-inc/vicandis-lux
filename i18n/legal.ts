import type { Locale } from './config';

/**
 * Baseline legal copy for the Privacy / Cookies / Terms pages.
 *
 * ⚠️ DRAFT — plain-language baseline reflecting how the site actually works today
 * (a brochure site whose only data flow is a configurator request sent by email;
 * no analytics or tracking cookies). It MUST be reviewed by a lawyer before
 * production launch — see tasks/OWNER-TODO.md.
 */

export type LegalDocKey = 'privacy' | 'cookies' | 'terms';

type LegalSection = { h: string; p: string[] };
type LegalDoc = { title: string; sections: LegalSection[] };
type LegalContent = {
  draftNotice: string;
  updatedLabel: string;
  updated: string;
  backHome: string;
  privacy: LegalDoc;
  cookies: LegalDoc;
  terms: LegalDoc;
};

const UPDATED = '2026-08-25';
const COMPANY = 'VICANDISLUX SRL (IDNO 1003600168698), str. Milescu Spătaru 7/1, Chișinău, Republica Moldova';
const EMAIL = 'director@vicandislux.md';

export const legal: Record<Locale, LegalContent> = {
  ro: {
    draftNotice: 'DOCUMENT ÎN LUCRU — text orientativ, în curs de verificare juridică. Nu constituie consultanță juridică.',
    updatedLabel: 'Ultima actualizare',
    updated: UPDATED,
    backHome: '← Înapoi la site',
    privacy: {
      title: 'Politica de confidențialitate',
      sections: [
        { h: 'Cine suntem', p: [`Operatorul de date este ${COMPANY}. Ne puteți contacta la ${EMAIL}.`] },
        { h: 'Ce date colectăm', p: ['Colectăm doar datele pe care ni le transmiteți voluntar printr-o cerere de ofertă (configurația evenimentului și, prin clientul dvs. de e-mail, adresa de e-mail de la care scrieți) sau când ne contactați direct prin telefon sau e-mail.', 'Acest site nu folosește instrumente de analiză sau urmărire și nu creează profiluri.'] },
        { h: 'De ce le folosim și temeiul legal', p: ['Folosim datele exclusiv pentru a răspunde solicitării dvs. și a pregăti o ofertă. Temeiul legal este demersurile precontractuale la cererea dvs. și interesul nostru legitim de a răspunde solicitărilor comerciale.'] },
        { h: 'Cât timp le păstrăm', p: ['Păstrăm corespondența doar atât cât este necesar pentru a trata solicitarea și pentru eventuale obligații legale, apoi o ștergem.'] },
        { h: 'Drepturile dvs.', p: ['Aveți dreptul de acces, rectificare, ștergere, restricționare și opoziție, conform legislației aplicabile privind protecția datelor. Pentru a le exercita, scrieți-ne la ' + EMAIL + '.'] },
      ],
    },
    cookies: {
      title: 'Politica privind modulele cookie',
      sections: [
        { h: 'Pe scurt', p: ['În prezent acest site nu setează module cookie de urmărire, publicitate sau analiză. Preferința de limbă poate fi reținută local în browser pentru confortul dvs.'] },
        { h: 'Dacă lucrurile se schimbă', p: ['Dacă vom adăuga în viitor analiză sau alte instrumente care folosesc cookie-uri neesențiale, vom afișa un banner de consimțământ care le blochează până la acordul dvs. și vom actualiza această pagină.'] },
      ],
    },
    terms: {
      title: 'Termeni și condiții',
      sections: [
        { h: 'Despre acest site', p: [`Acest site este operat de ${COMPANY} și are caracter informativ, prezentând serviciile de închiriere de echipamente pentru conferințe și traducere simultană.`] },
        { h: 'Oferte și prețuri', p: ['Prețurile și estimările afișate sunt orientative și nu constituie o ofertă fermă. Prețul final se confirmă într-o ofertă scrisă, în funcție de disponibilitate și de detaliile evenimentului.'] },
        { h: 'Proprietate intelectuală', p: ['Conținutul, mărcile și imaginile de pe acest site aparțin VICANDISLUX SRL sau deținătorilor de drept și nu pot fi reutilizate fără acord.'] },
        { h: 'Răspundere', p: ['Depunem eforturi rezonabile pentru acuratețea informațiilor, dar nu garantăm că sunt complete sau lipsite de erori. Nu răspundem pentru daune indirecte rezultate din utilizarea site-ului.'] },
        { h: 'Legea aplicabilă', p: ['Acești termeni sunt guvernați de legislația Republicii Moldova. Pentru întrebări: ' + EMAIL + '.'] },
      ],
    },
  },
  en: {
    draftNotice: 'WORK IN PROGRESS — indicative text pending legal review. This is not legal advice.',
    updatedLabel: 'Last updated',
    updated: UPDATED,
    backHome: '← Back to site',
    privacy: {
      title: 'Privacy Policy',
      sections: [
        { h: 'Who we are', p: [`The data controller is ${COMPANY}. You can reach us at ${EMAIL}.`] },
        { h: 'What we collect', p: ['We collect only what you voluntarily send through a quote request (your event configuration and, via your email client, the address you write from) or when you contact us directly by phone or email.', 'This site uses no analytics or tracking tools and builds no profiles.'] },
        { h: 'Why, and the legal basis', p: ['We use your data solely to respond to your request and prepare a quote. The legal basis is pre-contractual steps at your request and our legitimate interest in answering commercial enquiries.'] },
        { h: 'How long we keep it', p: ['We keep correspondence only as long as needed to handle your request and meet any legal obligations, then delete it.'] },
        { h: 'Your rights', p: ['You have the right to access, rectification, erasure, restriction and objection under applicable data-protection law. To exercise them, email us at ' + EMAIL + '.'] },
      ],
    },
    cookies: {
      title: 'Cookie Policy',
      sections: [
        { h: 'In short', p: ['This site currently sets no tracking, advertising or analytics cookies. Your language preference may be stored locally in your browser for convenience.'] },
        { h: 'If this changes', p: ['If we later add analytics or other tools that use non-essential cookies, we will show a consent banner that blocks them until you agree, and update this page.'] },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      sections: [
        { h: 'About this site', p: [`This site is operated by ${COMPANY} and is informational, presenting our conference-AV and simultaneous-interpretation rental services.`] },
        { h: 'Quotes and pricing', p: ['Prices and estimates shown are indicative and are not a binding offer. The final price is confirmed in a written quote, subject to availability and event details.'] },
        { h: 'Intellectual property', p: ['Content, marks and images on this site belong to VICANDISLUX SRL or their respective owners and may not be reused without permission.'] },
        { h: 'Liability', p: ['We make reasonable efforts to keep information accurate but do not warrant it is complete or error-free, and are not liable for indirect damages arising from use of the site.'] },
        { h: 'Governing law', p: ['These terms are governed by the law of the Republic of Moldova. Questions: ' + EMAIL + '.'] },
      ],
    },
  },
  ru: {
    draftNotice: 'ЧЕРНОВИК — ориентировочный текст, ожидает юридической проверки. Не является юридической консультацией.',
    updatedLabel: 'Последнее обновление',
    updated: UPDATED,
    backHome: '← Назад на сайт',
    privacy: {
      title: 'Политика конфиденциальности',
      sections: [
        { h: 'Кто мы', p: [`Оператор данных — ${COMPANY}. Связаться с нами: ${EMAIL}.`] },
        { h: 'Какие данные мы собираем', p: ['Мы собираем только то, что вы добровольно отправляете через запрос предложения (конфигурацию мероприятия и, через ваш почтовый клиент, адрес, с которого вы пишете), либо когда вы связываетесь с нами по телефону или e-mail.', 'Сайт не использует аналитику или трекинг и не создаёт профили.'] },
        { h: 'Зачем и правовое основание', p: ['Мы используем данные исключительно для ответа на ваш запрос и подготовки предложения. Правовое основание — преддоговорные действия по вашему запросу и наш законный интерес в ответах на коммерческие обращения.'] },
        { h: 'Сколько храним', p: ['Мы храним переписку столько, сколько необходимо для обработки запроса и выполнения правовых обязанностей, после чего удаляем её.'] },
        { h: 'Ваши права', p: ['Вы имеете право на доступ, исправление, удаление, ограничение и возражение согласно применимому законодательству о защите данных. Для их реализации напишите на ' + EMAIL + '.'] },
      ],
    },
    cookies: {
      title: 'Политика использования файлов cookie',
      sections: [
        { h: 'Коротко', p: ['В настоящее время сайт не устанавливает трекинговые, рекламные или аналитические cookie. Языковая настройка может сохраняться локально в браузере для удобства.'] },
        { h: 'Если что-то изменится', p: ['Если в дальнейшем мы добавим аналитику или другие инструменты с неосновными cookie, мы покажем баннер согласия, блокирующий их до вашего согласия, и обновим эту страницу.'] },
      ],
    },
    terms: {
      title: 'Условия использования',
      sections: [
        { h: 'Об этом сайте', p: [`Сайт управляется ${COMPANY} и носит информационный характер, представляя услуги аренды оборудования для конференций и синхронного перевода.`] },
        { h: 'Предложения и цены', p: ['Указанные цены и оценки являются ориентировочными и не являются офертой. Итоговая цена подтверждается в письменном предложении в зависимости от наличия и деталей мероприятия.'] },
        { h: 'Интеллектуальная собственность', p: ['Содержимое, знаки и изображения на сайте принадлежат VICANDISLUX SRL или их правообладателям и не могут использоваться без разрешения.'] },
        { h: 'Ответственность', p: ['Мы прилагаем разумные усилия для точности информации, но не гарантируем её полноту или безошибочность и не несём ответственности за косвенный ущерб от использования сайта.'] },
        { h: 'Применимое право', p: ['Настоящие условия регулируются законодательством Республики Молдова. Вопросы: ' + EMAIL + '.'] },
      ],
    },
  },
};
