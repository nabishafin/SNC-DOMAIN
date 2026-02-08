import PublicLayout from '../../components/layout/PublicLayout';

const GeneralRiskWarning = () => {
    return (
        <PublicLayout>
            <div className="bg-white py-8 md:py-12 text-neutral-800">
                <div className="container-padding max-w-4xl mx-auto">

                    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-neutral-900 border-b pb-4">General risk warning for services</h1>
                    <p className="text-center font-bold mb-1">provided by</p>
                    <p className="text-center font-bold mb-1">SCANDIC FINANCE GROUP LIMITED</p>
                    <p className="text-center font-bold mb-6">and the SCANDIC brand ecosystem</p>

                    <div className="space-y-6 text-sm leading-relaxed text-xs">

                        <p className="font-bold mb-2">This risk warning applies to all services provided by:</p>

                        {/* Company Details */}
                        <section className="bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-bold text-sm text-neutral-800">SCANDIC FINANCE GROUP LIMITED</p>
                                    <p>Room 10, Unit A, 7/F</p>
                                    <p>Harbour Sky, 28 Sze Shan Street</p>
                                    <p>Yau Tong, Hong Kong / SAR - PRC</p>
                                    <div className="mt-2 space-y-1">
                                        <p><span className="font-semibold">Phone Headquarters – Switzerland, Zurich:</span> +41 44 7979 99 – 85</p>
                                        <p><span className="font-semibold">Email:</span> <a href="mailto:Office@ScandicFinance.Global" className="text-primary-600 hover:underline">Office@ScandicFinance.Global</a></p>
                                        <p className="break-all"><span className="font-semibold">Commercial register:</span> <a href="https://hkg.Databasesets.com/en/gongsimingdan/number/79325926" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">https://hkg.Databasesets.com/en/gongsimingdan/number/79325926</a></p>
                                    </div>
                                </div>

                                <div>
                                    <p className="font-bold text-sm text-neutral-800">in cooperation with SCANDIC ASSETS FZCO</p>
                                    <p>Dubai Silicon Oasis DDP Building A1/A2</p>
                                    <p>Dubai, 342001 / United Arab Emirates</p>
                                    <div className="mt-2 space-y-1">
                                        <p><span className="font-semibold">Telephone:</span> +971 56 929 86 – 90</p>
                                        <p><span className="font-semibold">Email:</span> <a href="mailto:Info@ScandicAssets.dev" className="text-primary-600 hover:underline">Info@ScandicAssets.dev</a></p>
                                        <p className="break-all"><span className="font-semibold">Commercial register:</span> <a href="https://dieza.my.site.com/diezaqrverify/validateqr?id=001NM00000K2u4FYAR&masterCode=CERTIFICATE_OF_FORMATION&relatedToId=a1MNM000004ddaI2AQ" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">https://dieza.my.site.com/diezaqrverify/validateqr...</a></p>
                                    </div>
                                </div>

                                <div>
                                    <p className="font-bold text-sm text-neutral-800">in cooperation with SCANDIC TRUST GROUP LLC</p>
                                    <p>IQ Business Centre, Bolsunovska Street 13 – 15</p>
                                    <p>Kyiv — 01014 / Ukraine</p>
                                    <div className="mt-2 space-y-1">
                                        <p><span className="font-semibold">Headquarters telephone number – United Kingdom, London:</span> +44 7470 86 92 – 60</p>
                                        <p><span className="font-semibold">Email:</span> <a href="mailto:Info@ScandicTrust.com" className="text-primary-600 hover:underline">Info@ScandicTrust.com</a></p>
                                        <p className="break-all"><span className="font-semibold">Commercial register extract:</span> <a href="https://LegierGroup.com/Scandic_Trust_Group_LLC_Extract_from_the_Unified_State_Register.pdf" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">https://LegierGroup.com/Scandic_Trust_Group_LLC...</a></p>
                                    </div>
                                </div>

                                <div>
                                    <p className="font-bold text-sm text-neutral-800">in cooperation with LEGIER BETEILIGUNGS GMBH</p>
                                    <p>Kurfürstendamm 14</p>
                                    <p>10719 Berlin / Federal Republic of Germany</p>
                                    <p>HR Berlin: HRB 57837</p>
                                    <div className="mt-2 space-y-1">
                                        <p><span className="font-semibold">Telephone:</span> +49 (0) 30 9921134 – 69</p>
                                        <p><span className="font-semibold">Email:</span> <a href="mailto:Office@LegierGroup.com" className="text-primary-600 hover:underline">Office@LegierGroup.com</a></p>
                                        <p className="break-all"><span className="font-semibold">Commercial register:</span> <a href="https://www.Handelsregister.de/rp_web/normalesuche/welcome.xhtml" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">https://www.Handelsregister.de/rp_web/normalesuche/welcome.xhtml</a></p>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-4 mb-2">(collectively referred to in this risk warning as "SCANDIC FINANCE GROUP LIMITED and cooperating companies" or "SCANDIC FINANCE GROUP LIMITED" for short) offered or supported services.</p>

                            <div className="mt-4 pt-2 border-t border-neutral-200">
                                <p className="font-bold text-neutral-900">Legal notice:</p>
                                <p>SCANDIC ASSETS FZCO, LEGIER Limited Liability Investment Company and SCANDIC TRUST GROUP LLC act as non-operational service providers. All operational and responsible activities are carried out by SCANDIC FINANCE GROUP LIMITED, Hong Kong, SAR-PRC.</p>
                            </div>
                        </section>

                        <section>
                            <p className="mb-2">This risk warning applies to the SCANDIC brand ecosystem, in particular to the following brands and services:</p>
                            <ul className="grid grid-cols-2 md:grid-cols-4 gap-1 font-medium text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-100 mb-2">
                                <li>LEGIER GROUP</li>
                                <li>SCANDIC SEC</li>
                                <li>SCANDIC FLY</li>
                                <li>SCANDIC PAY</li>
                                <li>SCANDIC COIN</li>
                                <li>SCANDIC CARS</li>
                                <li>SCANDIC DATA</li>
                                <li>SCANDIC SETUP</li>
                                <li>SCANDIC TRUST</li>
                                <li>SCANDIC CARDS</li>
                                <li className="col-span-2 text-neutral-400 font-normal">Risikowarnung en-GB.docx</li>
                                <li>SCANDIC ESTATE</li>
                                <li>SCANDIC YACHTS</li>
                                <li>SCANDIC HEALTH</li>
                                <li>SCANDIC FINANCE.</li>
                            </ul>
                        </section>

                        {/* A. How should this risk warning be interpreted? */}
                        <section>
                            <h2 className="text-lg font-bold mb-2 text-neutral-900 border-b border-neutral-200 pb-1">A. How should this risk warning be interpreted?</h2>
                            <p className="mb-2">All terms used in this risk warning that are defined in the Terms of Use of SCANDIC FINANCE GROUP LIMITED (the "Terms of Use", including all specific product terms) have the same meaning and interpretation as in the Terms of Use.</p>
                            <p className="mb-1">This risk warning:</p>
                            <ul className="list-decimal pl-5 mt-1 space-y-1 mb-2">
                                <li>provides a general description of the significant risks that may be associated with the use of the services offered or brokered by SCANDIC FINANCE GROUP LIMITED;</li>
                                <li>is not exhaustive. There may be other risks that are not expressly mentioned here;</li>
                                <li>does not replace individual legal, tax or investment advice;</li>
                                <li>must always be read in conjunction with the applicable contractual terms and conditions, product information, information sheets, prospectuses and the legal framework.</li>
                            </ul>
                            <p>It is your sole responsibility to fully understand all risks relevant to you before using the services of SCANDIC FINANCE GROUP LIMITED or conducting any transactions.</p>
                        </section>

                        {/* B. Services of SCANDIC FINANCE GROUP LIMITED */}
                        <section>
                            <h2 className="text-lg font-bold mb-2 text-neutral-900 border-b border-neutral-200 pb-1">B. Services of SCANDIC FINANCE GROUP LIMITED</h2>
                            <p className="mb-2">In accordance with our obligations to comply with national and international regulations and to protect users, this risk warning provides information about key types of risk that may arise when using the services of SCANDIC FINANCE GROUP LIMITED.</p>
                            <p className="mb-2">Each service offered or supported by SCANDIC FINANCE GROUP LIMITED carries its own product-specific risks.</p>
                            <p className="mb-1">This risk warning:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>contains a general description of relevant risk categories;
                                    <span className="text-neutral-400 block text-[10px] my-1">Risikowarnung en-GB.docx</span>
                                </li>
                                <li>does not explain all possible risks in detail and does not describe how these risks specifically affect your personal financial situation, your goals or your risk tolerance;</li>
                                <li>does not replace reading the applicable contract and product terms and conditions.</li>
                            </ul>
                            <p>By using the services of SCANDIC FINANCE GROUP LIMITED and entering into transactions, you agree to bear all associated risks entirely yourself.</p>
                        </section>

                        {/* C. No personal advice */}
                        <section>
                            <h2 className="text-lg font-bold mb-2 text-neutral-900 border-b border-neutral-200 pb-1">C. No personal advice</h2>
                            <p className="mb-1">SCANDIC FINANCE GROUP LIMITED and its cooperating companies:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>do not provide personal investment, financial, legal or tax advice in connection with the services or products offered;</li>
                                <li>occasionally provide factual information on products, general market information, descriptions of transaction processes and risk warnings;</li>
                                <li>assume no responsibility for users' investment decisions, strategies, portfolio compositions or transaction decisions.</li>
                            </ul>
                            <p className="mb-2">No communication or information provided to you, whether in electronic form, via websites, platforms, apps, email, telephone, social media or by any other means, is to be understood or interpreted as investment advice, financial advice, trading advice, legal advice or any other form of individual advice.</p>
                            <p>You are solely responsible for deciding whether an investment, investment strategy or transaction is suitable for your personal investment objectives, financial situation and individual risk tolerance.</p>
                        </section>

                        {/* D. No monitoring of investment objectives */}
                        <section>
                            <h2 className="text-lg font-bold mb-2 text-neutral-900 border-b border-neutral-200 pb-1">D. No monitoring of investment objectives</h2>
                            <p className="mb-1">SCANDIC FINANCE GROUP LIMITED:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>is not your broker, agent, asset manager or fiduciary advisor;</li>
                                <li>does not establish a fiduciary relationship with you with respect to trading, investment decisions or other transactions you make through the platforms or structures of SCANDIC FINANCE GROUP LIMITED;</li>
                                <li>does not monitor whether your use of the services, your investments
                                    <span className="text-neutral-400 block text-[10px] my-1">Risikowarnung en-GB.docx</span>
                                    or transactions are consistent with your individual financial objectives and requirements.</li>
                            </ul>
                            <p>It is your sole responsibility to assess whether any activity undertaken through the services of SCANDIC FINANCE GROUP LIMITED is appropriate in light of your knowledge, experience, financial situation and risk tolerance.</p>
                        </section>

                        {/* E. No tax, regulatory or legal advice */}
                        <section>
                            <h2 className="text-lg font-bold mb-2 text-neutral-900 border-b border-neutral-200 pb-1">E. No tax, regulatory or legal advice</h2>
                            <p className="mb-1">You are solely responsible for:</p>
                            <ul className="list-decimal pl-5 mt-1 space-y-1 mb-2">
                                <li>determining which taxes (e.g. income tax, corporation tax, capital gains tax, VAT, transaction taxes, stamp duty or similar levies) may apply to you;</li>
                                <li>ensuring that all tax obligations relating to transactions, income, profits or losses are properly fulfilled;</li>
                                <li>submitting any necessary reports to financial, tax and supervisory authorities.</li>
                            </ul>
                            <p className="mb-1">SCANDIC FINANCE GROUP LIMITED:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>does not provide tax advice or legal advice in connection with transactions, products, income or losses;</li>
                                <li>may be required by law to provide information about your transactions and other data to tax, regulatory or other authorities;</li>
                                <li>may be legally obliged to withhold taxes and pay them to the relevant authorities;</li>
                                <li>may be required to obtain additional information, evidence, certificates or documents from you.</li>
                            </ul>
                            <p className="mb-1">Failure to provide the requested information within the specified deadlines may result in SCANDIC FINANCE GROUP LIMITED:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>withholding taxes,</li>
                                <li>restricts the use of individual services,</li>
                                <li>delay or prevent transactions.</li>
                            </ul>
                            <span className="text-neutral-400 block text-[10px] my-1">Risikowarnung en-GB.docx</span>
                            <p>If you have any doubts about your tax status or tax obligations, you should always seek independent expert advice from tax advisors, solicitors or other qualified professionals.</p>
                        </section>

                        {/* F. Market risks */}
                        <section>
                            <h2 className="text-lg font-bold mb-2 text-neutral-900 border-b border-neutral-200 pb-1">F. Market risks</h2>
                            <p className="mb-1">Investments in financial instruments and, in particular, in digital assets (including, but not limited to, crypto tokens, stablecoins, digital securities, tokenised assets):</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>are highly speculative;</li>
                                <li>are subject to high volatility;</li>
                                <li>may result in total loss.</li>
                            </ul>
                            <p className="mb-1">The value of an investment and any income may:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>rise or fall;</li>
                                <li>be subject to significant and rapid fluctuations;</li>
                                <li>fall to zero at any time.</li>
                            </ul>
                            <p className="mb-1">You should:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>only invest funds whose complete loss would not jeopardise your economic existence;</li>
                                <li>obtain comprehensive information about the functioning, risks and legal framework of the respective products;</li>
                                <li>bear in mind that new or less regulated digital assets in particular entail additional risks that are difficult to assess.</li>
                            </ul>
                            <p className="mb-2">Past performance is not a reliable indicator of future results. There is no guarantee that digital assets, financial products or services will perform well in the future.</p>
                            <p className="mb-1">The digital asset industry is characterised by:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>systemic risks (e.g. failure of key market participants, exchanges, issuers, infrastructure providers);</li>
                                <li>systematic risks (e.g. macroeconomic developments, geopolitical events, legal and regulatory changes, technological upheavals).</li>
                            </ul>
                            <span className="text-neutral-400 block text-[10px] my-1">Risikowarnung en-GB.docx</span>
                            <p className="mb-1">Negative media coverage or negative public perception of digital assets may:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>undermine the confidence of market participants;</li>
                                <li>lead to sharp price movements;</li>
                                <li>trigger significant losses in value.</li>
                            </ul>
                        </section>

                        {/* G. Counterparty risk */}
                        <section>
                            <h2 className="text-lg font-bold mb-2 text-neutral-900 border-b border-neutral-200 pb-1">G. Counterparty risk</h2>
                            <p className="mb-1">When using the services of SCANDIC FINANCE GROUP LIMITED, you may be exposed to various counterparty risks, for example:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>Market makers or liquidity providers whose default, illiquidity or misconduct may lead to slippage, delays or the inability to execute orders;</li>
                                <li>Payment service providers and banks, whose impairment may lead to delays or failures in deposits and withdrawals;</li>
                                <li>Borrowers or counterparties in lending, staking, margin or other financing products, whose default may affect your repayment claims.</li>
                            </ul>
                            <p className="mb-1">In exceptional cases, this may result in:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>Transactions are not executed or settled as expected;</li>
                                <li>Fees are not refunded;</li>
                                <li>Profits are lost;</li>
                                <li>Assets cannot be sold or purchased, or can only be sold or purchased on significantly worse terms.</li>
                            </ul>
                        </section>

                        {/* H. Liquidity risk */}
                        <section>
                            <h2 className="text-lg font-bold mb-2 text-neutral-900 border-b border-neutral-200 pb-1">H. Liquidity risk</h2>
                            <p className="mb-2">The prices of digital assets and certain financial instruments are largely determined by supply and demand on secondary markets and may be subject to significant fluctuations.</p>
                            <p className="mb-1">Some assets may:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>only be traded on a few trading venues;</li>
                                <li>have low trading volumes;</li>
                                <li>become virtually illiquid in crisis situations.</li>
                            </ul>
                            <p className="mb-1">This may result in:</p>
                            <span className="text-neutral-400 block text-[10px] my-1">Risikowarnung en-GB.docx</span>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>a position cannot be closed, cannot be closed completely, or can only be closed with a significant delay;</li>
                                <li>Orders can only be executed at significantly worse prices;</li>
                                <li>Stop-loss strategies do not work as planned.</li>
                            </ul>
                            <p>Liquidity risks can occur at any time, even during periods of significant market volatility.</p>
                        </section>

                        {/* I. Fees and charges */}
                        <section>
                            <h2 className="text-lg font-bold mb-2 text-neutral-900 border-b border-neutral-200 pb-1">I. Fees and charges</h2>
                            <p className="mb-2">Fees, charges, spreads and other costs may be incurred for the use of SCANDIC FINANCE GROUP LIMITED products and services.</p>
                            <p className="mb-1">Please note:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>The applicable fee structure is set out in the relevant contract documents, product information, price lists or platform information.</li>
                                <li>Fees and charges may be adjusted from time to time.</li>
                                <li>Indirect costs (e.g. spreads, financing costs, network and transaction fees in blockchain networks) can also have a significant impact on your return.</li>
                            </ul>
                            <p>You are obliged to inform yourself about all fees and charges relevant to you before you start using the service, as these have a significant impact on your actual return or loss.</p>
                        </section>

                        {/* J. Availability risk */}
                        <section>
                            <h2 className="text-lg font-bold mb-2 text-neutral-900 border-b border-neutral-200 pb-1">J. Availability risk</h2>
                            <p className="mb-2">SCANDIC FINANCE GROUP LIMITED strives to provide a stable and secure technical infrastructure. Nevertheless, it cannot be guaranteed that:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>platforms, interfaces, apps, trading or administrative functions will be available at all times;</li>
                                <li>there will be no unplanned outages, maintenance windows, disruptions, overloads or attacks;</li>
                                <li>access to accounts, wallets or certain products will be possible at all times.</li>
                            </ul>
                            <span className="text-neutral-400 block text-[10px] my-1">Risikowarnung en-GB.docx</span>
                            <p className="mb-1">As a result of technical malfunctions, maintenance work, network or system problems, you may:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>be unable to buy, sell, send, receive or transfer digital assets;</li>
                                <li>be unable to close or open positions;</li>
                                <li>receive information or price data only with a delay or not at all.</li>
                            </ul>
                            <p className="mb-1">Legal restrictions in individual countries or regions may result in:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>certain products or functions are unavailable or restricted in individual jurisdictions;</li>
                                <li>special campaigns, user programmes or promotions are not accessible to certain user groups.</li>
                            </ul>
                            <p>You are responsible for informing yourself about and complying with all regulatory restrictions and requirements in the countries from which you use SCANDIC FINANCE GROUP LIMITED services or for which you use SCANDIC FINANCE GROUP LIMITED services.</p>
                        </section>

                        {/* K. Risks posed by third parties */}
                        <section>
                            <h2 className="text-lg font-bold mb-2 text-neutral-900 border-b border-neutral-200 pb-1">K. Risks posed by third parties</h2>
                            <p className="mb-1">Third parties – in particular:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>payment service providers,</li>
                                <li>banks,</li>
                                <li>custodians,</li>
                                <li>correspondent banks,</li>
                                <li>external service providers in the field of information technology and infrastructure,</li>
                            </ul>
                            <p>may be involved in the provision of services by SCANDIC FINANCE GROUP LIMITED. These third parties are subject to their own terms and conditions of business and use, over which SCANDIC FINANCE GROUP LIMITED has no direct influence.</p>
                            <p>Unless expressly agreed otherwise in a contract, SCANDIC FINANCE GROUP LIMITED is not liable for any losses you incur as a result of or in connection with the services provided by these third parties, to the extent that a limitation of liability is legally permissible.</p>
                        </section>

                        {/* L. Security risk */}
                        <section>
                            <h2 className="text-lg font-bold mb-2 text-neutral-900 border-b border-neutral-200 pb-1">L. Security risk</h2>
                            <p className="mb-1">Digital assets and the underlying networks and infrastructures are</p>
                            <span className="text-neutral-400 block text-[10px] my-1">Risikowarnung en-GB.docx</span>
                            <p className="mb-1">subject to an increased risk of:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>cyber attacks,</li>
                                <li>hacking,</li>
                                <li>phishing,</li>
                                <li>malware,</li>
                                <li>technical malfunctions,</li>
                                <li>software or hardware errors.</li>
                            </ul>
                            <p className="mb-1">SCANDIC FINANCE GROUP LIMITED makes reasonable efforts to:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>protect platforms and systems against cyber attacks;</li>
                                <li>continuously review and improve security measures and controls.</li>
                            </ul>
                            <p className="mb-1">However, it cannot be guaranteed that:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>all security risks can be completely eliminated;</li>
                                <li>systems will remain free from unauthorised access at all times;</li>
                                <li>the measures taken will be effective in every situation.</li>
                            </ul>
                            <p className="mb-1">You are responsible for the security of your access data, your authentication devices and your communication channels. This includes in particular:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>secure storage of passwords and recovery information;</li>
                                <li>Using two-factor authentication, where offered;</li>
                                <li>Careful handling of emails, links and attachments;</li>
                                <li>regularly updating end devices and security software.</li>
                            </ul>
                            <p className="mb-1">Transactions involving digital assets may be irreversible. Losses due to:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>fraudulent activities,</li>
                                <li>unauthorised access,</li>
                                <li>errors in address or network selection,</li>
                                <li>input errors</li>
                            </ul>
                            <p>may not be reversible or refundable, or may only be reversible or refundable to a limited extent.</p>
                            <span className="text-neutral-400 block text-[10px] my-1">Risikowarnung en-GB.docx</span>
                        </section>

                        {/* M. Risks associated with digital assets */}
                        <section>
                            <h2 className="text-lg font-bold mb-2 text-neutral-900 border-b border-neutral-200 pb-1">M. Risks associated with digital assets</h2>
                            <p className="mb-2">Due to the characteristics of digital assets and the technologies underlying them, there are a number of inherent risks, including:</p>

                            <h3 className="font-bold text-sm mb-1">1. Technical errors and protocol risks</h3>
                            <p className="mb-1">Errors, defects, vulnerabilities, hacks, exploits, mistakes or unforeseen circumstances in the protocol itself, in smart contracts, in wallet systems or in the underlying software may result in digital assets being:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>be lost,</li>
                                <li>become locked,</li>
                                <li>stolen,</li>
                                <li>become permanently inaccessible.</li>
                            </ul>

                            <h3 className="font-bold text-sm mb-1">2. Irreversibility of transactions</h3>
                            <p className="mb-2">Transactions in blockchain networks are generally irreversible. If assets are sent to the wrong address, obtained through fraud or transferred due to an error, it may be technically impossible to reverse the transaction, or only possible in exceptional cases and with considerable effort.</p>

                            <h3 className="font-bold text-sm mb-1">3. Technological developments and obsolescence</h3>
                            <p className="mb-1">New technological developments can cause certain digital assets or protocols to become technically obsolete or lose their economic significance. This can lead to:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>drastic losses in value,</li>
                                <li>a sharp decline in liquidity,</li>
                                <li>complete market clearance of this asset.</li>
                            </ul>

                            <h3 className="font-bold text-sm mb-1">4. Network delays and congestion</h3>
                            <p className="mb-1">Overloads of blockchain networks, slow confirmation times or highly fluctuating network fees can result in:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>Transactions not being confirmed at the desired time;</li>
                                <li>Costs rise sharply and unexpectedly;</li>
                                <span className="text-neutral-400 block text-[10px] my-1">Risikowarnung en-GB.docx</span>
                                <li>planned strategies (e.g. time-critical orders) cannot be implemented.</li>
                            </ul>

                            <h3 className="font-bold text-sm mb-1">5. Attacks on protocols and networks</h3>
                            <p className="mb-1">Attacks on protocols or underlying technologies (e.g. 51 per cent attacks, double-spending attacks, consensus manipulation) can:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>lead to a loss of trust;</li>
                                <li>damage the integrity of the network;</li>
                                <li>devalue assets.</li>
                            </ul>

                            <h3 className="font-bold text-sm mb-1">6. Hard forks and protocol changes</h3>
                            <p className="mb-1">If developers of a digital asset change the software and parts of the community decide against migration, so-called hard forks can occur. This can:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>lead to parallel versions of a network;</li>
                                <li>cause uncertainty regarding future support from exchanges, wallets or service providers;</li>
                                <li>significantly affect the price and demand.</li>
                            </ul>

                            <h3 className="font-bold text-sm mb-1">7. Concentration risks</h3>
                            <p className="mb-1">If individual addresses or market participants hold a significant proportion of the digital assets in circulation, any major reallocation or liquidation can lead to:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>high volatility,</li>
                                <li>loss of confidence,</li>
                                <li>massive price movements.</li>
                            </ul>

                            <h3 className="font-bold text-sm mb-1">8. Majority control over computing power</h3>
                            <p className="mb-1">If an actor gains control over the majority of the computing power of a blockchain network, they can theoretically use it to:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1 mb-2">
                                <li>Manipulate transactions</li>
                                <li>Delay or censor transactions,</li>
                                <li>carry out double-spending attacks.</li>
                            </ul>
                            <span className="text-neutral-400 block text-[10px] my-1">Risikowarnung en-GB.docx</span>
                        </section>

                        {/* Final provisions */}
                        <section>
                            <h2 className="text-lg font-bold mb-2 text-neutral-900 border-b border-neutral-200 pb-1">Final provisions</h2>
                            <p className="mb-2">The use of services provided by SCANDIC FINANCE GROUP LIMITED and the SCANDIC brand ecosystem is at the user's own risk.</p>
                            <p className="mb-1">By using the platforms, products and services of SCANDIC FINANCE GROUP LIMITED, you confirm that you:</p>
                            <ul className="list-decimal pl-5 mt-1 space-y-1 mb-2">
                                <li>have carefully read and understood this risk warning;</li>
                                <li>are aware of the possibility of serious losses, including total loss;</li>
                                <li>are prepared to bear these risks entirely yourself;</li>
                                <li>seek independent legal, tax and financial advice if in doubt.</li>
                            </ul>
                        </section>

                        {/* Signatures */}
                        <section className="mt-8 pt-6 border-t border-neutral-200 text-sm">
                            <p className="font-bold mb-1">Drafted, signed and approved:</p>
                            <p className="text-neutral-700">The Board of Directors of SCANDIC FINANCE GROUP LIMITED</p>
                            <p className="text-neutral-700">Hong Kong, SAR - PRC, 1 December 2025</p>
                        </section>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default GeneralRiskWarning;
