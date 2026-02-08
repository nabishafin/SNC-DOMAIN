import React from 'react';
import PublicLayout from '../../components/layout/PublicLayout';

const SustainabilityPolicy = () => {
    const t = (s) => s;

    return (
        <PublicLayout>
            <div className="bg-white py-8 text-neutral-800">
                <div className="container-padding max-w-4xl mx-auto text-sm leading-relaxed">

                    <h1 className="text-2xl font-bold mb-4 text-center text-neutral-900">{t('SUSTAINABILITY POLICY of the')}</h1>
                    <h2 className="text-xl font-bold mb-6 text-center text-neutral-900">{t('SCANDIC FINANCE GROUP')}</h2>

                    <div className="space-y-4">
                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('0. Preamble, applicability and legal notice')}</h3>
                            <p>{t('This Sustainability Policy sets out the principles, objectives, responsibilities, processes and control mechanisms of')}</p>
                            <p className="font-bold">{t('SCANDIC FINANCE GROUP LIMITED')}{t(', with registered office at:')}</p>

                            <div className="bg-neutral-50 p-4 rounded border border-neutral-100 my-2 space-y-2">
                                <div>
                                    <p className="font-bold">{t('SCANDIC FINANCE GROUP LIMITED by Scandic Banking Hong Kong')}</p>
                                    <p>{t('Room 10, Unit A, 7th Floor')}</p>
                                    <p>{t('Harbour Sky, 28 Sze Shan Street')}</p>
                                    <p>{t('Yau Tong, Hong Kong, SAR - PRC')}</p>
                                    <p>{t('Head office telephone number in Switzerland, Zurich: +41 44 7979 99 – 85')}</p>
                                    <p>{t('Email:')} <a href="mailto:Office@ScandicFinance.Global" className="text-primary-600 hover:underline">Office@ScandicFinance.Global</a></p>
                                    <p>{t('Commercial register:')} <a href="https://hkg.Databasesets.com/en/gongsimingdan/number/79325926" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">https://hkg.Databasesets.com/en/gongsimingdan/number/79325926</a></p>
                                </div>

                                <div>
                                    <p className="font-bold">{t('In cooperation with:')}</p>
                                    <p className="font-bold">{t('SCANDIC ASSETS FZCO')}</p>
                                    <p>{t('Dubai Silicon Oasis, DDP Building A1/A2')}</p>
                                    <p>{t('Dubai, 342001, United Arab Emirates')}</p>
                                    <p>{t('Telephone: +971 56 929 86 – 90')}</p>
                                    <p>{t('Email:')} <a href="mailto:Info@ScandicAssets.dev" className="text-primary-600 hover:underline">Info@ScandicAssets.dev</a></p>
                                    <p>{t('Commercial register:')} <a href="https://dieza.my.site.com/diezaqrverify/validateqr?id=001NM00000K2u4FYAR&masterCode=CERTIFICATE_OF_FORMATION&relatedToId=a1MNM000004ddaI2AQ" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline break-all">https://dieza.my.site.com/diezaqrverify/validateqr...</a></p>
                                </div>

                                <div>
                                    <p className="font-bold">{t('in cooperation with:')}</p>
                                    <p className="font-bold">{t('SCANDIC TRUST GROUP LLC')}</p>
                                    <p>{t('IQ Business Centre, Bolsunovska Street 13 – 15')}</p>
                                    <p>{t('01014 Kyiv, Ukraine')}</p>
                                    <p>{t('Head office telephone number United Kingdom of Great Britain and Northern Ireland, London: +44 7470 86 92 – 60')}</p>
                                    <p>{t('Email:')} <a href="mailto:Info@ScandicTrust.com" className="text-primary-600 hover:underline">Info@ScandicTrust.com</a></p>
                                    <p>{t('Commercial register extract:')} <a href="https://LegierGroup.com/Scandic_Trust_Group_LLC_Extract_from_the_Unified_State_Register.pdf" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline break-all">https://LegierGroup.com/Scandic_Trust_Group_LLC...</a></p>
                                </div>

                                <div>
                                    <p className="font-bold">{t('in cooperation with:')}</p>
                                    <p className="font-bold">{t('LEGIER BETEILIGUNGS GMBH')}</p>
                                    <p>{t('Kurfürstendamm 14')}</p>
                                    <p>{t('10719 Berlin, Federal Republic of Germany')}</p>
                                    <p>{t('Telephone: +49 (0) 30 9921134 – 69')}</p>
                                    <p>{t('Email:')} <a href="mailto:Office@LegierGroup.com" className="text-primary-600 hover:underline">Office@LegierGroup.com</a></p>
                                    <p>{t('Commercial register:')} <a href="https://www.Handelsregister.de/rp_web/normalesuche/welcome.xhtml" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">https://www.Handelsregister.de/rp_web/normalesuche/welcome.xhtml</a></p>
                                </div>

                                <div className="pt-2 border-t border-neutral-200">
                                    <p className="font-bold">{t('Legal notice:')}</p>
                                    <p>{t('SCANDIC ASSETS FZCO, LEGIER Beteiligungs Gesellschaft mit beschränkter Haftung and SCANDIC TRUST GROUP LLC act as non-operational service providers, investment companies and service companies.')}</p>
                                    <p>{t('All operational and responsible activities within the meaning of this Sustainability Policy are carried out by SCANDIC FINANCE GROUP LIMITED, Hong Kong, Special Administrative Region of the People\'s Republic of China.')}</p>
                                </div>
                            </div>

                            <p>{t('This policy applies to the SCANDIC brand ecosystem, in particular to the following brands and services:')}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-medium my-2">
                                <div>SCANDIC SEC</div>
                                <div>SCANDIC FLY</div>
                                <div>SCANDIC PAY</div>
                                <div>SCANDIC COIN</div>
                                <div>SCANDIC CARS</div>
                                <div>SCANDIC DATA</div>
                                <div>SCANDIC SETUP</div>
                                <div>SCANDIC TRUST</div>
                                <div>SCANDIC CARDS</div>
                                <div>SCANDIC ESTATE</div>
                                <div>SCANDIC YACHTS</div>
                                <div>SCANDIC HEALTH</div>
                                <div>SCANDIC FINANCE</div>
                            </div>
                            <p className="text-xs text-neutral-400">{t('Sustainability en-GB.docx')}</p>
                            <p>{t('as well as for all structures, platforms, data centres, media, financial, payment, trust, technology and investment services held, controlled, operated or supported by SCANDIC FINANCE GROUP LIMITED (hereinafter collectively referred to as "SCANDIC FINANCE GROUP LIMITED and SCANDIC brand ecosystem").')}</p>
                            <p>{t('The policy is designed for global legal transactions. It is based on recognised international standards for the environment, social issues and good corporate governance (environmental, social and governance standards) as well as relevant frameworks such as:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('Global Reporting Initiative (global reporting standard on sustainability),')}</li>
                                <li>{t('Task Force on Climate-related Financial Disclosures,')}</li>
                                <li>{t('International Financial Reporting Standard S2 on climate-related disclosures,')}</li>
                                <li>{t('European Union Corporate Sustainability Reporting Directive,')}</li>
                                <li>{t('European Sustainability Reporting Standards,')}</li>
                                <li>{t('German and international rules on due diligence in supply chains (e.g. German Supply Chain Due Diligence Act) and')}</li>
                                <li>{t('other relevant national and international regulations, insofar as they apply to business activities.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('1. Self-image, business model and sustainability mission statement')}</h3>

                            <h4 className="font-semibold mb-1">{t('1.1 Business model and structure')}</h4>
                            <p>{t('SCANDIC FINANCE GROUP LIMITED sees itself as a globally active finance, technology, data, media and service ecosystem that is particularly active in the following areas:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('Financial and payment services (')}SCANDIC FINANCE, SCANDIC PAY, SCANDIC COIN, SCANDIC CARDS, SCANDIC TRUST{t('),')}</li>
                                <li>{t('premium transport and mobility (')}SCANDIC FLY, SCANDIC CARS, SCANDIC YACHTS{t('),')}</li>
                                <li>{t('real estate and asset solutions (')}SCANDIC ESTATE{t('),')}</li>
                                <li>{t('data, data centre and technology infrastructure (')}SCANDIC DATA{t('),')}</li>
                                <li>{t('health and digital health services (')}SCANDIC HEALTH{t('),')}</li>
                                <li>{t('company formation, structuring and trust solutions (')}SCANDIC SETUP, SCANDIC TRUST{t('),')}</li>
                                <li>{t('media and investment activities in association with LEGIER Beteiligungs Gesellschaft mit beschränkter Haftung.')}</li>
                            </ul>
                            <p>{t('Value creation is based on a digital-first strategy, international locations and a networked brand ecosystem that requires uniform compliance, risk and sustainability standards.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('1.2 Sustainability mission statement')}</h4>
                            <p>{t('SCANDIC FINANCE GROUP LIMITED and the SCANDIC brand ecosystem pursue a mission statement based on the following principles:')}</p>
                            <ul className="list-none pl-0 space-y-2 mt-2">
                                <li>
                                    <strong>{t('Responsibility for the environment and climate:')}</strong><br />
                                    {t('We are committed to a path towards climate neutrality and to the responsible use of all natural resources throughout the entire value chain.')}
                                </li>
                                <li>
                                    <strong>{t('Respect for human rights and fair working conditions:')}</strong><br />
                                    {t('We recognise internationally recognised human rights and embed them in our own business processes and supply chain.')}
                                </li>
                                <li>
                                    <strong>{t('Integrity, transparency and good corporate governance:')}</strong><br />
                                    {t('We conduct our business in a lawful, transparent and ethical manner, free from corruption or conflicts of interest.')}
                                </li>
                                <li>
                                    <strong>{t('Data protection, information security and protection of civil liberties:')}</strong><br />
                                    {t('We consider the protection of personal data, privacy and fundamental digital rights to be a central part of our responsibility.')}
                                </li>
                                <li>
                                    <strong>{t('Technology and artificial intelligence ethics:')}</strong><br />
                                    {t('We only use technology and artificial intelligence in accordance with clear ethical principles, transparent governance and human oversight.')}
                                </li>
                                <li>
                                    <strong>{t('Social contribution and media and information ethics:')}</strong><br />
                                    {t('Through our services, platforms and, where relevant, media offerings, we contribute to an informed, pluralistic, democratic and sustainable society.')}
                                </li>
                            </ul>
                            <p className="text-xs text-neutral-400 mt-2">{t('Sustainability en-GB.docx')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('2. Sustainability goals and objectives')}</h3>

                            <h4 className="font-semibold mb-1">{t('2.1 Climate and environmental goals')}</h4>
                            <p>{t('SCANDIC FINANCE GROUP LIMITED has defined the following long-term goals for its own locations (including data centres, offices and other infrastructure) and within the Group\'s sphere of influence:')}</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li>
                                    {t('Climate neutrality for direct and indirect emissions from energy use (Scope 1 and Scope 2):')}
                                    <br />
                                    {t('Targeted net zero emissions in the area of direct emissions (e.g. heating energy, own vehicles) and indirect emissions from purchased energy by 2027 at the latest.')}
                                </li>
                                <li>
                                    {t('Structured reduction path for upstream and downstream emissions (Scope 3):')}
                                    <br />
                                    {t('Development and implementation of a reduction pathway for emissions along the supply chain, at service providers and in the use of products by customers by 2030 and 2035, with ambitious interim targets.')}
                                </li>
                                <li>
                                    {t('High-performance data centres and digital infrastructure:')}
                                    <br />
                                    {t('An energy efficiency target is defined for data centres and data infrastructure (in particular')} SCANDIC DATA{t('):')}
                                    <br />
                                    {t('a target energy efficiency indicator (power usage effectiveness) of no more than 1.25 by 2027,')}
                                    <br />
                                    {t('continuous improvement by 2030.')}
                                </li>
                                <li>
                                    {t('Carbon-free energy supply around the clock:')}
                                    <br />
                                    {t('Establishment of a path to a consistently carbon-free energy supply for the digital infrastructure (24 hours a day, 7 days a week), based on the best practice approaches of leading technology companies.')}
                                </li>
                                <li>
                                    {t('Resource efficiency, water and circular economy:')}
                                    <br />
                                    {t('Reduction of water consumption – especially for cooling in data centres – and establishment of circular processes (e.g. repair, reuse, certified recycling of hardware).')}
                                </li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('2.2 Social and governance goals')}</h4>
                            <ul className="list-none pl-0 space-y-2">
                                <li>
                                    <strong>{t('Human rights and supply chain:')}</strong><br />
                                    {t('Establishment of a supply chain management system that complies with international standards of due diligence, including risk analysis, prevention and remedial measures, and grievance mechanisms.')}
                                </li>
                                <li>
                                    <strong>{t('Diversity, equality and inclusion:')}</strong><br />
                                    {t('Set concrete goals for diversity, equal opportunities, inclusion and fair remuneration.')}
                                </li>
                                <li>
                                    <strong>{t('Strong compliance culture and corruption prevention:')}</strong><br />
                                    {t('Enforcement of a strict code of conduct, clear anti-corruption rules and transparent governance structures.')}
                                </li>
                                <li>
                                    <strong>{t('Data protection and information security:')}</strong><br />
                                    {t('Implementation of an information security management system in accordance with recognised standards and active data protection principles in all products, platforms and processes.')}
                                </li>
                                <li>
                                    <strong>{t('AI ethics and media ethics (where relevant):')}</strong><br />
                                    {t('Establishment of a special governance structure for dealing with artificial intelligence, as well as principles for media ethics responsibility, combating disinformation and transparency.')}
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('3. Governance structure and responsibilities')}</h3>

                            <h4 className="font-semibold mb-1">{t('3.1 Overall responsibility')}</h4>
                            <p>{t('Ultimate responsibility for this Sustainability Policy and its implementation lies with the Board of SCANDIC FINANCE GROUP LIMITED and senior management, in particular:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('the management or the Executive Board of SCANDIC FINANCE GROUP LIMITED,')}</li>
                                <li>{t('the respective management bodies of the brands in the SCANDIC brand ecosystem, insofar as they are operationally active.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('3.2 Sustainability Committee (ESG Committee)')}</h4>
                            <p>{t('For effective management, a Sustainability Committee (Environmental, Social and Governance Committee) will be established, consisting of representatives from the following areas in particular:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('Climate and environment,')}</li>
                                <li>{t('human rights, labour, supply chain,')}</li>
                                <li>{t('Data, information security and artificial intelligence,')}</li>
                                <li>{t('Compliance, law, finance and risk,')}</li>
                                <li>{t('Human resources and culture,')}</li>
                                <li>{t('Media and communication (where relevant).')}</li>
                            </ul>
                            <p className="mt-2 font-semibold">{t('Tasks of the committee:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('Setting sustainability goals, priorities and measures,')}</li>
                                <li>{t('Monitoring implementation and measuring progress,')}</li>
                                <li>{t('Coordinating sustainability reporting,')}</li>
                                <li>{t('Advising the board,')}</li>
                                <li>{t('Escalating significant violations.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('3.3 Policy library')}</h4>
                            <p>{t('The Sustainability Policy is part of a comprehensive policy library that includes, among other things:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('Code of Conduct,')}</li>
                                <li>{t('Supplier Code of Conduct,')}</li>
                                <li>{t('Environmental and climate policy,')}</li>
                                <li>{t('Human rights and labour rights policy,')}</li>
                                <li>{t('Modern Slavery and Forced Labour Statement,')}</li>
                                <li>{t('Information security policy,')}</li>
                                <li>{t('Data protection policy,')}</li>
                                <li>{t('Responsible Disclosure Policy,')}</li>
                                <li>{t('Guidelines for the ethically responsible use of artificial intelligence,')}</li>
                                <li>{t('Media and communication policy (where relevant).')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('4. Human rights, working conditions and social responsibility')}</h3>

                            <h4 className="font-semibold mb-1">{t('4.1 Recognition of international standards')}</h4>
                            <p>{t('SCANDIC FINANCE GROUP LIMITED recognises in particular:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('The United Nations Universal Declaration of Human Rights,')}</li>
                                <li>{t('the International Labour Organisation\'s core labour standards,')}</li>
                                <li>{t('the United Nations Guiding Principles on Business and Human Rights,')}</li>
                                <li>{t('the Organisation for Economic Co-operation and Development Guidelines for Multinational Enterprises.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('4.2 Principles for employees')}</h4>
                            <p>{t('The following applies in particular to all employees within the SCANDIC brand ecosystem:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('Prohibition of forced, child and debt bondage labour.')}</li>
                                <li>{t('Prohibition of discrimination and harassment.')}</li>
                                <li>{t('Safe and healthy working conditions.')}</li>
                                <li>{t('Right to freedom of association and collective bargaining.')}</li>
                                <li>{t('Fair remuneration and social benefits.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('4.3 Complaint and whistleblower systems')}</h4>
                            <p>{t('SCANDIC FINANCE GROUP LIMITED establishes anonymous, confidential and multilingual complaint and whistleblower systems through which reports of violations of human rights, labour standards, environmental regulations, data protection, anti-corruption laws and other material legal violations can be made.')}</p>
                            <p>{t('The procedures ensure:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('Careful, prompt and impartial investigation')}</li>
                                <li>{t('protection of whistleblowers from reprisals,')}</li>
                                <li>{t('comprehensible documentation,')}</li>
                                <li>{t('effective remedial measures,')}</li>
                                <li>{t('a target median processing time for complaints')}</li>
                                <li>{t('within a maximum period of fourteen days for standard cases.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('5. Sustainable supply chain that complies with human rights')}</h3>

                            <h4 className="font-semibold mb-1">{t('5.1 Supplier code of conduct and contract design')}</h4>
                            <p>{t('SCANDIC FINANCE GROUP LIMITED contractually obliges all suppliers and key service providers to comply with a supplier code of conduct, which contains rules on, in particular:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('human rights and working conditions,')}</li>
                                <li>{t('Health and safety,')}</li>
                                <li>{t('Environmental protection, resource consumption and emissions,')}</li>
                                <li>{t('diversity, equality and inclusion,')}</li>
                                <li>{t('Data protection and information security,')}</li>
                                <li>{t('Prohibition of corruption, fair competition and prevention of money laundering,')}</li>
                                <li>{t('Cooperation in audits, providing information and remedial measures.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('5.2 Risk analysis and prioritisation')}</h4>
                            <p>{t('A systematic risk analysis of the supply chain is carried out, particularly in the following risk areas:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('Hardware and digital infrastructure,')}</li>
                                <li>{t('Data centre services and cloud infrastructure,')}</li>
                                <li>{t('Media, content and creative services,')}</li>
                                <li>{t('Logistics services,')}</li>
                                <li>{t('Other critical services.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('5.3 Preventive and remedial measures')}</h4>
                            <p>{t('Preventive measures are developed on the basis of the risk analysis, such as:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('Specific clauses in contracts')}</li>
                                <li>{t('Training for purchasers,')}</li>
                                <li>{t('Information material and training for suppliers,')}</li>
                                <li>{t('consideration of sustainability performance in procurement.')}</li>
                            </ul>
                            <p className="mt-2">{t('If violations are detected, remedial measures must be taken, such as:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('written warnings and deadlines,')}</li>
                                <li>{t('jointly developed improvement plans,')}</li>
                                <li>{t('more intensive checks,')}</li>
                                <li>{t('restriction or termination of the business relationship if no improvement is made.')}</li>
                            </ul>
                            <p className="text-xs text-neutral-400 mt-2">{t('Sustainability en-GB.docx')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('6. Environmental, climate and resource management')}</h3>

                            <h4 className="font-semibold mb-1">{t('6.1 Principles')}</h4>
                            <p>{t('SCANDIC FINANCE GROUP LIMITED is committed to the following principles:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('Priority of avoidance and reduction over compensation,')}</li>
                                <li>{t('Holistic approach along the value chain,')}</li>
                                <li>{t('Transparent measurement and reporting of key environmental indicators.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('6.2 Energy, data centres and digital infrastructure')}</h4>
                            <p>{t('The following applies in particular to data centres and digital infrastructure:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('Energy efficiency with target figures for energy efficiency,')}</li>
                                <li>{t('Gradual conversion to electricity from renewable energy sources,')}</li>
                                <li>{t('Optimisation of cooling concepts, enclosure of cold and hot aisles,')}</li>
                                <li>{t('virtualisation and utilisation optimisation.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('6.3 Water, waste and circular economy')}</h4>
                            <p>{t('Recording water consumption, introducing waste separation, reuse and recycling.')}</p>
                            <p>{t('Use of certified service providers for data deletion, recycling and proper disposal of hardware.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('6.4 Mobility, travel and events')}</h4>
                            <p>{t('Reduction of business air travel to the necessary minimum, promotion of video conferencing,')}
                                <br />
                                {t('use of efficient means of transport,')}
                                <br />
                                {t('Establishment of internal guidelines for "avoid, reduce, compensate" for business travel.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('7. Data protection, information security and protection of civil liberties')}</h3>

                            <h4 className="font-semibold mb-1">{t('7.1 Data protection principles')}</h4>
                            <p>{t('SCANDIC FINANCE GROUP LIMITED complies with the fundamental data protection principles of the applicable data protection laws, in particular lawfulness, purpose limitation, data minimisation, storage limitation, integrity and confidentiality, and accountability.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('7.2 Information security')}</h4>
                            <p>{t('The Group establishes an information security management system in accordance with the international standard 27001 or an equivalent recognised standard with systematic risk analysis, defined security objectives, organisational and technical measures, and regular audits.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('7.3 Fundamental digital rights and civil liberties')}</h4>
                            <p>{t('When designing products, in particular financial, media and data products, SCANDIC FINANCE GROUP LIMITED respects the fundamental rights and civil liberties of users and recognises the right to informational self-determination, freedom of expression and information, and protection from disproportionate surveillance.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('8. Use of technology and artificial intelligence')}</h3>

                            <h4 className="font-semibold mb-1">{t('8.1 Principles for artificial intelligence')}</h4>
                            <p>{t('The use of artificial intelligence follows these principles:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('Legality and compliance,')}</li>
                                <li>{t('Transparency and traceability,')}</li>
                                <li>{t('Human oversight,')}</li>
                                <li>{t('Protection against discrimination,')}</li>
                                <li>{t('Security.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('8.2 Committees and processes')}</h4>
                            <p>{t('Establishment of a committee for artificial intelligence governance,')}
                                <br />
                                {t('Conducting impact and risk analyses, documenting models, training data, intended use and control mechanisms.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('9. Corporate governance, compliance and integrity')}</h3>

                            <h4 className="font-semibold mb-1">{t('9.1 Code of Conduct')}</h4>
                            <p>{t('SCANDIC FINANCE GROUP LIMITED has a code of conduct that applies to all employees and board members and regulates lawful conduct, transparent and fair business relationships, dealing with conflicts of interest, prohibition of corruption and prevention of money laundering.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('9.2 Corruption prevention')}</h4>
                            <ul className="list-disc pl-5">
                                <li>{t('Clear prohibitions on improper payments')}</li>
                                <li>{t('Training on corruption prevention,')}</li>
                                <li>{t('Anonymous reporting channels,')}</li>
                                <li>{t('Consistent investigation of suspected cases.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('9.3 Risk management and internal control')}</h4>
                            <p>{t('Integrated risk and control system that also covers sustainability risks, with annual risk inventory, assessment, thresholds, controls and monitoring.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('10. Employees, diversity and work culture')}</h3>
                            <ul className="list-disc pl-5">
                                <li>{t('Promotion of a diverse and inclusive work culture,')}</li>
                                <li>{t('Targets for representation and fair remuneration,')}</li>
                                <li>{t('Occupational health and safety,')}</li>
                                <li>{t('Training and development programmes.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('11. Stakeholder dialogue and social contribution')}</h3>
                            <ul className="list-disc pl-5">
                                <li>{t('Identification of key stakeholders,')}</li>
                                <li>{t('Dialogue formats with customers, employees,')}</li>
                                <li>{t('Suppliers, regulators and civil society,')}</li>
                                <li>{t('Programmes for financial education, digital media literacy and support for educational, cultural and social projects.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('12. Targets, key figures and reporting')}</h3>
                            <ul className="list-disc pl-5">
                                <li>{t('Setting targets for energy, emissions, supply chain,')}</li>
                                <li>{t('whistleblower system and artificial intelligence,')}</li>
                                <li>{t('Reporting in a regular sustainability report in accordance with international standards,')}</li>
                                <li>{t('Gradual external review of key performance indicators.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('13. Implementation, review and sanctions')}</h3>
                            <ul className="list-disc pl-5">
                                <li>{t('Defining responsibilities,')}</li>
                                <li>{t('Creation of implementation plans,')}</li>
                                <li>{t('Training of employees,')}</li>
                                <li>{t('Integration into management systems,')}</li>
                                <li>{t('Annual review of the policy,')}</li>
                                <li>{t('Labour law measures in the event of violations,')}</li>
                                <li>{t('Restriction or termination of business relationships in the event of serious violations.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('14. Final provisions')}</h3>
                            <p>{t('This Sustainability Policy shall enter into force upon formal adoption by the management of SCANDIC FINANCE GROUP LIMITED. It shall be interpreted in conjunction with the respective national legal systems. In the event of any conflict between this Policy and mandatory legal requirements, the legal requirements shall prevail.')}</p>
                            <p>{t('SCANDIC FINANCE GROUP LIMITED regards this policy as a living management tool for responsible, forward-looking and value-based corporate governance and will continue to develop it further.')}</p>

                            <div className="mt-8 pt-6 border-t border-neutral-200">
                                <p className="font-bold">{t('Drafted, signed and approved:')}</p>
                                <p>{t('The Board of Directors of SCANDIC FINANCE GROUP LIMITED')}</p>
                                <p>{t('Hong Kong, SAR - PRC, 1 December 2025')}</p>
                                <p className="mt-4"><span className="font-bold">{t('Legal representation:')}</span> {t('Clifford Chance, Global Law Firm')}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default SustainabilityPolicy;
