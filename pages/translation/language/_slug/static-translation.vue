<template>
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/translation/language" class="cancel button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
				<span>Back</span>
			</nuxt-link>
		</div>

		<ValidationObserver tag="div" ref="form">
			<form id="form" class="form mb seventy" @submit.prevent="submit()">
				<div class="box mb">
					<div class="top_box">
						<h2>Static Translation of {{ res.name }}</h2>
						<p class="description">Don't remove the html element in English translation when translating to {{ res.name }} translation</p>
					</div>
					<div class="bottom_box">
						<div class="group_inline nmb two">
							<div class="group bordered">
								<label class="label l">{{ res.name }} Translation</label>
							</div>
							<div class="group bordered">
								<label class="label l">English Translation</label>
							</div>
						</div>
						<!-- header title  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Header Title</label>
								<textarea name="header_title" class="input" rows="1" v-model="form_data.header_title"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.header_title }}
								</div>
							</div>
						</div>
						<!-- dropdown label  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Dropdown Label</label>
								<textarea name="dropdown_label" class="input" rows="1" v-model="form_data.dropdown_label"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.dropdown_label }}
								</div>
							</div>
						</div>
						<!-- download  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Download</label>
								<textarea name="download" class="input" rows="1" v-model="form_data.download"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.download }}
								</div>
							</div>
						</div>
						<!-- infographics title  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Infographics Title</label>
								<textarea name="infographics_title" class="input" rows="1" v-model="form_data.infographics_title"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.infographics_title }}
								</div>
							</div>
						</div>
						<!-- cultivation  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Cultivation</label>
								<textarea name="cultivation" class="input" rows="1" v-model="form_data.cultivation"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.cultivation }}
								</div>
							</div>
						</div>
						<!-- curing  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Curing</label>
								<textarea name="curing" class="input" rows="1" v-model="form_data.curing"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.curing }}
								</div>
							</div>
						</div>
						<!-- process manufacturing  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Process & Manufacturing</label>
								<textarea name="process_manufacturing" class="input" rows="1" v-model="form_data.process_manufacturing"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.process_manufacturing }}
								</div>
							</div>
						</div>
						<!-- distribution  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Distribution</label>
								<textarea name="distribution" class="input" rows="1" v-model="form_data.distribution"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.distribution }}
								</div>
							</div>
						</div>
						<!-- use  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Use</label>
								<textarea name="use" class="input" rows="1" v-model="form_data.use"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.use }}
								</div>
							</div>
						</div>
						<!-- disposal  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Disposal</label>
								<textarea name="disposal" class="input" rows="1" v-model="form_data.disposal"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.disposal }}
								</div>
							</div>
						</div>
						<!-- waste management  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Waste Management</label>
								<textarea name="waste_management" class="input" rows="1" v-model="form_data.waste_management"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.waste_management }}
								</div>
							</div>
						</div>
						<!-- marine pollution  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Marine Pollution</label>
								<textarea name="marine_pollution" class="input" rows="1" v-model="form_data.marine_pollution"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.marine_pollution }}
								</div>
							</div>
						</div>
						<!-- million  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Million</label>
								<textarea name="million" class="input" rows="1" v-model="form_data.million"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.million }}
								</div>
							</div>
						</div>
						<!-- billion  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Billion</label>
								<textarea name="billion" class="input" rows="1" v-model="form_data.billion"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.billion }}
								</div>
							</div>
						</div>
						<!-- trillion  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Trillion</label>
								<textarea name="trillion" class="input" rows="1" v-model="form_data.trillion"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.trillion }}
								</div>
							</div>
						</div>
						<!-- in usd  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>In USD</label>
								<textarea name="in_usd" class="input" rows="1" v-model="form_data.in_usd"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.in_usd }}
								</div>
							</div>
						</div>
						<!-- cost  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Cost</label>
								<textarea name="cost" class="input" rows="1" v-model="form_data.cost"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.cost }}
								</div>
							</div>
						</div>
						<!-- cigarettes consumed  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Cigarettes Consumed</label>
								<textarea name="cigarettes_consumed" class="input" rows="1" v-model="form_data.cigarettes_consumed"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.cigarettes_consumed }}
								</div>
							</div>
						</div>
						<!-- waste management costs  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Waste Management Costs</label>
								<textarea name="waste_management_costs" class="input" rows="1" v-model="form_data.waste_management_costs"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.waste_management_costs }}
								</div>
							</div>
						</div>
						<!-- consuming  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Consuming</label>
								<textarea name="consuming" class="input" rows="1" v-model="form_data.consuming"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.consuming }}
								</div>
							</div>
						</div>
						<!-- sticks of cigarettes  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Sticks of Cigarettes</label>
								<textarea name="sticks_of_cigarettes" class="input" rows="1" v-model="form_data.sticks_of_cigarettes"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.sticks_of_cigarettes }}
								</div>
							</div>
						</div>
						<!-- produced mainly by  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Produced mainly by</label>
								<textarea name="produced_mainly" class="input" rows="1" v-model="form_data.produced_mainly"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.produced_mainly }}
								</div>
							</div>
						</div>
						<!-- References  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>References</label>
								<textarea name="references" class="input" rows="1" v-model="form_data.references"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.references }}
								</div>
							</div>
						</div>
						<!-- show less  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Show less</label>
								<textarea name="show_less" class="input" rows="1" v-model="form_data.show_less"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.show_less }}
								</div>
							</div>
						</div>
						<!-- show more  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Show more</label>
								<textarea name="show_more" class="input" rows="1" v-model="form_data.show_more"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.show_more }}
								</div>
							</div>
						</div>
						<!-- threat to environment title  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Threat to environment title</label>
								<textarea name="threat_title" class="input" rows="1" v-model="form_data.threat_title"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.threat_title }}
								</div>
							</div>
						</div>
						<!-- threat to environment paragraph 1  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Threat to environment paragraph 1</label>
								<textarea name="threat_p_1" class="input" rows="1" v-model="form_data.threat_p_1"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.threat_p_1 }}
								</div>
							</div>
						</div>
						<!-- threat to environment paragraph 2  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Threat to environment paragraph 2</label>
								<textarea name="threat_p_2" class="input" rows="2" v-model="form_data.threat_p_2"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.threat_p_2 }}
								</div>
							</div>
						</div>
						<!-- threat to environment paragraph 3  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Threat to environment paragraph 3</label>
								<textarea name="threat_p_3" class="input" rows="2" v-model="form_data.threat_p_3"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.threat_p_3 }}
								</div>
							</div>
						</div>
						<!-- threat to environment paragraph 4  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Threat to environment paragraph 4</label>
								<textarea name="threat_p_4" class="input" rows="2" v-model="form_data.threat_p_4"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.threat_p_4 }}
								</div>
							</div>
						</div>
						<!-- threat to environment paragraph 5  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Threat to environment paragraph 5</label>
								<textarea name="threat_p_5" class="input" rows="2" v-model="form_data.threat_p_5"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.threat_p_5 }}
								</div>
							</div>
						</div>
						<!-- threat to environment paragraph 6  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Threat to environment paragraph 6</label>
								<textarea name="threat_p_6" class="input" rows="3" v-model="form_data.threat_p_6"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.threat_p_6 }}
								</div>
							</div>
						</div>
						<!-- threat to environment paragraph 7  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Threat to environment paragraph 7</label>
								<textarea name="threat_p_7" class="input" rows="3" v-model="form_data.threat_p_7"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.threat_p_7 }}
								</div>
							</div>
						</div>
						<!-- threat to environment paragraph 8  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Threat to environment paragraph 8</label>
								<textarea name="threat_p_8" class="input" rows="4" v-model="form_data.threat_p_8"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.threat_p_8 }}
								</div>
							</div>
						</div>
						<!-- threat to environment paragraph 9  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Threat to environment paragraph 9</label>
								<textarea name="threat_p_9" class="input" rows="4" v-model="form_data.threat_p_9"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.threat_p_9 }}
								</div>
							</div>
						</div>
						<!-- cost estimation paragraph 1  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Cost estimation paragraph 1</label>
								<textarea name="cost_p_1" class="input" rows="3" v-model="form_data.cost_p_1"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.cost_p_1 }}
								</div>
							</div>
						</div>
						<!-- cost estimation paragraph 2  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Cost estimation paragraph 2</label>
								<textarea name="cost_p_2" class="input" rows="4" v-model="form_data.cost_p_2"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.cost_p_2 }}
								</div>
							</div>
						</div>
						<!-- cost estimation paragraph 3  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Cost estimation paragraph 3</label>
								<textarea name="cost_p_3" class="input" rows="1" v-model="form_data.cost_p_3"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.cost_p_3 }}
								</div>
							</div>
						</div>
						<!-- cost estimation paragraph 4  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Cost estimation paragraph 4</label>
								<textarea name="cost_p_4" class="input" rows="2" v-model="form_data.cost_p_4"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.cost_p_4 }}
								</div>
							</div>
						</div>
						<!-- so-called csr title  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>So-Called CSR Title</label>
								<textarea name="example_title" class="input" rows="1" v-model="form_data.example_title"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.example_title }}
								</div>
							</div>
						</div>
						<!-- so-called csr paragraph 1  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>So-Called CSR paragraph 1</label>
								<textarea name="example_p_1" class="input" rows="10" v-model="form_data.example_p_1"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.example_p_1 }}
								</div>
							</div>
						</div>
						<!-- so-called csr paragraph 2  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>So-Called CSR paragraph 2</label>
								<textarea name="example_p_2" class="input" rows="6" v-model="form_data.example_p_2"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.example_p_2 }}
								</div>
							</div>
						</div>
						<!-- so-called csr paragraph 3  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>So-Called CSR paragraph 3</label>
								<textarea name="example_p_3" class="input" rows="2" v-model="form_data.example_p_3"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.example_p_3 }}
								</div>
							</div>
						</div>
						<!-- so-called csr paragraph 4  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>So-Called CSR paragraph 4</label>
								<textarea name="example_p_4" class="input" rows="3" v-model="form_data.example_p_4"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.example_p_4 }}
								</div>
							</div>
						</div>
						<!-- recommendations title  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Recommendations title</label>
								<textarea name="reco_title" class="input" rows="1" v-model="form_data.reco_title"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.reco_title }}
								</div>
							</div>
						</div>
						<!-- recommendations paragraph 1  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Recommendations paragraph 1</label>
								<textarea name="reco_p_1" class="input" rows="6" v-model="form_data.reco_p_1"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.reco_p_1 }}
								</div>
							</div>
						</div>
						<!-- recommendations paragraph 2  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Recommendations paragraph 2</label>
								<textarea name="reco_p_2" class="input" rows="7" v-model="form_data.reco_p_2"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.reco_p_2 }}
								</div>
							</div>
						</div>
						<!-- recommendations paragraph 3  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Recommendations paragraph 3</label>
								<textarea name="reco_p_3" class="input" rows="4" v-model="form_data.reco_p_3"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.reco_p_3 }}
								</div>
							</div>
						</div>
						<!-- recommendations paragraph 4  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Recommendations paragraph 4</label>
								<textarea name="reco_p_4" class="input" rows="4" v-model="form_data.reco_p_4"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.reco_p_4 }}
								</div>
							</div>
						</div>
						<!-- recommendations paragraph 5  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Recommendations paragraph 5</label>
								<textarea name="reco_p_5" class="input" rows="3" v-model="form_data.reco_p_5"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.reco_p_5 }}
								</div>
							</div>
						</div>
						<!-- recommendations paragraph 6  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Recommendations paragraph 6</label>
								<textarea name="reco_p_6" class="input" rows="10" v-model="form_data.reco_p_6"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.reco_p_6 }}
								</div>
							</div>
						</div>
						<!-- Marine Pollution modal content  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Marine Pollution modal content</label>
								<textarea name="marine_modal" class="input" rows="13" v-model="form_data.marine_modal"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.marine_modal }}
								</div>
							</div>
						</div>
						<!-- Waste Management modal content  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Waste Management modal content</label>
								<textarea name="waste_modal" class="input" rows="8" v-model="form_data.waste_modal"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.waste_modal }}
								</div>
							</div>
						</div>
						<!-- Partial Cost modal content  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Partial Cost modal content</label>
								<textarea name="partial_modal" class="input" rows="9" v-model="form_data.partial_modal"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.partial_modal }}
								</div>
							</div>
						</div>
						<!-- Back to main site  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Back to main site</label>
								<textarea name="back_to_main_site" class="input" rows="1" v-model="form_data.back_to_main_site"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.back_to_main_site }}
								</div>
							</div>
						</div>
						<!-- Deaths  -->
						<div class="group_inline two">
							<div class="group bordered">
								<label>Deaths</label>
								<textarea name="deaths" class="input" rows="1" v-model="form_data.deaths"></textarea>
							</div>
							<div class="group viewing">
								<div class="field-input pt20">
									{{ default_data.deaths }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="buttons fixed">
					<nuxt-link to="/" class="cancel button half_width btn lg">Cancel</nuxt-link>
					<button type="submit" class="success button half_width btn lg pointer">Submit</button>
				</div>
			</form>
		</ValidationObserver>
	</div>
</template>

<script>
	export default {
		data: ({ $moment, $route }) => ({
			loaded: false,
			default_data: {
				header_title: "Country Fact Sheet",
				dropdown_label: "Choose a Country",
				download: "Download",
				infographics_title: "The estimated cost of tobacco product waste that accumulates in the",
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
				in_usd: "IN USD",
				cost: "Cost",
				cigarettes_consumed: "Cigarettes Consumed",
				waste_management_costs: "Waste Management Costs",
				consuming: "consuming",
				sticks_of_cigarettes: "sticks of cigarettes",
				produced_mainly: "produced mainly by",
				references: "References",
				show_less: "SHOW LESS",
				show_more: "SHOW MORE",
				threat_title: "Tobacco: Threat to the Environment",
				threat_p_1: "Throughout its lifecycle, tobacco has a negative environmental impact:",
				threat_p_2: "Clearing lands and burning plant residues lead to <b>deforestation</b>, while agrochemicals /pesticides pollute waterways and poison fishes",
				threat_p_3: "Burning firewood to cure leaves causes <b>deforestation and water scarcity</b>",
				threat_p_4: "Processes involve use of toxic chemicals, and emission of greenhouse gases & other waste",
				threat_p_5: "Greenhouse gases are emitted during transport",
				threat_p_6: "Toxic residue from tobacco smoke lingers in the environment ( <b>indoor particulate matter</b> concentrations are 10x higher than diesel car exhausts)",
				threat_p_7: "<ul><li>Cigarette butts are some of the most littered item on earth and tobacco product packaging yields 2 million <b>tons of solid waste</b></li></ul>",
				threat_p_8: "<ul><li>Over 1/3 of butt litter wind up in the oceans and <b>19-38% of total debris</b> in ocean clean-ups are cigarette butts</li> <li>Environmental toxins leach from butts inducing <b>long term harm to marine life.</b></li></ul>",
				threat_p_9: "<span>Cigarettes</span> are also the most common cause of <b>accidental fires</b> and toxic <b>third hand smoke</b> materials pollute the environment",
				cost_p_1: "Estimates are derived from ICCD, Beaumont et al and World Bank data. Marine pollution data are conservative estimates",
				cost_p_2: "This reflects some of the environmental costs under “ Disposal.” This does NOT INCLUDE costs of deforestation and greenhouse gas emissions during “Production & Distribution; ” toxic air pollution during “Use,” accidental fires and other waste during “Disposal”",
				cost_p_3: "Added to environmental harms are",
				cost_p_4: "<span> Cigarettes Consumed</span> each year in <span>economic losses</span> from",
				example_title: "Tobacco Industry’s So-Called CSR",
				example_p_1: "Cigarette is the only consumer product that, if used as intended, kills half of its consumers. Tobacco kills 8 million people annually, far more than weapons and natural disasters, combined. And the tobacco industry is known to obscure the harms it causes through so-called corporate social responsibility activities (CSR) to divert attention from tobacco’s devastating impact. Tobacco companies’ activities tend to shift the blame of environmental harm to consumers and drown out voices of farmers and workers impacted by environmental and health harms.",
				example_p_2: "According to the WHO Framework Convention on Tobacco Control, <b>the tobacco industry must be prohibited from promoting its so-called CSR activities. Governments must not give the tobacco industry a seat at the table.</b> Over 60 governments specifically ban sponsorship activities of the tobacco industry.",
				example_p_3: "WHO Framework Convention on Tobacco Control is adopted by 182 governments (fine print)",
				example_p_4: "Limit interactions with the tobacco industry unless strictly necessary for regulations",
				reco_title: "Recommendations",
				reco_p_1: "The tobacco industry must be held to account. By the nature of its business, tobacco companies are violating human rights. They have significant control over the product design and supply chains that have caused harms to ocean life and disruption to the ecosystem. The WHO FCTC provides ways forward:",
				reco_p_2: "<span>Price and Tax Measures</span> (Art 6) Require the tobacco industry to pay for negative externalities through increased taxation or fees; several countries impose fees consistent with the polluters pay principle. (For single use plastics, under which cigarette butts fall, some have used an Extended Producer Responsibility (EPR) system to shift to the industry the burden of dealing with product waste.)",
				reco_p_3: "<span>Sponsorship Bans</span> (Art 13): Prohibit so-called CSR of tobacco companies or ban its publicity (if there are constitutional restrictions to a ban) and do not participate in, partner in, or publicize the same",
				reco_p_4: "<span>Economically-Viable Alternatives</span> (Art 17 18) : Adopt and sustainably finance farmer/ worker-driven policies towards diversification and protect these from tobacco industry interference",
				reco_p_5: "<span>Liability</span> (Art 19): Promote international cooperation in holding the tobacco industry liable for harms caused including environmental harms",
				reco_p_6: "<span>Tobacco Industry Interference</span> (Art 5.3): Protect policies from the commercial and vested interests of the tobacco industry; and denormalize so-called CSR of the tobacco companies. <i>Tobacco’s “corporate social responsibility” is an inherent contradiction. When so-called Extended Producer Responsibility (EPR) is applied to the tobacco industry, the latter should not be allowed to publicize the same, make false claims relating to sustainability, or use the same for influencing policy or engaging with governments.</i>",
				marine_modal: "<span>Marine Cost</span> is Cigarette Butts (in Tons) multiplied by Upper Estimate of the annual cost in terms of reduced marine natural capital.” This is conjectured to be conservatively between 3300 to 33000, where the upper limit of 33000 is used in our estimate given the toxic nature of butts (unlike other plastic item) It is assumed that 2/3 of cigarette butts end up in the ocean, hence 2/3 of sticks consumed is applied Basis for the weight of the butts is 3.4g per 20sticks( source). Note also that in developing countries where consumption is highest; wastes are not managed properly and can also end up in oceans.Cigarette volume consumed in Sticks/Million data is from (ICCD and or Atlas)",
				waste_modal: "<span>Waste Management</span> cost includes ( AN list all eg landfill hauling etc) Estimates are derived from WB projected costs for 2025 which differentiates costs for HIC UMIC LMIC LIC per ton. Sticks in millions are converted into tons by assuming that 20 sticks has 3.4g of butt when fully consumed (source) Cigarette volume consumed in Sticks/Million data is from (ICCD and or Atlas)",
				partial_modal: "<span>Partial Cost</span> is an ANNUAL COST which is the sum of Waste Management Cost (World Bank) and Marine Pollution Cost (Beaumont et al). It is called Partial Cost because Marine Pollution costs are conservative estimates and there are other costs that are not incorporated here such as accidental fires. It also excludes production related environmental impact such as deforestation and greenhouse gas emissions or impact of toxic emissions during use.",
				back_to_main_site: "BACK TO MAIN SITE",
				deaths: "Deaths"
			
			},
			form_data: {
				language_id: null,
				header_title: null,
				dropdown_label: null,
				download: null,
				infographics_title: null,
				cultivation: null,
				curing: null,
				process_manufacturing: null,
				distribution: null,
				use: null,
				disposal: null,
				waste_management: null,
				marine_pollution: null,
				billion: null,
				million: null,
				trillion: null,
				in_usd: null,
				cost: null,
				cigarettes_consumed: null,
				waste_management_costs: null,
				consuming: null,
				sticks_of_cigarettes: null,
				produced_mainly: null,
				references: null,
				show_less: null,
				show_more: null,
				threat_title: null,
				threat_p_1: null,
				threat_p_2: null,
				threat_p_3: null,
				threat_p_4: null,
				threat_p_5: null,
				threat_p_6: null,
				threat_p_7: null,
				threat_p_8: null,
				threat_p_9: null,
				cost_p_1: null,
				cost_p_2: null,
				cost_p_3: null,
				cost_p_4: null,
				example_title: null,
				example_p_1: null,
				example_p_2: null,
				example_p_3: null,
				example_p_4: null,
				reco_title: null,
				reco_p_1: null,
				reco_p_2: null,
				reco_p_3: null,
				reco_p_4: null,
				reco_p_5: null,
				reco_p_6: null,
				marine_modal: null,
				waste_modal: null,
				partial_modal: null,
				back_to_main_site: null,
				deaths: null,
			},
			res: {}
		}),
		methods: {
			submit () {
				const me = this
				me.$refs.form.validate().then(success => {
					if (!success) {
						me.$scrollTo('.validate', {
							offset: -250
						})
						return
					} else {
						me.toggleModalStatus({ type: 'loader', status: true })
						let form_data = new FormData()
						let api = ''
						me.form_data.language_id = me.res.id
						if (me.res.static_translation != null) {
							api = `v2/admin/static-translation/update/${me.res.static_translation.id}`
						}
						else {
							api = `v2/admin/static-translation/create`
						}

						me.$axios.post(api, me.form_data).then(res => {
							me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been updated!' })
							me.$nuxt.refresh()
						}).catch(err => {
							me.toggleModalStatus({ type: 'catcher', status: true, item: { errors: err.response.data.errors } })
						}).then(() => {
							setTimeout( () => {
								me.toggleModalStatus({ type: 'loader', status: false })
							}, 500)
						})
						console.log(api)
					}
					me.$nextTick(() => {
						me.$refs.form.reset()
					})
				})
			}
		},
		mounted () {
			const me = this
			me.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				me.toggleModalStatus({ type: 'loader', status: false })
				me.loaded = true
			}, 500)
		},
		asyncData ({ $axios, store, error, params }) {
			store.commit('global/settings/populateTitle', { title: 'Language' })

			return $axios.$get(`v2/admin/static-translation/info/${params.slug}?type=language_id`).then(({ res }) => {
				if (res.static_translation != null) {
					let form_data = {
						header_title: res.static_translation.content_fields.header_title,
						dropdown_label: res.static_translation.content_fields.dropdown_label,
						download: res.static_translation.content_fields.download,
						infographics_title: res.static_translation.content_fields.infographics_title,
						cultivation: res.static_translation.content_fields.cultivation,
						curing: res.static_translation.content_fields.curing,
						process_manufacturing: res.static_translation.content_fields.process_manufacturing,
						distribution: res.static_translation.content_fields.distribution,
						use: res.static_translation.content_fields.use,
						disposal: res.static_translation.content_fields.disposal,
						waste_management: res.static_translation.content_fields.waste_management,
						marine_pollution: res.static_translation.content_fields.marine_pollution,
						billion: res.static_translation.content_fields.billion,
						million: res.static_translation.content_fields.million,
						trillion: res.static_translation.content_fields.trillion,
						in_usd: res.static_translation.content_fields.in_usd,
						cost: res.static_translation.content_fields.cost,
						cigarettes_consumed: res.static_translation.content_fields.cigarettes_consumed,
						waste_management_costs: res.static_translation.content_fields.waste_management_costs,
						consuming: res.static_translation.content_fields.consuming,
						sticks_of_cigarettes: res.static_translation.content_fields.sticks_of_cigarettes,
						produced_mainly: res.static_translation.content_fields.produced_mainly,
						references: res.static_translation.content_fields.references,
						show_less: res.static_translation.content_fields.show_less,
						show_more: res.static_translation.content_fields.show_more,
						threat_title: res.static_translation.content_fields.threat_title,
						threat_p_1: res.static_translation.content_fields.threat_p_1,
						threat_p_2: res.static_translation.content_fields.threat_p_2,
						threat_p_3: res.static_translation.content_fields.threat_p_3,
						threat_p_4: res.static_translation.content_fields.threat_p_4,
						threat_p_5: res.static_translation.content_fields.threat_p_5,
						threat_p_6: res.static_translation.content_fields.threat_p_6,
						threat_p_7: res.static_translation.content_fields.threat_p_7,
						threat_p_8: res.static_translation.content_fields.threat_p_8,
						threat_p_9: res.static_translation.content_fields.threat_p_9,
						cost_p_1: res.static_translation.content_fields.cost_p_1,
						cost_p_2: res.static_translation.content_fields.cost_p_2,
						cost_p_3: res.static_translation.content_fields.cost_p_3,
						cost_p_4: res.static_translation.content_fields.cost_p_4,
						example_title: res.static_translation.content_fields.example_title,
						example_p_1: res.static_translation.content_fields.example_p_1,
						example_p_2: res.static_translation.content_fields.example_p_2,
						example_p_3: res.static_translation.content_fields.example_p_3,
						example_p_4: res.static_translation.content_fields.example_p_4,
						reco_title: res.static_translation.content_fields.reco_title,
						reco_p_1: res.static_translation.content_fields.reco_p_1,
						reco_p_2: res.static_translation.content_fields.reco_p_2,
						reco_p_3: res.static_translation.content_fields.reco_p_3,
						reco_p_4: res.static_translation.content_fields.reco_p_4,
						reco_p_5: res.static_translation.content_fields.reco_p_5,
						reco_p_6: res.static_translation.content_fields.reco_p_6,
						marine_modal: res.static_translation.content_fields.marine_modal,
						waste_modal: res.static_translation.content_fields.waste_modal,
						partial_modal: res.static_translation.content_fields.partial_modal,
						back_to_main_site: res.static_translation.content_fields.back_to_main_site,
						deaths: res.static_translation.content_fields.deaths,
					}
					return {
						res: res,
						form_data: form_data
					}
				}
				else {
					return {
						res: res
					}
				}

			}).catch(({ response: { data: { errors } } }) => {
				error({ statusCode: 404, message: 'Page not found' })
			})
		}
	}
</script>
