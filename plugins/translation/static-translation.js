export default {
  data: ({ $moment, $route }) => ({
    loaded: false,
    form_data: {},
    res: {},
    default_data: {
      header_title: "Country Briefing",
      dropdown_label: "Choose a country brief",
      download: "Download",
      download_sub_text: "the Country Brief",
      share_infographics_title: "The estimated cost of tobacco product waste that accumulates in the",
      infographics_title: "How should tobacco companies pay for their pollution in",
      cultivation: "Cultivation",
      curing: "Curing",
      process_manufacturing: "Process & Manufacturing",
      distribution: "Distribution",
      use: "Use",
      disposal: "Disposal",
      waste_management: "Waste Management",
      marine_pollution: "Marine Pollution",
      billion: "Billion",
      million: "Million",
      trillion: "Trillion",
      link_copied: "Link Copied",
      show_less: "Show Less",
      show_more: "Show More",
      back_to_main_site: "BACK TO MAIN SITE",
      search_country: "Search Country",
      no_country_found: "No Country Found.",

      // popup modals
      popup_title: 'Pop ups',
      curing_popup: "Annually, an estimated 11.4 million metric tons of wood are required for tobacco curing. Together, tobacco cultivation and curing account for 5% of global deforestation.",
      cultivation_popup: "Tobacco causes soil erosion because it is usually planted as a single or monocrop, leaving the topsoil poorly protected from wind and water. With 90% of all tobacco-producing land on the continent, the Miombo ecosystem is a global hotspot for tobacco-related deforestation. ",
      processing_popup: "Tobacco manufacturing is the most environmentally damaging step of tobacco production and involves high environmental costs incurred due to the use of large amounts of energy, water and other resources, toxic chemicals, greenhouse gases emitted, and other waste generated.",
      disposal_popup: "Cigarette butts, by far, are the most littered items on earth. Tobacco product packaging also yields 2 million tons of solid waste annually, in addition to all other tobacco product waste.",
      distribution_popup: "In addition to extensive transportation costs, finished packs of cigarettes are usually delivered to their point of sale usually via diesel-driven trucks- diesel gas is a known carcinogen.",
      use_popup: "Tobacco smoke emits thousands of metric tons of toxicants like formaldehyde, nicotine and three major greenhouse gases- carbon dioxide, methane, and nitrous oxides.",
      marine_pollution_popup_p_1: "Marine Pollution or “ecosystem cost over the lifetime of the plastic” refers to the loss of the benefit of ecosystems to humans such as support of food chain, animal or plant harvest, provision of scenic views, hence this involves economic value derived from tourism and aquaculture, among others.",
      marine_pollution_popup_p_2: "For simplicity, the median ofUSD204,270 and USD408,541 (WWF, 2021) representing the ocean’s ecosystem losses per ton of plastic is used. The amount of tobacco product plastics are based on the volume of consumption (Tobacco Atlas, 2018) multiplied by the estimated weight of plastic packaging components and cigarette butts. The amount of plastics leaking into the ocean was adopted from OECD’s Global Plastics Outlook 2022, taking into consideration the higher estimates based on beach clean-up data.",
      waste_management_popup: `The current cost of waste management is the volume of tobacco product waste based on consumption volume <a href="https://files.tobaccoatlas.org/wp-content/uploads/2018/03/TobaccoAtlas_6thEdition_LoRes.pdf" target="_blank">(Tobacco Atlas, 2018)</a> multiplied by the World Bank-projected waste management costs: LIC (x) LMIC (x) UMIC (x) HIC (USD340 per ton, 98%) The percentage refers to collection efficiency. To generate the projected expense to collect the fraction that remains to be collected. The volume of tobacco packaging and cigarette butts is multiplied by a higher cost, an annualized “benchmark cost” estimated by <a href="https://www.oecd.org/publications/the-cost-of-preventing-ocean-plastic-pollution-5c41963b-en.htm" target="_blank">OECD WD, 2022</a>.`,
      partial_cost_popup: `Marine Pollution Cost per year is added to the Waste Management Cost per year. Marine Pollution costs represent ecosystem losses that, according to WWF, are likely underestimated. Waste Management costs represent the current cost of the collection plus the anticipated cost of collecting the fraction of waste that remains uncollected. Costs are estimated based on country reporting (<a href="https://datatopics.worldbank.org/what-a-waste/" target="_blank">World Bank, OECD</a>), but for countries where data are unavailable, estimates based on income classification are used.`,

      // threat to environment section
      threat_title: "Tobacco: Threat to the Environment",
      threat_p_1: "Tobacco products damage the environment at every stage of their lifecycle:",
      threat_p_2: "Clearing lands and burning plant residues lead to <b>deforestation</b>, while agrochemicals/pesticides pollute waterways and poison fishes.",
      threat_p_3: "Burning firewood to cure leaves causes deforestation and <b>water scarcity.</b>",
      threat_p_4: "Processes involve use of toxic chemicals, and emission of <b>greenhouse gases</b> & other waste.",
      threat_p_5: "Greenhouse gases are emitted during transport.",
      threat_p_6: "Toxic residue from tobacco smoke lingers in the environment ( <b>indoor particulate matter</b> concentrations are 10x higher than diesel car exhausts).",
      threat_p_7: "Cigarettes are also the most common cause of <b>accidental fires</b> and toxic <b>third hand smoke</b> materials pollute the environment.",
      threat_p_8: "Cigarette butts are some of the most littered items on earth and tobacco product packaging yields 2 million <b>tons of solid waste annually.</b>",
      threat_p_9: "Over 1/3 of cigarette butt litter wind up in the oceans and <b>19-38% of total debris</b> in ocean clean-ups are cigarette butts.",
      threat_p_10: "Environmental toxins leach from butts inducing <b>long term harm to marine life.",

      // cost estimation
      cost_per_year: "per year",
      cost_sub_title: "On Marine Pollution and Waste Management",

      cost_explanation_p_1: "The Marine Pollution & Waste Management Costs of Tobacco Product Packaging and Cigarette Butts represent a conservative estimate of some quantifiable impact of tobacco product waste, a small part of the overall environmental damage.",
      cost_explanation_p_2: "Marine Pollution or “ecosystem cost over the lifetime of the plastic” is based on the plastic content of tobacco packages and filters but does not account for the latter’s hazardous nature. (WWF Est: USD204,270-408,541USD/ton)",
      cost_explanation_p_3: "Waste management or “municipal solid waste management cost” includes collection, recycling, energy recovery, and landfill/ dumpsite. (World Bank) Current costs may or may not include litter management, which is likely significant because tobacco product waste accounts for 25%-40% of all global litter. Since not all waste is currently collected, the cost of managing the balance of the waste is added. For this, “benchmark costs” (OECD 2022) are used.",
      cost_added_harms: "Added to environmental harms are",
      cost_deaths: "Deaths",
      cost_and: "and",
      cost_far_more: "FAR MORE",
      cost_each_year: "each year",
      cost_in: "in",
      cost_economic_losses: "ECONOMIC LOSSES",
      cost_consuming: "consuming",
      cost_from: "from",
      cost_sticks: "Sticks",
      cost_produced_mainly_by: "produced mainly by",

      // tobaccco industry csr
      tobacco_industry_title: "Tobacco Industry’s So-Called Corporate Social Responsibility (CSR)",
      tobacco_industry_p_1: "The cigarette is the only consumer product that, if used as intended, kills half of its consumers. Tobacco kills 8 million people annually, far more than weapons and natural disasters, combined. And the tobacco industry is known to obscure the harms it causes by undertaking so-called corporate social responsibility activities (CSR) to divert attention from tobacco’s devastating impact. Tobacco companies’ activities tend to shift the blame for environmental harms to consumers and drown out the voices of farmers and workers who are adversely affected.",
      tobacco_industry_p_2: "According to the WHO Framework Convention on Tobacco Control (WHO FCTC), the tobacco industry must be prohibited from promoting its so-called CSR activities. Governments must not give the tobacco industry a seat at the table. Over 100 governments prohibit the publicity of so-called CSR activities of the tobacco companies/industry.",

      // recommendations
      recommendations_title: "Recommendations",
      recommendations_p_1: "The tobacco industry must be held to account. By the nature of its business, tobacco companies are violating human rights including the right to health and a clean environment. They have significant control over the product design and supply chains that cause harm to ocean life and disruption to the ecosystem.",
      recommendations_p_2: "The estimates herein are but a starting point to quantifying certain aspects of tobacco’s environmental costs. Further research is needed for a more comprehensive valuation, including indirect costs and other forms of pollution (greenhouse gas emissions, deforestation, etc.). In the meantime, countries should:",
      recommendations_item_1: "<span>Price and Tax Measures:</span> Require the tobacco industry to pay for negative externalities through increased taxation or fees; several countries impose fees consistent with the polluters pay principle. Significant tax increases are proven to reduce tobacco use.",
      recommendations_item_2: "<span>Sponsorship Bans:</span> Prohibit and reject so-called CSR activities of the tobacco industry and, if there are constitutional restrictions to a ban, restrict its publicity. Do not allow the tobacco industry to use so-called “stewardship” or “extended producer responsibility” principles to gain a seat at the table, undermine tobacco sponsorship bans, or undermine tobacco control.",
      recommendations_item_3: "<span>Cessation:</span> Promote the reduction of tobacco use and provide support for the treatment of tobacco dependence.",
      recommendations_item_4: "<span>Economically-Viable Alternatives:</span> Adopt and sustainably finance farmer/ worker-driven policies towards diversification (to shift away from tobacco-growing), and protect these from tobacco industry interference.",
      recommendations_item_5: "<span>Liability:</span> Promote international cooperation in holding the tobacco industry liable for harms caused including environmental harms.",
      recommendations_item_6: "<span>Tobacco Industry Interference:</span> Protect policies from the commercial and vested interests of the tobacco industry and denormalize the so-called CSR of the tobacco companies. Require a range of information from the tobacco industry to enhance tobacco control and environmental regulation.",

      // references
      references_title: "References",
      references_item_1: `<a href="http://apps.who.int/iris/bitstream/handle/10665/42811/9241591013.pdf?sequence=1" target="_blank">WHO Framework Convention on Tobacco Control</a> Article 5.3, Article 6, Article 13, Article 14 and Articles 17 & 18, WHO FCTC, 2003`,
      references_item_2: `<a href="https://www.wwfdrc.org/en/?36252/The-hidden-cost-of-plastic" target="_blank">The Hidden Cost of Plastic, </a>World Wide Fund for Nature, 2021`,
      references_item_3: `<a href="https://datatopics.worldbank.org/what-a-waste/" target="_blank">What a Waste 2.0: A Global Snapshot of Solid Waste Management to 2050</a>, The World Bank, 2018`,
      references_item_4: `<a href="https://www.oecd.org/publications/the-cost-of-preventing-ocean-plastic-pollution-5c41963b-en.htm" target="_blank">The Cost of Preventing Ocean Plastic Pollution, </a>OECD Environment Working Papers, 2022`,
      references_item_5: `<a href="https://files.tobaccoatlas.org/wp-content/uploads/2018/03/TobaccoAtlas_6thEdition_LoRes.pdf" target="_blank">The Tobacco Atlas</a>, American Cancer Society and Vital Strategies, 2018`,
      references_item_6: `<a href="https://globaltobaccoindex.org/" target="_blank">Global Tobacco Industry Interference Index</a>, STOP, 2021`,
      references_item_7: `<a href="https://www.who.int/publications/i/item/9789240032095" target="_blank">WHO Report on the Global Tobacco Epidemic 2021: Addressing New and Emerging Products</a>, World Health Organization, 2021`,
      references_item_8: `<a href="https://apps.who.int/iris/bitstream/handle/10665/255574/9789241512497-eng.pdf" target="_blank">Tobacco and its Environmental Impact: An Overview</a>, World Health Organization, 2017`,
      references_item_9: `Novotny TE, Slaughter E.<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4129234/" target="_blank"> Tobacco Product Waste: An Environmental Approach to Reduce Tobacco Consumption, </a>Curr Environ Health Rep., 2014`,
      references_item_10: `<a href="https://doi.org/10.1787/de747aef-en" target="_blank">Global Plastics Outlook: Economic Drivers, Environmental Impacts and Policy Options</a>, OECD, 2022`,
      references_item_11: `Tobacco’s Toxic Plastics: A Global Outlook, Global Center for Good Governance in Tobacco Control, 2022`,

      // acknowledgement
      acknowledgement_title: 'Acknowledgement',
    },
    static_translation_options: {
      cultivation: {
        label_desc: 'Maximum of 8 characters, if exceeded it will cut the text and add elipsis',
        textarea_size: '1',
      },
      curing: {
        label_desc: 'Maximum of 7 characters, if exceeded it will cut the text and add elipsis',
        textarea_size: '1',
      },
      process_manufacturing: {
        label_desc: 'Maximum of 23 characters, if exceeded it will cut the text and add elipsis',
        textarea_size: '1',
      },
      distribution: {
        label_desc: 'Maximum of 10 characters, if exceeded it will cut the text and add elipsis',
        textarea_size: '1',
      },
      use: {
        label_desc: 'Maximum of 7 characters, if exceeded it will cut the text and add elipsis',
        textarea_size: '1',
      },
      disposal: {
        label_desc: 'Maximum of 10 characters, if exceeded it will cut the text and add elipsis',
        textarea_size: '1',
      },
      waste_management: {
        label_desc: 'Maximum of 18 characters, if exceeded it will cut the text and add elipsis',
        textarea_size: '1',
      },
      marine_pollution: {
        label_desc: 'Maximum of 18 characters, if exceeded it will cut the text and add elipsis',
        textarea_size: '1',
      },
      curing_popup: {
        label_desc: '',
        textarea_size: 5,
      },
      cultivation_popup: {
        label_desc: '',
        textarea_size: 5,
      },
      processing_popup: {
        label_desc: '',
        textarea_size: 5,
      },
      disposal_popup: {
        label_desc: '',
        textarea_size: 5,
      },
      distribution_popup: {
        label_desc: '',
        textarea_size: 5,
      },
      use_popup: {
        label_desc: '',
        textarea_size: 5,
      },
      marine_pollution_popup_p_1: {
        label_desc: '',
        textarea_size: 5,
      },
      marine_pollution_popup_p_2: {
        label_desc: '',
        textarea_size: 8,
      },
      waste_management_popup: {
        label_desc: '',
        textarea_size: 13,
      },
      partial_cost_popup: {
        label_desc: '',
        textarea_size: 8,
      },
      threat_p_2: {
        label_desc: '',
        textarea_size: 2,
      },
      threat_p_3: {
        label_desc: '',
        textarea_size: 2,
      },
      threat_p_4: {
        label_desc: '',
        textarea_size: 2,
      },
      threat_p_5: {
        label_desc: '',
        textarea_size: 2,
      },
      threat_p_6: {
        label_desc: '',
        textarea_size: 2,
      },
      threat_p_7: {
        label_desc: '',
        textarea_size: 2,
      },
      threat_p_8: {
        label_desc: '',
        textarea_size: 2,
      },
      threat_p_9: {
        label_desc: '',
        textarea_size: 2,
      },
      threat_p_10: {
        label_desc: '',
        textarea_size: 2,
      },
      cost_explanation_p_1: {
        label_desc: '',
        textarea_size: 4,
      },
      cost_explanation_p_2: {
        label_desc: '',
        textarea_size: 3,
      },
      cost_explanation_p_3: {
        label_desc: '',
        textarea_size: 7,
      },
      tobacco_industry_p_1: {
        label_desc: '',
        textarea_size: 8,
      },
      tobacco_industry_p_2: {
        label_desc: '',
        textarea_size: 5,
      },
      recommendations_p_1: {
        label_desc: '',
        textarea_size: 5,
      },
      recommendations_p_2: {
        label_desc: '',
        textarea_size: 5,
      },
      recommendations_item_1: {
        label_desc: '',
        textarea_size: 5,
      },
      recommendations_item_2: {
        label_desc: '',
        textarea_size: 5,
      },
      recommendations_item_3: {
        label_desc: '',
        textarea_size: 5,
      },
      recommendations_item_4: {
        label_desc: '',
        textarea_size: 5,
      },
      recommendations_item_5: {
        label_desc: '',
        textarea_size: 5,
      },
      recommendations_item_6: {
        label_desc: '',
        textarea_size: 5,
      },
      references_item_1: {
        label_desc: '',
        textarea_size: 5,
      },
      references_item_2: {
        label_desc: '',
        textarea_size: 5,
      },
      references_item_3: {
        label_desc: '',
        textarea_size: 5,
      },
      references_item_4: {
        label_desc: '',
        textarea_size: 5,
      },
      references_item_5: {
        label_desc: '',
        textarea_size: 5,
      },
      references_item_6: {
        label_desc: '',
        textarea_size: 5,
      },
      references_item_7: {
        label_desc: '',
        textarea_size: 5,
      },
      references_item_8: {
        label_desc: '',
        textarea_size: 5,
      },
      references_item_9: {
        label_desc: '',
        textarea_size: 5,
      },
      references_item_10: {
        label_desc: '',
        textarea_size: 5,
      },
      references_item_11: {
        label_desc: '',
        textarea_size: 5,
      },
    }
  })
}
