import React from 'react';
import PublicLayout from '../../components/layout/PublicLayout';

const TermsOfUse = () => {
    const t = (s) => s;

    return (
        <PublicLayout>
            <div className="bg-white py-8 text-neutral-800">
                <div className="container-padding max-w-4xl mx-auto text-sm leading-relaxed">

                    <h1 className="text-2xl font-bold mb-4 text-center text-neutral-900">{t('TERMS OF USE')}</h1>
                    <h2 className="text-xl font-bold mb-6 text-center text-neutral-900">{t('of')}</h2>
                    <h2 className="text-xl font-bold mb-6 text-center text-neutral-900">{t('SCANDIC FINANCE GROUP LIMITED')}</h2>

                    <div className="space-y-4">
                        <section>
                            <div className="bg-neutral-50 p-4 rounded border border-neutral-100 my-2 space-y-2">
                                <div>
                                    <p>{t('Room 10, Unit A, 7/F')}</p>
                                    <p>{t('Harbour Sky, 28 Sze Shan Street')}</p>
                                    <p>{t('Yau Tong, Hong Kong / SAR - PRC')}</p>
                                    <p>{t('Telephone HQ Switzerland, Zurich: +41 44 7979 99 – 85')}</p>
                                    <p>{t('Email:')} <a href="mailto:Office@ScandicFinance.Global" className="text-primary-600 hover:underline">Office@ScandicFinance.Global</a></p>
                                    <p>{t('Commercial register:')} <a href="https://hkg.databasesets.com/en/gongsimingdan/number/79325926" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">https://hkg.databasesets.com/en/gongsimingdan/number/79325926</a></p>
                                </div>

                                <div>
                                    <p className="font-bold">{t('In cooperation with:')}</p>
                                    <p className="font-bold">{t('SCANDIC ASSETS FZCO')}</p>
                                    <p>{t('Dubai Silicon Oasis DDP')}</p>
                                    <p>{t('Building A1/A2')}</p>
                                    <p>{t('Dubai, 342001 / United Arab Emirates')}</p>
                                    <p>{t('Telephone: +971 56 929 86 – 90')}</p>
                                    <p>{t('Email:')} <a href="mailto:Info@ScandicAssets.dev" className="text-primary-600 hover:underline">Info@ScandicAssets.dev</a></p>
                                    <p>{t('Commercial register:')} <a href="https://dieza.my.site.com/diezaqrverify/validateqr?id=001NM00000K2u4FYAR&masterCode=CERTIFICATE_OF_FORMATION&relatedToId=a1MNM000004ddaI2AQ" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline break-all">https://dieza.my.site.com/diezaqrverify/validateqr...</a></p>
                                </div>

                                <div>
                                    <p className="font-bold">{t('in cooperation with:')}</p>
                                    <p className="font-bold">{t('SCANDIC TRUST GROUP LLC')}</p>
                                    <p>{t('IQ Business Centre, Bolsunovska Street 13 – 15')}</p>
                                    <p>{t('01014 Kyiv / Ukraine')}</p>
                                    <p>{t('HQ telephone United Kingdom, London: +44 7470 86 92 – 60')}</p>
                                    <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                                    <p>{t('Email:')} <a href="mailto:Info@ScandicTrust.com" className="text-primary-600 hover:underline">Info@ScandicTrust.com</a></p>
                                    <p>{t('Commercial register extract:')} <a href="https://LegierGroup.com/Scandic_Trust_Group_LLC_Extract_from_the_Unified_State_Register.pdf" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline break-all">https://LegierGroup.com/Scandic_Trust_Group_LLC...</a></p>
                                </div>

                                <div>
                                    <p className="font-bold">{t('In cooperation with:')}</p>
                                    <p className="font-bold">{t('LEGIER BETEILIGUNGS GMBH')}</p>
                                    <p>{t('Kurfürstendamm 14')}</p>
                                    <p>{t('10719 Berlin / Federal Republic of Germany')}</p>
                                    <p>{t('Berlin Commercial Register: HRB 57837')}</p>
                                    <p>{t('Telephone: +49 (0) 30 9921134 – 69')}</p>
                                    <p>{t('Email:')} <a href="mailto:Office@LegierGroup.com" className="text-primary-600 hover:underline">Office@LegierGroup.com</a></p>
                                    <p>{t('Commercial register:')} <a href="https://www.handelsregister.de/rp_web/normalesuche/welcome.xhtml" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">https://www.handelsregister.de/rp_web/normalesuche/welcome.xhtml</a></p>
                                </div>

                                <div className="pt-2 border-t border-neutral-200">
                                    <p className="font-bold">{t('Legal notice:')}</p>
                                    <p>{t('SCANDIC ASSETS FZCO, LEGIER Limited Liability Company and SCANDIC TRUST GROUP Limited Liability Company act as non-operational service providers (service companies without customer business). All operational and responsible activities in connection with the services described below are carried out exclusively by SCANDIC FINANCE GROUP LIMITED, Hong Kong, Special Administrative Region of the People\'s Republic of China.')}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('0. Scope, brand ecosystem and purpose of the terms of use')}</h3>
                            <p>{t('(1) These Terms of Use govern the use of all online platforms, applications, interfaces (application programming interfaces), financial, asset management, custody, trading and other services in connection with digital assets and traditional assets (hereinafter collectively referred to as "SCANDIC Services" or "Platform").')}</p>
                            <p>{t('(2) These Terms of Use apply to the SCANDIC brand ecosystem, in particular to the following brands and services:')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                            <ul className="list-none pl-0 space-y-1 my-2 font-medium">
                                <li>- {t('LEGIER GROUP')}</li>
                                <li>- SCANDIC SEC</li>
                                <li>- SCANDIC FLY</li>
                                <li>- SCANDIC PAY</li>
                                <li>- SCANDIC COIN</li>
                                <li>- SCANDIC CARS</li>
                                <li>- SCANDIC DATA</li>
                                <li>- SCANDIC SETUP</li>
                                <li>- SCANDIC TRUST</li>
                                <li>- SCANDIC CARDS</li>
                                <li>- SCANDIC ESTATE</li>
                                <li>- SCANDIC YACHTS</li>
                                <li>- SCANDIC HEALTH</li>
                                <li>- SCANDIC FINANCE{t(',')}</li>
                            </ul>
                            <p>{t('as well as for all structures held or supported by LEGIER Beteiligungs Gesellschaft mit beschränkter Haftung in the media and investment sector, insofar as they support or promote financial, fiduciary, payment or investment services.')}</p>
                            <p className="mt-2">{t('(3) These Terms of Use incorporate European Union (EU) standards, international compliance requirements and applicable elements of the Supply Chain Due Diligence Act of the Federal Republic of Germany (LkSG), insofar as they are relevant. The mandatory law of the respective jurisdiction concerned shall always take precedence.')}</p>
                            <p className="mt-2">{t('(4) By registering a customer account, accessing the platform and/or using SCANDIC services, you accept these Terms of Use in their current version as binding for you.')}</p>
                            <p className="mt-2">{t('(5) "You" and "your" refer to any natural or legal person who accesses the platform or uses SCANDIC services. "We", "us" and "our" refer to SCANDIC FINANCE GROUP LIMITED, including its legally permitted affiliates and contracted service providers.')}</p>
                            <p className="mt-2">{t('(6) Last updated: 1 December 2025.')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('1. Subject matter of the contract and legal nature of SCANDIC services')}</h3>
                            <p>{t('(1) SCANDIC services include, but are not limited to:')}</p>
                            <p>{t('a) Provision of a technical infrastructure for initiating, displaying and, where applicable, processing transactions with digital assets (e.g. crypto tokens, stablecoins, other tokenised assets) and, where offered, with traditional assets;')}</p>
                            <p>{t('b) Custody and management of digital assets on behalf of users by SCANDIC FINANCE GROUP LIMITED or carefully selected third-party custodians;')}</p>
                            <p>{t('c) Functions for transferring, depositing and withdrawing digital assets;')}</p>
                            <p>{t('d) Products offered where applicable, such as savings, yield or staking programmes, structured products, credit and margin functions, derivatives and other specialised financial instruments related to digital assets;')}</p>
                            <p>{t('e) Provision of information, analysis and communication services (e.g. chat and support functions).')}</p>
                            <p className="mt-2">{t('(2) SCANDIC services are provided exclusively within the scope of these Terms of Use and any supplementary product or special terms and conditions. There is no obligation to offer or permanently maintain certain services. We are entitled to adjust, expand or restrict the scope and type of services offered at any time, unless this is contrary to mandatory legal requirements.')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                            <p className="mt-2">{t('(3) SCANDIC FINANCE GROUP LIMITED is not a bank within the meaning of any jurisdiction in the world, nor is it a securities firm or investment advisor, unless otherwise specified in a particular jurisdiction with explicit reference to the relevant licence and supervision and communicated separately. Insofar as regulated services are provided, this is done exclusively within the relevant regulatory framework of the respective competent supervisory authority.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('2. Acceptance of the Terms of Use')}</h3>
                            <p>{t('(1) By clicking on the corresponding confirmation box ("I agree"), by registering a customer account, by using the platform or by using a SCANDIC service, you declare that you:')}</p>
                            <p>{t('a) have read, understood and accepted these Terms of Use in full,')}</p>
                            <p>{t('b) wish to be legally bound by these Terms of Use,')}</p>
                            <p>{t('c) have taken note of all additional documents and guidelines referred to in these Terms of Use (e.g. privacy policy, risk disclosure, product terms and conditions).')}</p>
                            <p className="mt-2">{t('(2) If you do not understand or accept these Terms of Use, you may not register, open a customer account or use any SCANDIC services.')}</p>
                            <p className="mt-2">{t('(3) Additional product- or country-specific terms and conditions may apply to individual SCANDIC services. In the event of any conflict, mandatory legal requirements shall take precedence; otherwise, more specific product terms and conditions shall take precedence over these general Terms of Use.')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('3. Eligibility and KYC/AML requirements')}</h3>
                            <p>{t('(1) Only persons or organisations who meet the following criteria are eligible to use SCANDIC services:')}</p>
                            <p>{t('a) are natural persons at least 18 years of age and have full legal capacity;')}</p>
                            <p>{t('b) are duly established and represented as a legal entity, company, fund or other organisation under applicable law;')}</p>
                            <p>{t('c) are fully authorised to enter into these Terms of Use on their own behalf or on behalf of the organisation they represent;')}</p>
                            <p>{t('d) have not already been excluded or blocked from using SCANDIC services;')}</p>
                            <p>{t('e) are not subject to any sanctions, embargoes or other restrictions that would prohibit the use of SCANDIC services under applicable law;')}</p>
                            <p>{t('f) are not located in or using a jurisdiction where access to SCANDIC services is prohibited or only possible with a licence that is not available.')}</p>
                            <p className="mt-2">{t('(2) SCANDIC FINANCE GROUP LIMITED operates in accordance with internationally recognised principles for the prevention of money laundering, terrorist financing and sanctions evasion (KYC – Know Your Customer / KYB – Know Your Business / Anti-Money Laundering, AML for short). To this end, we are entitled and, in some cases, obliged to do the following before and during the business relationship:')}</p>
                            <p>{t('a) request identity and authentication documents (e.g. copy of ID card, extract from the commercial register),')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                            <p>{t('b) obtain information on beneficial owners, the origin of funds, business purpose and risk profile,')}</p>
                            <p>{t('c) monitor and analyse transactions and report any suspected illegal activities,')}</p>
                            <p>{t('d) temporarily block accounts or terminate business relationships if required by law or necessary to reduce risk.')}</p>
                            <p className="mt-2">{t('(3) You undertake to provide all information requested as part of the identity verification process truthfully, completely and up to date, and to notify us immediately of any changes. Incomplete or inaccurate information may result in the rejection, suspension or termination of the business relationship.')}</p>
                            <p className="mt-2">{t('(4) We are entitled to adjust our eligibility criteria at any time. To the extent legally possible and reasonable, we will notify you of any significant changes in advance in an appropriate manner.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('4. Communication with SCANDIC FINANCE GROUP LIMITED')}</h3>
                            <p>{t('(1) Further information on our offers can be found on our official websites and in the information documents provided.')}</p>
                            <p>{t('(2) For enquiries, feedback or complaints, you can use the following contact details in particular:')}</p>
                            <p>{t('- Email:')} <a href="mailto:Office@ScandicFinance.Global" className="text-primary-600 hover:underline">Office@ScandicFinance.Global</a></p>
                            <p className="mt-2">{t('(3) We will contact you using the contact details stored in your customer account (e.g. e-mail, SMS, telephone, in-app message). You are obliged to keep these contact details up to date. A message sent to the last address you provided is deemed to have been received.')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                            <p className="mt-2">{t('(4) Electronic communication may be disrupted, delayed or misdirected for technical or network-related reasons. We accept no liability for damages resulting from typical risks of electronic communication (e.g. delayed or lost emails), unless there is gross negligence or intent on our part.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('5. Customer account, access data and security')}</h3>
                            <p>{t('(1) In order to use SCANDIC services, it is usually necessary to open a customer account. There is no entitlement to open or maintain an account.')}</p>
                            <p className="mt-2">{t('(2) You undertake to treat your access data (in particular user names, passwords, two-factor authentication, recovery codes) as strictly confidential, to keep it safe and not to make it accessible to any third party.')}</p>
                            <p className="mt-2">{t('(3) Any action taken on the platform using your valid access data will be attributed to you unless you can prove that unauthorised access occurred through no fault of your own and that you have taken all reasonable security measures.')}</p>
                            <p className="mt-2">{t('(4) You are obliged to inform us immediately if you suspect that an unauthorised third party has gained access to your access data or your customer account. We are entitled to temporarily block access in order to prevent damage.')}</p>
                            <p className="mt-2">{t('(5) SCANDIC FINANCE GROUP LIMITED takes appropriate organisational and technical measures to protect its systems and')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                            <p>{t('digital assets. Nevertheless, given the nature of digital technologies, absolute protection against cyber attacks, system failures and security incidents cannot be guaranteed.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('6. Fees, charges and calculations')}</h3>
                            <p>{t('(1) Fees and charges may apply for the use of certain SCANDIC services (e.g. trading fees, custody fees, network and transaction fees, interest or financing fees). The applicable fee structure is published on the platform or in specific product terms and conditions.')}</p>
                            <p className="mt-2">{t('(2) By using the relevant service, you authorise us to deduct any fees and charges due directly from the assets available in your customer account. If the assets in a particular currency are insufficient, we are entitled to exchange other assets held by you at market conditions in order to settle the debt.')}</p>
                            <p className="mt-2">{t('(3) All calculations made by us (e.g. settlements of fees, interest rates, income) shall be deemed binding and final, unless there is an obvious error or mandatory legal provisions stipulate otherwise.')}</p>
                            <p className="mt-2">{t('(4) We are entitled to adjust fees and charges. You will be notified of any changes in an appropriate manner before they take effect, insofar as this is legally required.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('7. Chat, support and communication services')}</h3>
                            <p>{t('(1) We may provide you with an interactive online chat service through which you can communicate with our support team and/or automated systems (e.g. chatbots). Where required by law, we will disclose when automated communication partners are involved.')}</p>
                            <p className="mt-2">{t('(2) Content from the chat service may be stored, evaluated and used for quality, training and documentation purposes, insofar as this is permitted under data protection law and complies with our data protection regulations.')}</p>
                            <p className="mt-2">{t('(3) User chats may be offered in which you can communicate with other users. In such cases, you are solely responsible for the content of your messages.')}</p>
                            <p className="mt-2 font-semibold">{t('(4) In particular, it is prohibited to:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('disseminating offensive, discriminatory, defamatory or obscene content,')}</li>
                                <li>{t('promoting or glorifying violence, hatred, extremism or criminal acts,')}</li>
                                <li>{t('disseminating market-manipulative, misleading or false information about investment or market movements,')}</li>
                                <li>{t('deceiving, threatening or harassing other users.')}</li>
                            </ul>
                            <p className="mt-2">{t('(5) Violations may result in the immediate termination of a chat session, warnings, the blocking or termination of the customer account, and reporting to the relevant authorities.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('8. General risk warning regarding digital assets and financial products')}</h3>
                            <p className="font-bold text-red-600">{t('Important note:')}</p>
                            <p className="font-bold text-red-600 mb-2">{t('Trading, holding and investing in digital assets involves significant risks. You may lose some or all of your invested capital. You should only invest funds that you can afford to lose, both financially and psychologically.')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('(1) No investment, legal or tax advice')}</h4>
                            <p>{t('a) SCANDIC FINANCE GROUP LIMITED does not provide individual investment advice, legal advice or tax advice within the scope of these Terms of Use.')}</p>
                            <p>{t('b) The information we provide (e.g. market information, analyses, research notes, white papers, blogs) is of a general nature only and is not a substitute for individual advice from qualified third parties (e.g. tax advisors, solicitors, investment advisors).')}</p>
                            <p>{t('c) You are solely responsible for your decisions regarding the purchase, holding, sale or other transactions involving digital or traditional assets.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('(2) Market and price risk')}</h4>
                            <p>{t('a) Digital assets are subject to extreme price fluctuations in some cases. The market can rise or fall sharply within a very short period of time.')}</p>
                            <p>{t('b) Past performance is not a reliable indicator of future developments.')}</p>
                            <p>{t('c) A total loss of the capital invested is possible.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('(3) Liquidity risk')}</h4>
                            <p>{t('a) There may be no liquid market for certain digital assets. It may therefore be difficult or impossible to close a position at a price that suits you at short notice.')}</p>
                            <p>{t('b) Liquidity may be significantly restricted during periods of market stress.')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('(4) Counterparty and third-party risk')}</h4>
                            <p>{t('a) Third parties may be involved when using SCANDIC services, such as payment service providers, banks, custodians, exchanges or liquidity providers.')}</p>
                            <p>{t('b) Performance disruptions or failures on the part of such third parties (e.g. insolvency, technical disruptions, freezing of accounts) may lead to delays, losses or limited availability of your assets.')}</p>
                            <p>{t('c) We select service providers carefully, but cannot completely rule out the risk of third-party failures.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('(5) Technological and security risks')}</h4>
                            <p>{t('a) Blockchain networks, smart contracts and digital infrastructures may contain errors, security vulnerabilities, hacks, protocol errors or unexpected behaviour.')}</p>
                            <p>{t('b) Cyber attacks, phishing, malware, ransomware or other attacks may result in the loss of private keys, access data or assets.')}</p>
                            <p>{t('c) We take appropriate security measures, but no platform can guarantee absolute security.')}</p>
                            <p className="font-semibold">{t('You are obliged to take your own security measures (two-factor authentication, secure passwords, secure end devices, etc.).')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('(6) Legal and regulatory risks')}</h4>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                            <p>{t('a) The legal status of many digital assets has not yet been conclusively clarified in numerous jurisdictions or is subject to ongoing changes.')}</p>
                            <p>{t('b) Changes in legislation, regulatory measures or bans may affect or restrict the usability, value and transferability of digital assets and the provision of certain SCANDIC services.')}</p>
                            <p>{t('c) In some countries, digital assets may not be recognised as property in the civil law sense, which may have an impact on legal protection and the enforceability of claims.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('(7) Tax risks')}</h4>
                            <p>{t('a) Income, profits or transactions involving digital assets may have tax consequences (e.g. income tax, corporation tax, value added tax).')}</p>
                            <p>{t('b) You are solely responsible for the correct tax declaration and payment of any taxes.')}</p>
                            <p>{t('c) We do not provide tax advice and accept no responsibility for the tax consequences of your transactions.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('(8) Risks associated with leveraged, margin and derivative products')}</h4>
                            <p>{t('a) Leveraged products (e.g. margin trading, futures, options or other derivatives) carry a particularly high risk of loss. Even small market movements can trigger disproportionately large losses.')}</p>
                            <p>{t('b) Margin calls may occur; you may lose more than your initial capital investment.')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                            <p>{t('c) If you use margin or derivative products, you are obliged to monitor open positions and margin requirements on an ongoing basis.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('(9) Risks of staking, income and interest products')}</h4>
                            <p>{t('a) Products in which digital assets are "staked", lent or used to generate income (e.g. income accounts, lending programmes, on-chain staking, off-chain staking, "earn" products) are subject to additional risks, including:')}</p>
                            <ul className="list-disc pl-5">
                                <li>{t('Protocol risks (e.g. slashing, protocol errors, forks),')}</li>
                                <li>{t('Counterparty risks (default of borrowers or protocols),')}</li>
                                <li>{t('Liquidity risks (delays in redemptions, lock-up periods),')}</li>
                                <li>{t('Market volatility during lock-up or holding periods.')}</li>
                            </ul>
                            <p>{t('b) Yield and interest rate information is generally indicative, variable and not guaranteed. There is no entitlement to specific returns unless this is expressly and legally guaranteed.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('(10) Risks of stablecoins and de-pegging')}</h4>
                            <p>{t('a) Stablecoins are designed to be pegged to a reference value (e.g. a government currency). Nevertheless, there is a risk that this pegging cannot be maintained for market, issuer or regulatory reasons.')}</p>
                            <p>{t('b) Decoupling can lead to significant price movements, liquidity bottlenecks, increased margin requirements and losses.')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                            <p>{t('c) The stability of stablecoins depends on the creditworthiness, risk management and regulation of the issuers. A default or serious disruption at the issuer can massively affect the value of the stablecoin.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('(11) On-chain yields and decentralised finance (DeFi) applications')}</h4>
                            <p>{t('a) If your assets are invested in decentralised finance (DeFi) protocols, smart contracts or other on-chain applications via our services, there are additional protocol, smart contract, governance and liquidity risks.')}</p>
                            <p>{t('b) Such protocols are often subject to no or only limited government supervision. Losses due to hacks, exploits or malfunctions may be permanent.')}</p>

                            <h4 className="font-semibold mt-3 mb-1">{t('(12) Round-the-clock markets and monitoring risk')}</h4>
                            <p>{t('Markets for digital assets are generally open 24 hours a day, seven days a week. Significant market movements can occur even when you are not actively monitoring your positions. This can lead to unexpected gains, but also to significant losses.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('9. User obligations and conduct')}</h3>
                            <p>{t('(1) You agree to use SCANDIC services only in accordance with applicable laws and these Terms of Use. In particular, it is prohibited to:')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                            <p>{t('a) using the platform for money laundering, terrorist financing, sanctions evasion, fraud or other illegal purposes;')}</p>
                            <p>{t('b) providing false information about yourself, your organisation, beneficial owners or the origin of funds;')}</p>
                            <p>{t('c) circumventing technical protection measures, access controls or security mechanisms;')}</p>
                            <p>{t('d) perform automated queries or high-frequency access without our prior written consent;')}</p>
                            <p>{t('e) infringe the rights of third parties (e.g. copyrights, trademark rights or personal rights).')}</p>
                            <p className="mt-2">{t('(2) You are obliged to keep your access data secret, to protect your end devices and to install security updates promptly.')}</p>
                            <p className="mt-2">{t('(3) You must notify us immediately of any unauthorised use of your account, security breaches, suspected fraud or misuse.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('10. Intellectual property')}</h3>
                            <p>{t('(1) All content on the platform (e.g. software, source code, designs, logos, trademarks, texts, graphics, databases) is protected by copyright, trademark or other intellectual property rights and, unless otherwise stated, is the property of SCANDIC FINANCE GROUP LIMITED or third-party licensors.')}</p>
                            <p>{t('(2) You are granted a non-exclusive, non-transferable, revocable right to use the platform and the content provided exclusively within the scope of these Terms of Use and only for the intended purpose.')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                            <p>{t('(3) Any reproduction, editing, distribution, public disclosure or other use beyond the intended use is not permitted without our prior written consent.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('11. Data protection')}</h3>
                            <p>{t('(1) The protection of your personal data is important to us. Personal data is processed exclusively in accordance with the applicable data protection legislation (e.g. the General Data Protection Regulation of the European Union, the data protection law of the Hong Kong Special Administrative Region, where applicable).')}</p>
                            <p className="mt-2">{t('(2) Details on the processing of personal data, your rights as a data subject and how to contact the data protection officer of the Special Administrative Region of the People\'s Republic of China can be found in our separate privacy policy, which forms part of these Terms of Use.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('12. Liability and limitation of liability')}</h3>
                            <p>{t('(1) We shall be liable without limitation for damages resulting from injury to life, limb or health caused by intentional or grossly negligent breach of duty by us or our legal representatives or vicarious agents.')}</p>
                            <p className="mt-2">{t('(2) We shall only be liable for other damages in cases of intent and gross negligence. In the event of a simple negligent breach of essential contractual obligations (cardinal obligations), liability shall be limited to the typically foreseeable damage. Cardinal obligations are those obligations whose fulfilment is essential for the proper execution of the contract and on whose compliance the contractual partner may regularly rely.')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                            <p className="mt-2">{t('(3) We are not liable for:')}</p>
                            <p>{t('a) losses resulting from market price movements, volatility or impairment of digital or traditional assets;')}</p>
                            <p>{t('b) damage based on typical risks of digital technologies (e.g. failure of the blockchain infrastructure, network disruptions, internet outages), provided that we have not caused these through negligence;')}</p>
                            <p>{t('c) losses based on actions or omissions of third parties (banks, payment service providers, issuers of digital assets, stock exchanges, custodians), provided that we have selected them with due care and there is no other legal obligation to assume liability.')}</p>
                            <p className="mt-2">{t('(4) Limitations of liability do not apply if mandatory statutory provisions (e.g. consumer protection law, capital market law, supervisory law) stipulate otherwise.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('13. Blocking and termination of accounts')}</h3>
                            <p>{t('(1) We may terminate the business relationship with you at any time with reasonable notice, unless otherwise required by mandatory regulations (e.g. consumer law). Your right to terminate remains unaffected.')}</p>
                            <p className="mt-2">{t('(2) Extraordinary termination without notice, blocking or restriction of your account is permissible in particular if:')}</p>
                            <p>{t('a) there is suspicion that you are violating laws, these Terms of Use or other guidelines;')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                            <p>{t('b) there are requests from law enforcement agencies, courts or supervisory authorities;')}</p>
                            <p>{t('c) you have provided inaccurate or incomplete information about your identity or beneficial owners;')}</p>
                            <p>{t('d) there is a risk to the stability, integrity or security of the platform.')}</p>
                            <p className="mt-2">{t('(3) In the event of a suspension, we will – to the extent permitted by law – attempt to inform you of the reasons and give you the opportunity to comment.')}</p>
                            <p className="mt-2">{t('(4) Depending on regulatory requirements, investigative measures or technical restrictions, it may be necessary to temporarily freeze assets or restrict payouts.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('14. Changes to the Terms of Use')}</h3>
                            <p>{t('(1) We reserve the right to amend these Terms of Use at any time in order to:')}</p>
                            <p>{t('a) implement new legal or regulatory requirements,')}</p>
                            <p>{t('b) introduce new products or functionalities,')}</p>
                            <p>{t('c) take into account security or clarification requirements.')}</p>
                            <p className="mt-2">{t('(2) Changes will be communicated to the user in an appropriate form (e.g. by email, in-app notification or at the next login). Where legally required, changes will only take effect after a reasonable period of time.')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                            <p className="mt-2">{t('(3) If you do not object to the amended terms within the specified period and continue to use SCANDIC services, the amendments shall be deemed accepted. In the event of an objection, the business relationship may be terminated or your use may be restricted to the previous legal situation, insofar as this is legally and technically possible.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('15. Applicable law and place of jurisdiction')}</h3>
                            <p>{t('(1) Unless mandatory consumer protection regulations dictate otherwise, these Terms of Use relating to the core SCANDIC services of SCANDIC FINANCE GROUP LIMITED are governed by the laws of the Hong Kong Special Administrative Region of the People\'s Republic of China.')}</p>
                            <p className="mt-2">{t('(2) For specific services provided by affiliated companies in other jurisdictions (e.g. United Arab Emirates, Federal Republic of Germany, Ukraine, United Kingdom), the law of the respective jurisdiction may apply in addition or primarily. This is indicated in the relevant product or special terms and conditions.')}</p>
                            <p className="mt-2">{t('(3) If the user is a merchant, a legal entity under public law or a special fund under public law, the exclusive place of jurisdiction for all disputes arising from or in connection with these Terms of Use shall be Hong Kong, to the extent permitted by law. Mandatory statutory consumer jurisdictions remain unaffected.')}</p>
                        </section>

                        <section>
                            <h3 className="font-bold mb-2 text-neutral-900">{t('16. Language, interpretation and severability clause')}</h3>
                            <p>{t('(1) The authoritative language of the contract is English. Translations into other languages are for comprehension purposes only. In the event of discrepancies, the German version shall prevail.')}</p>
                            <p className="text-xs text-neutral-400">{t('Nutzungsbedingungen en-GB.docx')}</p>
                            <p className="mt-2">{t('(2) Should any provision of these Terms of Use be or become invalid or unenforceable in whole or in part, this shall not affect the validity of the remaining provisions. In place of the invalid or unenforceable provision, a valid provision shall be deemed to have been agreed which comes closest to the economic purpose of the invalid or unenforceable provision.')}</p>
                            <p className="mt-2">{t('(3) In case of doubt, the interpretation of these Terms of Use shall be based on a fair interpretation that is compatible with mandatory legal requirements and the protection of the integrity, transparency and stability of the financial markets.')}</p>
                            <p className="mt-4 font-semibold">{t('Note:')}</p>
                            <p>{t('By creating or maintaining a customer account and using SCANDIC services, you reconfirm that you have read, understood and accepted these Terms of Use in full, including the general risk warning, and that you bear all associated risks on your own responsibility.')}</p>

                            <div className="mt-8 pt-6 border-t border-neutral-200">
                                <p className="font-bold">{t('Written, signed and approved:')}</p>
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

export default TermsOfUse;
