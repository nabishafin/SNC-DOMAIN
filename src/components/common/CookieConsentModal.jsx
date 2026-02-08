import React, { useState, useEffect } from 'react';

const cookieContent = [
    {
        lang: 'Deutsch',
        text: 'Wir verwenden Cookies und ähnliche Technologien, um bestimmte Grundfunktionen unserer Website zu gewährleisten (technisch notwendige Cookies) und – nur wenn Sie zustimmen – optionale Dienste wie personalisierte Werbung, Marketing-Tracking, Nutzungsanalyse und externe Multimedia-Inhalte zu aktivieren. Sie haben folgende Möglichkeiten: Mit „Alle akzeptieren“ stimmen Sie allen optionalen Cookies zu. Mit „Alles ablehnen“ lehnen Sie alle optionalen Cookies ab. Unter „Einstellungen“ können Sie granular auswählen, welche Arten von Cookies (zum Beispiel Marketing, Statistik, externe Medien) Sie zulassen möchten. Ihre Einwilligung ist freiwillig, und Sie können sie jederzeit über unsere Cookie-Einstellungen widerrufen oder ändern. Detaillierte Informationen zu den verwendeten Cookies, den Verarbeitungszwecken und Ihrer Widerrufsmöglichkeit finden Sie in unseren Cookie-Beschreibungen, unserer Datenschutzerklärung, dem Impressum und im Footer dieser Seite.'
    },
    {
        lang: 'Englisch',
        text: 'We use cookies and similar technologies to ensure certain basic functions of our website (technically necessary cookies) and – only if you agree – to activate optional services such as personalised advertising, marketing tracking, usage analysis and external multimedia content. You have the following options: By selecting “Accept all” you consent to all optional cookies. By selecting “Reject all” you refuse all optional cookies. Under “Settings” you can granularly choose which types of cookies (for example marketing, statistics, external media) you wish to allow. Your consent is voluntary, and you can withdraw or change it at any time via our cookie settings. Detailed information about the cookies used, the purposes of the processing and your ability to revoke your consent can be found in our cookie descriptions, our privacy policy, the imprint and in the footer of this page.'
    },
    {
        lang: 'Spanisch',
        text: 'Utilizamos cookies y tecnologías similares para garantizar determinadas funciones básicas de nuestro sitio web (cookies técnicamente necesarias) y, solo si usted acepta, para activar servicios opcionales como publicidad personalizada, seguimiento de marketing, análisis de uso y contenidos multimedia externos. Tiene las siguientes opciones: Con «Aceptar todas» consiente todas las cookies opcionales. Con «Rechazar todas» rechaza todas las cookies opcionales. En «Configuración» puede seleccionar de forma granular qué tipos de cookies (por ejemplo marketing, estadísticas, medios externos) desea permitir. Su consentimiento es voluntario y puede retirarlo o modificarlo en cualquier momento a través de nuestra configuración de cookies. Encontrará información detallada sobre las cookies utilizadas, los fines del tratamiento y su posibilidad de revocación en nuestras descripciones de cookies, en nuestra política de privacidad, en el aviso legal y en el pie de página de esta página.'
    },
    {
        lang: 'Französisch',
        text: 'Nous utilisons des cookies et des technologies similaires pour assurer certaines fonctions de base de notre site web (cookies techniquement nécessaires) et – seulement si vous y consentez – activer des services optionnels tels que la publicité personnalisée, le suivi marketing, l’analyse d’utilisation et des contenus multimédias externes. Vous avez les options suivantes : En sélectionnant « Tout accepter », vous acceptez tous les cookies optionnels. En sélectionnant « Tout refuser », vous refusez tous les cookies optionnels. Sous « Paramètres », vous pouvez sélectionner de manière granulaire les types de cookies (par exemple marketing, statistiques, médias externes) que vous souhaitez autoriser. Votre consentement est volontaire et vous pouvez le retirer ou le modifier à tout moment via nos paramètres de cookies. Des informations détaillées sur les cookies utilisés, les finalités du traitement et votre possibilité de révocation figurent dans nos descriptions de cookies, notre politique de confidentialité, les mentions légales et dans le pied de page de cette page.'
    },
    {
        lang: 'Italienisch',
        text: 'Utilizziamo cookie e tecnologie simili per garantire alcune funzioni di base del nostro sito web (cookie tecnicamente necessari) e – solo con il vostro consenso – attivare servizi opzionali come pubblicità personalizzata, tracciamento di marketing, analisi dell’utilizzo e contenuti multimediali esterni. Avete le seguenti opzioni: selezionando «Accetta tutti» acconsentite a tutti i cookie opzionali. Selezionando «Rifiuta tutti» rifiutate tutti i cookie opzionali. In «Impostazioni» potete selezionare in modo granulare quali tipologie di cookie (ad esempio marketing, statistiche, media esterni) desiderate consentire. Il vostro consenso è volontario e potete revocarlo o modificarlo in qualsiasi momento tramite le nostre impostazioni sui cookie. Informazioni dettagliate sui cookie utilizzati, sulle finalità del trattamento e sulla possibilità di revoca sono disponibili nelle nostre descrizioni dei cookie, nella nostra informativa sulla privacy, nelle note legali e nel footer di questa pagina.'
    },
    {
        lang: 'Portugiesisch',
        text: 'Utilizamos cookies e tecnologias semelhantes para garantir determinadas funções básicas do nosso website (cookies tecnicamente necessários) e – apenas se você concordar – para ativar serviços opcionais como publicidade personalizada, rastreamento de marketing, análise de utilização e conteúdos multimédia externos. Tem as seguintes opções: Ao selecionar «Aceitar tudo» consente todos os cookies opcionais. Ao selecionar «Rejeitar tudo» recusa todos os cookies opcionais. Em «Configurações» pode escolher de forma granular quais os tipos de cookies (por exemplo marketing, estatísticas, media externos) que deseja permitir. O seu consentimento é voluntário e pode retíra-lo ou alterá-lo a qualquer momento através das nossas definições de cookies. Informações detalhadas sobre os cookies utilizados, os objetivos do processamento e a sua possibilidade de revogação encontram-se nas nossas descrições de cookies, na nossa política de privacidade, no aviso legal e no rodapé desta página.'
    },
    {
        lang: 'Arabisch',
        text: 'وتقنيات مشابهة لضمان بعض الوظائف األساسية (Cookies (نستخدم ملفات تعريف االرتباط لموقعنا اإللكتروني )ملفات الكوكيز الضرورية تقنيًا( – وفقط إذا وافقتم – لتفعيل خدمات اختيارية مثل اإلعالنات المخصوصة، التتبع التسويقي، تحليل االستخدام، والمحتوى المتعدد الوسائط الخارجي. لديكم الخيارات التالية: عندما تنقرون »قبول الكل« فأنتم توافقون على جميع ملفات الكوكيز االختيارية. عندما تنقرون »رفض الكل« فأنتم ترفضون جميع ملفات الكوكيز االختيارية. في »اإلعدادات« يمكنكم االختيار بشكل مفصل أنواع ملفات الكوكيز )على سبيل المثال التسويق، اإلحصاءات، الوسائط الخارجية( التي ترغبون في سماح بها. موافقتكم اختيارية، ويمكنكم سحبها أو تعديلها في أي وقت من خالل إعدادات ملفات الكوكيز الخاصة بنا. ستجدون معلومات مفصلة حول ملفات الكوكيز المستخدمة، أهداف المعالجة وامكانية سحب موافقتكم في وصف ملفات الكوكيز، وفي سياستنا للخصوصية، ورسالتنا القانونية، وفي ذيل هذه الصفحة.',
        dir: 'rtl'
    },
    {
        lang: 'Türkisch',
        text: 'Web sitemizin belirli temel işlevlerini sağlamak için tanımlama bilgileri (cookie’ler) ve benzer teknolojiler kullanıyor ve – yalnızca onay vermeniz hâlinde – kişiselleştirilmiş reklamcılık, pazarlama takibi, kullanım analizi ve harici multimedya içerikleri gibi isteğe bağlı hizmetleri etkinleştiriyoruz. Şu seçeneklere sahipsiniz: “Tümünü kabul et” seçeneğiyle tüm isteğe bağlı çerezlere izin vermiş olursunuz. “Tümünü reddet” seçeneğiyle tüm isteğe bağlı çerezleri reddetmiş olursunuz. “Ayarlar” bölümünde hangi tür çerezlere (örneğin pazarlama, istatistik, harici medya) izin vermek istediğinizi ayrıntılı olarak seçebilirsiniz. Onayınız gönüllüdür ve çerez ayarlarımız üzerinden istediginiz zaman geri çekebilir veya değiştirebilirsiniz. Kullanılan çerezler, işleme amaçları ve geri çekme imkânınız hakkında ayrıntılı bilgileri çerez açıklamalarımızda, gizlilik politikamızda, künyemizde ve bu sayfanın altbilgisinde bulabilirsiniz.'
    },
    {
        lang: 'Ukrainisch',
        text: 'Ми використовуємо файли та подібні технології щоб забезпечити cookie , певні базові функції нашого веб -сайту технічно необхідні файли а ( cookie ), — — , лише за вашої згоди активувати додаткові служби такі як персоналізована реклама маркетингове відстеження аналіз використання , , та зовнішній мультимедійний контент У вас є такі можливості . : натиснувши Прийняти всі ви погоджуєтеся на всі додаткові файли « », cookie. Натиснувши Відхилити всі ви відхиляєте всі додаткові файли У « », cookie. розділі Налаштування ви можете детально вибрати які типи файлів « » , cookie ( , , ) . наприклад маркетингові статистика зовнішні медіа бажаєте дозволити Ваша згода є добровільною і ви можете її відкликати або змінити у , будь-який час через наші налаштування Детальну інформацію про cookie . використовувані файли мету обробки та можливість відмови від cookie, згоди ви знайдете у наших описах у нашій політиці приватності в cookie , , правовому повідомленні та у нижньому колонтитулі цієї сторінки .'
    },
    {
        lang: 'Russisch',
        text: 'Мы используем файлы и аналогичные технологии чтобы обеспечить cookie , опредёлённые базовые функции нашего веб -сайта технически ( необходимые файлы и только с вашего согласия активировать cookie ) – – дополнительные службы такие как персонализированная реклама , , маркетинговый трекинг анализ использования и внешние , мультимедийные материалы У вас есть следующие варианты выбирая . : « », cookie. Принять все вы соглашаетесь на все необязательные файлы Выбирая Отклонить все вы отказываетесь от всех необязательных « », файлов В разделе Настройки вы можете подробно выбрать какие cookie. « » , типы файлов например маркетинг статистика внешние медиа вы cookie ( , , ) хотите разрешить Ваше согласие является добровольным и вы можете в . , любое время отзывать или изменить его через настройки Подробная cookie. информация об используемых файлах целях обработки и о cookie, возможности отзыва согласия вы найдёте в наших описаниях в cookie, нашей политике конфиденциальности в юридическом уведомлении и в , футере этой страницы .'
    },
    {
        lang: 'Chinesisch (traditionell)',
        text: '我們使用 Cookie 和類似技術來確保我們網站的某些基本功能（技術上必需的 Cookie），從而 只在您同意的情況下 啟用可選的服務，例如個性化廣告、行銷追蹤、使用分析和 — — 外部多媒體內容。您可以有以下選擇：按下「全部接受」即表示您同意所有可選 Cookie；按下「全部拒絕」即表示您拒絕所有可選 Cookie。在「設定」中，您可以細分選擇允許哪些類型的 Cookie（例如行銷、統計、外部媒體）。您的同意是自願的，可以隨時通過我們的 Cookie 設定撤銷或修改。有關使用的 Cookie、處理目的以及撤銷權的詳細信息，請參閱我們的 Cookie 說明、隱私政策、版權記錄及本頁的頁腳。'
    },
    {
        lang: 'Japanisch',
        text: '当社は、当ウェブサイトの基本機能を確保するためにクッキーおよび類似の技術を使用しており（技術的に必要なクッキー）、お客様が同意した場合に限り、パーソナライズされた宣会やマーケティング追跡、利用分析、外部マルチメディア内容といったオプションサービスを有効にします。 お客様には次の選択肢があります。「すべて受け入れる」を選択すると、すべてのオプションのクッキーに同意したことになります。「すべて拒否」を選択すると、すべてのオプションのクッキーを拒否したことになります。「設定」では、どの種類のクッキーを許可するか（例えばマーケティング、統計、外部メディア）を細かく選択できます。 お客様の同意は任意であり、当社のクッキー設定によっていつでも撤回または変更することができます。使用しているクッキー、処理目的および撤回権に関する詳細な情報は、当社のクッキー説明、プライバシーポリシー、インプリントおよび本ページのフッターに述記しています。'
    },
    {
        lang: 'Polnisch',
        text: 'Używamy plików cookie i podobnych technologii, aby zapewnić podstawowe funkcje naszej strony internetowej (technicznie niezbędne pliki cookie) oraz – tylko za twoją zgodą – włączyć opcjonalne usługi, takie jak spersonalizowane reklamy, śledzenie marketingowe, analiza użytkowania i zewnętrzne treści multimedialne. Masz następujące możliwości: wybierając «Akceptuj wszystkie», wyrażasz zgodę na wszystkie opcjonalne pliki cookie. Wybierając «Odrzuć wszystkie», odrzucasz wszystkie opcjonalne pliki cookie. W sekcji «Ustawienia» możesz szczegółowo wybrać, jakie typy plików cookie (na przykład marketing, statystyka, media zewnętrzne) chcesz zezwolić. Twoja zgoda jest dobrowolna i możesz ją w każdym momencie wycofać lub zmienić za pomocą naszych ustawień plików cookie. Szczegółowe informacje na temat używanych plików cookie, celów przetwarzania i możliwości wycofania zgody znajdziesz w naszych opisach plików cookie, naszej polityce prywatności, w informacji prawnej oraz w stopce tej strony.'
    },
    {
        lang: 'Ungarisch',
        text: 'Cookie-kat és hasonló technológiákat használunk weboldalunk bizonyos alapvető funkcióinak biztosítása érdekében (technikai értelemben szükséges cookie-k), és – csak ha hozzájárul – opcionális szolgáltatások, például személyre szabott hirdetések, marketingkövetés, használatelemzés és külső multimédiás tartalmak engedélyezésére. A következő lehetőségei vannak: az «Összes elfogadása» gomb megnyomásával minden opcionális cookie-t elfogad. Az «Összes elutasítása» gombbal elutasít minden opcionális cookie-t. A «Beállítások» alatt részletesen kiválaszthatja, hogy mely cookie-típusokat (például marketing, statisztika, külső média) szeretné engedélyezni. Hozzájárulása önkéntes, és bármikor visszavonhatja vagy módosíthatja a cookie-beállításainkon keresztül. A használt cookie-król, a feldolgozás céljáról és a visszavonási lehetőségről részletes információkat a cookie-leírásainkban, az adatvédelmi nyilatkozatunkban, az impresszumban és ezen oldal láblécében talál.'
    },
    {
        lang: 'Tschechisch',
        text: 'Používáme soubory cookie a podobné technologie, aby byly zajištěny určité základní funkce našich webových stránek (technicky nezbytné soubory cookie) a – pouze pokud s tím souhlasíte – aktivujeme volitelné služby, jako je personalizovaná reklama, marketingové sledování, analýza použití a externí multimediální obsah. Máte následující možnosti: kliknutím na «Přijmout vše» souhlasíte se všemi volitelnými soubory cookie. Kliknutím na «Odmítnout vše» odmítnete všechny volitelné soubory cookie. V části «Nastavení» si můžete podrobně vybrat, které typy souborů cookie (například marketing, statistika, externí média) chcete povolit. Váš souhlas je dobrovolný a můžete jej kdykoliv prostřednictvím našich nastavení souborů cookie odvolat nebo změnit. Podrobné informace o používaných souborech cookie, účelech zpracování a možnosti odvolání souhlasu najdete v našich popisech souborů cookie, v naší politice ochrany osobních údajů, v tiráži a v zápatí této stránky.'
    },
    {
        lang: 'Slowakisch',
        text: 'Používame súbory cookie a podobné technológie, aby sme zabezpečili určité základné funkcie našej webovej stránky (technicky nevyhnutné súbory cookie), a – len ak s tým súhlasíte – aby sme aktivovali voliteľné služby, ako je personalizovaná reklama, marketingové sledovanie, analýza používania a externý multimediálny obsah. Máte nasledujúce možnosti: výb“» Prijať všetko«» vyjadríte súhlas so všetkými voliteľnými súbormi cookie. Výb“» Odmietnuť všetko«» odmietnete všetky voliteľné súbory cookie. V časti «Nastavenia» si môžete podrobne vybrať, aké typy súborov cookie (napríklad marketing, štatistika, externé médiá) chcete povoliť. Váš súhlas je dobrovoľný a môžete ho kedykoľvek prostredníctvom našich nastavení cookie odvolať alebo zmeniť. Podrobné informácie o používaných súboroch cookie, účeloch spracovania a o možnosti odvolania súhlasu nájdete v našich popisoch cookie, v našich zásadách ochrany osobných údajov, v tiráži a v päte tejto stránky.'
    },
    {
        lang: 'Kroatisch',
        text: 'Koristimo kolačiće i slične tehnologije kako bismo osigurali određene osnovne funkcije naše web-stranice (tehnički nužni kolačići) te – samo ako pristajete – aktivirali opcionalne usluge kao što su personalizirano oglašavanje, praćenje marketinga, analiza upotrebe i vanjski multimedijski sadržaji. Imate sljedeće mogućnosti: odabirom «Prihvati sve» pristajete na sve opcionalne kolačiće. Odabirom «Odbij sve» odbijate sve opcionalne kolačiće. U odjeljku «Postavke» možete detaljno odabrati koje vrste kolačića (na primjer marketing, statistika, vanjski mediji) želite dopustiti. Vaš pristanak je dobrovoljan i možete ga u bilo kojem trenutku povući ili promijeniti putem naših postavki kolačića. Detaljne informacije o korištenim kolačićima, svrhama obrade i vašoj mogućnosti povlačenja pristanka pronaći ćete u našim opisima kolačića, našoj izjavi o privatnosti, impresumu i u podnožju ove stranice.'
    },
    {
        lang: 'Bulgarisch',
        text: 'Използваме бисквитки и подобни технологии за да осигурим определени , основни функции на нашия уебсайт технически необходими бисквитки и ( ) – – само ако се съгласите да активираме допълнителни услуги като персонализирана реклама маркетингово проследяване анализ на , , използването и външно мултимедийно съдържание Разполагате със . следните възможности с Приемам всички се съгласявате с всички : « » допълнителни бисквитки С Отхвърлям всички отхвърляте всички . « » допълнителни бисквитки В Настройки можете детайлно да изберете . « » какви видове бисквитки например маркетинг статистика външни медии ( , , ) желаете да разрешите Вашето съгласие е доброволно и можете да го . оттеглите или промените по всяко време чрез нашите настройки за бисквитки Подробна информация за използваните бисквитки целите на . , обработката и възможността за оттегляне на съгласието ще намерите в нашите описания на бисквитки в нашата политика за поверителност в , , правното изявление и в нижния колонтитул на тази страница .'
    },
    {
        lang: 'Rumänisch',
        text: 'Folosim cookie-uri și tehnologii similare pentru a asigura anumite funcții de bază ale site-ului nostru (cookie-uri strict necesare din punct de vedere tehnic) și – doar dacă sunteți de acord – pentru a activa servicii opționale, cum ar fi publicitatea personalizată, urmărirea marketingului, analiza utilizării și conținutul multimedia extern. Aveți următoarele opțiuni: cu «Acceptă toate» vă exprimați acordul pentru toate cookie-urile opționale. Cu «Respinge toate» respingeți toate cookie-urile opționale. În «Setări» puteți selecta granular ce tipuri de cookie-uri (de exemplu marketing, statistici, media externe) doriți să permiteți. Consimțământul dumneavoastră este voluntar și îl puteți retrage sau modifica în orice moment prin setările noastre pentru cookie-uri. Informații detaliate despre cookie-urile utilizate, scopurile prelucrării și posibilitatea de retragere a consimțământului se găsesc în descrierile noastre de cookie-uri, în politica noastră de confidențialitate, în mențiunile legale și în subsolul acestei pagini.'
    },
    {
        lang: 'Schwedisch',
        text: 'Vi använder cookies och liknande tekniker för att säkerställa vissa grundläggande funktioner på vår webbplats (tekniskt nödvändiga cookies) och – endast om du samtycker – för att aktivera valfria tjänster som personlig reklam, marknadsföringsspårning, användningsanalys och externa multimediainnehåll. Du har följande alternativ: Genom att välja «Acceptera alla» samtycker du till alla valfria cookies. Genom att välja «Neka alla» avvisar du alla valfria cookies. Under «Inställningar» kan du noggrant välja vilka typer av cookies (till exempel marknadsföring, statistik, externa medier) du vill tillåta. Ditt samtycke är frivilligt, och du kan när som helst återkalla eller ändra det via våra cookieinställningar. Detaljerad information om de cookies som används, behandlingssyftena och din möjlighet att återkalla samtycket finns i våra cookie-beskrivningar, i vår integritetspolicy, i vårt imprint och i sidfoten på denna sida.'
    },
    {
        lang: 'Norwegisch',
        text: 'Vi bruker informasjonskapsler (cookies) og lignende teknologier for å sikre visse grunnleggende funksjoner på nettstedet vårt (teknisk nødvendige informasjonskapsler) og – bare hvis du samtykker – for å aktivere valfrie tjenester som personlig tilpasset reklame, markedsføringssporing, bruksanalyse og eksternt multimediainnhold. Du har følgende alternativer: Ved å velge «Godta alle» samtykker du til alle valgfrie informasjonskapsler. Ved å velge «Avvis alle» avviser du alle valgfrie informasjonskapsler. Under «Innstillinger» kan du velge i detalj hvilke typer informasjonskapsler (for eksempel markedsføring, statistikk, eksterne medier) du ønsker å tillate. Ditt samtykke er frivillig, og du kan når som helst trekke det tilbake eller endre det via våre innstillinger for informasjonskapsler. Detaljert informasjon om brukte informasjonskapsler, behandlingsformålene og din mulighet til å trekke tilbake samtykket finner du i våre beskrivelse av informasjonskapsler, i vår personvernerklæring, i vårt impressum og i bunnteksten på denne siden.'
    },
    {
        lang: 'Indonesisch',
        text: 'Kami menggunakan cookie dan teknologi serupa untuk memastikan fungsi dasar tertentu dari situs web kami (cookie yang diperlukan secara teknis) dan – hanya jika Anda setuju – untuk mengaktifkan layanan opsional seperti iklan yang dipersonalisasi, pelacakan pemasaran, analisis penggunaan, dan konten multimedia eksternal. Anda memiliki pilihan berikut: Dengan memilih «Terima semua» Anda menyetujui semua cookie opsional. Dengan memilih «Tolak semua» Anda menolak semua cookie opsional. Di bagian «Pengaturan» Anda dapat memilih secara rinci jenis cookie (misalnya pemasaran, statistik, media eksternal) yang ingin Anda izinkan. Persetujuan Anda bersifat sukarela, dan Anda dapat mencabut atau mengubahnya kapan saja melalui pengaturan cookie kami. Informasi terperinci tentang cookie yang digunakan, tujuan pemrosesan, dan kemungkinan pencabutan persetujuan Anda dapat ditemukan dalam deskripsi cookie kami, kebijakan privasi kami, imprint, dan di footer halaman ini.'
    },
    {
        lang: 'Niederländisch',
        text: 'Wij gebruiken cookies en vergelijkbare technologieën om bepaalde basisfuncties van onze website te garanderen (technisch noodzakelijke cookies) en – alleen als u instemt – om optionele diensten zoals gepersonaliseerde reclame, marketingtracking, gebruiksanalyse en externe multimediale inhoud te activeren. U hebt de volgende mogelijkheden: door «Alles accepteren» te selecteren stemt u in met alle optionele cookies. Door «Alles weigeren» te selecteren weigert u alle optionele cookies. Onder «Instellingen» kunt u gedetailleerd kiezen welke soorten cookies (bijvoorbeeld marketing, statistiek, externe media) u wilt toestaan. Uw toestemming is vrijwillig en u kunt deze te allen tijde via onze cookie-instellingen intrekken of wijzigen. Gedetailleerde informatie over de gebruikte cookies, de verwerkingsdoeleinden en uw mogelijkheid tot intrekking vindt u in onze cookie-beschrijvingen, onze privacyverklaring, het colofon en in de footer van deze pagina.'
    }
];

const CookieConsentModal = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    };

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setCookie('cookieConsent', 'true', 365);
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'false');
        setCookie('cookieConsent', 'false', 365);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-neutral-200">
                    <h2 className="text-2xl font-bold text-neutral-900">Cookie Settings / Cookie-Einstellungen</h2>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cookieContent.map((item, index) => (
                            <div key={index} className="space-y-2 border-b border-neutral-100 pb-4 last:border-0" dir={item.dir || 'ltr'}>
                                <h3 className="font-bold text-neutral-800 text-lg">{item.lang}</h3>
                                <p className="text-sm text-neutral-600 leading-relaxed text-justify">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 border-t border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row gap-4 justify-end shrink-0">
                    <button
                        onClick={handleDecline}
                        className="px-6 py-2.5 rounded-lg border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
                    >
                        Decline All / Alles ablehnen
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
                    >
                        Accept All / Alle akzeptieren
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsentModal;
