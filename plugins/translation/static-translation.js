export default {
  data: ({ $moment, $route }) => ({
    loaded: false,
    form_data: {},
    res: {},
    default_data: {
      header_title: "Country Briefing",
      dropdown_label: "Choose a Country",
      download: "Download",
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
      cost_per_year: "per_year",
      cost_sub_title: "On Marine Pollution and Waste Management",

      cost_explanation_p_1: "The Marine Pollution & Waste Management Costs of Tobacco Product Packaging and Cigarette Butts represent a conservative estimate of some quantifiable impact of tobacco product waste, a small part of the overall environmental damage.",
      cost_explanation_p_2: "Marine Pollution or “ecosystem cost over the lifetime of the plastic” is based on the plastic content of tobacco packages and filters but does not account for the latter’s hazardous nature. (WWF Est: USD204,270-408,541USD/ton)",
      cost_explanation_p_3: "Waste management or “municipal solid waste management cost” includes collection, recycling, energy recovery, and landfill/ dumpsite. (World Bank) Current costs may or may not include litter management, which is likely significant because tobacco product waste accounts for 25%-40% of all global litter. Since not all waste is currently collected, the cost of managing the balance of the waste is added. For this, “benchmark costs” (OECD 2022) are used.",
      cost_added_harms: "Added to environmental harms are",
      deaths: "Deaths",
      and: "and",
      far_more: "FAR MORE",
      each_year: "each year",
      in: "in",
      economic_losses: "economic_losses",
      consuming: "consuming",
      sticks: "Sticks ",

      // cigarettes_consumed: "Cigarettes Consumed",
      // waste_management_costs: "Waste Management Costs",
      // consuming: "consuming",
      // sticks_of_cigarettes: "sticks of cigarettes",
      // produced_mainly: "produced mainly by",
      // references: "References",
      // show_less: "SHOW LESS",
      // show_more: "SHOW MORE",
      // threat_title: "Tobacco: Threat to the Environment",
      // threat_p_1: "Throughout its lifecycle, tobacco has a negative environmental impact:",
      // threat_p_2: "Clearing lands and burning plant residues lead to <b>deforestation</b>, while agrochemicals /pesticides pollute waterways and poison fishes",
      // threat_p_3: "Burning firewood to cure leaves causes <b>deforestation and water scarcity</b>",
      // threat_p_4: "Processes involve use of toxic chemicals, and emission of greenhouse gases & other waste",
      // threat_p_5: "Greenhouse gases are emitted during transport",
      // threat_p_6: "Toxic residue from tobacco smoke lingers in the environment ( <b>indoor particulate matter</b> concentrations are 10x higher than diesel car exhausts)",
      // threat_p_7: "<ul><li>Cigarette butts are some of the most littered item on earth and tobacco product packaging yields 2 million <b>tons of solid waste</b></li></ul>",
      // threat_p_8: "<ul><li>Over 1/3 of butt litter wind up in the oceans and <b>19-38% of total debris</b> in ocean clean-ups are cigarette butts</li> <li>Environmental toxins leach from butts inducing <b>long term harm to marine life.</b></li></ul>",
      // threat_p_9: "<span>Cigarettes</span> are also the most common cause of <b>accidental fires</b> and toxic <b>third hand smoke</b> materials pollute the environment",
      // cost_p_1: "Estimates are derived from ICCD, Beaumont et al and World Bank data. Marine pollution data are conservative estimates",
      // cost_p_2: "This reflects some of the environmental costs under “ Disposal.” This does NOT INCLUDE costs of deforestation and greenhouse gas emissions during “Production & Distribution; ” toxic air pollution during “Use,” accidental fires and other waste during “Disposal”",
      // cost_p_3: "Added to environmental harms are",
      // cost_p_4: "<span> Cigarettes Consumed</span> each year in <span>economic losses</span> from",
      // example_title: "Tobacco Industry’s So-Called CSR",
      // example_p_1: "Cigarette is the only consumer product that, if used as intended, kills half of its consumers. Tobacco kills 8 million people annually, far more than weapons and natural disasters, combined. And the tobacco industry is known to obscure the harms it causes through so-called corporate social responsibility activities (CSR) to divert attention from tobacco’s devastating impact. Tobacco companies’ activities tend to shift the blame of environmental harm to consumers and drown out voices of farmers and workers impacted by environmental and health harms.",
      // example_p_2: "According to the WHO Framework Convention on Tobacco Control, <b>the tobacco industry must be prohibited from promoting its so-called CSR activities. Governments must not give the tobacco industry a seat at the table.</b> Over 60 governments specifically ban sponsorship activities of the tobacco industry.",
      // example_p_3: "WHO Framework Convention on Tobacco Control is adopted by 182 governments (fine print)",
      // example_p_4: "Limit interactions with the tobacco industry unless strictly necessary for regulations",
      // reco_title: "Recommendations",
      // reco_p_1: "The tobacco industry must be held to account. By the nature of its business, tobacco companies are violating human rights. They have significant control over the product design and supply chains that have caused harms to ocean life and disruption to the ecosystem. The WHO FCTC provides ways forward:",
      // reco_p_2: "<span>Price and Tax Measures</span> (Art 6) Require the tobacco industry to pay for negative externalities through increased taxation or fees; several countries impose fees consistent with the polluters pay principle. (For single use plastics, under which cigarette butts fall, some have used an Extended Producer Responsibility (EPR) system to shift to the industry the burden of dealing with product waste.)",
      // reco_p_3: "<span>Sponsorship Bans</span> (Art 13): Prohibit so-called CSR of tobacco companies or ban its publicity (if there are constitutional restrictions to a ban) and do not participate in, partner in, or publicize the same",
      // reco_p_4: "<span>Economically-Viable Alternatives</span> (Art 17 18) : Adopt and sustainably finance farmer/ worker-driven policies towards diversification and protect these from tobacco industry interference",
      // reco_p_5: "<span>Liability</span> (Art 19): Promote international cooperation in holding the tobacco industry liable for harms caused including environmental harms",
      // reco_p_6: "<span>Tobacco Industry Interference</span> (Art 5.3): Protect policies from the commercial and vested interests of the tobacco industry; and denormalize so-called CSR of the tobacco companies. <i>Tobacco’s “corporate social responsibility” is an inherent contradiction. When so-called Extended Producer Responsibility (EPR) is applied to the tobacco industry, the latter should not be allowed to publicize the same, make false claims relating to sustainability, or use the same for influencing policy or engaging with governments.</i>",
      // marine_modal: "<span>Marine Cost</span> is Cigarette Butts (in Tons) multiplied by Upper Estimate of the annual cost in terms of reduced marine natural capital.” This is conjectured to be conservatively between 3300 to 33000, where the upper limit of 33000 is used in our estimate given the toxic nature of butts (unlike other plastic item) It is assumed that 2/3 of cigarette butts end up in the ocean, hence 2/3 of sticks consumed is applied Basis for the weight of the butts is 3.4g per 20sticks( source). Note also that in developing countries where consumption is highest; wastes are not managed properly and can also end up in oceans.Cigarette volume consumed in Sticks/Million data is from (ICCD and or Atlas)",
      // waste_modal: "<span>Waste Management</span> cost includes ( AN list all eg landfill hauling etc) Estimates are derived from WB projected costs for 2025 which differentiates costs for HIC UMIC LMIC LIC per ton. Sticks in millions are converted into tons by assuming that 20 sticks has 3.4g of butt when fully consumed (source) Cigarette volume consumed in Sticks/Million data is from (ICCD and or Atlas)",
      // partial_modal: "<span>Partial Cost</span> is an ANNUAL COST which is the sum of Waste Management Cost (World Bank) and Marine Pollution Cost (Beaumont et al). It is called Partial Cost because Marine Pollution costs are conservative estimates and there are other costs that are not incorporated here such as accidental fires. It also excludes production related environmental impact such as deforestation and greenhouse gas emissions or impact of toxic emissions during use.",
      // back_to_main_site: "BACK TO MAIN SITE",
      // deaths: "Deaths"
    }
  })
}
