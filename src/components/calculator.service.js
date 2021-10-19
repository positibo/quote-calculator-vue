import axios from "axios";

class CalculatorService {
  calculate = loanDetails => {
    const url = process.env.VUE_APP_HOST_URL + "/Calculate";
    return axios.post(url, loanDetails);
  };

  apply = loanDetails => {
    const url = process.env.VUE_APP_HOST_URL + "/Apply";
    return axios.post(url, loanDetails);
  };

   getProducts = () => {
    const url = process.env.VUE_APP_HOST_URL + "/GetProducts";
    return axios.get(url);
  };
}

const calculatorService = new CalculatorService();
export default calculatorService;
