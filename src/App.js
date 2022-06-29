import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Dropdown, DropdownOption, AmountInput } from "./app.styles";

function App() {
  const BASE_URI = "https://free.currconv.com/api/v7/";
  const API_KEY = "0e628e3dd017b7781bca"; // usually a bad idea. But this is just a free api key ;)

  const [values, setValues] = useState({
    topAmount: 1,
    botAmount: 54.59,
    topCurr: "PHP",
    botCurr: "USD",
  });

  // to prevent multiple calls of conversion
  const [isConverting, setIsConverting] = useState(false);

  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    getCurrencies();
  }, []);

  // bot to top
  useEffect(() => {
    if (!isConverting) {
			convertCurr(1)
    }
  }, [values.botAmount]);

  // top to bot
  useEffect(() => {
    if (!isConverting) {
			convertCurr(2)
    }
  }, [values.topAmount]);

  const handleChange = (e) => {
    setValues((val) => {
      return {
        ...val,
        [e.target.name]: e.target.value,
      };
    });
  };

  const currOptions = currencies.length
    ? currencies.map((curr) => (
        <DropdownOption key={curr} value={curr}>{curr}</DropdownOption>
      ))
    : [];

  function convertCurr(type) {
    const url =
      BASE_URI +
      `convert?q=${type === 1 ? values.topCurr : values.botCurr}_${
        type === 1 ? values.botCurr : values.topCurr
      }&compact=ultra&apiKey=` +
      API_KEY;
    setIsConverting(true);
    axios
      .get(url)
      .then((data) => {
        const conversionAmt = data.data[Object.keys(data.data)[0]];
        const total = Math.round(values.topAmount * conversionAmt * 100) / 100;

        setValues((values) => {
          return {
            ...values,
            botAmount: total,
          };
        });

        setIsConverting(false);
      })
      .catch((err) => console.error(err));
    setIsConverting(false);
  };

  const getCurrencies = () => {
    const url = BASE_URI + "currencies?apiKey=" + API_KEY;

    axios
      .get(url)
      .then((data) => {
        setCurrencies(Object.keys(data.data.results));
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <div className="row-input">
        <div className="amount-input">
          <AmountInput
            name="topAmount"
            type="text"
            placeholder="value"
            value={values.topAmount}
            onChange={handleChange}
          />
          <span>{values.topCurr}</span>
        </div>
        <Dropdown
          name="topCurr"
          id="countries-from-top"
          value={values.topCurr}
          onChange={handleChange}
        >
          {currOptions.length && currOptions}
        </Dropdown>
      </div>
      <div className="row-input">
        <div className="amount-input">
          <AmountInput
            name="botAmount"
            type="text"
            placeholder="value"
            value={values.botAmount}
            onChange={handleChange}
          />
          <span>{values.botCurr}</span>
        </div>
        <Dropdown
          name="botCurr"
          id="countries-from-bot"
          value={values.botCurr}
          onChange={handleChange}
        >
          {currOptions.length && currOptions}
        </Dropdown>
      </div>

      <span className="con-meta">
        Might not work occasionally since I'm using free API for this XD
      </span>
    </Container>
  );
}

export default App;
