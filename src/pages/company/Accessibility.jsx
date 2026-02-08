import PublicLayout from '../../components/layout/PublicLayout';

const Accessibility = () => {
    return (
        <PublicLayout>
            <div className="bg-white py-12 md:py-20 text-neutral-800">
                <div className="container-padding max-w-4xl mx-auto">

                    <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-neutral-900">Legal notice regarding accessibility</h1>

                    <div className="space-y-8 text-sm md:text-base leading-relaxed">

                        {/* Header Section */}
                        <section className="bg-neutral-50 p-6 rounded-xl border border-neutral-100">
                            <p className="font-bold mb-2">All websites of:</p>
                            <div className="mb-4">
                                <p className="font-bold text-lg">SCANDIC FINANCE GROUP LIMITED</p>
                                <p>by Scandic Banking Hong Kong</p>
                                <p>Room 10, Unit A, 7/F</p>
                                <p>Harbour Sky, 28 Sze Shan Street</p>
                                <p>Yau Tong, Hong Kong, SAR - PRC</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p><span className="font-semibold">Telephone HQ Switzerland, Zurich:</span> +41 44 7979 99 – 85</p>
                                </div>
                                <div>
                                    <p><span className="font-semibold">Email:</span> <a href="mailto:Office@ScandicFinance.Global" className="text-primary-600 hover:underline">Office@ScandicFinance.Global</a></p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="break-all"><span className="font-semibold">Commercial register:</span> <a href="https://hkg.Databasesets.com/en/gongsimingdan/number/79325926" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">https://hkg.Databasesets.com/en/gongsimingdan/number/79325926</a></p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <p>
                                are committed to providing accessible digital services for all users, including people with disabilities. Our goal is to ensure equal access to information, functions and services.
                            </p>
                            <p className="mt-4">
                                We are guided by the legal requirements of the Accessibility Enhancement Act (BFSG), the European Accessibility Act (EAA) and other relevant national and international standards.
                            </p>
                            <p className="mt-4">
                                For us, accessibility is not only a legal obligation, but also a central component of our corporate philosophy to create an inclusive user experience.
                            </p>
                        </section>

                        {/* Legal Basis */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 text-neutral-900 border-b border-neutral-200 pb-2">Legal basis and technical standards</h2>
                            <p className="mb-4">Accessibility is regulated by a combination of national and European regulations. The relevant laws and standards are listed and explained below:</p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-lg text-primary-700 mb-2">1. Accessibility Enhancement Act (BFSG)</h3>
                                    <ul className="list-none space-y-2 pl-0">
                                        <li><span className="font-semibold">• Purpose and scope:</span> The BFSG is a law of the Federal Republic of Germany that primarily regulates the implementation of the European Accessibility Act (EAA) into national law. It will come into force on 28 June 2025 and obliges private providers of services and products, including websites, to ensure accessibility.</li>
                                        <li>
                                            <span className="font-semibold">• Relevant paragraphs:</span>
                                            <ul className="list-none pl-4 mt-1 space-y-1">
                                                <li>– § 1 BFSG – Purpose: The aim is to remove and prevent barriers for people with disabilities in order to promote their participation in social life.</li>
                                                <li>– § 3 BFSG – Requirements for services: Websites and mobile applications must be accessible to ensure access for all.</li>
                                                <li>– § 4 BFSG – Technical standards: Refers to compliance with the European standard EN 301 549, which in turn integrates WCAG 2.1 Level AA.</li>
                                            </ul>
                                        </li>
                                        <li><span className="font-semibold">• Significance:</span> From the effective date, all content and functions of our website must comply with the technical requirements in order to be legally compliant and not exclude users with disabilities.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg text-primary-700 mb-2">2. European Accessibility Act (EAA) – Directive (EU) 2019/882</h3>
                                    <ul className="list-none space-y-2 pl-0">
                                        <li><span className="font-semibold">• Purpose and scope:</span> The EAA is an EU directive that harmonises minimum requirements for the accessibility of products and services throughout the EU. It applies to private companies and supplements existing regulations for the public sector.</li>
                                        <li>
                                            <span className="font-semibold">• Relevant provisions:</span>
                                            <ul className="list-none pl-4 mt-1 space-y-1">
                                                <li>– Article 2 – Scope: Covers digital services such as websites and mobile applications.</li>
                                                <li>– Article 4 – Accessibility requirements: Specifies that these services must be accessible to people with disabilities.</li>
                                                <li>– Article 7 – Technical specifications: Refers to compliance with EN 301 549 as a binding standard.</li>
                                            </ul>
                                        </li>
                                        <li><span className="font-semibold">• Broader significance:</span> The EAA ensures that our website is accessible not only in Germany but throughout the EU, which is essential for an internationally oriented company.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg text-primary-700 mb-2">3. EN 301 549 – Accessibility requirements for ICT products and services</h3>
                                    <ul className="list-none space-y-2 pl-0">
                                        <li><span className="font-semibold">• Definition:</span> EN 301 549 is a European technical standard that specifies the requirements for accessibility of information and communication technologies (ICT), including websites.</li>
                                        <li>
                                            <span className="font-semibold">• Relevant sections:</span>
                                            <ul className="list-none pl-4 mt-1 space-y-1">
                                                <li>– Chapter 9 – Web: Requires websites to comply with WCAG 2.1 Level AA.</li>
                                                <li>– Chapter 11 – Software: Applies to mobile applications and interactive elements.</li>
                                                <li>– Annex A: Detailed technical criteria for implementation.</li>
                                            </ul>
                                        </li>
                                        <li><span className="font-semibold">• Significance:</span> This standard forms the technical basis for the accessibility of our website and serves as a guideline for the development and testing of our digital content.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg text-primary-700 mb-2">4. Web Content Accessibility Guidelines (WCAG) 2.1</h3>
                                    <ul className="list-none space-y-2 pl-0">
                                        <li><span className="font-semibold">• Definition:</span> The WCAG 2.1 are internationally recognised guidelines from the World Wide Web Consortium (W3C) that make web content accessible to people with disabilities. Level AA is the legally required standard in the EU.</li>
                                        <li>
                                            <span className="font-semibold">• Basic principles:</span>
                                            <ul className="list-none pl-4 mt-1 space-y-1">
                                                <li>– Perceivable: Content must be accessible to all senses (e.g. alternative text for images).</li>
                                                <li>– Operable: Navigation and interaction must be easy (e.g. keyboard navigation).</li>
                                                <li>– Understandable: Content and operation must be clear and comprehensible.</li>
                                                <li>– Robust: Content must be compatible with various technologies, including assistive technologies.</li>
                                            </ul>
                                        </li>
                                        <li><span className="font-semibold">• Additional significance:</span> Compliance with WCAG 2.1 Level AA is the basis for the technical implementation of our accessibility measures.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg text-primary-700 mb-2">5. Disability Equality Act (BGG)</h3>
                                    <ul className="list-none space-y-2 pl-0">
                                        <li><span className="font-semibold">• Purpose and scope:</span> The BGG promotes equality for people with disabilities in Germany and contains accessibility requirements, primarily for public bodies, but also serves as a guide for the private sector.</li>
                                        <li>
                                            <span className="font-semibold">• Relevant paragraphs:</span>
                                            <ul className="list-none pl-4 mt-1 space-y-1">
                                                <li>– § 4 BGG – Accessibility: Defines accessibility as a fundamental principle.</li>
                                                <li>– § 12a BGG – Accessible IT: Obliges public authorities to design websites and mobile applications to be accessible.</li>
                                            </ul>
                                        </li>
                                        <li><span className="font-semibold">• Note:</span> Although the BGG does not directly apply to private companies, it underlines the social and legal relevance of accessibility and influences our voluntary measures.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg text-primary-700 mb-2">6. EU Directive 2016/2102 – Accessibility of public websites</h3>
                                    <ul className="list-none space-y-2 pl-0">
                                        <li><span className="font-semibold">• Purpose and scope:</span> This directive regulates the accessibility of websites and mobile applications of public bodies and served as a precursor to the EAA.</li>
                                        <li>
                                            <span className="font-semibold">• Relevant provisions:</span>
                                            <ul className="list-none pl-4 mt-1 space-y-1">
                                                <li>– Article 4 – Requirements: Requires compliance with WCAG 2.1 Level AA.</li>
                                                <li>– Article 7 – Monitoring: Requires regular accessibility testing. It reflects the general trend towards comprehensive accessibility in the EU and indirectly influences standards for private providers.</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg text-primary-700 mb-2">7. EN 17161 – Design for All (2019)</h3>
                                    <ul className="list-none space-y-2 pl-0">
                                        <li><span className="font-semibold">• Definition:</span> EN 17161 is a European standard that specifies requirements and recommendations for designing products, goods and services so that they can be used by as many people as possible, including people with disabilities. The standard helps organisations to identify different needs, involve users directly or indirectly, and meet legal requirements for accessibility.</li>
                                        <li><span className="font-semibold">• Significance:</span> EN 17161 promotes the "design for all" approach and extends the scope of accessibility beyond purely technical standards. It supports companies in systematically integrating accessibility into their processes.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* International Regulations */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 text-neutral-900 border-b border-neutral-200 pb-2">International regulations and standards</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-base mb-1">• UN Convention on the Rights of Persons with Disabilities (UN CRPD), Article 9:</h3>
                                    <p>The UN Convention obliges States Parties to take measures to ensure equal access to the physical environment, transportation, and information and communication, including information and communication technologies and the Internet. States should remove obstacles and barriers and ensure that private providers also take accessibility into account.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-base mb-1">• Section 508 of the US Rehabilitation Act:</h3>
                                    <p>In 1998, the US Congress amended the Rehabilitation Act of 1973, requiring federal agencies to make their electronic and information technology systems accessible to people with disabilities. Federal agencies must provide employees and the public with access to information comparable to that available to other individuals, and the US Access Board has developed standards for this purpose that are harmonised with the WCAG.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-base mb-1">• Americans with Disabilities Act (ADA):</h3>
                                    <p>Title II of the ADA prohibits discrimination in all services, programmes and activities of state and local authorities, which must ensure that their communication with people with disabilities is as effective as with other people. Title III requires private companies that are accessible to the public to design their online services and offerings in such a way that people with disabilities can use them fully and equally. The US Department of Justice points out that ADA requirements also apply to web content and recommends the WCAG and Section 508 standards as guidelines.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-base mb-1">• Public Sector Bodies Accessibility Regulations 2018 and Equality Act 2010 (United Kingdom):</h3>
                                    <p>According to the British government, digital services must fully comply with the Accessibility Regulations 2018 and the Equality Act 2010. Websites and mobile applications should meet the international standard WCAG 2.2 AA and publish an accessibility statement. The Equality Act protects people from discrimination and requires accessibility to be considered from the outset and reasonable accommodations to be made.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-base mb-1">• Accessibility for Ontarians with Disabilities Act (AODA) – Canada:</h3>
                                    <p>Passed in 2005, the AODA aims to create a fully accessible Ontario by 2025. The regulations on information and communication are based on the WCAG; organisations are obliged to make their websites, apps and digital resources accessible and to comply with WCAG 2.0 Level AA.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-base mb-1">• Disability Discrimination Act (DDA) – Australia:</h3>
                                    <p>The Australian Human Rights Commission emphasises that the UN Convention on the Rights of Persons with Disabilities guarantees the right of persons with disabilities to full and independent participation, including on the internet. The Commission points out that the WCAG is the most comprehensive international benchmark for accessible web design and that Australia has developed a national transition plan for the implementation of WCAG 2.0.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-base mb-1">• ISO/IEC 30071-1:2019:</h3>
                                    <p>This international standard is a process-oriented guide to creating accessible ICT products and services. It helps organisations embed accessibility as part of their normal business processes, complementing technical guidelines such as the WCAG.</p>
                                </div>
                            </div>
                        </section>

                        {/* Accessibility measures implemented */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 text-neutral-900 border-b border-neutral-200 pb-2">Accessibility measures implemented</h2>
                            <p className="mb-4">In order to meet the above legal and technical requirements, the following measures have been implemented:</p>
                            <ul className="list-none space-y-3">
                                <li><span className="font-semibold">• Alternative text for images:</span> Every image on our website is provided with descriptive alternative text that makes the content accessible to users with screen readers.</li>
                                <li><span className="font-semibold">• Keyboard navigation:</span> All functions and interactive elements can be operated entirely via the keyboard to enable people with motor impairments to use the website.</li>
                                <li><span className="font-semibold">• Customisable display:</span> Users can customise font sizes and contrast to improve readability.</li>
                                <li><span className="font-semibold">• Transcripts and subtitles:</span> Audio and video content is supplemented by transcripts and subtitles to ensure accessibility for people with hearing impairments.</li>
                                <li><span className="font-semibold">• Accessible forms:</span> Forms feature clear labels, error messages and help texts that can also be correctly interpreted by assistive technologies.</li>
                                <li><span className="font-semibold">• Consistent structure:</span> The website uses a logical and consistent structure with semantic HTML to facilitate navigation.</li>
                                <li><span className="font-semibold">• Colour contrasts:</span> Colours and contrasts comply with WCAG requirements (at least 4.5:1 for normal text) to ensure readability for people with visual impairments.</li>
                            </ul>
                            <p className="mt-4">These measures are regularly reviewed and expanded to meet evolving standards.</p>
                        </section>

                        {/* Contact Us */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 text-neutral-900 border-b border-neutral-200 pb-2">Contact us if you encounter accessibility issues</h2>
                            <p className="mb-6">We greatly value your feedback in order to continuously improve the accessibility of our website. If you encounter any obstacles or have any suggestions, please contact us:</p>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Contact 1 */}
                                <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-100">
                                    <p className="font-bold">SCANDIC FINANCE GROUP LIMITED</p>
                                    <p>by Scandic Banking Hong Kong</p>
                                    <p>Room 10, Unit A, 7/F</p>
                                    <p>Harbour Sky, 28 Sze Shan Street</p>
                                    <p>Yau Tong, Hong Kong, SAR - PRC</p>
                                    <div className="mt-3 space-y-1">
                                        <p><span className="font-semibold">Telephone HQ Switzerland, Zurich:</span> +41 44 7979 99 – 85</p>
                                        <p><span className="font-semibold">Email:</span> <a href="mailto:Office@ScandicFinance.Global" className="text-primary-600 hover:underline">Office@ScandicFinance.Global</a></p>
                                        <p className="break-all"><span className="font-semibold">Commercial register:</span> <a href="https://hkg.Databasesets.com/en/gongsimingdan/number/79325926" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">https://hkg.Databasesets.com/en/gongsimingdan/number/79325926</a></p>
                                    </div>
                                </div>

                                {/* Contact 2 */}
                                <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-100">
                                    <p className="text-sm font-semibold mb-1 text-neutral-500">in cooperation with</p>
                                    <p className="font-bold">SCANDIC ASSETS FZCO</p>
                                    <p>Dubai Silicon Oasis DDP Building A1/A2</p>
                                    <p>Dubai, 342001, United Arab Emirates</p>
                                    <div className="mt-3 space-y-1">
                                        <p><span className="font-semibold">Telephone:</span> +971 56 929 86 – 90</p>
                                        <p><span className="font-semibold">Email:</span> <a href="mailto:Info@ScandicAssets.dev" className="text-primary-600 hover:underline">Info@ScandicAssets.dev</a></p>
                                        <p className="break-all"><span className="font-semibold">Commercial register:</span> <a href="https://dieza.my.site.com/diezaqrverify/validateqr?id=001NM00000K2u4FYAR&masterCode=CERTIFICATE_OF_FORMATION&relatedToId=a1MNM000004ddaI2AQ" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline text-xs">https://dieza.my.site.com/diezaqrverify/validateqr?id=001NM00000K2u4FYAR&masterCode=CERTIFICATE_OF_FORMATION&relatedToId=a1MNM000004ddaI2AQ</a></p>
                                    </div>
                                </div>

                                {/* Contact 3 */}
                                <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-100">
                                    <p className="text-sm font-semibold mb-1 text-neutral-500">in cooperation with</p>
                                    <p className="font-bold">SCANDIC TRUST GROUP LLC</p>
                                    <p>IQ Business Centre, Bolsunovska Street 13 – 15</p>
                                    <p>01014 Kyiv, Ukraine</p>
                                    <div className="mt-3 space-y-1">
                                        <p><span className="font-semibold">Telephone HQ UK, London:</span> +44 7470 86 92 – 60</p>
                                        <p><span className="font-semibold">Email:</span> <a href="mailto:Info@ScandicTrust.com" className="text-primary-600 hover:underline">Info@ScandicTrust.com</a></p>
                                        <p className="break-all"><span className="font-semibold">Commercial register extract:</span> <a href="https://LegierGroup.com/Scandic_Trust_Group_LLC_Extract_from_the_Unified_State_Register.pdf" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline text-xs">https://LegierGroup.com/Scandic_Trust_Group_LLC_Extract_from_the_Unified_State_Register.pdf</a></p>
                                    </div>
                                </div>

                                {/* Contact 4 */}
                                <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-100">
                                    <p className="text-sm font-semibold mb-1 text-neutral-500">in cooperation with</p>
                                    <p className="font-bold">LEGIER BETEILIGUNGS GMBH</p>
                                    <p>Kurfürstendamm 14</p>
                                    <p>10719 Berlin, Federal Republic of Germany</p>
                                    <div className="mt-3 space-y-1">
                                        <p>Commercial register number Berlin: HRB 57837</p>
                                        <p><span className="font-semibold">Telephone:</span> +49 (0) 30 9921134 – 69</p>
                                        <p><span className="font-semibold">Email:</span> <a href="mailto:Office@LegierGroup.com" className="text-primary-600 hover:underline">Office@LegierGroup.com</a></p>
                                        <p className="break-all"><span className="font-semibold">Commercial register:</span> <a href="https://www.Handelsregister.de/rp_web/normalesuche/welcome.xhtml" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">https://www.Handelsregister.de/rp_web/normalesuche/welcome.xhtml</a></p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Additional Legal Notice */}
                        <section className="bg-neutral-900 text-neutral-300 p-6 rounded-xl">
                            <h3 className="text-lg font-bold text-white mb-2">Legal notice:</h3>
                            <p>
                                SCANDIC ASSETS FZCO, LEGIER Beteiligungs Gesellschaft mit beschränkter Haftung and SCANDIC TRUST GROUP LLC act as non-operational service providers. All operational and responsible activities are carried out by SCANDIC FINANCE GROUP LIMITED, Hong Kong, Special Administrative Region of the People's Republic of China.
                            </p>
                            <p className="mt-4 text-white">
                                Our team will process your enquiry promptly and take steps to resolve any issues identified. We aim to respond within a maximum of five working days.
                            </p>
                        </section>

                        {/* Ongoing Commitment */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 text-neutral-900 border-b border-neutral-200 pb-2">Ongoing commitment to accessibility</h2>
                            <p>
                                Accessibility is a dynamic process. Despite our efforts to achieve full compliance with the standards mentioned, isolated barriers may occur. We conduct regular audits, both internally and by external experts, and use modern testing tools such as screen readers (e.g. NVDA, VoiceOver) and contrast checkers to identify and remedy weaknesses. Our development team is continuously trained in the latest accessibility practices, and we are committed to constantly optimising our website to meet the needs of all users.
                            </p>
                        </section>

                        {/* Publication and Updating */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 text-neutral-900 border-b border-neutral-200 pb-2">Publication and updating</h2>
                            <p>
                                This notice is prominently placed in the footer and on a dedicated accessibility page to ensure maximum visibility and accessibility. It is regularly reviewed and updated to reflect changes in legal requirements, technical standards or our accessibility measures.
                            </p>
                            <p className="mt-4 font-semibold">
                                We thank you for your support and understanding as we work together to create a more inclusive digital world.
                            </p>
                            <p className="mt-4 text-neutral-500">
                                Last updated on 1 January 2026.
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default Accessibility;
