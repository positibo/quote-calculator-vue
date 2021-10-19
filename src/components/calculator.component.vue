<template>
 <div class="app">
	<div>
		<AlertComponent v-if="showAlert" v-bind="alertInfo"></AlertComponent>
	</div>
	<div class="calculator">
		<div>
			<div class="input-group">
				<label>Amount (${{ loanDetails.amountRequired }})</label>
				<input type="range" min="2100" max="15000" v-model="loanDetails.amountRequired" />
			</div>
			<div class="input-group">
				<label>Term</label>
				<input type="text" v-model="loanDetails.term"/>
			</div>
			<div class="input-group">
				<label>Title</label>
				<input type="text" v-model="loanDetails.title"/>
			</div>
			<div class="input-group">
				<label>FirstName</label>
				<input type="text" v-model="loanDetails.firstName"/>
			</div>
			<div class="input-group">
				<label>LastName</label>
				<input type="text" v-model="loanDetails.lastName"/>
			</div>
			<div class="input-group">
				<label>Date of Birth</label>
				<input type="text" v-model="loanDetails.dateOfBirth"/>
			</div>
			<div class="input-group">
				<label>Email</label>
				<input type="text" v-model="loanDetails.email"/>
			</div>
			<div class="input-group">
				<label>Mobile</label>
				<input type="text" v-model="loanDetails.mobile"/>
			</div>
			<div>
				<label>Product</label>
				<select v-model="loanDetails.product">
					<option disabled value="">Please select one</option>
					<option v-for="product in products" :value="product.productName" :key="product.productId">{{product.productName}}</option>
				</select>
			</div>
			
			<div class="input-group">
				<button @click="calculate">Calculate quote</button>
			</div>
		</div>

		<div class="results">
			<ul id="details">
				<li>
					<h5>Name</h5>
					<div>{{ quoteResult.firstName }} {{ quoteResult.lastName }}</div>
				</li>
				<li>
					<h5>Mobile</h5>
					<div>{{ quoteResult.mobileNumber }}</div>
				</li>
				<li>
					<h5>Email</h5>
					<div>{{ quoteResult.email }}</div>
				</li>
				<li>
					<h5>Finance amount</h5>
					<div>${{ quoteResult.financeAmount }}</div>
					<div>{{ quoteResult.term * 12 }} monthly payments</div>
				</li>
				<li>
					<h5>Repayments from</h5>
					<div>{{ quoteResult.repaymentsFrom }}</div>
				</li>
				<li>
					<h5>Total Repayments</h5>
					<div>${{ quoteResult.totalRepayments }}</div>
				</li>
				<li>
					<h5>Establishment Fee</h5>
					<div>${{ quoteResult.establishmentFee }}</div>
				</li>
				<li>
					<h5>Total Interest</h5>
					<div>${{ quoteResult.interest }}</div>
				</li>
			</ul>

			<div class="input-group">
				<button @click="apply">Apply</button>
			</div>
		</div>
	</div>

</div>
</template>

<script>
import CalculatorService from '../components/calculator.service'
import AlertComponent from "../shared/alert/alert.component";

export default {
  name: 'QuoteCalculator',
  components: {
    AlertComponent
  },
  data() {
    return {
		products: null,
		months: 24,
		loanDetails: {
			amountRequired: 2100,
			term: 0,
			title: '',
			firstName: '',
			lastName: '',
			dateOfBirth: '',
			email: '',
			mobile: '',
			product: '',
			interest: 7,
		},
		visible: false,
		showAlert: null,
        alertInfo: null,
		quoteResult: [],
    };
	},
	created() {
		this.initialize();
		},
	methods: {
		initialize() {
			var self = this
			CalculatorService.getProducts()
				.then(response => {
					self.products = response.data
					self.showAlert = false;
				})
				.catch(function (error) {
					self.alertInfo = { success: false, error };
					self.showAlert = true;
				})
		},
		calculate() {
			var self = this
			self.loanDetails.amountRequired = Number(self.loanDetails.amountRequired)
			self.loanDetails.term = Number(self.loanDetails.term)
			console.log("result:", self.loanDetails)
			CalculatorService.calculate(self.loanDetails)
				.then(response => {
					self.quoteResult = response.data
					self.showAlert = false;
				})
				.catch(function (error) {
					self.alertInfo = { success: false, error };
					self.showAlert = true;
				})
		},
		apply() {
			var self = this
			CalculatorService.apply(self.quoteResult)
				.then(response => {
					console.log("result:", response.data)
					self.quoteResult = response.data
					self.showAlert = false;
				})
				.catch(function (error) {
					self.alertInfo = { success: false, error };
					self.showAlert = true;
				})
		}
	}
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

html,
body,
.app {
  height: 100%;
  background: ghostwhite;
  font-family: Roboto Slab, sans-serif;
  font-size: 12px;
}

/* calculator */
.calculator, .calculator * {
	box-sizing: border-box;
}
.calculator {
	display: flex;
	flex-wrap: wrap;
	border: solid 1px #ddd;
	background: #fff;
	margin: 0 auto;
	padding: 50px;
	min-height: 521px;
	max-width: 1040px;
}

/* inputs */
#inputs {
	width: 33.333%;
	padding: 0 30px;
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	transition: opacity 400ms;
	opacity: 0;
}
.input-group {
	width: 100%;
}
input[type=text], select {
	width: 100%;
	height: 44px;
	color: #333;
	font-family: inherit;
	font-size: 16px;
	line-height: 24px;
	padding: 9px;
	margin: 0 0 24px;
	border: solid 1px #e6e6e6;
	border-radius: 0;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	-webkit-transition : border 200ms;
	-moz-transition : border 200ms;
	-o-transition : border 200ms;
	transition : border 200ms;
}
input[type=text]:focus {
	border-color: #bdbdbd;
}
select {
	background: transparent;
	height: 42px;
	padding: 0 9px;
	position: relative;
	z-index: 10;
	cursor: pointer;
	outline: none !important;
}
input[type=range] {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	width: 100%;
	margin: 0 0 26px;
}
input[type=range]:focus {
	outline: none;
}
/*

  we need to repeat a few times below for webkit, firefox,
  and ie separately, because commas don't always play nice
  with the these ::-vendor-hyphen-prefixs

*/
/* webkit */
input[type=range]::-webkit-slider-runnable-track {
	width: 100%;
	height: 6px;
	cursor: pointer;
	background: #e6e6e6;
	border-radius: 3px;
	border: 0px;
}
input[type=range]::-webkit-slider-thumb {
	border: 0px;
	height: 16px;
	width: 16px;
	border-radius: 50%;
	background: #01579b;
	cursor: pointer;
	-webkit-appearance: none;
	appearance: none;
	margin-top: -5px;
}
/* firefox - not tested */
input[type=range]::-moz-range-track {
	width: 100%;
	height: 6px;
	cursor: pointer;
	background: #e6e6e6;
	border-radius: 3px;
	border: 0px;
}
input[type=range]::-moz-range-thumb {
	border: 0px;
	height: 16px;
	width: 16px;
	border-radius: 50%;
	background: #01579b;
	cursor: pointer;
	-moz-appearance: none;
	appearance: none;
	margin-top: -5px;
}
/* ie - not tested */
input[type=range]::-ms-track {
	width: 100%;
	height: 6px;
	cursor: pointer;
	border-radius: 3px;
	border: 0px;
	background: transparent;
	border-color: transparent;
	color: transparent;
}
input[type=range]::-ms-fill-lower {
	background: #e6e6e6;
	border: 0;
	border-radius: 50%;
	box-shadow: none;
}
input[type=range]::-ms-fill-upper {
	background: #e6e6e6;
	border: 0;
	border-radius: 50%;
	box-shadow: none;
}
input[type=range]::-ms-thumb {
	box-shadow: none;
	border: 0px;
	height: 16px;
	width: 16px;
	border-radius: 50%;
	background: #01579b;
	cursor: pointer;
	margin-top: -5px;
}

button {
	border: 0;
	height: 44px;
	color: #fff;
	font-weight: 600;
	font-size: 13px;
	line-height: 43px;
	background: #01579b;
	text-align: center;
	display: inline-block;
	width: 100%;
	margin: 20;
	overflow: hidden;
	cursor: pointer;
	transition: background 400ms;
	border-radius: 3px;
}
button:hover {
	background: #01376b;
}

/* results */
.results {
	display: flex;
	flex-wrap: wrap;
	width: 50%;
	transition: opacity 400ms;
	padding: 40px;
}

/* details */
#details {
	list-style-type: none;
	border-left: solid 1px #e6e6e6;
	margin: 0;
	padding: 0 30px;
	width: 100%;
	font-size: 12px;
}
#details li {
	padding: 0 0 10px;
	margin: 0 0 10px;
	border-bottom: dotted 1px #ddd;
}

</style>
