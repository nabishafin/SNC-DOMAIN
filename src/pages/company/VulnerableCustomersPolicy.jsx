import React from 'react';
import PublicLayout from '../../components/layout/PublicLayout';

const VulnerableCustomersPolicy = () => {
    const t = (s) => s;

    return (
        <PublicLayout>
            <div className="bg-white py-8 text-neutral-800">
                <div className="container-padding max-w-4xl mx-auto text-sm leading-relaxed">

                    <h1 className="text-2xl font-bold mb-2 text-center text-neutral-900">{t('Guidelines for vulnerable customers')}</h1>
                    <h2 className="text-xl font-bold mb-2 text-center text-neutral-900">{t('including management summary and internal process flow')}</h2>
                    <h3 className="text-lg font-bold mb-2 text-center text-neutral-900">{t('for')}</h3>
                    <h3 className="text-lg font-bold mb-6 text-center text-neutral-900">{t('SCANDIC FINANCE GROUP LIMITED')}</h3>
                    <p className="text-center mb-6">{t('by Scandic Banking Hong Kong')}</p>

                    <div className="space-y-4">
                        <section>
                            <div className="bg-neutral-50 p-4 rounded border border-neutral-100 my-2 space-y-2">
                                <div>
                                    <p>{t('Room 10, Unit A, 7/F')}</p>
                                    <p>{t('Harbour Sky, 28 Sze Shan Street')}</p>
                                    <p>{t('Yau Tong, Hong Kong, SAR / PRC')}</p>
                                    <p>{t('Head office telephone number in Switzerland, Zurich: +41 44 7979 99 – 85')}</p>
                                    <p>{t('Email:')} <a href="mailto:Office@ScandicFinance.Global" className="text-primary-600 hover:underline">Office@ScandicFinance.Global</a></p>
                                    <p>{t('Commercial register:')} <a href="https://hkg.Databasesets.com/en/gongsimingdan/number/79325926" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">https://hkg.Databasesets.com/en/gongsimingdan/number/79325926</a></p>
                                </div>

                                <div>
                                    <p className="font-bold">{t('In cooperation with:')}</p>
                                    <p className="font-bold">{t('SCANDIC ASSETS FZCO')}</p>
                                    <p>{t('Dubai Silicon Oasis DDP Building A1/A2')}</p>
                                    <p>{t('Dubai, 342001, United Arab Emirates')}</p>
                                    <p>{t('Telephone: +971 56 929 86 – 90')}</p>
                                    <p>{t('Email:')} <a href="mailto:Info@ScandicAssets.dev" className="text-primary-600 hover:underline">Info@ScandicAssets.dev</a></p>
                                    <p>{t('Commercial register:')} <a href="https://dieza.my.site.com/diezaqrverify/validateqr?id=001NM00000K2u4FYAR&masterCode=CERTIFICATE_OF_FORMATION&relatedToId=a1MNM000004ddaI2AQ" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline break-all">https://dieza.my.site.com/diezaqrverify/validateqr...</a></p>
                                </div>

                                <div>
                                    <p className="font-bold">{t('in cooperation with:')}</p>
                                    <p className="font-bold">{t('SCANDIC TRUST GROUP LLC')}</p>
                                    <p>{t('IQ Business Centre, Bolsunovska Street 13 – 15')}</p>
                                    <p>{t('Kyiv — 01014, Ukraine')}</p>
                                    <p>{t('Headquarters telephone number United Kingdom of Great Britain and Northern Ireland, London: +44 7470 86 92 – 60')}</p>
                                    <p>{t('Email:')} <a href="mailto:Info@ScandicTrust.com" className="text-primary-600 hover:underline">Info@ScandicTrust.com</a></p>
                                    <p>{t('Commercial register extract:')} <a href="https://LegierGroup.com/Scandic_Trust_Group_LLC_Extract_from_the_Unified_State_Register.pdf" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline break-all">https://LegierGroup.com/Scandic_Trust_Group_LLC...</a></p>
                                </div>

                                <div>
                                    <p className="font-bold">{t('in cooperation with:')}</p>
                                    <p className="font-bold">{t('LEGIER BETEILIGUNGS GMBH')}</p>
                                    <p>{t('Kurfürstendamm 14')}</p>
                                    <p className="text-xs text-neutral-400">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</p>
                                    <p>{t('10719 Berlin, Federal Republic of Germany')}</p>
                                    <p>{t('Berlin Commercial Register Number: HRB 57837')}</p>
                                    <p>{t('Telephone: +49 (0) 30 9921134 – 69')}</p>
                                    <p>{t('Email:')} <a href="mailto:Office@LegierGroup.com" className="text-primary-600 hover:underline">Office@LegierGroup.com</a></p>
                                    <p>{t('Commercial register:')} <a href="https://www.Handelsregister.de/rp_web/normalesuche/welcome.xhtml" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">https://www.Handelsregister.de/rp_web/normalesuche/welcome.xhtml</a></p>
                                </div>

                                <div className="pt-2 border-t border-neutral-200">
                                    <p className="font-bold">{t('Legal notice:')}</p>
                                    <p>{t('SCANDIC ASSETS FZCO, LEGIER Beteiligungs Gesellschaft mit beschränkter Haftung and SCANDIC TRUST GROUP LLC act as non-operational service providers.')}</p>
                                    <p>{t('All operational and responsible activities are carried out by SCANDIC FINANCE GROUP LIMITED, Hong Kong, Special Administrative Region of the People\'s Republic of China.')}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <p>{t('This policy applies to the SCANDIC brand ecosystem, in particular to the following brands and services:')}</p>
                            <ul className="list-none pl-0 space-y-1 my-2 font-medium">
                                <li>SCANDIC SEC</li>
                                <li>SCANDIC FLY</li>
                                <li>SCANDIC PAY</li>
                                <li>SCANDIC COIN</li>
                                <li>SCANDIC CARS</li>
                                <li>SCANDIC DATA</li>
                                <li>SCANDIC SETUP</li>
                                <li>SCANDIC TRUST</li>
                                <li>SCANDIC CARDS</li>
                                <li>SCANDIC ESTATE</li>
                                <li>SCANDIC YACHTS</li>
                                <li>SCANDIC HEALTH</li>
                                <li>SCANDIC FINANCE</li>
                            </ul>
                            <p>{t('and for all structures held or supported by SCANDIC FINANCE GROUP LIMITED.')}</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-neutral-900 mt-8">{t('Part 1: Management summary of the policy for vulnerable customers')}</h2>

                            <h3 className="font-bold mb-2 text-neutral-900">{t('1. Purpose of the policy')}</h3>
                            <p>{t('The Vulnerable Customer Policy aims to')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Identify customers whose ability to make their own informed decisions may be limited by personal circumstances.')}</li>
                                <li className="text-xs text-neutral-400 list-none -ml-5 pl-5">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</li>
                                <li>{t('Taking into account their special protection needs in all financial, fiduciary, payment and investment services.')}</li>
                                <li>{t('to avoid excessive demands, financial exploitation and serious misjudgements,')}</li>
                                <li>{t('to provide the management of SCANDIC FINANCE GROUP LIMITED with a clear, structured framework for action based on modern European Union standards and international best practice principles.')}</li>
                            </ul>
                            <p className="mt-2">{t('The guideline applies to the entire SCANDIC brand ecosystem and all related services provided to natural persons.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('2. Definition of "vulnerable customers"')}</h3>
                            <p>{t('Vulnerable customers are natural persons whose ability to protect their own interests, make informed decisions and use financial services responsibly')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('is temporarily or permanently impaired by personal circumstances,')}</li>
                                <li>{t('and who are therefore at increased risk of negative financial, legal or emotional consequences.')}</li>
                            </ul>
                            <p className="mt-2 font-semibold">{t('Possible factors:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('health restrictions (physical, mental, cognitive),')}</li>
                                <li>{t('life-changing events (death of a relative, separation, loss of employment, displacement, war),')}</li>
                                <li>{t('low financial resilience and high vulnerability (lack of savings, excessive debt),')}</li>
                                <li>{t('low financial literacy and lack of digital skills,')}</li>
                                <li>{t('addictions (e.g. gambling addiction),')}</li>
                                <li>{t('coercion, violence or influence by third parties (financial exploitation, blackmail).')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('3. Key principles')}</h3>
                            <p>{t('The directive is based on eight key principles:')}</p>
                            <ol className="list-decimal pl-5 mt-2 space-y-1">
                                <li><span className="font-bold">{t('Early detection')}</span>: {t('risks are identified as early as possible, as far as legally permissible and practically feasible.')}</li>
                                <li><span className="font-bold">{t('Proportionality')}</span>: {t('Measures are tailored to the individual case and the actual risk.')}</li>
                                <li><span className="font-bold">{t('Non-discrimination')}</span>: {t('risk leads to additional protection, not to unjustified discrimination.')}</li>
                                <li><span className="font-bold">{t('Transparency and comprehensibility')}</span>: {t('Products, risks and costs are explained in a clear, structured and comprehensible manner.')}</li>
                                <li className="text-xs text-neutral-400 list-none -ml-5 pl-5">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</li>
                                <li><span className="font-bold">{t('Protection from harm')}</span>: {t('The protection of the customer takes precedence over short-term business transactions.')}</li>
                                <li><span className="font-bold">{t('Self-determination')}</span>: {t('Vulnerable customers are empowered to make their own decisions, not disenfranchised.')}</li>
                                <li><span className="font-bold">{t('Confidentiality and data protection')}</span>: {t('Sensitive information is processed only to a limited extent, lawfully and in a protected manner.')}</li>
                                <li><span className="font-bold">{t('Documentation and accountability')}</span>: {t('Decisions and measures taken in dealing with vulnerable customers are documented in a comprehensible manner.')}</li>
                            </ol>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('4. Role of management')}</h3>
                            <p>{t('The management of SCANDIC FINANCE GROUP LIMITED is responsible for:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('establishing a binding framework for dealing with vulnerable customers,')}</li>
                                <li>{t('integrating this topic into the compliance organisation, risk management, product management and processes for preventing money laundering and terrorist financing,')}</li>
                                <li>{t('providing sufficiently qualified staff, technical systems and financial resources,')}</li>
                                <li>{t('establishing clear responsibilities (e.g. appointing a person responsible for the area of "vulnerable customers"),')}</li>
                                <li>{t('regular review and adjustment of the policy.')}</li>
                            </ul>
                            <p className="mt-2">{t('In this way, the management bears ultimate responsibility for ensuring that vulnerable customers are not overwhelmed, exploited or forced into unreasonable risks.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('5. Identification and handling in practice')}</h3>
                            <p>{t('Vulnerable customers can be identified by:')}</p>
                            <ol className="list-decimal pl-5 mt-2">
                                <li><span className="font-bold">{t('Self-disclosure')}</span>: {t('The person themselves states that they consider themselves vulnerable due to certain circumstances.')}</li>
                                <li><span className="font-bold">{t('Observable signs')}</span>: {t('Employees notice unusual behaviour, such as severe confusion, emotional overload, difficulty understanding or signs of pressure from third parties.')}</li>
                            </ol>
                            <p className="mt-2">{t('If a risk is suspected or confirmed, the following principles apply in particular:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Simplify communication,')}</li>
                                <li>{t('offer additional explanations and written summaries,')}</li>
                                <li>{t('Allow time for reflection before final decisions are made,')}</li>
                                <li className="text-xs text-neutral-400 list-none -ml-5 pl-5">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</li>
                                <li>{t('Avoid complex or particularly risky products.')}</li>
                                <li>{t('involve a second person in the discussion if necessary,')}</li>
                                <li>{t('document the situation in the system and escalate it to compliance and risk management in the event of increased risk.')}</li>
                            </ul>
                            <p className="mt-2">{t('If, despite all measures, fair and secure handling cannot be guaranteed, the business relationship may be rejected or terminated.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('6. Connection to risk, compliance and prevention of money laundering')}</h3>
                            <p>{t('The guideline is part of the overall governance and compliance framework of SCANDIC FINANCE GROUP LIMITED:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Vulnerable customers are particularly susceptible to abuse, for example as "front men" in connection with money laundering.')}</li>
                                <li>{t('Indications of abuse or illegal use of accounts must be consistently assessed within the framework of existing systems for the prevention of money laundering and terrorist financing and, if necessary, reported.')}</li>
                                <li>{t('Product development, digital platforms and risk management must ensure that vulnerable customers are not structurally disadvantaged or overwhelmed.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('7. Training and culture')}</h3>
                            <p>{t('The guideline will only be effective if:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Employees receive regular, practical training.')}</li>
                                <li>{t('there is a strong awareness that protecting vulnerable customers is a strategic goal,')}</li>
                                <li>{t('management consistently demonstrates that long-term integrity and customer protection are more important than short-term revenue.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-neutral-900 mt-8">{t('Part 2: Complete policy for vulnerable customers')}</h2>

                            <h3 className="font-bold mb-2 text-neutral-900">{t('1. Purpose, scope and principles')}</h3>

                            <h4 className="font-semibold mt-3 mb-1">{t('1.1 Purpose of the policy')}</h4>
                            <p>{t('The purpose of this policy is to')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('identify vulnerable customers at an early stage,')}</li>
                                <li>{t('take their special needs into account when providing financial, fiduciary, payment and investment services,')}</li>
                                <li className="text-xs text-neutral-400 list-none -ml-5 pl-5">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</li>
                                <li>{t('prevent abuse, exploitation, financial exploitation and poor decisions as far as possible,')}</li>
                                <li>{t('and to provide management with clear guidelines and decision-making criteria.')}</li>
                            </ul>
                            <p className="mt-2">{t('The guideline incorporates European Union standards, international consumer protection principles, requirements for the prevention of money laundering and terrorist financing, and elements of the Supply Chain Due Diligence Act insofar as labour and human rights aspects are concerned.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('1.2 Scope')}</h4>
                            <p>{t('The guideline applies to:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('all customers and potential customers who are natural persons,')}</li>
                                <li>{t('all entities and brands in the SCANDIC brand ecosystem,')}</li>
                                <li>{t('all employees, in particular those in')}
                                    <ul className="list-[circle] pl-5 mt-1">
                                        <li>{t('customer service and support,')}</li>
                                        <li>{t('the legal department, compliance function and risk management,')}</li>
                                        <li>{t('prevention of money laundering and terrorist financing,')}</li>
                                        <li>{t('customer service, helpdesk and service ticket processing,')}</li>
                                        <li>{t('product development and sales, including digital platforms.')}</li>
                                    </ul>
                                </li>
                            </ul>
                            <p className="mt-2">{t('It is aimed in particular at the management of SCANDIC FINANCE GROUP LIMITED, which is responsible for establishing, monitoring and further developing processes for dealing with vulnerable customers.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('1.3 Legal and regulatory framework')}</h4>
                            <p>{t('The guideline is based, among other things, on:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Consumer protection principles of the European Union and its Member States,')}</li>
                                <li>{t('fundamental freedoms and rights, in particular the Charter of Fundamental Rights of the European Union,')}</li>
                                <li>{t('Requirements for financial market regulation and the protection of customers of financial services,')}</li>
                                <li>{t('Data protection regulations, in particular the General Data Protection Regulation of the European Union,')}</li>
                                <li>{t('anti-discrimination regulations and human rights protection obligations,')}</li>
                                <li>{t('legal requirements for the prevention of money laundering and the financing of terrorism,')}</li>
                                <li>{t('international labour and human rights standards, in particular the core labour standards of the International Labour Organisation and')}</li>
                            </ul>
                            <p className="text-xs text-neutral-400">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</p>
                            <p>{t('the United Nations Guiding Principles on Business and Human Rights.')}</p>
                            <p className="mt-2">{t('If local regulations, for example in Hong Kong, the United Arab Emirates, the United Kingdom, Ukraine or the Federal Republic of Germany, impose stricter requirements, the stricter requirements shall always apply.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('2. Definition and categories of high-risk customers')}</h3>

                            <h4 className="font-semibold mt-3 mb-1">{t('2.1 Definition')}</h4>
                            <p>{t('A vulnerable customer is a natural person whose ability to protect their own interests, make informed decisions or use financial services responsibly is temporarily or permanently impaired by personal circumstances, and who is therefore at increased risk of adverse financial, legal or emotional consequences.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('2.2 Typical risk factors')}</h4>
                            <p>{t('Without this list being exhaustive, the following factors, among others, may contribute to vulnerability:')}</p>
                            <ol className="list-decimal pl-5 mt-2">
                                <li>
                                    <span className="font-bold">{t('Health')}</span>
                                    <ul className="list-[circle] pl-5 mt-1">
                                        <li>{t('Physical or mental disability,')}</li>
                                        <li>{t('chronic or acute illness,')}</li>
                                        <li>{t('cognitive impairments such as dementia, learning disabilities or neurological disorders.')}</li>
                                    </ul>
                                </li>
                                <li>
                                    <span className="font-bold">{t('Life events')}</span>
                                    <ul className="list-[circle] pl-5 mt-1">
                                        <li>{t('Death of a close relative,')}</li>
                                        <li>{t('separation, divorce or serious family conflicts,')}</li>
                                        <li>{t('loss of employment, insolvency or significant loss of income,')}</li>
                                        <li>{t('natural disasters, war, flight and displacement.')}</li>
                                    </ul>
                                </li>
                                <li>
                                    <span className="font-bold">{t('Resilience')}</span>
                                    <ul className="list-[circle] pl-5 mt-1">
                                        <li>{t('Limited ability to cope with financial or emotional shocks, for example no or only small financial reserves or high levels of debt,')}</li>
                                        <li>{t('Severe emotional strain, stress or exhaustion.')}</li>
                                    </ul>
                                </li>
                                <li>
                                    <span className="font-bold">{t('Capacity (ability to make independent decisions)')}</span>
                                    <ul className="list-[circle] pl-5 mt-1">
                                        <li>{t('limited financial literacy or lack of experience with financial products,')}</li>
                                        <li>{t('lack of digital skills or inability to use digital platforms safely and sensibly,')}</li>
                                    </ul>
                                </li>
                            </ol>
                            <p className="text-xs text-neutral-400">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</p>
                            <ul className="list-[circle] pl-10 mt-1">
                                <li>{t('limited reading, language or comprehension skills,')}</li>
                                <li>{t('low self-confidence and high levels of uncertainty when making financial decisions.')}</li>
                            </ul>
                            <ol start="5" className="list-decimal pl-5 mt-2">
                                <li>
                                    <span className="font-bold">{t('Addictions and addictive disorders')}</span>
                                    <ul className="list-[circle] pl-5 mt-1">
                                        <li>{t('Gambling addiction, shopping addiction or other forms of addiction,')}</li>
                                        <li>{t('Compulsive behaviours, such as excessive trading in financial instruments or irresponsible risk-taking')}</li>
                                        <li>{t('substance-related impairments, such as alcohol or drugs.')}</li>
                                    </ul>
                                </li>
                                <li>
                                    <span className="font-bold">{t('Violence, coercion or influence by third parties')}</span>
                                    <ul className="list-[circle] pl-5 mt-1">
                                        <li>{t('financial exploitation by relatives or other persons,')}</li>
                                        <li>{t('domestic violence, coercive situations or blackmail,')}</li>
                                        <li>{t('suspicion that a person is being misused as a "money courier" or "front man".')}</li>
                                    </ul>
                                </li>
                            </ol>

                            <h4 className="font-semibold mt-3 mb-1">{t('2.3 Effects on the use of financial services')}</h4>
                            <p>{t('Risks can manifest themselves in the following ways, among others:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('difficulties in understanding products and risks,')}</li>
                                <li>{t('impulsive or highly emotionally driven purchasing and investment decisions,')}</li>
                                <li>{t('increased susceptibility to fraud, deception and manipulation,')}</li>
                                <li>{t('technical barriers to using digital platforms,')}</li>
                                <li>{t('inability to understand contract terms, fees, risks and liability issues,')}</li>
                                <li>{t('repeated complaints, contradictory decisions or conspicuous transactions that indicate overload.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('3. Principles for dealing with vulnerable customers')}</h3>
                            <p>{t('The management is committed to the following basic principles:')}</p>
                            <ol className="list-decimal pl-5 mt-2 space-y-2">
                                <li>
                                    <span className="font-bold">{t('Early detection')}</span><br />
                                    {t('Where legally permissible and practically possible, risks should be identified at an early stage.')}
                                </li>
                                <li>
                                    <span className="font-bold">{t('Proportionality')}</span><br />
                                    {t('Measures are tailored to the individual situation of the customer and the specific risk.')}
                                </li>
                                <li>
                                    <span className="font-bold">{t('Non-discrimination')}</span><br />
                                    {t('Endangerment does not lead to unjustified discrimination, but to additional protection.')}
                                </li>
                                <li>
                                    <span className="font-bold">{t('Transparency and comprehensibility')}</span><br />
                                    {t('Information is provided in an appropriate form, in understandable language and in line with the customer\'s level of knowledge and education.')}
                                </li>
                                <li>
                                    <span className="font-bold">{t('Protection from harm')}</span><br />
                                    {t('The primary goal is to avoid excessive demands, unfair advantages and unreasonable risks as far as possible.')}
                                </li>
                                <li>
                                    <span className="font-bold">{t('Self-determination')}</span><br />
                                    {t('Vulnerable customers should be empowered to make their own informed decisions; incapacitation should be avoided.')}
                                </li>
                                <li>
                                    <span className="font-bold">{t('Confidentiality and data protection')}</span><br />
                                    {t('Sensitive information about the vulnerability is only processed and protected to the extent that is absolutely necessary.')}
                                </li>
                                <li>
                                    <span className="font-bold">{t('Documentation and accountability')}</span><br />
                                    {t('Decisions and measures taken in dealing with vulnerable customers shall be documented in a comprehensible manner.')}
                                </li>
                            </ol>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('4. Responsibility of management')}</h3>
                            <p>{t('The management of SCANDIC FINANCE GROUP LIMITED is responsible for:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('establishing a comprehensive framework for dealing with vulnerable customers,')}</li>
                                <li>{t('integrating the issue into')}
                                    <ul className="list-[circle] pl-5 mt-1">
                                        <li>{t('the compliance organisation,')}</li>
                                        <li>{t('risk management,')}</li>
                                        <li>{t('product control and product approval,')}</li>
                                        <li>{t('the processes for preventing money laundering and terrorist financing,')}</li>
                                    </ul>
                                </li>
                                <li>{t('the provision of sufficient human, technical and financial resources,')}</li>
                                <li>{t('the definition of clear roles and responsibilities, for example by appointing a person responsible for vulnerable customers within the compliance or risk department,')}</li>
                                <li>{t('regular monitoring, reporting and further development of the policy.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('5. Identification of vulnerable customers')}</h3>

                            <h4 className="font-semibold mt-3 mb-1">{t('5.1 Self-disclosure by customers')}</h4>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Customers are expressly encouraged to inform the company if they consider themselves to be at risk due to their personal circumstances.')}</li>
                                <li>{t('This can be done via customer service, a ticket system, email, telephone or during a personal or virtual consultation.')}</li>
                            </ul>
                            <p className="text-xs text-neutral-400">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Employees respond sensitively, respectfully and confidentially and initiate appropriate steps in accordance with the established processes.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('5.2 Observable indications')}</h4>
                            <p>{t('Employees are trained to look out for possible signs, such as:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('confused, contradictory or rapidly changing statements,')}</li>
                                <li>{t('obviously limited language or comprehension skills,')}</li>
                                <li>{t('repeated questions about simple matters,')}</li>
                                <li>{t('recognisable emotional exceptional situations such as crying, severe nervousness or feeling overwhelmed,')}</li>
                                <li>{t('signs of manipulation or pressure from third parties,')}</li>
                                <li>{t('unusual transaction patterns combined with clear uncertainty about their meaning.')}</li>
                            </ul>
                            <p className="mt-2">{t('No medical assessment is carried out; this is solely a business-related risk assessment for the protection of the customer.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('5.3 Data and internal systems')}</h4>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('To the extent permitted by law, internal systems may note that a customer requires special care, for example, "simplified language and more detailed explanations necessary".')}</li>
                                <li>{t('Health-related details or diagnoses are not recorded.')}</li>
                                <li>{t('Any storage of personal data requires a legal basis and is limited to what is necessary.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('6. Measures and processes for dealing with vulnerable customers')}</h3>

                            <h4 className="font-semibold mt-3 mb-1">{t('6.1 Principle of an individual approach')}</h4>
                            <p>{t('Each situation must be assessed individually. Possible measures include:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Adapting verbal and written communication to the customer\'s needs')}</li>
                                <li>{t('Providing additional written summaries with clear key messages')}</li>
                                <li>{t('Granting longer reflection periods before concluding a contract')}</li>
                                <li>{t('Avoiding particularly complex or high-risk products')}</li>
                                <li>{t('Involving a second employee as a witness and for quality assurance purposes')}</li>
                            </ul>
                            <p className="text-xs text-neutral-400">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Recommendation to involve a trusted person, such as a solicitor, guardian or close relative, if legally permissible and desired by the customer.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('6.2 Communication and documentation')}</h4>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Important discussions with vulnerable customers should, where permissible, be summarised or recorded in writing.')}</li>
                                <li>{t('Key risks, costs, conditions and termination options are explained in detail and in understandable language.')}</li>
                                <li>{t('Customers are expressly invited to ask questions and are given time to consider them.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('6.3 Assessment of the suitability and appropriateness of products')}</h4>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('In the case of products requiring intensive advice or involving high risk, such as complex financial instruments, leveraged products or certain crypto assets, suitability and appropriateness checks must be carried out with particular care.')}</li>
                                <li>{t('If there are reasonable doubts that the customer understands or can bear the risks, such products should not be recommended.')}</li>
                                <li>{t('In case of doubt, the following principle applies: protecting the customer takes precedence over concluding a transaction.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('6.4 Rejection or termination of business relationships')}</h4>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('If, despite all adjustments, the company cannot ensure that a vulnerable customer can be treated fairly, safely and appropriately, the establishment or continuation of the business relationship may be refused or terminated.')}</li>
                                <li>{t('Reasons for this may include:')}
                                    <ul className="list-[circle] pl-5 mt-1">
                                        <li>{t('clear indications that the person could suffer considerable damage as a result of the business relationship,')}</li>
                                        <li>{t('recognisable substantial pressure from third parties or exploitation,')}</li>
                                        <li>{t('use of the account or business relationship for illegal purposes, such as money laundering.')}</li>
                                    </ul>
                                </li>
                                <li>{t('Decisions must be documented in a comprehensible manner and explained to the customer, insofar as this is legally permissible and reasonable.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('7. Connection to compliance, risk management and prevention of money laundering')}</h3>
                            <p className="text-xs text-neutral-400">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('7.1 Prevention of money laundering and terrorist financing')}</h4>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Vulnerable customers are particularly susceptible to being misused by third parties for illegal purposes.')}</li>
                                <li>{t('Suspicious circumstances such as unusual transaction patterns, lack of knowledge about the origin or use of funds, or indications of pressure from third parties are assessed as part of the existing processes for the prevention of money laundering and terrorist financing and, if necessary, reported to the competent authorities.')}</li>
                                <li>{t('The vulnerability perspective is an important addition, but does not replace the legal obligations to prevent money laundering and terrorist financing.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('7.2 Risk management and product steering')}</h4>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('When developing and modifying products and digital platforms, the needs of vulnerable customers are systematically taken into account, for example through clear user guidance, mandatory risk warnings and appropriate waiting periods before final decisions are made.')}</li>
                                <li>{t('The risk function assesses whether products or processes could systematically disadvantage or overwhelm vulnerable customers and proposes any necessary adjustments.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('8. Cooperation with external support and advisory services')}</h3>

                            <h4 className="font-semibold mt-3 mb-1">{t('8.1 Reference to external support')}</h4>
                            <p>{t('Depending on their country of residence, vulnerable customers can be made aware of suitable external support services, for example:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Telephone and crisis services for people with suicidal thoughts, depression or anxiety')}</li>
                                <li>{t('Government or non-profit advice centres for debt and consumer issues')}</li>
                                <li>{t('Organisations that promote mental health')}</li>
                                <li>{t('specialist centres for dementia, visual impairments or hearing impairments.')}</li>
                            </ul>
                            <p className="mt-2">{t('The specific naming of organisations should be based on the country, language and legal framework of the customer. An internal list with contact details of suitable agencies can be kept as an appendix to the policy.')}</p>
                            <p className="text-xs text-neutral-400">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('8.2 Limits of the company\'s responsibility')}</h4>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Company employees do not provide medical, psychotherapeutic or legal advice.')}</li>
                                <li>{t('They are not permitted to make diagnoses or initiate treatments.')}</li>
                                <li>{t('They may only inform customers of the possibility of contacting qualified specialist agencies.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('9. Data protection and confidentiality')}</h3>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Information about a possible risk is particularly sensitive customer data and is only collected if it is necessary for the fair, secure and lawful provision of services.')}</li>
                                <li>{t('Such data is processed in accordance with the European Union\'s General Data Protection Regulation, applicable national data protection laws and internal data protection guidelines.')}</li>
                                <li>{t('The principle of data minimisation applies: only what is absolutely necessary for risk and protective measures is documented.')}</li>
                                <li>{t('Only those persons who absolutely need this information for their work have access to it.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('10. Training, awareness raising and corporate culture')}</h3>

                            <h4 className="font-semibold mt-3 mb-1">{t('10.1 Training')}</h4>
                            <p>{t('All relevant employees, particularly those in customer service, customer advisory services, the legal department, the compliance function, risk management, the prevention of money laundering and the prevention of terrorist financing, and the development of information systems, receive regular training on:')}</p>
                            <ul className="list-[circle] pl-5 mt-1">
                                <li>{t('Defining and identifying vulnerable customers')}</li>
                                <li>{t('Appropriate and respectful communication')}</li>
                                <li>{t('documentation, data protection and correct forwarding channels,')}</li>
                                <li>{t('interfaces for the prevention of money laundering, risk management and product control.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('10.2 Culture of protection')}</h4>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Management sets a clear tone from the top: protecting vulnerable customers is a strategic goal.')}</li>
                            </ul>
                            <p className="text-xs text-neutral-400">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Employees are encouraged to address uncertainties and, when in doubt, to take protective measures rather than ignoring risks due to sales or time constraints.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('11. Governance, reporting and continuous improvement')}</h3>

                            <h4 className="font-semibold mt-3 mb-1">{t('11.1 Responsibilities')}</h4>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Management may appoint a person or function responsible for the area of "vulnerable customers", typically within the compliance organisation, risk management or customer experience department.')}</li>
                                <li>{t('This function coordinates policies, training, monitoring and reporting.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('11.2 Reporting to management')}</h4>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Key metrics and findings, such as the number of escalated cases, complaints and rejected or terminated business relationships due to vulnerability, are reported regularly to management.')}</li>
                                <li>{t('Serious individual cases involving significant reputational, legal or customer risk must be reported immediately.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('11.3 Review and adjustment of the policy')}</h4>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('The policy is reviewed at least once a year and as required, for example following changes in legislation, the introduction of new products or unusual occurrences in practice.')}</li>
                                <li>{t('Adjustments shall be decided by the management of SCANDIC FINANCE GROUP LIMITED.')}</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('12. Entry into force')}</h3>
                            <p>{t('This policy shall enter into force upon resolution by the management of SCANDIC FINANCE GROUP LIMITED.')}</p>
                            <p>{t('It supplements and specifies the existing guidelines on:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Corporate governance and rules of procedure,')}</li>
                                <li>{t('Personnel and career policy,')}</li>
                                <li>{t('Compliance organisation and prevention of money laundering,')}</li>
                            </ul>
                            <p className="text-xs text-neutral-400">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Data protection and information security,')}</li>
                                <li>{t('human rights and environmental due diligence.')}</li>
                            </ul>

                            <div className="mt-8 pt-6 border-t border-neutral-200">
                                <p className="font-bold">{t('Drafted, signed and approved:')}</p>
                                <p>{t('The Board of Directors of SCANDIC FINANCE GROUP LIMITED')}</p>
                                <p>{t('Hong Kong, SAR - PRC, 1 December 2025')}</p>
                                <p className="mt-4"><span className="font-bold">{t('Legal representation:')}</span> {t('Clifford Chance, global law firm')}</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-neutral-900 mt-8">{t('Part 3: Internal process flow – customers at risk')}</h2>
                            <p className="font-bold text-center mb-4">{t('(for customer support and compliance)')}</p>
                            <p>{t('The following process flow serves as an internal manual for employees in customer support, customer advisory services, compliance and risk management.')}</p>
                            <p>{t('It is divided into:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Section A: Initial contact and processing in customer support,')}</li>
                                <li>{t('Section B: Escalation and processing by compliance and risk management,')}</li>
                                <li>{t('Section C: Decisions, implementation and follow-up.')}</li>
                            </ul>

                            <hr className="my-6 border-neutral-300" />

                            <h3 className="font-bold mb-2 text-neutral-900">{t('Section A: Initial contact in customer support')}</h3>

                            <h4 className="font-semibold mt-3 mb-1">{t('Step A1: Receipt of the enquiry')}</h4>
                            <p>{t('Triggers may include:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Ticket in the customer system,')}</li>
                                <li>{t('e-mail or written message,')}</li>
                                <li>{t('telephone call or video conference,')}</li>
                                <li>{t('Note from consulting or sales.')}</li>
                            </ul>
                            <p className="mt-2">{t('The support employee creates a process in the customer system and documents:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Date and time,')}</li>
                                <li>{t('Name of the customer,')}</li>
                                <li>{t('Communication channel (telephone, email, platform),')}</li>
                                <li>{t('brief description of the issue.')}</li>
                            </ul>
                            <p className="text-xs text-neutral-400">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('Step A2: Initial assessment – is there a potential risk?')}</h4>
                            <p>{t('The support employee checks whether there are any indications of a risk, for example:')}</p>
                            <ol className="list-decimal pl-5 mt-2">
                                <li>
                                    <span className="font-bold">{t('Self-disclosure by the customer:')}</span>
                                    <ul className="list-[circle] pl-5 mt-1">
                                        <li>{t('"I am ill and unable to work."')}</li>
                                        <li>{t('"I have just had a death in the family."')}</li>
                                        <li>{t('"I am completely overwhelmed."')}</li>
                                    </ul>
                                </li>
                                <li>
                                    <span className="font-bold">{t('Observable signs:')}</span>
                                    <ul className="list-[circle] pl-5 mt-1">
                                        <li>{t('Extreme confusion or repeated misunderstandings,')}</li>
                                        <li>{t('strong emotional reactions (crying, panic, anger due to being overwhelmed),')}</li>
                                        <li>{t('indications of influence from third parties ("my friend says I have to do this immediately"),')}</li>
                                        <li>{t('significant difficulties understanding digital interfaces or basic concepts.')}</li>
                                    </ul>
                                </li>
                            </ol>
                            <p className="mt-2 font-semibold">{t('Decision:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('If there are no indications: Process according to normal procedures.')}</li>
                                <li>{t('If there are indications or the customer expresses concern: continue with step A3.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('Step A3: respectful enquiry and awareness raising')}</h4>
                            <p>{t('The support employee:')}</p>
                            <ol className="list-decimal pl-5 mt-2">
                                <li>{t('thanks the customer for their trust and confirms that the situation is being taken seriously;')}</li>
                                <li>
                                    {t('gently asks whether special support is desired, for example:')}
                                    <ul className="list-[circle] pl-5 mt-1">
                                        <li>{t('"Would you like me to explain the next steps more slowly and in more detail?"')}</li>
                                        <li>{t('"Would you like a written summary after our conversation?"')}</li>
                                        <li>{t('"Would you like to have a trusted person join the conversation?"')}</li>
                                    </ul>
                                </li>
                            </ol>
                            <p className="mt-2">{t('The aim is to clarify whether the case should be marked internally as "at risk" and treated with increased care.')}</p>
                            <p className="text-xs text-neutral-400">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('Step A4: Adjusting communication')}</h4>
                            <p>{t('If a risk is apparent or has been confirmed, the following applies:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Speak slowly, clearly and without unnecessary technical jargon.')}</li>
                                <li>{t('Explain contexts in short, understandable sentences.')}</li>
                                <li>{t('Check understanding at the end, for example by asking:')}
                                    <ul className="list-[circle] pl-5 mt-1">
                                        <li>{t('"Can you please briefly summarise what we have discussed in your own words?"')}</li>
                                    </ul>
                                </li>
                                <li>{t('Do not force decisions under time pressure, but actively offer time for consideration.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('Step A5: Documentation in the system')}</h4>
                            <p>{t('The support employee documents the following in the customer system:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('that there are indications of a risk,')}</li>
                                <li>{t('what form of support has been offered and, if applicable, agreed upon (written summary, time to consider, consultation with a trusted person, reference to external help),')}</li>
                                <li>{t('whether the customer agrees that increased care should be taken internally.')}</li>
                            </ul>
                            <p className="mt-2">{t('No diagnoses or detailed health information are stored, only a note that special care is required when dealing with the customer.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('Step A6: Decision on escalation to compliance and risk management')}</h4>
                            <p>{t('If particularly sensitive situations arise, for example:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('suspicion of external control, blackmail or exploitation,')}</li>
                                <li>{t('indications of severe addiction in connection with investments,')}</li>
                                <li>{t('obviously irresponsible risk behaviour despite repeated warnings,')}</li>
                                <li>{t('suspicion that the business relationship is being used for illegal purposes, such as money laundering,')}</li>
                            </ul>
                            <p className="mt-2">{t('then:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('the support employee creates an internal note,')}</li>
                            </ul>
                            <p className="text-xs text-neutral-400">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('marks the case in the system as "Escalation to Compliance and Risk Management",')}</li>
                                <li>{t('forwards the case to the responsible department with a clear, factual summary.')}</li>
                            </ul>
                            <p className="mt-2">{t('The customer is informed that the case is being forwarded internally for further review, without disclosing any specific suspicions.')}</p>

                            <hr className="my-6 border-neutral-300" />

                            <h3 className="font-bold mb-2 text-neutral-900">{t('Section B: Processing by Compliance and Risk Management')}</h3>

                            <h4 className="font-semibold mt-3 mb-1">{t('Step B1: Acceptance and registration of the escalated case')}</h4>
                            <p>{t('The responsible department (Compliance or Risk Management):')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('reviews the information provided by Support,')}</li>
                                <li>{t('If necessary, it draws on transaction data, contract documents and previous communications,')}</li>
                                <li>{t('creates a separate process for internal review.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('Step B2: Risk analysis')}</h4>
                            <p>{t('The following questions must be examined and documented:')}</p>
                            <ol className="list-decimal pl-5 mt-2">
                                <li>{t('Is there a specific risk to the customer, or is this sufficiently probable?')}</li>
                                <li>{t('Are there any indications of abuse or pressure from third parties?')}</li>
                                <li>{t('Are there any indications of money laundering, fraud or other criminal activities?')}</li>
                                <li>{t('Are the product portfolio currently in use or the intended transactions compatible with the customer\'s situation?')}</li>
                                <li>{t('Is there an increased reputational or legal risk for the company?')}</li>
                            </ol>
                            <p className="mt-2">{t('The assessment is carried out in accordance with the guidelines and existing internal risk and compliance requirements.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('Step B3: Determination of appropriate measures')}</h4>
                            <p>{t('Based on the analysis, measures are proposed, for example:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('Mandatory detailed consultation with documentation (e.g. consultation record)')}</li>
                                <li>{t('restrictions on certain products or transactions for the customer,')}</li>
                            </ul>
                            <p className="text-xs text-neutral-400">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('introduction of waiting periods or additional confirmation steps prior to high-risk transactions,')}</li>
                                <li>{t('recommendation to review the entire business relationship in more detail,')}</li>
                                <li>{t('initiation of review and reporting processes in connection with money laundering, if necessary.')}</li>
                            </ul>
                            <p className="mt-2">{t('All proposed measures are documented in the file with reasons.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('Step B4: Consultation with management in serious cases')}</h4>
                            <p>{t('In significant cases, for example:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('imminent significant financial damage to the customer,')}</li>
                                <li>{t('high risk of criminal activity,')}</li>
                                <li>{t('significant reputational risk for the company,')}</li>
                            </ul>
                            <p className="mt-2">{t('the compliance or risk department informs the management and submits a recommendation, such as:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('continuation of the business relationship with strict conditions,')}</li>
                                <li>{t('temporary suspension of certain functions,')}</li>
                                <li>{t('Proper termination of the business relationship.')}</li>
                            </ul>
                            <p className="mt-2">{t('Management makes the final decision on this basis.')}</p>

                            <hr className="my-6 border-neutral-300" />

                            <h3 className="font-bold mb-2 text-neutral-900">{t('Section C: Decisions, implementation and follow-up')}</h3>

                            <h4 className="font-semibold mt-3 mb-1">{t('Step C1: Decision and operational implementation')}</h4>
                            <p>{t('The decision made (continuation, restriction or termination of the business relationship) will be:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('documented,')}</li>
                                <li>{t('implemented in the relevant systems,')}</li>
                                <li>{t('communicated to the departments concerned, in particular customer support, customer advisory services and, where applicable, other internal departments.')}</li>
                            </ul>

                            <h4 className="font-semibold mt-3 mb-1">{t('Step C2: Communication with the customer')}</h4>
                            <p>{t('To the extent legally permissible and reasonable, the customer will be')}</p>
                            <p className="text-xs text-neutral-400">{t('Richtlinie für gefährdete Kundinnen und Kunden en-GB.docx')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('informed in an understandable manner about the essential consequences for the business relationship,')}</li>
                                <li>{t('addressed respectfully and without technical jargon,')}</li>
                                <li>{t('not confronted with criminal assessments, unless there is a legal obligation to disclose.')}</li>
                            </ul>
                            <p className="mt-2">{t('The aim is to achieve transparency within the scope of legal possibilities, while at the same time complying with ongoing audits and statutory reporting obligations.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('Step C3: Documentation and storage')}</h4>
                            <p>{t('The following is documented:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('what triggered the case (initial situation),')}</li>
                                <li>{t('what indications of risk there were,')}</li>
                                <li>{t('what measures customer support took,')}</li>
                                <li>{t('the assessment made by compliance and risk management,')}</li>
                                <li>{t('what decision was made,')}</li>
                                <li>{t('what changes were made to systems or processes.')}</li>
                            </ul>
                            <p className="mt-2">{t('Documents are stored in accordance with statutory retention periods and internal guidelines.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('Step C4: Feedback in training and process improvement')}</h4>
                            <p>{t('Findings from real cases are incorporated into:')}</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>{t('future training content for customer support, consulting, compliance and risk management,')}</li>
                                <li>{t('the assessment of whether certain products, communication channels or system interfaces place an excessive burden on vulnerable customers,')}</li>
                                <li>{t('the regular revision of the guideline and process flow.')}</li>
                            </ul>

                            <div className="mt-8 pt-6 border-t border-neutral-200">
                                <p className="font-bold">{t('Written, signed and approved:')}</p>
                                <p>{t('The Board of Directors of SCANDIC FINANCE GROUP LIMITED')}</p>
                                <p>{t('Hong Kong, SAR - PRC, 1 December 2025')}</p>
                                <p className="mt-4"><span className="font-bold">{t('Legal representation:')}</span> {t('Clifford Chance, global law firm')}</p>
                            </div>

                        </section>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default VulnerableCustomersPolicy;
