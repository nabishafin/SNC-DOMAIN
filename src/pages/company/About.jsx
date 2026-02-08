import PublicLayout from '../../components/layout/PublicLayout';

const About = () => {
    return (
        <PublicLayout>
            <div className="bg-white py-12 md:py-20">
                <div className="container-padding max-w-4xl mx-auto text-neutral-800">

                    <h1 className="text-4xl font-bold mb-12 text-center">About us</h1>

                    <div className="space-y-12">
                        {/* Intro */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 uppercase tracking-wide text-neutral-900">SCANDIC FINANCE GROUP</h2>
                            <p className="mb-2 text-lg italic text-neutral-600">and affiliated business areas</p>
                            <p className="leading-relaxed">
                                SCANDIC FINANCE GROUP LIMITED, based in Hong Kong, SAR - PRC, is the central control centre of the SCANDIC brand ecosystem.
                            </p>
                        </section>

                        {/* Headquarters */}
                        <section className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                            <h2 className="text-xl font-bold mb-6 text-neutral-900 border-b border-neutral-200 pb-2">Company headquarters and contact details:</h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="font-bold">SCANDIC FINANCE GROUP LIMITED</p>
                                    <p>by Scandic Banking Hong Kong</p>
                                    <p>Room 10, Unit A, 7/F</p>
                                    <p>Harbour Sky, 28 Sze Shan Street</p>
                                    <p>Yau Tong, Hong Kong / SAR / PRC</p>
                                </div>

                                <div>
                                    <p><span className="font-semibold">Phone Headquarters – Switzerland, Zurich:</span> +41 44 7979 99 – 85</p>
                                    <p><span className="font-semibold">Email:</span> <a href="mailto:Office@ScandicFinance.Global" className="text-primary-600 hover:underline">Office@ScandicFinance.Global</a></p>
                                    <p className="break-all"><span className="font-semibold">Commercial register:</span> <a href="https://hkg.Databasesets.com/en/gongsimingdan/number/79325926" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">https://hkg.Databasesets.com/en/gongsimingdan/number/79325926</a></p>
                                </div>
                            </div>
                        </section>

                        {/* Partners */}
                        <section>
                            <p className="mb-6 text-lg">
                                To implement its international strategy, SCANDIC FINANCE GROUP LIMITED works with specialised, legally independent partner companies, including:
                            </p>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                                    <h3 className="font-bold text-lg mb-3 text-primary-700">SCANDIC ASSETS FZCO</h3>
                                    <p>Dubai Silicon Oasis DDP Building A1/A2</p>
                                    <p className="mb-3">Dubai, 342001 / United Arab Emirates</p>
                                    <p><span className="font-semibold">Telephone:</span> +971 56 929 86 – 90</p>
                                    <p><span className="font-semibold">Email:</span> <a href="mailto:Info@ScandicAssets.dev" className="text-primary-600 hover:underline">Info@ScandicAssets.dev</a></p>
                                    <div className="mt-2">
                                        <p className="font-semibold">Commercial register:</p>
                                        <a href="https://dieza.my.site.com/diezaqrverify/validateqr?id=001NM00000K2u4FYAR&masterCode=CERTIFICATE_OF_FORMATION&relatedToId=a1MNM000004ddaI2AQ" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline text-sm break-all">
                                            https://dieza.my.site.com/diezaqrverify/validateqr?id=001NM00000K2u4FYAR&masterCode=CERTIFICATE_OF_FORMATION&relatedToId=a1MNM000004ddaI2AQ
                                        </a>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                                    <h3 className="font-bold text-lg mb-3 text-primary-700">SCANDIC TRUST GROUP LLC</h3>
                                    <p>IQ Business Centre, Bolsunovska Street 13 – 15</p>
                                    <p className="mb-3">Kyiv — 01014 / Ukraine</p>
                                    <p><span className="font-semibold">Headquarters telephone number – United Kingdom, London:</span> +44 7470 86 92 – 60</p>
                                    <p><span className="font-semibold">Email:</span> <a href="mailto:Info@ScandicTrust.com" className="text-primary-600 hover:underline">Info@ScandicTrust.com</a></p>
                                    <div className="mt-2">
                                        <p className="font-semibold">Commercial register extract:</p>
                                        <a href="https://LegierGroup.com/Scandic_Trust_Group_LLC_Extract_from_the_Unified_State_Register.pdf" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline text-sm break-all">
                                            https://LegierGroup.com/Scandic_Trust_Group_LLC_Extract_from_the_Unified_State_Register.pdf
                                        </a>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 md:col-span-2">
                                    <h3 className="font-bold text-lg mb-3 text-primary-700">LEGIER BETEILIGUNGS GMBH</h3>
                                    <p>Kurfürstendamm 14</p>
                                    <p>10719 Berlin / Federal Republic of Germany</p>
                                    <p className="mb-3">HR Berlin: HRB 57837</p>
                                    <p><span className="font-semibold">Telephone:</span> +49 (0) 30 9921134 – 69</p>
                                    <p><span className="font-semibold">Email:</span> <a href="mailto:Office@LegierGroup.com" className="text-primary-600 hover:underline">Office@LegierGroup.com</a></p>
                                    <div className="mt-2">
                                        <p className="font-semibold">Commercial register:</p>
                                        <a href="https://www.Handelsregister.de/rp_web/normalesuche/welcome.xhtml" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline text-sm break-all">
                                            https://www.Handelsregister.de/rp_web/normalesuche/welcome.xhtml
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Legal Notice */}
                        <section className="bg-neutral-900 text-neutral-300 p-8 rounded-2xl">
                            <h2 className="text-xl font-bold mb-4 text-white">Legal notice:</h2>
                            <p className="leading-relaxed">
                                SCANDIC ASSETS FZCO, LEGIER Beteiligungs Gesellschaft mit beschränkter Haftung and SCANDIC TRUST GROUP LLC act as non-operational service providers. All operational and responsible activities are carried out by SCANDIC FINANCE GROUP LIMITED, Hong Kong, Special Administrative Region of the People's Republic of China.
                            </p>
                        </section>

                        {/* Our Mission */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-neutral-900">Our mission</h2>
                            <p className="mb-4 leading-relaxed">
                                SCANDIC FINANCE GROUP LIMITED sees itself as the infrastructure and platform provider of tomorrow, with a particular focus on digital structures.
                            </p>
                            <p className="mb-4 font-semibold">Our mission is to provide customers worldwide with access to:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                <li>regulation-oriented, high-quality services,</li>
                                <li>transparent, traceable and documented structures,</li>
                                <li>professional solutions – regardless of which country they come from or in which market they operate.</li>
                            </ul>
                            <p className="leading-relaxed">
                                In doing so, SCANDIC FINANCE GROUP LIMITED combines digital technologies with strict compliance with international compliance requirements and the applicable national legal systems.
                            </p>
                        </section>

                        {/* Brand Ecosystem */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-neutral-900">The SCANDIC Brand Eco-System</h2>
                            <p className="mb-6 leading-relaxed">
                                This structure integrates European Union standards, international compliance requirements and the framework of the Supply Chain Due Diligence Act (LkSG) and serves as a common basis for the SCANDIC brand ecosystem, in particular for:
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                {[
                                    'LEGIER GROUP', 'SCANDIC SEC', 'SCANDIC FLY', 'SCANDIC PAY',
                                    'SCANDIC COIN', 'SCANDIC CARS', 'SCANDIC DATA', 'SCANDIC SETUP',
                                    'SCANDIC TRUST', 'SCANDIC CARDS', 'SCANDIC ESTATE', 'SCANDIC YACHTS',
                                    'SCANDIC HEALTH', 'SCANDIC FINANCE'
                                ].map((brand) => (
                                    <div key={brand} className="bg-primary-50 p-3 rounded-lg text-center font-bold text-primary-800 text-sm">
                                        {brand}
                                    </div>
                                ))}
                            </div>

                            <p className="leading-relaxed">
                                Each of these brands represents a separate service area – from digital solutions, information about private mobility and real estate to data and infrastructure offerings. SCANDIC FINANCE GROUP LIMITED acts as a regulatory umbrella to ensure uniform standards, clear governance structures and a high degree of legal certainty.
                            </p>
                        </section>

                        {/* Responsibility */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-neutral-900">Our understanding of responsibility and compliance</h2>
                            <p className="mb-4 font-semibold">SCANDIC FINANCE GROUP LIMITED is committed to:</p>
                            <ul className="list-disc pl-6 space-y-3 mb-6">
                                <li>strict compliance with relevant laws and regulations (including in the areas of financial market regulation, money laundering prevention, sanctions, tax law, data protection and supply chain compliance),</li>
                                <li>transparent documentation of structures, processes and responsibilities,</li>
                                <li>risk management at group level, particularly with regard to digital assets, international payment flows and complex ownership structures,</li>
                                <li>clear governance and control mechanisms that clearly assign responsibilities within the group.</li>
                            </ul>
                            <p className="leading-relaxed font-medium">
                                SCANDIC FINANCE GROUP LIMITED thus positions itself as a partner for customers who value traceability and compliance capability – in the world of digital technologies.
                            </p>
                        </section>

                        {/* User Focus */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-neutral-900">User focus and security</h2>
                            <p className="mb-4 leading-relaxed">
                                The protection of customers is at the heart of SCANDIC FINANCE GROUP LIMITED. This includes in particular:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                <li>Careful selection and ongoing review of technical service providers and infrastructure;</li>
                                <li>a multi-level concept for information security and the protection of sensitive data;</li>
                                <li>risk-based processes to combat money laundering and terrorist financing;</li>
                                <li>consistent alignment of all services with transparency, traceability and professional communication.</li>
                            </ul>
                            <p className="leading-relaxed">
                                Customers should be able to make informed decisions. That is why information on products, opportunities and – in particular – risks is presented in a clear and understandable manner and linked to the relevant legal framework.
                            </p>
                        </section>

                        {/* Cooperation */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-neutral-900">Cooperation with supervisory authorities and institutions</h2>
                            <p className="mb-4 leading-relaxed">
                                SCANDIC FINANCE GROUP LIMITED pursues the goal of providing its services in accordance with:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                <li>the requirements of supervisory authorities,</li>
                                <li>the expectations of institutional partners,</li>
                                <li>the standards of international organisations. This includes dialogue with authorities and institutions as well as continuous adaptation to new regulations, guidelines and standards.</li>
                            </ul>
                        </section>

                        {/* Working */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-neutral-900">Working in the SCANDIC brand ecosystem</h2>
                            <p className="mb-4 leading-relaxed">
                                SCANDIC FINANCE GROUP LIMITED and its cooperating companies offer an environment in which:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                <li>entrepreneurial thinking is combined with a strict focus on compliance,</li>
                                <li>international teams in Hong Kong, Dubai, Kiev, Berlin, Zurich, London and other locations work together,</li>
                                <li>expertise in law, finance, technology, digitalisation and the structuring of complex asset and corporate structures comes together.</li>
                            </ul>
                            <p className="leading-relaxed">
                                Employees are encouraged to take responsibility, think across disciplines and uphold SCANDIC FINANCE GROUP LIMITED's commitment to being a reliable, regulatory-sensitive and forward-looking financial partner for discerning clients worldwide.
                            </p>
                        </section>

                        {/* Signature */}
                        <section className="mt-16 pt-8 border-t border-neutral-200">
                            <p className="font-bold text-lg mb-1">Written, signed and approved:</p>
                            <p className="text-neutral-600">The Board of Directors of SCANDIC FINANCE GROUP LIMITED</p>
                            <p className="text-neutral-600">Hong Kong, SAR - PRC, 1 December 2025</p>
                        </section>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default About;
